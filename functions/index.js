const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

initializeApp();
const db = getFirestore();

exports.verifyCleanup = onCall(async (request) => {
  const { beforeImage, afterImage, location } = request.data;

  // Validate request payload
  if (!beforeImage || !afterImage) {
    throw new HttpsError(
      "invalid-argument",
      "Both 'before' and 'after' images are required for verification."
    );
  }

  // Retrieve Gemini API key from functions/.env file
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new HttpsError(
      "failed-precondition",
      "GEMINI_API_KEY is missing. Please check your functions/.env file."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  // Helper function to extract base64 data string from Data URL
  const cleanBase64 = (dataUrl) => {
    return dataUrl.includes(",") ? dataUrl.split(",")[1] : dataUrl;
  };

  const prompt = `
    You are an AI verification auditor for a street cleaning application called SwachhCoin in Hyderabad.
    Analyze these two photos (Image 1: Before Cleanup, Image 2: After Cleanup).
    
    Tasks:
    1. Verify if both images capture the exact same physical location (check landmarks, background features, walls, road structures, or fixed poles).
    2. Assess if waste/garbage visible in Image 1 has been significantly reduced or cleaned in Image 2.
    3. Determine if this cleanup appears genuine or staged/fake.

    Respond STRICTLY in valid JSON format with no additional markdown:
    {
      "isSameLocation": boolean,
      "cleanupPercentage": number (0 to 100),
      "isGenuine": boolean,
      "reason": "Brief summary explanation of your assessment"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            { inlineData: { mimeType: "image/jpeg", data: cleanBase64(beforeImage) } },
            { inlineData: { mimeType: "image/jpeg", data: cleanBase64(afterImage) } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const aiResult = JSON.parse(response.text);

    // Verification threshold: Same location, genuine work, and at least 70% cleanup
    const isVerified = Boolean(
      aiResult.isSameLocation &&
      aiResult.cleanupPercentage >= 70 &&
      aiResult.isGenuine
    );

    const coinsEarned = isVerified ? 25 : 0;

    // Credit coins to user's Firestore document if authenticated and verified
    if (isVerified && request.auth) {
      const userRef = db.collection("users").doc(request.auth.uid);
      await userRef.set(
        {
          coins: FieldValue.increment(coinsEarned),
          updatedAt: FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    }

    return {
      verified: isVerified,
      coinsEarned: coinsEarned,
      cleanupPercentage: aiResult.cleanupPercentage || 0,
      reason: aiResult.reason || "Analysis complete."
    };

  } catch (err) {
    console.error("Gemini AI Verification Error:", err);
    throw new HttpsError(
      "internal",
      `Failed to process AI verification: ${err.message}`
    );
  }
});