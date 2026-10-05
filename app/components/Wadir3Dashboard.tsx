"use client";

import React, { useState } from "react";
import {
  Building2,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Users,
  Award,
  Filter,
  Search,
  ChevronDown,
  LogOut,
  Bell,
  Menu,
  X,
  FileCheck,
  DollarSign,
  PieChart,
  ShieldCheck,
  Download,
  Eye,
  AlertCircle,
  Home,
  Layers,
  Settings,
  User,
  GraduationCap,
  Sparkles,
  Key,
  Shield,
  QrCode,
  Check,
} from "lucide-react";

interface Wadir3DashboardProps {
  onLogout: () => void;
}

interface SubmissionItem {
  id: string;
  type: "Surat Tugas" | "Surat Dispensasi";
  title: string;
  teamName: string;
  prodi: string;
  jurusan: string;
  jenjang: "D3" | "D4";
  supervisor: string;
  budget: string;
  date: string;
  status: "Menunggu Approval" | "Disetujui" | "Revisi";
  proposalUploaded: boolean;
}

const INITIAL_SUBMISSIONS: SubmissionItem[] = [
  {
    id: "SUB-2026-001",
    type: "Surat Tugas",
    title: "Global Scientific Innovation Hackathon 2026",
    teamName: "Tim Nexus Innovators (3 Mahasiswa)",
    prodi: "Teknik Informatika",
    jurusan: "Teknik Elektro",
    jenjang: "D4",
    supervisor: "Dr. Ir. Hendra Wijaya, M.T.",
    budget: "Rp 15.000.000",
    date: "04 Okt 2026",
    status: "Menunggu Approval",
    proposalUploaded: true,
  },
  {
    id: "SUB-2026-002",
    type: "Surat Dispensasi",
    title: "National Business Plan & EcoTech Championship 2026",
    teamName: "Tim Nusantara EcoTech (3 Mahasiswa)",
    prodi: "Manajemen",
    jurusan: "Akuntansi",
    jenjang: "D4",
    supervisor: "Prof. Dr. Rina Kartika, S.E., M.Si.",
    budget: "Rp 12.000.000",
    date: "03 Okt 2026",
    status: "Menunggu Approval",
    proposalUploaded: true,
  },
  {
    id: "SUB-2026-003",
    type: "Surat Tugas",
    title: "National Big Data & Predictive Analytics Challenge",
    teamName: "Tim Algoritmica Cyber (2 Mahasiswa)",
    prodi: "Sains Data",
    jurusan: "Teknik Elektro",
    jenjang: "D3",
    supervisor: "Budi Santoso, S.Kom., M.Sc.",
    budget: "Rp 8.500.000",
    date: "01 Okt 2026",
    status: "Disetujui",
    proposalUploaded: false,
  },
  {
    id: "SUB-2026-004",
    type: "Surat Dispensasi",
    title: "Olimpiade Nasional MIPA & Robotic Festival 2026",
    teamName: "Tim Robotics Poltek (4 Mahasiswa)",
    prodi: "Teknik Otomasi",
    jurusan: "Teknik Elektro",
    jenjang: "D4",
    supervisor: "Ir. Ahmad Dahlan, M.T.",
    budget: "Rp 20.000.000",
    date: "29 Sep 2026",
    status: "Menunggu Approval",
    proposalUploaded: true,
  },
  {
    id: "SUB-2026-005",
    type: "Surat Tugas",
    title: "UI/UX & Web3 App Design Competition 2026",
    teamName: "Tim Creative UX (2 Mahasiswa)",
    prodi: "Desain Grafis",
    jurusan: "Teknik Mesin",
    jenjang: "D3",
    supervisor: "Siti Rahma, S.Ds., M.Design",
    budget: "Rp 5.000.000",
    date: "27 Sep 2026",
    status: "Disetujui",
    proposalUploaded: true,
  },
];

