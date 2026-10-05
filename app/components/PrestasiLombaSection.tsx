"use client";

import React, { useState } from "react";
import {
  Compass,
  Award,
  Search,
  Filter,
  Calendar,
  Users,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Tag,
  CheckCircle,
} from "lucide-react";

interface LombaItem {
  id: string;
  title: string;
  category: string;
  deadline: string;
  level: "Nasional" | "Internasional" | "Regional";
  organizer: string;
  prizePool: string;
  tags: string[];
  status: "Pendaftaran Buka" | "Mendekati Deadline" | "Segera Hadir";
}

const SAMPLE_LOMBA: LombaItem[] = [
  {
    id: "l1",
    title: "National Hackathon Competition Web3 & AI 2026",
    category: "Teknologi",
    deadline: "25 Oktober 2026",
    level: "Nasional",
    organizer: "Himpunan Mahasiswa Informatika & Web3 Alliance",
    prizePool: "Rp 50.000.000",
    tags: ["Hackathon", "Smart Contract", "AI"],
    status: "Pendaftaran Buka",
  },
  {
    id: "l2",
    title: "International Scientific Paper & Essay Contest 2026",
    category: "KTI / Karya Tulis",
    deadline: "10 November 2026",
    level: "Internasional",
    organizer: "ASEAN Youth Scientific Forum",
    prizePool: "USD 3,500 + Certificate",
    tags: ["Karya Tulis", "Riset", "Inovasi"],
    status: "Pendaftaran Buka",
  },
  {
    id: "l3",
    title: "National Business Model Canvas & Startup Challenge",
    category: "Bisnis",
    deadline: "18 Oktober 2026",
    level: "Nasional",
    organizer: "Incubator Center Kampus",
    prizePool: "Rp 30.000.000",
    tags: ["Startup", "Business Plan"],
    status: "Mendekati Deadline",
  },
  {
    id: "l4",
    title: "UI/UX & Web3 App Design Competition 2026",
    category: "Desain",
    deadline: "05 November 2026",
    level: "Nasional",
    organizer: "Design Guild Community",
    prizePool: "Rp 15.000.000",
    tags: ["UI/UX", "Figma", "Web3 Design"],
    status: "Pendaftaran Buka",
  },
];

export default function PrestasiLombaSection({
  onOpenAuthModal,
}: {
  onOpenAuthModal: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Semua", "Teknologi", "KTI / Karya Tulis", "Bisnis", "Desain"];

  const filteredLomba = SAMPLE_LOMBA.filter((l) => {
    const matchCat = selectedCategory === "Semua" || l.category === selectedCategory;
    const matchSearch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section id="lomba" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#001f54] px-3.5 py-1 rounded-full text-xs font-bold mb-3">
              <Compass className="w-4 h-4 text-[#0284c7]" />
              <span>Katalog Perlombaan Aktif</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1128] tracking-tight">
              Eksplorasi <span className="text-[#0284c7]">Kompetisi Lomba</span>
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl font-medium">
              Cari dan ikuti kompetisi tingkat nasional maupun internasional yang relevan dengan bidang studi Anda.
            </p>
          </div>

          {/* Search Bar & Filter Tabs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari lomba atau keyword..."
                className="w-full bg-white text-xs text-slate-900 placeholder-slate-400 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#001f54] shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#001f54] text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Competition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLomba.map((lomba) => (
            <div
              key={lomba.id}
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#001f54] border border-blue-200 px-2.5 py-0.5 rounded-full">
                    {lomba.level}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      lomba.status === "Mendekati Deadline"
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    }`}
                  >
                    {lomba.status}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#0a1128] group-hover:text-[#0284c7] transition-colors leading-snug">
                  {lomba.title}
                </h3>

                <p className="text-xs text-slate-500 mt-2 line-clamp-1 font-medium">{lomba.organizer}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700 font-semibold">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-normal">Total Hadiah:</span>
                    <span className="font-extrabold text-emerald-700">{lomba.prizePool}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-normal">Batas Akhir:</span>
                    <span className="font-mono text-[#001f54] font-bold">{lomba.deadline}</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {lomba.tags.map((t) => (
                    <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={onOpenAuthModal}
                  className="w-full py-2.5 rounded-xl bg-[#001f54] hover:bg-[#034078] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <span>Ajukan Lomba Ini</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
