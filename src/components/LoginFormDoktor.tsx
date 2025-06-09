"use client";

import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^\w\s]/.test(password)) score++;
  return score;
}

export default function LoginFormDoktor() {
  const [form, setForm] = useState({
    meno: "",
    priezvisko: "",
    email: "",
    heslo: "",
  });

  const [errors, setErrors] = useState<{
    meno?: string;
    priezvisko?: string;
    email?: string;
    heslo?: string;
  }>({});

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.meno.trim()) newErrors.meno = "Zadajte meno";
    if (!form.priezvisko.trim()) newErrors.priezvisko = "Zadajte priezvisko";
    if (!form.email.trim()) newErrors.email = "Zadajte e-mail";
    else if (!emailRegex.test(form.email)) newErrors.email = "Neplatný formát e-mailu";

    // Heslo - vypis najdôležitejšiu chýbajúcu požiadavku (live)
    if (!form.heslo) newErrors.heslo = "Zadajte heslo";
    else if (form.heslo.length < 8) newErrors.heslo = "Heslo musí mať aspoň 8 znakov";
    else if (!/[A-Z]/.test(form.heslo)) newErrors.heslo = "Heslo musí obsahovať aspoň 1 veľké písmeno";
    else if (!/\d/.test(form.heslo)) newErrors.heslo = "Heslo musí obsahovať aspoň 1 číslo";
    else if (!/[^\w\s]/.test(form.heslo)) newErrors.heslo = "Heslo musí obsahovať aspoň 1 špeciálny znak";

    return newErrors;
  };

  // Live kontrola pri písaní
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
  };

  // Pri odoslaní formu
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    setTouched({
      meno: true,
      priezvisko: true,
      email: true,
      heslo: true,
    });
    if (Object.keys(validation).length === 0) {
      alert("Prihlásenie úspešné! (FE ukážka)");
      // Tu ide BE call
    }
  };

  // Live meter
  const passStrength = getPasswordStrength(form.heslo);

  // Helper na zvýraznenie požiadaviek v reálnom čase
  const passReq = [
    { ok: form.heslo.length >= 8, label: "Minimálne 8 znakov" },
    { ok: /[A-Z]/.test(form.heslo), label: "Aspoň 1 veľké písmeno" },
    { ok: /\d/.test(form.heslo), label: "Aspoň 1 číslo" },
    { ok: /[^\w\s]/.test(form.heslo), label: "Aspoň 1 špeciálny znak" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm bg-white/70 dark:bg-black/40 p-8 rounded-2xl shadow-lg"
      noValidate
    >
      {/* Meno */}
      <div className="flex flex-col gap-1 w-full">
        <label className="font-semibold text-gray-800 dark:text-gray-100">Meno</label>
        <input
          type="text"
          name="meno"
          placeholder="Zadajte meno"
          value={form.meno}
          onChange={handleChange}
          className={`p-3 rounded border ${touched.meno && errors.meno ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 outline-none bg-white/90 dark:bg-black/50 text-gray-900 dark:text-gray-100`}
          required
        />
        {touched.meno && errors.meno && <span className="text-red-500 text-sm">{errors.meno}</span>}
      </div>

      {/* Priezvisko */}
      <div className="flex flex-col gap-1 w-full">
        <label className="font-semibold text-gray-800 dark:text-gray-100">Priezvisko</label>
        <input
          type="text"
          name="priezvisko"
          placeholder="Zadajte priezvisko"
          value={form.priezvisko}
          onChange={handleChange}
          className={`p-3 rounded border ${touched.priezvisko && errors.priezvisko ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 outline-none bg-white/90 dark:bg-black/50 text-gray-900 dark:text-gray-100`}
          required
        />
        {touched.priezvisko && errors.priezvisko && <span className="text-red-500 text-sm">{errors.priezvisko}</span>}
      </div>

      {/* E-mail */}
      <div className="flex flex-col gap-1 w-full">
        <label className="font-semibold text-gray-800 dark:text-gray-100">E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="doktor@email.sk"
          value={form.email}
          onChange={handleChange}
          className={`p-3 rounded border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 outline-none bg-white/90 dark:bg-black/50 text-gray-900 dark:text-gray-100`}
          required
        />
        {touched.email && errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
      </div>

      {/* Heslo */}
      <div className="flex flex-col gap-1 w-full">
        <label className="font-semibold text-gray-800 dark:text-gray-100">Heslo</label>
        <input
          type="password"
          name="heslo"
          placeholder="••••••••"
          value={form.heslo}
          onChange={handleChange}
          className={`p-3 rounded border ${touched.heslo && errors.heslo ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 outline-none bg-white/90 dark:bg-black/50 text-gray-900 dark:text-gray-100`}
          required
          autoComplete="new-password"
        />

        {/* Sila hesla - meter */}
        {form.heslo.length > 0 && (
          <div className="w-full flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className={`h-2 rounded transition-all duration-300 ${
                  passStrength <= 1
                    ? "bg-red-500 w-1/4"
                    : passStrength === 2
                    ? "bg-yellow-400 w-2/4"
                    : passStrength === 3
                    ? "bg-blue-500 w-3/4"
                    : "bg-green-500 w-full"
                }`}
              ></div>
            </div>
            <span
              className={`text-xs font-semibold ${
                passStrength <= 1
                  ? "text-red-500"
                  : passStrength === 2
                  ? "text-yellow-600"
                  : passStrength === 3
                  ? "text-blue-500"
                  : "text-green-600"
              }`}
            >
              {passStrength <= 1
                ? "Slabé"
                : passStrength === 2
                ? "Stredné"
                : passStrength === 3
                ? "Silné"
                : "Výborné"}
            </span>
          </div>
        )}

        {/* LIVE požiadavky */}
        <ul className="text-xs mt-2 list-disc pl-5">
          {passReq.map(({ ok, label }, i) => (
            <li key={i} className={ok ? "text-green-600" : "text-gray-500"}>
              <span className={ok ? "font-semibold" : ""}>{label}</span>
            </li>
          ))}
        </ul>

        {touched.heslo && errors.heslo && (
          <span className="text-red-500 text-sm">{errors.heslo}</span>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white rounded-xl px-6 py-3 font-bold hover:bg-blue-700 transition"
      >
        Prihlásiť sa ako doktor
      </button>
    </form>
  );
}

