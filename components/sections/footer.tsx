export default function Footer() {
  return (
    <footer
      className="w-full py-8 px-6 flex flex-col items-center gap-1"
      style={{ backgroundColor: "#0F1117", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>
        life<span style={{ color: "#00C9A7" }}>OS</span>
      </p>
      <p style={{ fontSize: 13, color: "#6B7280" }}>Run your life like a system.</p>
    </footer>
  );
}
