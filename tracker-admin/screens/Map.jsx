import React, { useEffect } from 'react';
import { Search, Plus, Minus, Navigation, Map as MapIcon, History, Users, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize map
        const map = L.map('map', {
            zoomControl: false,
            attributionControl: false
        }).setView([37.7749, -122.4194], 14);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19
        }).addTo(map);

        // Custom pulse marker
        const pulseIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `
        <div class="relative flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-primary/20 rounded-full animate-ping"></div>
            <div class="relative w-5 h-5 bg-white rounded-full border-4 border-primary shadow-lg"></div>
        </div>
      `,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        L.marker([37.7749, -122.4194], { icon: pulseIcon }).addTo(map);

        // Add circle layer
        L.circle([37.7749, -122.4194], {
            color: '#2563eb',
            fillColor: '#2563eb',
            fillOpacity: 0.05,
            radius: 800,
            weight: 1
        }).addTo(map);

        return () => map.remove();
    }, []);

    return (
        <div className="relative h-screen w-full flex flex-col overflow-hidden animate-in fade-in duration-700">
            {/* Map Background */}
            <div id="map" className="absolute inset-0 z-0"></div>

            {/* Top Controls */}
            <div className="relative z-10 p-4 space-y-4 pt-12">
                <div className="flex justify-center">
                    <div className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-soft border border-white/50 flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Live</span>
                        </div>
                        <div className="h-4 w-[1px] bg-slate-200"></div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 flex items-center justify-center text-primary">
                                <Users size={16} />
                            </div>
                            <span className="text-xs font-bold text-slate-800">Walking • 5.4 km/h</span>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for locations"
                        className="w-full bg-white/95 backdrop-blur-md pl-14 pr-6 py-4 rounded-3xl shadow-soft border border-white/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Map Labels (Overlays) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <h2 className="text-3xl font-bold text-slate-900/80 tracking-tight">San Francisco</h2>
            </div>

            {/* Floating Controls */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col space-y-3">
                <div className="bg-white rounded-2xl shadow-soft border border-slate-100 flex flex-col">
                    <button className="p-3 border-b border-slate-50 hover:bg-slate-50 transition-all rounded-t-2xl"><Plus size={24} className="text-slate-900" /></button>
                    <button className="p-3 hover:bg-slate-50 transition-all rounded-b-2xl"><Minus size={24} className="text-slate-900" /></button>
                </div>
                <button className="w-14 h-14 premium-gradient rounded-full shadow-premium flex items-center justify-center text-white active:scale-90 transition-all">
                    <Navigation size={24} className="fill-white" />
                </button>
            </div>

            {/* Navigation Bar */}
            <div className="relative mt-auto z-10 p-6">
                <div className="bg-white/90 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/50 p-2 flex items-center justify-between">
                    <button className="flex-1 flex flex-col items-center py-3 space-y-1 bg-blue-100/50 rounded-3xl">
                        <MapIcon size={22} className="text-primary fill-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Map</span>
                    </button>
                    <button onClick={() => navigate('/timeline')} className="flex-1 flex flex-col items-center py-3 space-y-1 text-slate-400 hover:text-slate-600">
                        <History size={22} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Timeline</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center py-3 space-y-1 text-slate-400 hover:text-slate-600">
                        <Users size={22} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Team</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center py-3 space-y-1 text-slate-400 hover:text-slate-600">
                        <Settings size={22} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Settings</span>
                    </button>
                </div>
            </div>

            <style>{`
        .leaflet-container { font-family: 'Inter', sans-serif; }
      `}</style>
        </div>
    );
};

export default Map;
