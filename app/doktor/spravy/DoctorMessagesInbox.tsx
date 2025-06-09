"use client";

import { useState, useEffect } from "react";

type Message = {
  id: number;
  patientName: string;
  symptoms: string;
  createdAt: string;
  recommendation?: string;
  viewedByDoctor?: boolean;
};

type Props = {
  doctorId: number;
};

export default function DoctorMessagesInbox({ doctorId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/messages/for-doctor/${doctorId}`)
      .then(res => res.json())
      .then(setMessages);
  }, [doctorId]);

  const selectedMessage = messages.find(msg => msg.id === selectedId);

  function handleSendRecommendation(messageId: number, recommendation: string) {
    fetch(`/api/messages/${messageId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recommendation }),
    })
      .then(res => res.json())
      .then((updated: Message) => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId ? updated : msg
          )
        );
      });
  }

  // Spočíta počet nových (neprečítaných) správ
  const newMessagesCount = messages.filter(msg => !msg.viewedByDoctor).length;

  return (
    <div className="flex flex-grow rounded-2xl shadow-lg overflow-hidden bg-white max-w-5xl mx-auto h-[70vh]">
      <div className="relative w-96 border-r border-gray-200 bg-gray-50 h-full overflow-y-auto">
        <h2 className="text-lg font-bold px-6 pt-6 pb-3">Správy od pacientov</h2>

        {/* Červená gulôčka s počtom nových správ v pravom dolnom rohu */}
        {newMessagesCount > 0 && (
          <div className="absolute bottom-4 right-4 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-semibold text-sm shadow-lg select-none">
            {newMessagesCount}
          </div>
        )}

        <ul>
          {messages.map(msg => (
            <li
              key={msg.id}
              className={`px-6 py-4 border-b border-gray-100 cursor-pointer flex items-center gap-2 transition hover:bg-blue-50
                ${selectedId === msg.id ? "bg-blue-100" : ""}
                `}
              onClick={() => setSelectedId(msg.id)}
            >
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{msg.patientName}</div>
                <div className="text-xs text-gray-500">{msg.createdAt?.replace('T', ' ').substring(0, 16)}</div>
                <div className="text-sm text-gray-700 mt-0.5 truncate max-w-[160px]">{msg.symptoms}</div>
              </div>
              {!msg.viewedByDoctor && (
                <span className="ml-2 text-xs bg-green-200 text-green-900 rounded-full px-2 py-0.5 font-semibold">Nová</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 h-full overflow-y-auto p-8 bg-white min-w-[500px]">
        {!selectedMessage ? (
          <div className="text-gray-400 h-full flex items-center justify-center">Vyberte správu na zobrazenie detailu</div>
        ) : (
          <MessageDetail message={selectedMessage} onSendRecommendation={handleSendRecommendation} />
        )}
      </div>
    </div>
  );
}

type MessageDetailProps = {
  message: Message;
  onSendRecommendation: (messageId: number, recommendation: string) => void;
};

function MessageDetail({ message, onSendRecommendation }: MessageDetailProps) {
  const [reply, setReply] = useState("");

  return (
    <div>
      <div className="mb-2"><span className="font-semibold">Pacient:</span> {message.patientName}</div>
      <div className="mb-2"><span className="font-semibold">Dátum:</span> {message.createdAt?.replace('T', ' ').substring(0, 16)}</div>
      <div className="mb-4"><span className="font-semibold">Symptómy:</span> {message.symptoms}</div>
      {message.recommendation ? (
        <div className="mb-4">
          <span className="font-semibold">Vaša odpoveď:</span>
          <div className="bg-blue-50 rounded p-2 mt-1">{message.recommendation}</div>
        </div>
      ) : (
        <>
          <textarea
            className="w-full p-2 rounded border border-gray-300 mb-4"
            rows={4}
            placeholder="Sem napíšte odporúčanie pre pacienta..."
            value={reply}
            onChange={e => setReply(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-semibold"
            onClick={() => {
              onSendRecommendation(message.id, reply);
              setReply("");
            }}
            disabled={!reply.trim()}
          >
            Odoslať odporúčanie
          </button>
        </>
      )}
    </div>
  );
}
