"use client";

import React, { useState } from "react";
import {
  Trophy,
  Medal,
  User,
  Users,
  Building,
  Sparkles,
} from "lucide-react";

interface WinnerCard {
  id: string;
  rank: "Juara 1" | "Juara 2" | "Juara 3";
  rankBadgeColor: string;
  competitionTitle: string;
  category: string;
  organizer: string;
  teamName: string;
  members: string[];
  supervisor: string;
  date: string;
  description: string;
}

const WINNERS_DATA: WinnerCard[] = [
  {
    id: "1",
    rank: "Juara 1",
    rankBadgeColor: "text-amber-900 border-amber-300 bg-amber-100",
    competitionTitle: "Global Scientific Innovation Hackathon 2026",
    category: "Akademik - Teknologi",
    organizer: "Southeast Asia Tech Federation & Kemendikbudristek",
    teamName: "Tim Nexus Innovators",
    members: ["Ahmad Rizky (Informatika)", "Siti Nurhaliza (Sistem Informasi)", "Fajar Ramadhan (DKV)"],
    supervisor: "Dr. Ir. Hendra Wijaya, M.T. (NIP. 198204122005011002)",
    date: "28 September 2026",
    description:
      "Pengembangan sistem e-governance layanan administrasi publik dengan proteksi otentikasi ganda.",
  },
  {
    id: "2",
    rank: "Juara 1",
    rankBadgeColor: "text-amber-900 border-amber-300 bg-amber-100",
    competitionTitle: "National Business Plan & EcoTech Championship 2026",
    category: "Akademik - Bisnis",
    organizer: "Kementerian Pendidikan, Kebudayaan, Riset & Teknologi",
    teamName: "Tim Nusantara EcoTech",
    members: ["Bagas Pratama (Manajemen)", "Anisa Putri (Akuntansi)", "Dedi Kurniawan (Teknik Kimia)"],
    supervisor: "Prof. Dr. Rina Kartika, S.E., M.Si. (NIP. 197509152001122001)",
    date: "15 September 2026",
    description:
      "Model bisnis pengelolaan daur ulang sampah terpadu dengan platform marketplace.",
  },
  {
    id: "3",
    rank: "Juara 2",
    rankBadgeColor: "text-slate-800 border-slate-300 bg-slate-100",
    competitionTitle: "National Big Data & Predictive Analytics Challenge 2026",
    category: "Akademik - Sains Data",
    organizer: "Indonesian Data Science Association",
    teamName: "Tim Algoritmica Cyber",
    members: ["Kevin Sanjaya (Sains Data)", "Maya Indah (Matematika)"],
    supervisor: "Budi Santoso, S.Kom., M.Sc. (NIP. 198903202015041003)",
    date: "02 September 2026",
    description:
      "Pengembangan model komputasi presisi tinggi untuk memprediksi tren komoditas pangan.",
  },
];

export default function JuaraTerbaru() {
  const [selectedWinner, setSelectedWinner] = useState<WinnerCard | null>(null);

  return (
    <section
      id="juara"
      className="relative py-16 bg-slate-50 border-b border-slate-200 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-900 px-3.5 py-1 rounded-full text-xs font-extrabold mb-3 uppercase tracking-wider shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Prestasi Mahasiswa</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1128] tracking-tight">
            Juara Perlombaan <span className="text-[#0284c7]">Terbaru</span>
          </h2>

          <p className="mt-2.5 max-w-xl text-slate-600 text-sm font-medium">
            Rekap kejuaraan nasional & internasional mahasiswa terverifikasi di E-Office.
          </p>
        </div>

        {/* 3 Winner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WINNERS_DATA.map((winner) => (
            <div
              key={winner.id}
              className="group relative rounded-2xl bg-white text-slate-900 p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1 border border-slate-200/90"
            >
              {/* Card Header Top Badge */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${winner.rankBadgeColor} shadow-sm`}
                  >
                    <Medal className="w-3.5 h-3.5 text-amber-600" />
                    <span>{winner.rank}</span>
                  </span>

                  <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 font-semibold truncate max-w-[150px]">
                    {winner.category}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#0a1128] leading-snug group-hover:text-[#0284c7] transition-colors">
                  {winner.competitionTitle}
                </h3>

                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{winner.organizer}</span>
                </p>

                {/* Team & Members */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-extrabold text-[#001f54]">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#0284c7]" />
                      <span>{winner.teamName}</span>
                    </span>
                    <span className="text-[10px] bg-blue-100 text-[#001f54] px-2 py-0.5 rounded font-mono font-bold">
                      {winner.members.length} Anggota
                    </span>
                  </div>

                  <ul className="text-xs text-slate-600 space-y-1 pl-1">
                    {winner.members.map((m, i) => (
                      <li key={i} className="flex items-center gap-2 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"></span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dosen Pembimbing Info */}
                <div className="mt-3 p-3 rounded-xl bg-blue-50/70 border border-blue-100">
                  <div className="text-[11px] uppercase tracking-wider font-extrabold text-[#001f54] flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#0284c7]" />
                    <span>Dosen Pembimbing:</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">
                    {winner.supervisor}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-4 border-t border-slate-200/80">
                <button
                  onClick={() => setSelectedWinner(winner)}
                  className="w-full py-2.5 rounded-xl bg-[#001f54] hover:bg-[#034078] text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Lihat Detail Sertifikat & Berkas</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail */}
        {selectedWinner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
            <div className="bg-white border border-slate-200 text-slate-900 max-w-xl w-full rounded-2xl p-6 shadow-2xl relative space-y-4">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-600">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#0284c7] font-bold uppercase tracking-widest">
                      Detail Prestasi
                    </span>
                    <h3 className="text-lg font-extrabold text-[#0a1128] mt-0.5">
                      {selectedWinner.rank} - {selectedWinner.competitionTitle}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedWinner(null)}
                  className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg bg-slate-100 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-medium">
                  {selectedWinner.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-xs font-semibold">Penyelenggara:</span>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedWinner.organizer}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-xs font-semibold">Dosen Pembimbing:</span>
                    <p className="font-bold text-[#001f54] mt-0.5">{selectedWinner.supervisor}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedWinner(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#001f54] hover:bg-[#034078] text-white font-bold text-xs shadow-md"
                >
                  Tutup Rincian
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
