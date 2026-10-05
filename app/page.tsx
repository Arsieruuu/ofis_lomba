"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import UnauthenticatedHero from "./components/UnauthenticatedHero";
import StepByStepPengajuan from "./components/StepByStepPengajuan";
import LayananSuratSection from "./components/LayananSuratSection";
import JuaraTerbaru from "./components/JuaraTerbaru";
import StakeholderSection from "./components/StakeholderSection";
import ConnectModal from "./components/ConnectModal";
import Footer from "./components/Footer";
import Wadir3Dashboard from "./components/Wadir3Dashboard";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLoginSuccess = (role: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
  };

  const handleScrollToStep = () => {
    const element = document.getElementById("alur-pengajuan");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Render Wadir 3 Dashboard with Sidebar Nav when logged in as Wadir 3
  if (isLoggedIn && userRole.toLowerCase().includes("wadir 3")) {
    return <Wadir3Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenAuthModal={handleOpenAuthModal}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Sambutan Pengunjung Belum Login (Hero Section) */}
        <UnauthenticatedHero
          onOpenAuthModal={handleOpenAuthModal}
          onScrollToStep={handleScrollToStep}
        />

        {/* 2. Step by Step Pengajuan Lomba (4 Poin Pengajuan & Proposal Opsional) */}
        <StepByStepPengajuan />

        {/* 3. Layanan E-Office (Surat Tugas, Dispensasi, CV/Portofolio, Validasi Periode) */}
        <LayananSuratSection onOpenAuthModal={handleOpenAuthModal} />

        {/* 4. Rekapitulasi Juara & Prestasi Terbaru Mahasiswa */}
        <JuaraTerbaru />

        {/* 5. 6 Stakeholder Sistem E-Office */}
        <StakeholderSection />
      </main>

      {/* Connect & Login Modal Popup */}
      <ConnectModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
