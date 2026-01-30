import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff, Mail, Lock, Chrome, Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col px-6 py-8 animate-in fade-in duration-500">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            >
                <ChevronLeft size={24} className="text-slate-900" />
            </button>

            <div className="mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <div className="w-4 h-4 bg-primary rounded-full relative">
                        <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                <p className="text-slate-500 text-lg">Log in to view your live tracking dashboard.</p>
            </div>

            <div className="space-y-6 flex-1 pt-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400"
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <button className="text-primary text-sm font-semibold">Forgot Password?</button>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/map')}
                    className="w-full premium-gradient text-white py-4 rounded-2xl font-bold shadow-premium active:scale-[0.98] transition-all"
                >
                    Sign In
                </button>

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-4 text-slate-400 font-semibold tracking-wider">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <button className="flex items-center justify-center space-x-3 w-full py-4 border border-slate-200 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                        <Chrome size={20} className="text-slate-600" />
                        <span>Continue with Google</span>
                    </button>
                    <button className="flex items-center justify-center space-x-3 w-full py-4 border border-slate-200 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                        <Apple size={20} className="text-slate-900" />
                        <span>Continue with Apple</span>
                    </button>
                </div>
            </div>

            <div className="mt-8 pb-4">
                <p className="text-center text-slate-500">
                    Don't have an account? <button onClick={() => navigate('/register')} className="text-primary font-bold">Sign up</button>
                </p>
            </div>
        </div>
    );
};

export default Login;
