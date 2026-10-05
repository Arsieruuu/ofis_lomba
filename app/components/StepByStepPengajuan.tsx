"use client";

import React, { useState } from "react";
import {
  Upload,
  Eye,
  UserCheck,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function StepByStepPengajuan() {
  const [activeStepTab, setActiveStepTab] = useState(1);

  const STEPS_LIST = [
    {
      stepNumber: 1,
      title: "Unggah Proposal Lomba",
      icon: Upload,
      exactPointText:
        "Pada tahap pengajuan lomba, mahasiswa dapat mengunggah proposal lomba terlebih dahulu.",
      detail:
        "Mahasiswa memasukkan draf awal proposal lomba (format PDF/DOCX) saat mengisi formulir pengajuan perlombaan di sistem.",
    },
    {
      stepNumber: 2,
      title: "Upload Bersifat Opsional",
      icon: HelpCircle,
      exactPointText:
        "Upload proposal bersifat opsional pada tahap awal pengajuan.",
      detail:
        "Jika draf proposal belum sepenuhnya selesai, pengajuan tetap dapat diproses terlebih dahulu tanpa memblokir pendaftaran awal.",
    },
    {
      stepNumber: 3,
      title: "Akses Dosen Pembimbing",
      icon: Eye,
      exactPointText:
        "Tujuannya agar proposal dapat dilihat oleh dosen pembimbing sebelum mahasiswa melanjutkan proses pengajuan.",
      detail:
        "Sistem mengirimkan notifikasi dan memberikan hak akses membaca dokumen proposal kepada Dosen Pembimbing yang ditunjuk.",
    },
    {
      stepNumber: 4,
      title: "Review & Pembacaan Dosen",
      icon: UserCheck,
      exactPointText:
        "Dosen dapat membaca proposal terlebih dahulu apabila mahasiswa telah mengunggahnya.",
      detail:
        "Dosen membaca isi proposal, memberikan persetujuan (approval), atau memberikan catatan revisi sebelum melangkah ke tahap validasi fakultas.",
    },
  ];

  return (
    <section
      id="alur-pengajuan"
      className="relative py-20 bg-white text-slate-900 overflow-hidden border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#001f54] px-4 py-1.5 rounded-full text-xs font-extrabold mb-3 uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 text-[#0284c7]" />
            <span>Panduan & Alur Pengajuan</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1128] tracking-tight">
            Step by Step <span className="text-[#0284c7]">Pengajuan Lomba</span>
          </h2>

          <p className="mt-4 max-w-2xl text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Proses pengajuan lomba didesain fleksibel dan transparan untuk memudahkan kolaborasi mahasiswa dengan Dosen Pembimbing.
          </p>
        </div>

        {/* 4 Cards Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS_LIST.map((step) => {
            const Icon = step.icon;
            const isSelected = activeStepTab === step.stepNumber;

            return (
              <div
                key={step.stepNumber}
                onClick={() => setActiveStepTab(step.stepNumber)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between border ${
                  isSelected
                    ? "bg-[#001f54] text-white border-[#001f54] shadow-xl shadow-blue-950/20 scale-[1.02]"
                    : "bg-slate-50 text-slate-900 hover:border-blue-300 hover:bg-white border-slate-200 shadow-sm"
                }`}
              >
                {/* Step badge counter */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-base ${
                        isSelected
                          ? "bg-white text-[#001f54] shadow-md"
                          : "bg-blue-100 text-[#001f54]"
                      }`}
                    >
                      0{step.stepNumber}
                    </span>

                    <div
                      className={`p-2.5 rounded-xl ${
                        isSelected ? "bg-white/10 text-cyan-300" : "bg-blue-50 text-[#0284c7]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3
                    className={`text-lg font-extrabold mb-3 ${
                      isSelected ? "text-white" : "text-[#0a1128]"
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Explicit Requirement Highlight */}
                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed font-bold mb-3 ${
                      isSelected
                        ? "bg-blue-900/60 border-blue-400/40 text-cyan-100"
                        : "bg-white border-blue-200 text-[#001f54] shadow-sm"
                    }`}
                  >
                    "{step.exactPointText}"
                  </div>

                  <p
                    className={`text-xs ${
                      isSelected ? "text-slate-200" : "text-slate-600"
                    }`}
                  >
                    {step.detail}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/40 flex items-center justify-between text-[11px] font-mono">
                  <span className={isSelected ? "text-cyan-300 font-bold" : "text-[#001f54] font-bold"}>
                    Tahap {step.stepNumber} dari 4
                  </span>
                  <span className={isSelected ? "text-slate-300" : "text-slate-500 font-semibold"}>
                    {step.stepNumber === 2 ? "Opsional" : "Direkomendasikan"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
