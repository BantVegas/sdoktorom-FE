// src/components/VideoCallRoom.tsx
export function VideoCallRoom({ roomName, userRole }: { roomName: string, userRole: 'doctor' | 'patient' }) {
  // Zatiaľ len placeholder
  return (
    <div className="flex flex-col items-center justify-center h-80 border rounded-xl shadow p-4">
      <span className="text-xl font-bold text-gray-500">Videohovor tu čoskoro</span>
      <p>Room: {roomName}</p>
      <p>Role: {userRole}</p>
    </div>
  );
}
