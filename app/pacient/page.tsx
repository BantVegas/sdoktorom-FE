"use client";
import { useState } from "react";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CARDS = [
  {
    title: "VAŠE PRÍZNAKY",
    desc: "Sem napíšte alebo vložte obrázok vášho zdravotného problému.",
    href: "/priznaky",
  },
  {
    title: "OBJEDNAŤ SA",
    desc: "Rezervujte si termín online konzultácie s lekárom.",
    href: "#",
  },
  {
    title: "HISTÓRIA",
    desc: "Pozrite si prehľad všetkých vašich predchádzajúcich konzultácií.",
    href: "/history",
  },
  {
    title: "SPRÁVA OD DOKTORA",
    desc: "Zobrazte si odpoveď alebo odporúčanie od lekára k vášmu prípadu.",
    href: "#",
  },
];

export default function PacientSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const router = useRouter();

  // Otvorenie Google Máp s vyhľadaním podľa polohy
  function openGoogleMaps(search: string) {
    if (typeof window === "undefined") return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          window.open(
            `https://www.google.com/maps/search/${encodeURIComponent(
              search
            )}/@${lat},${lng},14z`,
            "_blank"
          );
        },
        () => {
          window.open(
            `https://www.google.com/maps/search/${encodeURIComponent(search)}`,
            "_blank"
          );
        },
        { timeout: 10000 }
      );
    } else {
      window.open(
        `https://www.google.com/maps/search/${encodeURIComponent(search)}`,
        "_blank"
      );
    }
  }

  // Volanie na číslo
  function callNumber(number: string) {
    if (typeof window !== "undefined") {
      window.location.href = `tel:${number}`;
    }
  }

  const SMALL_LEFT = [
    { title: "Najbližšia pohotovosť", icon: "🚑", onClick: () => openGoogleMaps("pohotovosť") },
    { title: "Zubná pohotovosť", icon: "🦷", onClick: () => openGoogleMaps("zubná pohotovosť") },
    { title: "Dermatológ", icon: "🧑‍⚕️", onClick: () => openGoogleMaps("dermatológ") },
    { title: "Volat záchranku", icon: "📞", onClick: () => callNumber("155") },
  ];

  const SMALL_RIGHT = [
    { title: "Videohovor s doktorom", icon: "🎥", onClick: () => router.push("#") },
    { title: "Pripomienka", icon: "⏰", onClick: () => alert("Funkcia pripomienky bude čoskoro dostupná!") },
    { title: "Optika", icon: "👓", onClick: () => openGoogleMaps("optika") },
  ];

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Prihlásenie pacienta</h1>
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

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] pt-10">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 dark:text-white drop-shadow-lg text-center">
        Vitajte na <span className="text-blue-600">sdoktorom.sk</span>
      </h1>
      <div className="flex flex-row w-full max-w-7xl px-2 gap-6">
        <div className="hidden lg:flex flex-col gap-6 pt-2 min-w-[180px]">
          {SMALL_LEFT.map(btn => (
            <button
              type="button"
              key={btn.title}
              onClick={btn.onClick}
              className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
            >
              <span className="text-3xl mb-1">{btn.icon}</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">{btn.title}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-1">
          {CARDS.map(({ title, desc, href }) =>
            href && href !== "#" ? (
              <Link key={title} href={href} className="w-full h-full">
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.10}
                  glareColor="#ffffff"
                  glarePosition="all"
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  className="w-full"
                  style={{ minHeight: 250 }}
                >
                  <div
                    className="w-full h-full bg-white/60 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-10 shadow-xl border border-white/30 dark:border-black/40 flex flex-col items-center justify-center transition hover:shadow-2xl hover:-translate-y-1 cursor-pointer min-h-[230px]"
                    style={{ minHeight: 250 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold mb-4 text-blue-600 text-center w-full uppercase tracking-wide">
                      {title}
                    </div>
                    <div className="text-base md:text-lg text-gray-700 dark:text-gray-200 text-center">
                      {desc}
                    </div>
                  </div>
                </Tilt>
              </Link>
            ) : (
              <Tilt
                key={title}
                glareEnable={true}
                glareMaxOpacity={0.10}
                glareColor="#ffffff"
                glarePosition="all"
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                className="w-full"
                style={{ minHeight: 250 }}
              >
                <div
                  className="w-full h-full bg-white/60 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-10 shadow-xl border border-white/30 dark:border-black/40 flex flex-col items-center justify-center transition hover:shadow-2xl hover:-translate-y-1 cursor-pointer min-h-[230px]"
                  style={{ minHeight: 250 }}
                >
                  <div className="text-2xl md:text-3xl font-bold mb-4 text-blue-600 text-center w-full uppercase tracking-wide">
                    {title}
                  </div>
                  <div className="text-base md:text-lg text-gray-700 dark:text-gray-200 text-center">
                    {desc}
                  </div>
                </div>
              </Tilt>
            )
          )}
        </div>
        <div className="hidden lg:flex flex-col gap-6 pt-2 min-w-[180px]">
          {SMALL_RIGHT.map(btn => (
            <button
              type="button"
              key={btn.title}
              onClick={btn.onClick}
              className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
            >
              <span className="text-3xl mb-1">{btn.icon}</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">{btn.title}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="lg:hidden mt-8 grid grid-cols-3 gap-4 w-full max-w-2xl">
        {[...SMALL_LEFT, ...SMALL_RIGHT].map(btn => (
          <button
            type="button"
            key={btn.title}
            onClick={btn.onClick}
            className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-3 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
          >
            <span className="text-2xl mb-0.5">{btn.icon}</span>
            <span className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 text-center">{btn.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}






