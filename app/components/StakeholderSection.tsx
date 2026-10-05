"use client";

import React from "react";
import {
  UserCheck,
  GraduationCap,
  Building,
  UserCog,
  Landmark,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

export default function StakeholderSection() {
  const STAKEHOLDERS = [
    {
      role: "1. Mahasiswa",
      icon: GraduationCap,
      color: "bg-blue-50 text-[#001f54] border-blue-200",
      description:
        "Mengajukan perlombaan, mengunggah proposal draf awal (opsional), membentuk tim, mengurus Surat Tugas/Dispensasi, serta melaporkan hasil kegiatan & menyusun CV/Portofolio.",
    },
    {
      role: "2. Program Studi (Prodi)",
      icon: Building,
      color: "bg-indigo-50 text-indigo-900 border-indigo-200",
      description:
        "Melakukan validasi proposal/substansi & rincian anggaran, memonitoring status lomba berjalan/selesai per periode semester, serta memvalidasi sertifikat kejuaraan.",
    },
    {
      role: "3. Dosen Pembimbing",
      icon: UserCheck,
      color: "bg-emerald-50 text-emerald-900 border-emerald-200",
      description:
        "Membaca & meninjau proposal lomba yang diunggah mahasiswa, melihat data anggota tim, mengunduh surat tugas bimbingan, serta mengunggah sertifikat lomba.",
    },
    {
      role: "4. Admin Jurusan",
      icon: UserCog,
      color: "bg-purple-50 text-purple-900 border-purple-200",
      description:
        "Menangani administrasi surat-menyurat, meng-generate draf Surat Tugas resmi, memprioritaskan dokumen urgent pada dashboard, serta melakukan scan/upload berkas.",
    },
    {
      role: "5. Jurusan",
      icon: Landmark,
      color: "bg-amber-50 text-amber-900 border-amber-200",
      description:
        "Melakukan verifikasi persetujuan substansi surat tugas dan penentuan alokasi anggaran kegiatan sebelum diteruskan ke tahap akhir.",
    },
    {
      role: "6. Pimpinan Institusi",
      icon: ShieldAlert,
      color: "bg-rose-50 text-rose-900 border-rose-200",
      description:
        "Otoritas persetujuan & legalisasi akhir Surat Tugas dan Surat Dispensasi untuk penerbitan dokumen resmi.",
    },
  ];

  return (
    <section id="stakeholder" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#001f54] px-4 py-1.5 rounded-full text-xs font-extrabold mb-3 uppercase tracking-wider shadow-sm">
            <UserCheck className="w-4 h-4 text-[#0284c7]" />
            <span>Hak Akses & Alur Kerja</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1128] tracking-tight">
            6 Stakeholder <span className="text-[#0284c7]">Sistem E-Office</span>
          </h2>

          <p className="mt-4 max-w-2xl text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Setiap entitas pengguna memiliki peranan khusus dalam ekosistem validasi surat tugas, bimbingan, dan verifikasi prestasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STAKEHOLDERS.map((stk, idx) => {
            const Icon = stk.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-extrabold text-[#0a1128]">{stk.role}</span>
                    <div className={`p-2.5 rounded-xl border ${stk.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {stk.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Akses Terintegrasi SSO</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
