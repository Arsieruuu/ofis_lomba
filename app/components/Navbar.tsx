"use client";

import React, { useState } from "react";
import {
  Trophy,
  Award,
  FileText,
  Home as HomeIcon,
  Building2,
  LogIn,
  UserCheck,
  Menu,
  X,
  Sparkles,
  Users,
  ShieldCheck,
} from "lucide-react";

interface NavbarProps {
  onOpenAuthModal: () => void;
  isLoggedIn: boolean;
  userRole?: string;
  onLogout?: () => void;
}

export default function Navbar({
  onOpenAuthModal,
  isLoggedIn,
  userRole,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#home" className="flex items-center gap-3 group whitespace-nowrap">
              <div className="w-10 h-10 rounded-xl bg-[#001f54] p-0.5 shadow-md shadow-blue-950/15 group-hover:scale-105 transition-transform duration-300 shrink-0">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#001f54] group-hover:rotate-6 transition-transform duration-300" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-wider text-[#0a1128] whitespace-nowrap">
                E-OFFICE <span className="text-[#0284c7]">LOMBA</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80">
            <a
              href="#home"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-[#001f54] hover:bg-white transition-all whitespace-nowrap"
            >
              <HomeIcon className="w-4 h-4 text-[#0284c7] shrink-0" />
              <span>Home</span>
            </a>
            <a
              href="#alur-pengajuan"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-[#001f54] hover:bg-white transition-all whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Alur Pengajuan</span>
            </a>
            <a
              href="#layanan-surat"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-[#001f54] hover:bg-white transition-all whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Layanan Surat</span>
            </a>
            <a
              href="#juara"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-[#001f54] hover:bg-white transition-all whitespace-nowrap"
            >
              <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Juara & Prestasi</span>
            </a>
            <a
              href="#stakeholder"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-[#001f54] hover:bg-white transition-all whitespace-nowrap"
            >
              <Users className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Stakeholder</span>
            </a>
          </nav>

          {/* User Auth Action */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoggedIn ? (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 bg-[#001f54] hover:bg-[#034078] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-blue-950/15 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
              >
                <LogIn className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>Masuk Akun SSO</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-full font-bold whitespace-nowrap">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Login: {userRole || "Mahasiswa"}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-xs bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 px-3.5 py-2 rounded-lg border border-slate-200 transition-all font-semibold whitespace-nowrap"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAuthModal}
              className="p-2 bg-[#001f54] rounded-lg text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-100 font-medium"
          >
            <HomeIcon className="w-5 h-5 text-blue-600" />
            <span>Home</span>
          </a>
          <a
            href="#alur-pengajuan"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-100 font-medium"
          >
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Alur Pengajuan</span>
          </a>
          <a
            href="#layanan-surat"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-100 font-medium"
          >
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Layanan Surat</span>
          </a>
          <a
            href="#juara"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-100 font-medium"
          >
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Juara & Prestasi</span>
          </a>
          <a
            href="#stakeholder"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-100 font-medium"
          >
            <Users className="w-5 h-5 text-indigo-600" />
            <span>Stakeholder</span>
          </a>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#001f54] py-3 rounded-xl font-bold text-white shadow-md"
            >
              <LogIn className="w-5 h-5 text-cyan-300" />
              <span>Masuk via SSO Kampus</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
