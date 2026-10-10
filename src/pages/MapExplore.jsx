import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, CheckCircle2, Coins, Search, Compass, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import L from 'leaflet';

// Real Hyderabad examples provided by user
const REAL_HOTSPOTS = [
  {
    id: 1,
    name: 'Prakash Nagar Park - Park Entrance',
    area: 'Prakash Nagar, Hyderabad, Telangana',
    lat: 17.3850,
    lng: 78.4867,
    status: 'cleaned',
    bounty: 75,
    inr: '7.50',
    distance: '0.4 km',
    cleanedBy: 'Swachh Volunteer',
    beforeImg: '/assets/proofs/prakash-nagar-before.jpg',
    afterImg: '/assets/proofs/prakash-nagar-after.jpg',
    date: '10 Jun 2024 • 09:32 AM',
    description: 'Cleaned huge plastic debris and waste pile at Prakash Nagar Park gate entrance.'
  },
  {
    id: 2,
    name: 'Sai Kirana Store Corner',
    area: 'Hyderabad, Telangana, India',
    lat: 17.4239,
    lng: 78.4738,
    status: 'cleaned',
    bounty: 50,
    inr: '5.00',
    distance: '1.2 km',
    cleanedBy: 'Local Citizen Team',
    beforeImg: '/assets/proofs/sai-kirana-before.jpg',
    afterImg: '/assets/proofs/sai-kirana-after.jpg',
    date: '12 Oct 2024 • 11:23 AM',
    description: 'Corner curb plastic garbage cleaned outside Sai Kirana Store.'
  },
  {
    id: 3,
    name: 'Prakash Nagar Park Outer Perimeter',
    area: 'Prakash Nagar, Hyderabad, Telangana',
    lat: 17.3855,
    lng: 78.4872,
    status: 'dirty',
    bounty: 75,
    inr: '7.50',
    distance: '0.5 km',
    reportedBy: 'GHMC Citizen Alert',
    beforeImg: '/assets/proofs/prakash-nagar-before.jpg',
    afterImg: null,
    date: 'Active Bounty',
    description: 'Discarded beverage containers and plastic bags along park fence.'
  },
  {
    id: 4,
    name: 'Sai Kirana Back Alley Lane',
    area: 'Hyderabad, Telangana, India',
    lat: 17.4245,
    lng: 78.4742,
    status: 'dirty',
    bounty: 50,
    inr: '5.00',
    distance: '1.3 km',
    reportedBy: 'Local Resident',
    beforeImg: '/assets/proofs/sai-kirana-before.jpg',
    afterImg: null,
    date: 'Active Bounty',
    description: 'Roadside trash accumulation requiring sweep and disposal.'
  }
];

