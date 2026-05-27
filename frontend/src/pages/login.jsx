import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../axios";
import { User, Mail, Lock, LogIn, UserPlus } from "lucide-react";

export default function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = isLogin ? { email: formData.email, password: formData.password } : formData;

    try {
      const res = isLogin ? await loginUser(payload) : await signupUser(payload);
      const token = res.data?.token;

      if (!token) throw new Error("No token received");

      localStorage.setItem("token", token);
      setToken(token);
      navigate("/");
    } catch (err) {
      console.error("Auth error", err);
      alert("Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F3F4F6] dark:bg-[#0F172A]">
      {/* Glass Panel Container */}
      <div className="glass-panel w-full max-w-md p-8 rounded-[32px] shadow-2xl animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="opacity-60 font-medium">
            {isLogin ? "Enter your credentials to continue" : "Start tracking your expenses today"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full pl-12 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-5 h-5 opacity-40" />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-black shadow-lg shadow-[#8B5CF6]/20 hover:scale-[102%] transition-transform flex items-center justify-center gap-2">
            {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        {/* Toggle Footer */}
        <div className="mt-8 text-center text-sm font-bold opacity-70">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#8B5CF6] hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}