"use client";
import { useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // Jeden useState na každú kartu/benefit
  const [benefitStyle, setBenefitStyle] = useState({});
  const [doktorStyle, setDoktorStyle] = useState({});
  const [pacientStyle, setPacientStyle] = useState({});

  // Funkcie na tilt pre benefit kartu
  const handleBenefitMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * 10;
    const rotateY = ((x - midX) / midX) * -10;
    setBenefitStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
      transition: "transform 0.1s cubic-bezier(.17,.67,.83,.67)"
    });
  };
  const handleBenefitLeave = () => {
    setBenefitStyle({
      transform: "rotateX(0) rotateY(0) scale(1)",
      transition: "transform 0.3s cubic-bezier(.17,.67,.83,.67)"
    });
  };

  // Funkcie na tilt pre karty
  const handleDoktorMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * 10;
    const rotateY = ((x - midX) / midX) * -10;
    setDoktorStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
      transition: "transform 0.1s cubic-bezier(.17,.67,.83,.67)"
    });
  };
  const handleDoktorLeave = () => {
    setDoktorStyle({
      transform: "rotateX(0) rotateY(0) scale(1)",
      transition: "transform 0.3s cubic-bezier(.17,.67,.83,.67)"
    });
  };

  const handlePacientMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * 10;
    const rotateY = ((x - midX) / midX) * -10;
    setPacientStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
      transition: "transform 0.1s cubic-bezier(.17,.67,.83,.67)"
    });
  };
  const handlePacientLeave = () => {
    setPacientStyle({
      transform: "rotateX(0) rotateY(0) scale(1)",
      transition: "transform 0.3s cubic-bezier(.17,.67,.83,.67)"
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/doktor.png"
          alt="Pozadie doktor"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Glassmorphism benefit karta */}
        <div
          className="
            w-full max-w-4xl mx-auto mb-10 mt-14
            rounded-3xl shadow-2xl border border-white/40 dark:border-black/40
            backdrop-blur-xl bg-white/40 dark:bg-black/30
            flex flex-wrap md:flex-nowrap justify-center items-center gap-6 p-8
            select-none transition-transform
          "
          style={benefitStyle}
          onMouseMove={handleBenefitMove}
          onMouseLeave={handleBenefitLeave}
        >
          <span className="font-semibold text-lg md:text-xl text-gray-900 dark:text-gray-100 px-2">
            Rýchle konzultácie
          </span>
          <span className="hidden md:block text-2xl opacity-30">·</span>
          <span className="font-semibold text-lg md:text-xl text-gray-900 dark:text-gray-100 px-2">
            100% anonymita
          </span>
          <span className="hidden md:block text-2xl opacity-30">·</span>
          <span className="font-semibold text-lg md:text-xl text-gray-900 dark:text-gray-100 px-2">
            Rychli kontakt s doktorom
          </span>
          <span className="hidden md:block text-2xl opacity-30">·</span>
          <span className="font-semibold text-lg md:text-xl text-gray-900 dark:text-gray-100 px-2">
            Archív konzultácií
          </span>
        </div>

        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12 mt-4 mb-12">
          {/* SEKCIA DOKTOR */}
          <Link
            href="/doktor"
            className="flex-1 relative rounded-3xl shadow-2xl border border-white/30 dark:border-black/40 min-h-[340px] flex flex-col items-center justify-center overflow-hidden group p-0 transition-transform"
            style={doktorStyle}
            onMouseMove={handleDoktorMove}
            onMouseLeave={handleDoktorLeave}
          >
            <Image
              src="/images/doktor2.png"
              alt="Doktor"
              fill
              className="object-cover object-center"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-white/80 dark:bg-black/60 group-hover:bg-white/70 transition" />
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12">
              <div className="text-3xl md:text-4xl font-bold mb-4 text-green-700 text-center group-hover:text-green-800 transition">
                Sekcia doktor
              </div>
              <div className="text-lg text-gray-800 dark:text-gray-200 text-center">
                Spravujte konzultácie, odpovedajte pacientom a majte prehľad o prípadoch.
              </div>
            </div>
          </Link>

          {/* SEKCIA PACIENT */}
          <Link
            href="/pacient"
            className="flex-1 relative rounded-3xl shadow-2xl border border-white/30 dark:border-black/40 min-h-[340px] flex flex-col items-center justify-center overflow-hidden group p-0 transition-transform"
            style={pacientStyle}
            onMouseMove={handlePacientMove}
            onMouseLeave={handlePacientLeave}
          >
            <Image
              src="/images/pacient.png"
              alt="Pacient"
              fill
              className="object-cover object-center"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-white/80 dark:bg-black/60 group-hover:bg-white/70 transition" />
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12">
              <div className="text-3xl md:text-4xl font-bold mb-4 text-blue-700 text-center group-hover:text-blue-800 transition">
                Sekcia pacient
              </div>
              <div className="text-lg text-gray-800 dark:text-gray-200 text-center">
                Odošlite symptómy, nahrajte fotky a sledujte históriu konzultácií s lekárom.
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

