import React from 'react';
import { Calendar, Search, MoreVertical, Home, Car, Briefcase, MapPin, Plus, Map as MapIcon, History, BarChart2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Timeline = () => {
    const navigate = useNavigate();

    const days = [
        { name: 'MON', date: '9' },
        { name: 'TUE', date: '10' },
        { name: 'WED', date: '11' },
        { name: 'THU', date: '12', active: true },
        { name: 'FRI', date: '13' },
        { name: 'SAT', date: '14' },
        { name: 'SUN', date: '15' },
    ];

    const events = [
        {
            id: 1,
            type: 'STATIONARY',
            title: 'Home',
            time: '07:00 AM - 08:30 AM',
            duration: '1h 30m',
            location: '124 Oak Street',
            icon: <Home size={20} className="text-white" />,
            color: 'bg-blue-500'
        },
        {
            id: 2,
            type: 'TRANSIT',
            title: 'Commute to Office',
            time: '08:30 AM - 09:15 AM',
            duration: '45m',
            speed: '12 mph avg',
            distance: '4.2 miles',
            icon: <Car size={20} className="text-white" />,
            color: 'bg-blue-500',
            hasMap: true
        },
        {
            id: 3,
            type: 'STATIONARY',
            title: 'Corporate HQ',
            time: '09:15 AM - 05:45 PM',
            duration: '8h 30m',
            location: '550 Financial District',
            icon: <Briefcase size={20} className="text-white" />,
            color: 'bg-blue-500',
            isSafeZone: true
        },
        {
            id: 4,
            type: 'LIVE',
            title: 'Starbucks - 4th Ave',
            time: 'Since 06:10 PM',
            duration: '15m elapsed',
            location: '1.2 miles from HQ',
            icon: <MapPin size={20} className="text-white" />,
            color: 'bg-blue-500',
            isLive: true
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8faff] flex flex-col no-scrollbar animate-in slide-in-from-bottom duration-700">
            {/* Header */}
            <header className="px-6 pt-12 pb-6 bg-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                        <Calendar size={24} className="text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Timeline</h1>
                        <p className="text-sm text-slate-400 font-medium">Thursday, Oct 12, 2023</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors">
                        <Search size={22} className="text-slate-400" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors">
                        <MoreVertical size={22} className="text-slate-400" />
                    </button>
                </div>
            </header>

            {/* Calendar Strip */}
            <div className="bg-white px-2 py-4 border-b border-slate-50">
                <div className="flex items-center justify-between px-4 mb-4">
                    <h2 className="font-bold text-slate-900">October 2023</h2>
                    <div className="flex space-x-4">
                        <button className="text-slate-400 text-xs">‹</button>
                        <button className="text-slate-400 text-xs">›</button>
                    </div>
                </div>
                <div className="flex justify-around">
                    {days.map((d, i) => (
                        <div key={i} className="flex flex-col items-center space-y-2">
                            <span className="text-[10px] font-bold text-slate-400 tracking-tighter">{d.name}</span>
                            <div className={`w-10 h-12 flex items-center justify-center rounded-2xl font-bold transition-all ${d.active ? 'premium-gradient text-white shadow-premium scale-110' : 'text-slate-900 hover:bg-slate-50'}`}>
                                {d.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline List */}
            <div className="flex-1 px-6 py-8 relative">
                {/* Timeline Line */}
                <div className="absolute left-[44px] top-12 bottom-0 w-[1px] bg-blue-100"></div>

                <div className="space-y-10">
                    {events.map((event, i) => (
                        <div key={event.id} className="relative flex items-start space-x-6">
                            {/* Icon Bubble */}
                            <div className="relative z-10">
                                <div className={`w-11 h-11 ${event.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                    {event.icon}
                                </div>
                                {event.isLive && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white"></div>
                                )}
                            </div>

                            {/* Card */}
                            <div className={`flex-1 bg-white rounded-3xl p-5 border shadow-sm ${event.isLive ? 'border-primary/20 ring-4 ring-primary/5' : 'border-slate-50'}`}>
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-slate-900 text-lg uppercase tracking-tight">{event.title}</h3>
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md tracking-wider ${event.isLive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {event.type}
                                    </span>
                                </div>

                                <p className="text-slate-400 text-sm font-medium mb-1">{event.time}</p>

                                <div className="flex items-center space-x-3 mb-4">
                                    <span className="text-slate-900 font-bold">{event.duration}</span>
                                    <span className="text-slate-200">|</span>
                                    <span className="text-slate-400 text-sm">{event.location}</span>
                                </div>

                                {event.isSafeZone && (
                                    <div className="flex items-center space-x-2 mb-4">
                                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Safe Zone</span>
                                    </div>
                                )}

                                {event.hasMap && (
                                    <div className="relative rounded-2xl overflow-hidden mb-4 border border-slate-50">
                                        <img
                                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400"
                                            alt="Map Preview"
                                            className="w-full h-24 object-cover opacity-60 grayscale"
                                        />
                                        <div className="absolute inset-0 bg-primary/5"></div>
                                        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-slate-900 shadow-sm">
                                            4.2 miles
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-1 h-20 bg-primary/20 rounded-full"></div>
                                        </div>
                                    </div>
                                )}

                                {event.hasMap && (
                                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs font-bold text-slate-900">45m</span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-xs text-slate-400 font-medium">{event.speed}</span>
                                        </div>
                                        <button className="text-primary text-xs font-bold flex items-center">
                                            Details <span className="ml-1">›</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-24 right-1/2 translate-x-1/2 z-20">
                <button className="w-14 h-14 premium-gradient rounded-full shadow-premium flex items-center justify-center text-white active:scale-90 transition-all">
                    <Plus size={28} />
                </button>
            </div>

            {/* Navigation Bar */}
            <div className="bg-white px-2 py-2 flex items-center justify-between border-t border-slate-50 shadow-2xl">
                <button onClick={() => navigate('/map')} className="flex-1 flex flex-col items-center py-3 space-y-1 text-slate-400">
                    <MapIcon size={22} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Map</span>
                </button>
                <button className="flex-1 flex flex-col items-center py-3 space-y-1 text-primary">
                    <History size={22} className="fill-primary/10" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Timeline</span>
                </button>
                <div className="w-12"></div> {/* Space for FAB */}
                <button className="flex-1 flex flex-col items-center py-3 space-y-1 text-slate-400">
                    <BarChart2 size={22} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Reports</span>
                </button>
                <button className="flex-1 flex flex-col items-center py-3 space-y-1 text-slate-400">
                    <User size={22} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
                </button>
            </div>
        </div>
    );
};

export default Timeline;
