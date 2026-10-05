"use client";

import React, { useState } from "react";
import { ShieldCheck, UserCheck, X, ShieldAlert, GraduationCap } from "lucide-react";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: string) => void;
}

export default function ConnectModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: ConnectModalProps) {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSSOLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nim.includes("197801") || nim.toLowerCase().includes("wadir")) {
      onLoginSuccess("Wadir 3 (NIP: 197801012002121001)");
    } else {
      onLoginSuccess("Mahasiswa (NIM: 220911001)");
    }
    onClose();
  };

  const handleWadir3DemoLogin = () => {
    onLoginSuccess("Wadir 3 (NIP: 197801012002121001)");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-slate-200 text-slate-900 max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-100 font-bold"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#001f54] p-0.5 shadow-md mb-3 flex items-center justify-center text-white">
            <ShieldCheck className="w-6 h-6 text-cyan-300" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0a1128]">Masuk ke OFIS LOMBA</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Autentikasi akun Mahasiswa/Dosen atau Pengujian Akun Demo.
          </p>
        </div>

        {/* Quick Demo Login Presets */}
        <div className="mb-5 p-3.5 bg-blue-50/80 rounded-xl border border-blue-200 space-y-2">
          <span className="text-[11px] font-bold text-[#001f54] uppercase tracking-wider block">
            Akses Cepat Akun Demo:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleWadir3DemoLogin}
              className="py-2.5 px-3 rounded-lg bg-[#001f54] hover:bg-[#034078] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Login Wadir 3</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onLoginSuccess("Mahasiswa (NIM: 220911001)");
                onClose();
              }}
              className="py-2.5 px-3 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Login Mahasiswa</span>
            </button>
          </div>
        </div>

        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative bg-white px-2 text-[10px] uppercase font-bold text-slate-400 font-mono">
            atau SSO Institusi
          </span>
        </div>

        {/* SSO Form */}
        <form onSubmit={handleSSOLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              NIM Mahasiswa / NIP Dosen / NIP Wadir 3
            </label>
            <input
              type="text"
              required
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="Contoh: 197801012002121001"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#001f54] font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kata Sandi SSO
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#001f54] font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#001f54] hover:bg-[#034078] text-white font-bold text-xs shadow-md mt-2 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-cyan-300" />
            <span>Masuk via Akun Institusi</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-500 font-medium">
          Dengan masuk, Anda menyetujui kebijakan privasi & sistem verifikasi sertifikat digital.
        </div>
      </div>
    </div>
  );
}
