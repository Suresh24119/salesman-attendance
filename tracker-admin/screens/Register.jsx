import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col px-6 py-8 animate-in fade-in duration-500">
            <button
                onClick={() => navigate(-1)}
                className="mb-8 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            >
                <ChevronLeft size={24} className="text-slate-900" />
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Your Account</h1>
                <p className="text-slate-500 text-lg">Join our community to start tracking your activities in real-time.</p>
            </div>

            <div className="space-y-6 flex-1">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 ml-1">Full Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Alex Johnson"
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 ml-1">Email Address</label>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 ml-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="min. 8 characters"
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400"
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                    <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <p className="text-slate-500 text-sm leading-relaxed">
                        I agree to the <span className="text-primary font-medium">Terms of Service</span> and <span className="text-primary font-medium">Privacy Policy</span>.
                    </p>
                </div>
            </div>

            <div className="mt-8 space-y-6 pb-4">
                <button
                    onClick={() => navigate('/permissions')}
                    className="w-full premium-gradient text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-premium active:scale-[0.98] transition-all"
                >
                    <span>Create Account</span>
                    <ArrowRight size={20} />
                </button>

                <p className="text-center text-slate-500">
                    Already have an account? <button onClick={() => navigate('/login')} className="text-primary font-bold">Log In</button>
                </p>
            </div>
        </div>
    );
};

export default Register;
