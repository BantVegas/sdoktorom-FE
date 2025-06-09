"use client";
import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Users, Mail, Stethoscope, Video } from "lucide-react"; // ← pridaj Video

export default function DoctorSection() {
  // Fake login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
    }
  }

  if (!isLoggedIn) {
    // Prihlásenie doktora
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Prihlásenie doktora</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="E-mail"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
              value={loginForm.email}
              onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
            />
            <input
              type="password"
              required
              placeholder="Heslo"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
              value={loginForm.password}
              onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
            />
            <button
              type="submit"
              className="bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition"
            >
              Prihlásiť sa
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Rozšírené dlaždice o Videohovory
  const tiles = [
    {
      title: "Zoznam pacientov",
      description: "Kompletný prehľad vašich pacientov.",
      icon: <Users className="w-10 h-10 text-blue-700" />,
      href: "/doktor/pacienti"
    },
    {
      title: "Správy od pacientov",
      description: "Prečítajte si a odpovedzte na nové správy.",
      icon: <Mail className="w-10 h-10 text-green-700" />,
      href: "/doktor/spravy"
    },
    {
      title: "Rezervované termíny",
      description: "Pozrite si svoje nadchádzajúce konzultácie.",
      icon: <CalendarDays className="w-10 h-10 text-yellow-600" />,
      href: "/doktor/terminy"
    },
    {
      title: "Moje konzultácie",
      description: "Spravujte prebiehajúce a ukončené konzultácie.",
      icon: <Stethoscope className="w-10 h-10 text-purple-700" />,
      href: "/doktor/konzultacie"
    },
    {
      title: "Videohovory",
      description: "Spustite videohovor s pacientom priamo z konzultácie.",
      icon: <Video className="w-10 h-10 text-pink-600" />,
      href: "/doktor/videohovory" // route podľa tvojej architektúry
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900 dark:text-white tracking-tight">
        Sekcia doktor
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl">
        {tiles.map(tile => (
          <Link
            href={tile.href}
            key={tile.title}
            className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 gap-4 hover:-translate-y-2 hover:shadow-blue-200/40 hover:shadow-2xl transition-all backdrop-blur-lg cursor-pointer"
          >
            <div className="mb-2">{tile.icon}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-700 transition">{tile.title}</div>
            <div className="text-md text-gray-700 dark:text-gray-300 text-center">{tile.description}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}


