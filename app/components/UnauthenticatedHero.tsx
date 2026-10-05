"use client";

import React from "react";
import {
  Building2,
  FileText,
  LogIn,
  Sparkles,
  CheckCircle2,
  Info,
  Award,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

interface UnauthenticatedHeroProps {
  onOpenAuthModal: () => void;
  onScrollToStep: () => void;
}

export default function UnauthenticatedHero({
  onOpenAuthModal,
  onScrollToStep,
}: UnauthenticatedHeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50/40 pt-10 pb-20 lg:pt-14 lg:pb-28 border-b border-slate-200">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-web3-grid opacity-60 pointer-events-none"></div>
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-6">
              <Building2 className="w-4 h-4 text-[#0284c7]" />
              <span className="text-xs font-bold text-[#001f54]">
                Sistem E-Office Layanan Lomba & Surat Tugas Mahasiswa
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0a1128] leading-[1.1]">
              Portal Resmi Pengajuan <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#001f54] via-[#034078] to-[#0284c7] bg-clip-text text-transparent">
                Lomba & Surat Tugas
              </span>
            </h1>

            {/* Sambutan User */}
            <div className="mt-5 p-5 rounded-2xl bg-white border border-slate-200 text-slate-700 shadow-md">
              <p className="text-sm font-semibold text-slate-800">
                <strong className="text-[#001f54] font-extrabold">Selamat Datang di E-Office LOMBA!</strong> Akses sebagai <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold text-xs">Pengunjung</span>.
              </p>
              <p className="text-xs text-slate-600 mt-1.5">
                Layanan pengajuan lomba, penerbitan Surat Tugas/Dispensasi, dan bimbingan proposal dosen.
              </p>
            </div>

            {/* Call to action buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenAuthModal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#001f54] hover:bg-[#034078] text-white font-extrabold text-sm flex items-center justify-center gap-3 shadow-xl shadow-blue-950/20 transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <LogIn className="w-5 h-5 text-cyan-300" />
                <span>Masuk Akun SSO Kampus</span>
              </button>

              <button
                onClick={onScrollToStep}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#001f54] font-bold text-sm border border-slate-300 flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Lihat Alur Pengajuan</span>
                <ArrowRight className="w-4 h-4 text-[#0284c7]" />
              </button>
            </div>

            {/* Feature Check List */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-5 border-t border-slate-200 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#0284c7] shrink-0" />
                <span className="text-xs text-slate-700 font-bold">Upload Proposal Opsional</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#0284c7] shrink-0" />
                <span className="text-xs text-slate-700 font-bold">Validasi Legalisasi Resmi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#0284c7] shrink-0" />
                <span className="text-xs text-slate-700 font-bold">Portofolio & CV Otomatis</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card Stack */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-300 rounded-3xl blur-xl opacity-60"></div>

            <div className="relative rounded-3xl bg-white border border-slate-200 p-6 shadow-2xl space-y-5">
              {/* Stat Summary Box */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#001f54]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0a1128]">Ringkasan Aktivitas E-Office</h3>
                    <p className="text-[11px] text-slate-500 font-mono">Periode: Semester Ganjil 2026</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-bold">
                  Sistem Aktif
                </span>
              </div>

              {/* Statistic Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-2xl font-extrabold text-[#001f54]">248+</span>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">Surat Tugas Diterbitkan</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-2xl font-extrabold text-amber-600">112+</span>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">Prestasi Terdaftar</p>
                </div>
              </div>

              {/* Proposal Status Teaser */}
              <div className="bg-[#001f54] p-4.5 rounded-xl border border-blue-900 text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/10 text-cyan-300 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Proposal Draf Awal</h4>
                    <p className="text-[11px] text-cyan-200">Opsional untuk Masukan Dosen</p>
                  </div>
                </div>
                <button
                  onClick={onScrollToStep}
                  className="text-xs text-cyan-300 hover:text-white font-bold underline underline-offset-4 cursor-pointer"
                >
                  Pelajari &rarr;
                </button>
              </div>

              {/* Legal Note Footer */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Validasi Berjenjang Terintegrasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
