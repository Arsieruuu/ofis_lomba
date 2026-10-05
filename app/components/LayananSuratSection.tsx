"use client";

import React from "react";
import {
  FileText,
  FileCheck,
  Award,
  Users,
  Calendar,
  CheckCircle2,
  FilePlus2,
  Briefcase,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function LayananSuratSection({
  onOpenAuthModal,
}: {
  onOpenAuthModal: () => void;
}) {
  const LAYANAN_LIST = [
    {
      title: "Surat Tugas Lomba",
      icon: FileText,
      badge: "Alur Resmi",
      badgeColor: "bg-blue-50 text-[#001f54] border-blue-200",
      description:
        "Pengajuan Surat Tugas resmi untuk kompetisi akademik/non-akademik dengan rincian anggaran yang transparan.",
      points: [
        "Pemisahan rincian anggaran yang jelas",
        "Pemeriksaan berjenjang institusi",
        "Unduh surat legal secara mandiri setelah disetujui",
      ],
    },
    {
      title: "Surat Dispensasi Mahasiswa",
      icon: FilePlus2,
      badge: "Fitur Baru",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      description:
        "Surat ijin dispensasi kegiatan akademik/non-akademik atau agenda institusi yang memerlukan dispensasi perkuliahan.",
      points: [
        "Format terstandarisasi untuk mahasiswa & dosen",
        "Lampiran daftar peserta & Dosen Pembimbing otomatis",
        "Verifikasi cepat & terintegrasi",
      ],
    },
    {
      title: "Penyusunan CV / Portofolio (ATS & Kreatif)",
      icon: Briefcase,
      badge: "Integrasi Profil",
      badgeColor: "bg-purple-50 text-purple-900 border-purple-200",
      description:
        "Mahasiswa dapat menggenerasi CV / Portofolio akademik secara otomatis dari data rekap prestasi, organisasi, dan persentase penguasaan skill.",
      points: [
        "Format fleksibel (Kreatif atau ATS Friendly)",
        "Visualisasi skill (Bar chart & progress bar)",
        "Tarik data otomatis dari riwayat prestasi terdata",
      ],
    },
    {
      title: "Aturan Pelaporan Periode Lomba",
      icon: Calendar,
      badge: "Validasi Otomatis",
      badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
      description:
        "Sistem memastikan akuntabilitas dengan mewajibkan mahasiswa menyelesaikan pelaporan lomba periode sebelumnya sebelum mengajukan kegiatan baru.",
      points: [
        "Validasi periode semester Ganjil/Genap otomatis",
        "Mencegah penumpukan sisa laporan lama",
        "Monitoring real-time oleh Program Studi",
      ],
    },
  ];

  return (
    <section id="layanan-surat" className="py-20 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#001f54] px-4 py-1.5 rounded-full text-xs font-extrabold mb-3 uppercase tracking-wider shadow-sm">
            <FileCheck className="w-4 h-4 text-[#0284c7]" />
            <span>Fitur & Layanan Administrasi</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1128] tracking-tight">
            Layanan E-Office <span className="text-[#0284c7]">Terpadu</span>
          </h2>

          <p className="mt-4 max-w-2xl text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Memfasilitasi seluruh kebutuhan administrasi surat-menyurat, bimbingan proposal, hingga pelaporan prestasi mahasiswa secara efisien.
          </p>
        </div>

        {/* Layanan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LAYANAN_LIST.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[#001f54] group-hover:bg-[#001f54] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0a1128] mb-2 group-hover:text-[#0284c7] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-5">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Akses via SSO Kampus</span>
                  <button
                    onClick={onOpenAuthModal}
                    className="text-xs font-bold text-[#001f54] hover:text-[#0284c7] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ajukan Layanan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
