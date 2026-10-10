import React, { useRef, useState } from 'react';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';

export default function PhotoUpload({ label, description, onImageSelect }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setPreview(dataUrl);
      if (onImageSelect) onImageSelect(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setPreview(null);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onImageSelect) onImageSelect(null);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/15 p-5 shadow-2xl text-white">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-bold text-white tracking-tight">{label}</label>
        {preview && (
          <span className="inline-flex items-center text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/40">
            <Check className="w-3.5 h-3.5 mr-1" /> Image Ready
          </span>
        )}
      </div>
      {description && <p className="text-xs text-slate-400 mb-3.5">{description}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/15 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 group-hover:bg-emerald-500/30 border border-emerald-400/30 flex items-center justify-center text-emerald-400 transition-colors shadow-inner">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Click to upload photo</p>
            <p className="text-xs text-slate-400 mt-0.5">JPEG, PNG, or camera snapshot</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="relative group rounded-2xl overflow-hidden border border-white/20 bg-slate-950">
            <img
              src={preview}
              alt={label}
              className="w-full h-52 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-slate-100 flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" /> Change
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-rose-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-rose-700 flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs px-1">
            <span className="truncate max-w-[220px] text-slate-400 font-mono">{fileName || 'image.jpg'}</span>
            <button
              type="button"
              onClick={handleClear}
              className="text-rose-400 hover:text-rose-300 font-bold text-xs"
            >
              Remove photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