export default function Wadir3Dashboard({ onLogout }: Wadir3DashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "surat" | "anggaran" | "monitoring" | "prestasi" | "profile"
  >("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(INITIAL_SUBMISSIONS);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionItem | null>(null);

  // Filters State
  const [filterProdi, setFilterProdi] = useState("Semua");
  const [filterJurusan, setFilterJurusan] = useState("Semua");
  const [filterJenjang, setFilterJenjang] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: "Disetujui" } : sub))
    );
    showToast(`Pengajuan ${id} berhasil disetujui & dilegalisasi Wadir 3.`);
    setSelectedSubmission(null);
  };

  const handleRevise = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: "Revisi" } : sub))
    );
    showToast(`Pengajuan ${id} dikembalikan ke Jurusan untuk revisi.`);
    setSelectedSubmission(null);
  };

  // Filtered Submissions
  const filteredList = submissions.filter((sub) => {
    const matchProdi = filterProdi === "Semua" || sub.prodi === filterProdi;
    const matchJurusan = filterJurusan === "Semua" || sub.jurusan === filterJurusan;
    const matchJenjang = filterJenjang === "Semua" || sub.jenjang === filterJenjang;
    const matchSearch =
      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchProdi && matchJurusan && matchJenjang && matchSearch;
  });

  const pendingCount = submissions.filter((s) => s.status === "Menunggu Approval").length;
  const approvedCount = submissions.filter((s) => s.status === "Disetujui").length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex font-sans selection:bg-[#0284c7] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#001f54] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-cyan-400 flex items-center gap-3 animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-cyan-300 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
        ></div>
      )}

      {/* SIDEBAR NAVIGATION (NAVSIDE) */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-[#001f54] text-white flex flex-col justify-between transition-transform duration-300 shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Sidebar Header / Brand */}
          <div className="p-6 border-b border-blue-900/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284c7] to-cyan-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#001f54] rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-cyan-300" />
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-wider leading-none text-white">
                  E-OFFICE <span className="text-cyan-400">LOMBA</span>
                </h1>
                <span className="text-[10px] font-mono text-cyan-200 font-semibold tracking-wider">
                  PORTAL WADIR III
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navside Menu List */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
              Menu Utama Wadir 3
            </div>

            <button
              onClick={() => {
                setActiveTab("dashboard");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "dashboard"
                  ? "bg-[#0284c7] text-white shadow-lg shadow-sky-950/40"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4.5 h-4.5 text-cyan-300" />
                <span>Dashboard Ringkasan</span>
              </div>
              {pendingCount > 0 && (
                <span className="bg-amber-400 text-amber-950 text-[10px] px-2 py-0.5 rounded-full font-mono font-extrabold">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("surat");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "surat"
                  ? "bg-[#0284c7] text-white shadow-lg shadow-sky-950/40"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileCheck className="w-4.5 h-4.5 text-emerald-400" />
                <span>Persetujuan Surat</span>
              </div>
              <span className="text-[10px] font-mono text-slate-300">Approval</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("anggaran");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "anggaran"
                  ? "bg-[#0284c7] text-white shadow-lg shadow-sky-950/40"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-4.5 h-4.5 text-amber-300" />
                <span>Review Anggaran</span>
              </div>
              <span className="text-[10px] font-mono text-slate-300">Terintegrasi</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("monitoring");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "monitoring"
                  ? "bg-[#0284c7] text-white shadow-lg shadow-sky-950/40"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <PieChart className="w-4.5 h-4.5 text-purple-300" />
                <span>Monitoring Lomba</span>
              </div>
              <span className="text-[10px] font-mono text-slate-300">Filter</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("prestasi");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "prestasi"
                  ? "bg-[#0284c7] text-white shadow-lg shadow-sky-950/40"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-4.5 h-4.5 text-amber-400" />
                <span>Rekap Prestasi</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab("profile");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "profile"
                  ? "bg-[#0284c7] text-white shadow-lg shadow-sky-950/40"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4.5 h-4.5 text-cyan-300" />
                <span>Profil Wadir III</span>
              </div>
              <span className="text-[10px] font-mono text-slate-300">Akun</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-blue-900/80 bg-[#001845]">
          <div
            onClick={() => {
              setActiveTab("profile");
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 mb-3 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-extrabold text-sm">
              W3
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-extrabold text-white truncate">Dr. Ir. Bambang S., M.T.</h4>
              <p className="text-[10px] text-cyan-300 truncate font-mono">Wakil Direktur III</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full py-2 rounded-xl bg-white/10 hover:bg-red-600/90 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar ke Portal Utama</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <h2 className="text-xl font-extrabold text-[#0a1128] capitalize">
                {activeTab === "dashboard"
                  ? "Dashboard Ringkasan Wadir III"
                  : activeTab === "surat"
                  ? "Persetujuan Surat Tugas & Dispensasi"
                  : activeTab === "anggaran"
                  ? "Review Anggaran Kegiatan Mahasiswa"
                  : activeTab === "monitoring"
                  ? "Monitoring Perlombaan Mahasiswa"
                  : activeTab === "prestasi"
                  ? "Rekapitulasi Prestasi Terverifikasi"
                  : "Profil & Otoritas Wadir III"}
              </h2>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Otoritas Pengesahan Akhir Legalisasi E-Office Kemahasiswaan
              </p>
            </div>
          </div>

          {/* Top Header Actions */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Cari pengajuan, tim, prodi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={() => setActiveTab("profile")}
              className={`p-2 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-[#001f54] text-white border-[#001f54]"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
              }`}
            >
              <User className="w-4 h-4 text-[#0284c7]" />
              <span className="hidden md:inline">Profil Wadir III</span>
            </button>

            <button className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 relative">
              <Bell className="w-5 h-5 text-[#001f54]" />
              {pendingCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute top-2 right-2 border-2 border-white"></span>
              )}
            </button>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="p-4 sm:p-8 space-y-8 flex-1 overflow-y-auto">
          {activeTab === "profile" ? (
            /* PROFIL WADIR III VIEW */
            <div className="space-y-6 animate-fade-in">
              {/* Profile Header Banner */}
              <div className="bg-gradient-to-r from-[#001f54] via-[#034078] to-[#0284c7] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-cyan-300/40 backdrop-blur-md flex items-center justify-center text-cyan-300 font-extrabold text-3xl shadow-inner">
                      BS
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-cyan-400/20 border border-cyan-300/30 text-cyan-200 px-3 py-1 rounded-full text-xs font-mono font-bold mb-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Sertifikat Digital Legalisasi Aktif</span>
                      </div>
                      <h2 className="text-2xl font-extrabold">Dr. Ir. Bambang Setyono, M.T.</h2>
                      <p className="text-sm text-cyan-100 font-mono mt-0.5">
                        NIP: 197801012002121001 | Wakil Direktur III (Bidang Kemahasiswaan)
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast("Perubahan data profil disimpan.")}
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#001f54] font-extrabold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    Simpan Perubahan Profil
                  </button>
                </div>
              </div>

              {/* Profile Main Details & Digital Signature Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Data Utama */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User className="w-5 h-5 text-[#0284c7]" />
                    <h3 className="text-base font-extrabold text-[#0a1128]">Informasi Data Diri Pejabat</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">NIP Pejabat Institusi</label>
                      <input
                        type="text"
                        readOnly
                        value="197801012002121001"
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Nama Lengkap & Gelar</label>
                      <input
                        type="text"
                        defaultValue="Dr. Ir. Bambang Setyono, M.T."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-[#0284c7]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Jabatan Resmi</label>
                      <input
                        type="text"
                        readOnly
                        value="Wakil Direktur III (Kemahasiswaan & Alumni)"
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Email Institusi Resmi</label>
                      <input
                        type="email"
                        defaultValue="wadir3@politeknik.ac.id"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-[#0284c7]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Nomor Kontak WhatsApp</label>
                      <input
                        type="text"
                        defaultValue="+62 812-3456-7890"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-[#0284c7]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Gedung / Unit Kerja</label>
                      <input
                        type="text"
                        defaultValue="Gedung Rektorat Lt. 2 - Ruang Wadir 3"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-[#0284c7]"
                      />
                    </div>
                  </div>
                </div>

                {/* Digital Signature & Verification Box */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-extrabold text-[#0a1128]">Tanda Tangan Digital</h3>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                    <div className="w-24 h-24 mx-auto bg-white border border-emerald-300 rounded-xl p-2 flex flex-col items-center justify-center shadow-sm">
                      <span className="text-[9px] font-mono text-emerald-900 font-extrabold">E-OFFICE BS</span>
                      <QrCode className="w-10 h-10 text-[#001f54] my-1" />
                      <span className="text-[8px] font-mono text-slate-500">VERIFIED BY W3</span>
                    </div>

                    <div>
                      <h4 className="text-xs font-extrabold text-emerald-900">E-Sign Legalisasi Terdaftar</h4>
                      <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
                        Digunakan otomatis untuk pengesahan Surat Tugas & Surat Dispensasi mahasiswa.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>Status Otoritas:</span>
                      <span className="font-extrabold text-emerald-700 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Aktif & Lengkap</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Masa Berlaku Sertifikat:</span>
                      <span className="font-mono font-bold text-slate-800">31 Des 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* STATISTIC SUMMARY CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Butuh Approval Wadir 3
                    </span>
                    <div className="text-2xl font-extrabold text-[#001f54] mt-1">
                      {pendingCount} Pengajuan
                    </div>
                    <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Perlu Tindakan Anda</span>
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Surat Tugas & Dispensasi
                    </span>
                    <div className="text-2xl font-extrabold text-emerald-700 mt-1">
                      {approvedCount} Disetujui
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Dilegalisasi Resmi</span>
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <FileCheck className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Total Anggaran Disetujui
                    </span>
                    <div className="text-2xl font-extrabold text-[#0284c7] mt-1">
                      Rp 185.000.000
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
                      Periode Semester Ganjil 2026
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0284c7]">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Prestasi Mahasiswa
                    </span>
                    <div className="text-2xl font-extrabold text-purple-700 mt-1">
                      112 Kejuaraan
                    </div>
                    <span className="text-[11px] text-purple-600 font-semibold mt-1 block">
                      Nasional & Internasional
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* FILTER DATA CONTROL BAR (As in Revisi coy.pdf: Filter Prodi, Jurusan, Jenjang D3/D4) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#0284c7]" />
                    <h3 className="text-sm font-extrabold text-[#0a1128]">
                      Filter Multi-Kriteria Pengajuan
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    Sesuai Notulensi Revisi E-Office
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Filter Prodi */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Program Studi (Prodi)
                    </label>
                    <select
                      value={filterProdi}
                      onChange={(e) => setFilterProdi(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0284c7]"
                    >
                      <option value="Semua">Semua Prodi</option>
                      <option value="Teknik Informatika">Teknik Informatika</option>
                      <option value="Sistem Informasi">Sistem Informasi</option>
                      <option value="Manajemen">Manajemen</option>
                      <option value="Sains Data">Sains Data</option>
                      <option value="Teknik Otomasi">Teknik Otomasi</option>
                    </select>
                  </div>

                  {/* Filter Jurusan */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Jurusan
                    </label>
                    <select
                      value={filterJurusan}
                      onChange={(e) => setFilterJurusan(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0284c7]"
                    >
                      <option value="Semua">Semua Jurusan</option>
                      <option value="Teknik Elektro">Teknik Elektro</option>
                      <option value="Akuntansi">Akuntansi</option>
                      <option value="Teknik Mesin">Teknik Mesin</option>
                    </select>
                  </div>

                  {/* Filter Jenjang D3 / D4 */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Jenjang Pendidikan
                    </label>
                    <select
                      value={filterJenjang}
                      onChange={(e) => setFilterJenjang(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0284c7]"
                    >
                      <option value="Semua">Semua Jenjang (D3 & D4)</option>
                      <option value="D3">Diploma 3 (D3)</option>
                      <option value="D4">Sarjana Terapan (D4)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* TABLE OF SUBMISSIONS NEEDING APPROVAL */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0a1128]">
                      Daftar Pengajuan Surat Tugas & Anggaran Lomba
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Menampilkan {filteredList.length} data pengajuan berdasarkan filter aktif.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Status:</span>
                    <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg font-bold">
                      {pendingCount} Menunggu Wadir 3
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                        <th className="p-4">ID & Jenis Surat</th>
                        <th className="p-4">Nama Lomba / Kegiatan</th>
                        <th className="p-4">Prodi / Jurusan (Jenjang)</th>
                        <th className="p-4">Dosen Pembimbing</th>
                        <th className="p-4">Usulan Anggaran</th>
                        <th className="p-4">Status Approval</th>
                        <th className="p-4 text-center">Aksi Wadir 3</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                      {filteredList.map((sub) => (
                        <tr key={sub.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="p-4">
                            <div className="font-mono font-bold text-[#001f54]">{sub.id}</div>
                            <span
                              className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                                sub.type === "Surat Tugas"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {sub.type}
                            </span>
                          </td>

                          <td className="p-4 max-w-xs">
                            <div className="font-extrabold text-slate-900 leading-snug">{sub.title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{sub.teamName}</div>
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-slate-900">{sub.prodi}</div>
                            <div className="text-[11px] text-slate-500">
                              {sub.jurusan} <span className="font-mono font-bold text-[#0284c7]">({sub.jenjang})</span>
                            </div>
                          </td>

                          <td className="p-4 font-semibold text-slate-800">{sub.supervisor}</td>

                          <td className="p-4 font-mono font-extrabold text-[#001f54]">{sub.budget}</td>

                          <td className="p-4">
                            {sub.status === "Menunggu Approval" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-800 border border-amber-300">
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                <span>Menunggu Wadir 3</span>
                              </span>
                            ) : sub.status === "Disetujui" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Disetujui & Legal</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-red-50 text-red-800 border border-red-300">
                                <XCircle className="w-3.5 h-3.5 text-red-600" />
                                <span>Revisi Jurusan</span>
                              </span>
                            )}
                          </td>

                          <td className="p-4 text-center">
                            <button
                              onClick={() => setSelectedSubmission(sub)}
                              className="px-3 py-1.5 rounded-lg bg-[#001f54] hover:bg-[#034078] text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5 mx-auto"
                            >
                              <Eye className="w-3.5 h-3.5 text-cyan-300" />
                              <span>Review & Detail</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* APPROVAL & REVIEW MODAL FOR WADIR 3 */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white border border-slate-200 text-slate-900 max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[#001f54]">
                  <FileCheck className="w-6 h-6 text-[#0284c7]" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#0284c7] font-bold uppercase tracking-widest">
                    Review Legalisasi Wadir III - {selectedSubmission.id}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0a1128] mt-0.5">
                    {selectedSubmission.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg bg-slate-100 font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Approval Workflow */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-600 block mb-3">
                Alur Validasi Dokumen (Sesuai Notulensi E-Office):
              </span>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Prodi</span>
                </div>
                <div className="h-0.5 w-8 bg-emerald-500"></div>
                <div className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Admin Jurusan</span>
                </div>
                <div className="h-0.5 w-8 bg-emerald-500"></div>
                <div className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Jurusan</span>
                </div>
                <div className="h-0.5 w-8 bg-amber-500"></div>
                <div className="flex items-center gap-1 text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Wadir 3 (Final)</span>
                </div>
              </div>
            </div>

            {/* Submission Detail Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold">Tim & Mahasiswa:</span>
                <p className="font-bold text-slate-900 mt-0.5">{selectedSubmission.teamName}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold">Prodi / Jurusan / Jenjang:</span>
                <p className="font-bold text-slate-900 mt-0.5">
                  {selectedSubmission.prodi} - {selectedSubmission.jurusan} ({selectedSubmission.jenjang})
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold">Dosen Pembimbing:</span>
                <p className="font-bold text-[#001f54] mt-0.5">{selectedSubmission.supervisor}</p>
              </div>

              <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-slate-600 font-semibold">Usulan Rincian Anggaran:</span>
                <p className="font-extrabold text-[#001f54] text-sm mt-0.5">
                  {selectedSubmission.budget}
                </p>
              </div>
            </div>

            {/* Proposal Document Preview Note */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Proposal Lomba: {selectedSubmission.proposalUploaded ? "Tersedia (.pdf)" : "Belum Diunggah (Opsional)"}</span>
              </div>
              {selectedSubmission.proposalUploaded && (
                <button className="text-[11px] bg-emerald-700 text-white px-3 py-1 rounded-lg font-bold flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Proposal</span>
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Tutup
              </button>

              <button
                onClick={() => handleRevise(selectedSubmission.id)}
                className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-4 h-4 text-red-600" />
                <span>Kembalikan ke Jurusan (Revisi)</span>
              </button>

              <button
                onClick={() => handleApprove(selectedSubmission.id)}
                className="px-5 py-2.5 rounded-xl bg-[#001f54] hover:bg-[#034078] text-white font-extrabold text-xs shadow-md flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                <span>Setujui & Legalisasi Surat Final</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
