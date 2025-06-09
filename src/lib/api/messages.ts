// uloženie analýzy (prompt + odporúčanie) do histórie pacienta
export async function saveAnalysis(patientId: number, symptoms: string, recommendation: string) {
  const res = await fetch(`/api/messages/patient/${patientId}/save-analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptoms, recommendation }),
  });

  if (!res.ok) {
    throw new Error("Nepodarilo sa uložiť analýzu do histórie");
  }

  return await res.json();
}

// odoslanie správy doktorovi z histórie
export async function sendMessageToDoctor(patientId: number, messageId: number) {
  const res = await fetch(`/api/messages/patient/${patientId}/send-to-doctor/${messageId}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Nepodarilo sa odoslať správu doktorovi");
  }

  return await res.json();
}
