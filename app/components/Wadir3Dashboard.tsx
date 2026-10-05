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
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#001f54] text-white flex flex-col justify-between transition-transform duration-300 shadow-2xl ${
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
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
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

            <div className="relative">
              <button
                onClick={() => setNotificationsOpen((isOpen) => !isOpen)}
                aria-label="Buka notifikasi"
                aria-expanded={notificationsOpen}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 relative cursor-pointer"
              >
                <Bell className="w-5 h-5 text-[#001f54]" />
                {pendingCount > 0 && (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute top-2 right-2 border-2 border-white"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 z-40 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#0a1128]">Notifikasi</h3>
                      <p className="text-[11px] text-slate-500">Pengajuan yang perlu ditinjau</p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-extrabold text-amber-700">
                      {pendingCount} baru
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {submissions
                      .filter((submission) => submission.status === "Menunggu Approval")
                      .slice(0, 4)
                      .map((submission) => (
                        <button
                          key={submission.id}
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setNotificationsOpen(false);
                          }}
                          className="w-full border-b border-slate-100 px-4 py-3 text-left transition-colors hover:bg-slate-50"
                        >
                          <div className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                            <div className="min-w-0">
                              <p className="truncate text-xs font-bold text-slate-900">{submission.title}</p>
                              <p className="mt-0.5 text-[10px] font-mono text-slate-500">{submission.id} | {submission.date}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab("dashboard");
                      setNotificationsOpen(false);
                    }}
                    className="w-full bg-slate-50 px-4 py-3 text-center text-xs font-extrabold text-[#0284c7] transition-colors hover:bg-slate-100"
                  >
                    Lihat semua pengajuan
                  </button>
                </div>
              )}
            </div>
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
          ) : activeTab === "dashboard" ? (
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
          ) : activeTab === "surat" ? (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#0284c7]">Workflow Legalitas</p>
                  <h3 className="text-2xl font-extrabold text-[#0a1128] mt-1">Persetujuan Surat</h3>
                  <p className="text-sm text-slate-500 mt-1">Tinjau dan sahkan Surat Tugas serta Surat Dispensasi mahasiswa.</p>
                </div>
                <span className="w-fit rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs font-extrabold text-amber-800">{pendingCount} perlu tindakan</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Menunggu Approval</p><p className="text-3xl font-extrabold text-amber-600 mt-2">{pendingCount}</p><p className="text-[11px] text-slate-500 mt-1">Pengajuan aktif</p></div>
                <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Disetujui & Legal</p><p className="text-3xl font-extrabold text-emerald-600 mt-2">{approvedCount}</p><p className="text-[11px] text-slate-500 mt-1">Dokumen tersahkan</p></div>
                <div className="bg-white rounded-2xl border border-red-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Perlu Revisi</p><p className="text-3xl font-extrabold text-red-600 mt-2">{submissions.filter((sub) => sub.status === "Revisi").length}</p><p className="text-[11px] text-slate-500 mt-1">Dikembalikan ke jurusan</p></div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-200"><h4 className="text-base font-extrabold text-[#0a1128]">Antrean Persetujuan Surat</h4><p className="text-xs text-slate-500 mt-1">Klik review untuk melihat detail dan mengambil keputusan.</p></div>
                <div className="divide-y divide-slate-100">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50">
                      <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-xs font-bold text-[#0284c7]">{sub.id}</span><span className="rounded bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">{sub.type}</span></div><h5 className="font-extrabold text-sm text-slate-900 mt-2">{sub.title}</h5><p className="text-xs text-slate-500 mt-1">{sub.teamName} | {sub.date}</p></div>
                      <div className="flex items-center gap-3 shrink-0"><span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${sub.status === "Menunggu Approval" ? "bg-amber-50 text-amber-800" : sub.status === "Disetujui" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>{sub.status}</span><button onClick={() => setSelectedSubmission(sub)} className="px-3 py-2 rounded-lg bg-[#001f54] hover:bg-[#034078] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"><Eye className="w-3.5 h-3.5 text-cyan-300" />Review</button></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === "anggaran" ? (
            <div className="space-y-6 animate-fade-in">
              <div><p className="text-xs font-mono font-bold uppercase tracking-widest text-[#0284c7]">Kontrol Keuangan</p><h3 className="text-2xl font-extrabold text-[#0a1128] mt-1">Review Anggaran</h3><p className="text-sm text-slate-500 mt-1">Pantau usulan biaya lomba dan status persetujuan anggaran.</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5"><div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Total Anggaran Disetujui</p><p className="text-2xl font-extrabold text-emerald-700 mt-2">Rp 185.000.000</p><p className="text-[11px] text-slate-500 mt-1">Semester Ganjil 2026</p></div><div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Usulan Dalam Review</p><p className="text-2xl font-extrabold text-amber-600 mt-2">Rp 55.500.000</p><p className="text-[11px] text-slate-500 mt-1">{pendingCount} pengajuan pending</p></div><div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Rata-rata per Pengajuan</p><p className="text-2xl font-extrabold text-[#0284c7] mt-2">Rp 11.100.000</p><p className="text-[11px] text-slate-500 mt-1">Dari 5 pengajuan</p></div></div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"><div className="p-5 border-b border-slate-200"><h4 className="text-base font-extrabold text-[#0a1128]">Rincian Usulan Anggaran</h4></div><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-slate-50 text-slate-600"><tr><th className="p-4">Pengajuan</th><th className="p-4">Kegiatan</th><th className="p-4">Pengusul</th><th className="p-4">Nilai Usulan</th><th className="p-4">Status</th><th className="p-4">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">{submissions.map((sub) => <tr key={sub.id} className="hover:bg-slate-50"><td className="p-4 font-mono font-bold text-[#001f54]">{sub.id}</td><td className="p-4 font-bold text-slate-900 max-w-xs">{sub.title}</td><td className="p-4 text-slate-600">{sub.prodi} ({sub.jenjang})</td><td className="p-4 font-mono font-extrabold text-[#001f54]">{sub.budget}</td><td className="p-4"><span className={`font-bold ${sub.status === "Disetujui" ? "text-emerald-700" : sub.status === "Revisi" ? "text-red-700" : "text-amber-700"}`}>{sub.status}</span></td><td className="p-4"><button onClick={() => setSelectedSubmission(sub)} className="text-[#0284c7] font-extrabold hover:underline cursor-pointer">Review detail</button></td></tr>)}</tbody></table></div></div>
            </div>
          ) : activeTab === "monitoring" ? (
            <div className="space-y-6 animate-fade-in">
              <div><p className="text-xs font-mono font-bold uppercase tracking-widest text-purple-600">Pusat Monitoring</p><h3 className="text-2xl font-extrabold text-[#0a1128] mt-1">Monitoring Lomba</h3><p className="text-sm text-slate-500 mt-1">Pantau progres kegiatan lomba mahasiswa dari pengajuan hingga pelaporan.</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5"><div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Total Kegiatan 2026</p><p className="text-3xl font-extrabold text-[#001f54] mt-2">24</p><p className="text-[11px] text-emerald-600 font-bold mt-1">+18% dari semester lalu</p></div><div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Sedang Berlangsung</p><p className="text-3xl font-extrabold text-purple-700 mt-2">9</p><p className="text-[11px] text-slate-500 mt-1">Lintas nasional & internasional</p></div><div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Selesai Dilaporkan</p><p className="text-3xl font-extrabold text-emerald-700 mt-2">15</p><p className="text-[11px] text-slate-500 mt-1">Data capaian terverifikasi</p></div></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5"><div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 pb-3"><h4 className="font-extrabold text-[#0a1128]">Progres Tahapan</h4><PieChart className="w-5 h-5 text-purple-600" /></div>{[{ label: "Pengajuan & Verifikasi", value: 100, color: "bg-emerald-500" }, { label: "Pelaksanaan Lomba", value: 68, color: "bg-purple-500" }, { label: "Pelaporan Hasil", value: 42, color: "bg-amber-500" }].map((item) => <div key={item.label} className="mt-5"><div className="flex justify-between text-xs font-bold text-slate-700"><span>{item.label}</span><span>{item.value}%</span></div><div className="h-2 bg-slate-100 rounded-full mt-2 overflow-hidden"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} /></div></div>)}</div><div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"><h4 className="font-extrabold text-[#0a1128] border-b border-slate-100 pb-3">Kegiatan Terbaru</h4>{submissions.slice(0, 4).map((sub) => <div key={sub.id} className="flex items-center justify-between gap-3 py-4 border-b border-slate-100 last:border-0"><div className="min-w-0"><p className="text-xs font-extrabold text-slate-900 truncate">{sub.title}</p><p className="text-[11px] text-slate-500 mt-1">{sub.date} | {sub.prodi}</p></div><span className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded-full ${sub.status === "Disetujui" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{sub.status === "Disetujui" ? "Berjalan" : "Persiapan"}</span></div>)}</div></div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div><p className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600">Capaian Mahasiswa</p><h3 className="text-2xl font-extrabold text-[#0a1128] mt-1">Rekap Prestasi</h3><p className="text-sm text-slate-500 mt-1">Kompilasi prestasi mahasiswa yang telah diverifikasi oleh institusi.</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5"><div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Total Kejuaraan</p><p className="text-3xl font-extrabold text-amber-600 mt-2">112</p><p className="text-[11px] text-slate-500 mt-1">Tahun akademik 2026</p></div><div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Nasional</p><p className="text-3xl font-extrabold text-blue-700 mt-2">68</p><p className="text-[11px] text-slate-500 mt-1">Prestasi terverifikasi</p></div><div className="bg-white rounded-2xl border border-purple-200 p-5 shadow-sm"><p className="text-xs font-bold text-slate-500">Internasional</p><p className="text-3xl font-extrabold text-purple-700 mt-2">44</p><p className="text-[11px] text-slate-500 mt-1">Prestasi terverifikasi</p></div></div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"><div className="p-5 border-b border-slate-200 flex items-center justify-between"><div><h4 className="text-base font-extrabold text-[#0a1128]">Prestasi Terbaru</h4><p className="text-xs text-slate-500 mt-1">Daftar capaian yang siap masuk rekap institusi.</p></div><Award className="w-6 h-6 text-amber-500" /></div><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-slate-50 text-slate-600"><tr><th className="p-4">Mahasiswa / Tim</th><th className="p-4">Kompetisi</th><th className="p-4">Tingkat</th><th className="p-4">Capaian</th><th className="p-4">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{[{ team: "Tim Nexus Innovators", event: "Global Scientific Innovation Hackathon 2026", level: "Internasional", result: "Juara 1" }, { team: "Tim Nusantara EcoTech", event: "National Business Plan Championship 2026", level: "Nasional", result: "Juara 2" }, { team: "Tim Algoritmica Cyber", event: "National Big Data Challenge", level: "Nasional", result: "Finalis" }, { team: "Tim Robotics Poltek", event: "Olimpiade Nasional MIPA & Robotic Festival", level: "Nasional", result: "Juara 3" }].map((achievement) => <tr key={achievement.team} className="hover:bg-slate-50"><td className="p-4 font-extrabold text-slate-900">{achievement.team}</td><td className="p-4 text-slate-700 max-w-xs">{achievement.event}</td><td className="p-4"><span className={`px-2 py-1 rounded-full text-[10px] font-bold ${achievement.level === "Internasional" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>{achievement.level}</span></td><td className="p-4 font-extrabold text-[#001f54]">{achievement.result}</td><td className="p-4"><span className="inline-flex items-center gap-1 text-emerald-700 font-bold"><CheckCircle2 className="w-3.5 h-3.5" />Terverifikasi</span></td></tr>)}</tbody></table></div></div>
            </div>
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
