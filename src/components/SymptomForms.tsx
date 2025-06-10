"use client";
import { useRef, useState } from "react";

export default function SymptomsForm() {
  const [symptoms, setSymptoms] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiResult(null);
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      if (symptoms) formData.append("symptoms", symptoms);
      if (image) formData.append("image", image);

      const res = await fetch("http://localhost:8080/api/ai/recommend", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Chyba pri volaní API");
      }

      // Výstup môže byť JSON alebo string – spracuj oboje:
      const text = await res.text();
      let display = text;
      try {
        const asJson = JSON.parse(text);
        if (asJson.result) display = asJson.result;
      } catch {
        // nevalidný JSON? Nechaj pôvodný text
      }
      setAiResult(display);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message ?? "Neznáma chyba");
      } else {
        setError("Neznáma chyba");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-start w-full max-w-5xl mx-auto mt-12 px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        {/* Ľavý stĺpec – Formulár */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 dark:bg-black/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600 text-center mb-2">
            VAŠE PRÍZNAKY
          </h2>
          <textarea
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
            placeholder="Opíšte svoje zdravotné problémy..."
            rows={7}
            className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 outline-none bg-white/90 dark:bg-black/50 text-gray-900 dark:text-gray-100 resize-none text-lg min-h-[140px]"
          />
          <div className="flex flex-col items-center gap-2 w-full">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-100 rounded-lg px-6 py-3 font-semibold border border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800 transition text-lg w-full"
            >
              {image ? "Zmeniť fotku" : "Nahrať fotku problému"}
            </button>
            {image && (
              <span className="text-sm text-gray-600 dark:text-gray-300 mt-1 text-center break-all">
                {image.name}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-xl px-8 py-4 font-bold text-lg hover:bg-blue-700 transition shadow w-full mt-2"
            disabled={(!symptoms && !image) || loading}
          >
            {loading ? "Odosielam..." : "Odoslať na AI odporúčanie"}
          </button>
          {error && (
            <div className="text-red-600 text-center font-medium">{error}</div>
          )}
        </form>

        {/* Pravý stĺpec – AI Výstup */}
        <div className="bg-white/80 dark:bg-black/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl min-h-[350px] flex flex-col gap-4 justify-start">
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600 text-center mb-2">
            AI ODPORÚČANIE
          </h2>
          {loading ? (
            <div className="text-blue-600 text-center mt-8">Analyzujem…</div>
          ) : aiResult ? (
            <div className="text-lg text-gray-800 dark:text-gray-100 text-left">
              {/* Rozdel na odseky podľa prázdneho riadku */}
              {aiResult
                .split(/\n\s*\n/)
                .map((paragraph, i) => (
                  <p key={i} className="mb-5">{paragraph.trim()}</p>
                ))}
            </div>
          ) : (
            <div className="text-gray-400 text-center mt-8">
              Po odoslaní symptómov sa tu zobrazí odporúčanie AI.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}