export default function MapExplore() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const [filter, setFilter] = useState('all'); // 'all' | 'dirty' | 'cleaned'
  const [search, setSearch] = useState('');
  const [selectedSpot, setSelectedSpot] = useState(REAL_HOTSPOTS[0]);
  const [viewMode, setViewMode] = useState('after'); // 'before' | 'after'

  // Initialize interactive Leaflet India map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center initially on Hyderabad, Telangana
      const map = L.map(mapContainerRef.current, {
        center: [17.4065, 78.4772],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // Google Maps style OpenStreetMap street tiles with all states, districts and streets
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add Hotspot Markers
    REAL_HOTSPOTS.forEach((spot) => {
      const isClean = spot.status === 'cleaned';

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background: ${isClean ? '#10B981' : '#EF4444'};
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 3px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
          ">
            ${isClean ? '✓' : '⚠'}
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker([spot.lat, spot.lng], { icon: customIcon }).addTo(map);

      // Popup
      const popupContent = `
        <div style="min-width: 180px; padding: 4px;">
          <div style="font-weight: 800; font-size: 13px; color: #fff; margin-bottom: 2px;">
            ${spot.name}
          </div>
          <div style="font-size: 11px; color: #34D399; font-weight: 600;">
            ${spot.lat}° N, ${spot.lng}° E
          </div>
          <div style="margin-top: 6px; display: flex; align-items: center; justify-content: space-between;">
            <span style="background: ${isClean ? '#065F46' : '#7F1D1D'}; color: ${isClean ? '#A7F3D0' : '#FECACA'}; padding: 2px 8px; border-radius: 8px; font-size: 10px; font-weight: bold;">
              ${isClean ? 'Verified Clean (+${spot.bounty} SC)' : 'Needs Clean (${spot.bounty} SC Bounty)'}
            </span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setSelectedSpot(spot);
      });

      markersRef.current.push(marker);
    });

    return () => {
      // clean up markers
    };
  }, []);

  const jumpToLocation = (lat, lng, zoomLevel, spot = null) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], zoomLevel, { animate: true });
      if (spot) setSelectedSpot(spot);
    }
  };

  const filteredSpots = REAL_HOTSPOTS.filter((spot) => {
    if (filter === 'dirty' && spot.status !== 'dirty') return false;
    if (filter === 'cleaned' && spot.status !== 'cleaned') return false;
    if (search && !spot.name.toLowerCase().includes(search.toLowerCase()) && !spot.area.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-5 pb-6">
      {/* Title & Currency Exchange Banner */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>India Cleanliness Map</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-mono">
              Live GPS
            </span>
          </h2>

          <div className="bg-amber-400/20 border border-amber-300/40 px-3 py-1 rounded-2xl backdrop-blur-md">
            <span className="text-xs font-black text-amber-300">
              🪙 10 Coins = ₹1 Rupee
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-300 mt-1">
          Explore all states and districts in India. Locate waste hotspots and verified cleanups.
        </p>
      </div>

      {/* Interactive India Map (Leaflet / OpenStreetMap) */}
      <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900">
        {/* Quick Zoom / Scope Buttons */}
        <div className="absolute top-3 left-3 z-[1000] flex flex-wrap gap-1.5 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-xl">
          <button
            type="button"
            onClick={() => jumpToLocation(21.7679, 78.8718, 5)}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white transition-all"
            title="View all states in India"
          >
            🇮🇳 All India (States)
          </button>
          <button
            type="button"
            onClick={() => jumpToLocation(17.8749, 78.7845, 8)}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            Telangana
          </button>
          <button
            type="button"
            onClick={() => jumpToLocation(17.4065, 78.4772, 12)}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-emerald-500 text-slate-950 transition-all shadow"
          >
            Hyderabad City
          </button>
          <button
            type="button"
            onClick={() => jumpToLocation(17.3850, 78.4867, 16, REAL_HOTSPOTS[0])}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-white/10 hover:bg-white/20 text-emerald-300 transition-all"
          >
            Prakash Nagar
          </button>
          <button
            type="button"
            onClick={() => jumpToLocation(17.4239, 78.4738, 16, REAL_HOTSPOTS[1])}
            className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-white/10 hover:bg-white/20 text-emerald-300 transition-all"
          >
            Sai Kirana Store
          </button>
        </div>

        {/* Map canvas container */}
        <div
          ref={mapContainerRef}
          style={{ height: '360px', width: '100%', zIndex: 1 }}
          className="w-full"
        />

        {/* Map legend bottom bar */}
        <div className="bg-slate-950/90 backdrop-blur-md p-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span>Verified Cleaned</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span>Active Trash Bounty</span>
            </span>
          </div>

          <span className="text-[11px] text-emerald-400 font-mono">
            Pan & Zoom across India just like Google Maps
          </span>
        </div>
      </div>

      {/* Selected Hotspot Spotlight Card */}
      {selectedSpot && (
        <div className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl border border-white/20 p-5 shadow-2xl text-white space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    selectedSpot.status === 'cleaned'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                  }`}
                >
                  {selectedSpot.status === 'cleaned' ? 'Verified Cleaned' : 'Needs Cleaning'}
                </span>
                <span className="text-xs text-slate-400">{selectedSpot.distance} away</span>
              </div>
              <h3 className="font-black text-lg text-white mt-1">{selectedSpot.name}</h3>
              <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{selectedSpot.area}</span>
                <span className="text-emerald-400 font-mono text-[11px] ml-1">
                  ({selectedSpot.lat}° N, {selectedSpot.lng}° E)
                </span>
              </p>
            </div>

            <div className="text-right">
              <span className="text-base font-black text-emerald-400 block">
                {selectedSpot.bounty} Coins
              </span>
              <span className="text-[11px] font-bold text-amber-300">
                ≈ ₹{selectedSpot.inr} INR
              </span>
            </div>
          </div>

          {/* Photo Preview Container */}
          <div className="space-y-2">
            <div className="relative h-56 rounded-2xl overflow-hidden border border-white/15 bg-slate-950">
              <img
                src={
                  selectedSpot.afterImg && viewMode === 'after'
                    ? selectedSpot.afterImg
                    : selectedSpot.beforeImg
                }
                alt={selectedSpot.name}
                className="w-full h-full object-cover"
              />

              {/* Before / After toggle if afterImg exists */}
              {selectedSpot.afterImg && (
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md p-1 rounded-xl flex gap-1 border border-white/20">
                  <button
                    type="button"
                    onClick={() => setViewMode('before')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'before'
                        ? 'bg-rose-500 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Before Clean
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('after')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'after'
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    After Clean
                  </button>
                </div>
              )}

              {/* Verified badge watermark */}
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1 rounded-xl border border-emerald-400/40 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedSpot.date}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300">{selectedSpot.description}</p>
          </div>

          <div className="flex gap-2.5 pt-2 border-t border-white/10">
            <Link
              to="/submit"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Submit Cleanup Proof Here</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search spot or locality (e.g. Prakash Nagar, Sai Kirana)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-xl"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-white/10 text-slate-300 border border-white/10 hover:bg-white/15'
            }`}
          >
            All Hotspots ({REAL_HOTSPOTS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('cleaned')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'cleaned'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white/10 text-slate-300 border border-white/10 hover:bg-white/15'
            }`}
          >
            Verified Clean
          </button>
          <button
            type="button"
            onClick={() => setFilter('dirty')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'dirty'
                ? 'bg-rose-600 text-white shadow-lg'
                : 'bg-white/10 text-slate-300 border border-white/10 hover:bg-white/15'
            }`}
          >
            Active Bounties
          </button>
        </div>
      </div>

      {/* Hotspots List with Real User Proofs */}
      <div className="space-y-3">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            onClick={() => {
              setSelectedSpot(spot);
              jumpToLocation(spot.lat, spot.lng, 16, spot);
            }}
            className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/15 p-4 shadow-xl flex items-center justify-between gap-3 text-white transition-all hover:border-emerald-400/50 cursor-pointer"
          >
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/15 bg-slate-950">
              <img
                src={spot.afterImg || spot.beforeImg}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    spot.status === 'cleaned'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {spot.status === 'cleaned' ? 'Verified Clean' : 'Needs Clean'}
                </span>
                <span className="text-[11px] text-slate-400">• {spot.distance}</span>
              </div>

              <h4 className="text-xs font-bold text-white truncate mt-1">{spot.name}</h4>
              <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                {spot.area}
              </p>
              <p className="text-[10px] font-mono text-emerald-400 mt-0.5">
                {spot.lat}° N, {spot.lng}° E
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-xl border border-emerald-400/40">
                <Coins className="w-3.5 h-3.5 text-amber-300" />
                {spot.bounty} SC
              </span>
              <span className="text-[10px] text-amber-300 font-bold block mt-1">
                ≈ ₹{spot.inr}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
