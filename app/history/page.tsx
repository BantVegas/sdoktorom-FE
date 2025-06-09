import PatientHistory from "./PatientHistory";

export default function HistoryPage() {
  const patientId = 123; // Tu pridaš dynamické ID prihlaseného pacienta
  return <PatientHistory patientId={patientId} />;
}
