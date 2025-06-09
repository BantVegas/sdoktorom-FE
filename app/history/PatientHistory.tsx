"use client";

import { useState, useEffect } from "react";

type Message = {
  id: number;
  createdAt: string;
  symptoms: string;
  recommendation: string | null;
  sentToDoctor: boolean;
};

type Props = {
  patientId: number;
};

export default function PatientHistory({ patientId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/patient/${patientId}`);
        if (!res.ok) throw new Error("Nepodarilo sa načítať správy");
        const data: Message[] = await res.json();
        setMessages(
          data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (error: any) {
        alert(error.message || error);
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, [patientId]);

  const selectedMsg = messages.find((m) => m.id === selectedId);

  async function sendToDoctor(id: number) {
    setSendingId(id);
    try {
      const res = await fetch(
        `/api/messages/patient/${patientId}/send-to-doctor/${id}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Nepodarilo sa odoslať správu doktorovi");
      alert("Správa bola odoslaná doktorovi");
      setMessages((msgs) =>
        msgs.map((m) => (m.id === id ? { ...m, sentToDoctor: true } : m))
      );
    } catch (error: any) {
      alert(error.message || error);
    } finally {
      setSendingId(null);
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        História vašich správ
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">Načítavam správy...</div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-600">
          Nemáte zatiaľ uložené žiadne správy.
        </div>
      ) : (
        <div className="flex gap-6">
          {/* Zoznam správ */}
          <ul className="w-1/3 border rounded-lg overflow-y-auto max-h-[600px] shadow-sm">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className={`cursor-pointer px-4 py-3 border-b hover:bg-blue-50 ${
                  selectedId === msg.id ? "bg-blue-100 font-semibold" : ""
                }`}
                onClick={() => setSelectedId(msg.id)}
              >
                <div className="text-sm text-gray-700">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
                <div className="truncate">{msg.symptoms}</div>
              </li>
            ))}
          </ul>

          {/* Detail správy */}
          <section className="flex-1 border rounded-lg p-6 max-h-[600px] overflow-y-auto bg-white shadow">
            {!selectedMsg ? (
              <div className="text-gray-400 text-center mt-20">
                Vyberte správu na zobrazenie detailu
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2">
                  Dátum: {new Date(selectedMsg.createdAt).toLocaleString()}
                </h2>
                <h3 className="font-semibold">Symptómy:</h3>
                <p className="mb-4 whitespace-pre-wrap">
                  {selectedMsg.symptoms}
                </p>

                <h3 className="font-semibold">Odporúčanie:</h3>
                <p className="mb-6 whitespace-pre-wrap">
                  {selectedMsg.recommendation || (
                    <span className="italic text-gray-400">Žiadne</span>
                  )}
                </p>

                <button
                  disabled={
                    selectedMsg.sentToDoctor || sendingId === selectedMsg.id
                  }
                  onClick={() => sendToDoctor(selectedMsg.id)}
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedMsg.sentToDoctor
                    ? "Odoslané doktorovi"
                    : "Odoslať doktorovi"}
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
