import React from 'react';
import { ChevronLeft, Navigation, LineChart, History, Shield, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Permissions = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <LineChart size={24} className="text-primary" />,
            title: 'Daily Insights',
            desc: 'Understand your movement patterns and operational efficiency.',
            bgColor: 'bg-blue-50'
        },
        {
            icon: <History size={24} className="text-primary" />,
            title: 'Route History',
            desc: 'Automatically log every trip without having to open the app.',
            bgColor: 'bg-blue-50'
        },
        {
            icon: <Shield size={24} className="text-primary" />,
            title: 'Background Tracking',
            desc: 'Ensure continuous safety and team visibility 24/7.',
            bgColor: 'bg-blue-50'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col animate-in slide-in-from-right duration-500">
            <header className="px-6 py-4 flex items-center justify-between bg-white border-b border-slate-100">
                <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                    <ChevronLeft size={24} className="text-slate-900" />
                </button>
                <h2 className="text-lg font-bold text-slate-900">Permissions</h2>
                <div className="w-10"></div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-10">
                    <div className="absolute inset-0 bg-blue-100/50 rounded-[40px] transform rotate-3"></div>
                    <div className="absolute inset-0 bg-primary/10 rounded-[40px] transform -rotate-3"></div>
                    <div className="absolute inset-0 bg-blue-100 rounded-[40px] flex items-center justify-center">
                        <div className="relative">
                            <div className="w-24 h-24 premium-gradient rounded-3xl flex items-center justify-center shadow-premium transform -rotate-12">
                                <Navigation size={48} className="text-white fill-white" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full border-2 border-dotted border-primary flex items-center justify-center">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold text-slate-900 mb-3 px-4">Stay Connected in Real-Time</h1>
                    <p className="text-slate-500 leading-relaxed">
                        To provide accurate route data and safety updates, we need to access your location even when the app is minimized.
                    </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden">
                    {features.map((f, i) => (
                        <div key={i} className={`p-5 flex items-start space-x-4 ${i !== features.length - 1 ? 'border-b border-slate-50' : ''}`}>
                            <div className={`w-12 h-12 rounded-2xl ${f.bgColor} flex-shrink-0 flex items-center justify-center`}>
                                {f.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 mb-1">{f.title}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col items-center">
                    <div className="flex items-center space-x-2 text-slate-400 mb-2">
                        <Lock size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Privacy Guaranteed</span>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center px-8">
                        Your data is encrypted and never shared with third parties. You can change this in settings anytime.
                    </p>
                </div>
            </div>

            <div className="p-6 bg-white border-t border-slate-100 space-y-4">
                <button
                    onClick={() => navigate('/map')}
                    className="w-full premium-gradient text-white py-4 rounded-2xl font-bold shadow-premium active:scale-[0.98] transition-all"
                >
                    Allow Always
                </button>
                <button
                    onClick={() => navigate('/map')}
                    className="w-full text-slate-500 font-bold py-2 active:opacity-70 transition-all text-sm"
                >
                    Maybe Later
                </button>
            </div>
        </div>
    );
};

export default Permissions;
