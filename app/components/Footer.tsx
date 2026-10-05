"use client";

import React from "react";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a1128] border-t border-blue-950 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-blue-950/80">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Shield className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-wider">
                OFIS<span className="text-cyan-400">LOMBA</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Portal pengajuan perlombaan, bimbingan proposal dosen, dan verifikasi sertifikat kejuaraan terintegrasi E-Office.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Navigasi Utama</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-cyan-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#juara" className="hover:text-cyan-300 transition-colors">
                  Juara Terbaru
                </a>
              </li>
              <li>
                <a href="#alur-pengajuan" className="hover:text-cyan-300 transition-colors">
                  Alur Pengajuan Proposal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Bantuan & Panduan</h4>
            <ul className="space-y-2">
              <li>
                <a href="#alur-pengajuan" className="hover:text-cyan-300 transition-colors">
                  Ketentuan Proposal Opsional
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-300 transition-colors">
                  Panduan Bimbingan Dosen
                </a>
              </li>
              <li>
                <a href="#layanan-surat" className="hover:text-cyan-300 transition-colors">
                  Layanan Surat & Legalisasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-slate-500">
            © 2026 OFIS LOMBA Portal. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Privasi</span>
            <span>Syarat & Ketentuan</span>
            <span>Kontak Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
