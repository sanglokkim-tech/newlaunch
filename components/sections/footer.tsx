export default function Footer() {
  return (
    <footer
      className="w-full py-12 px-6 flex flex-col items-center gap-2"
      style={{
        backgroundColor: "#0B0B12",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <p className="font-bold text-base" style={{ color: "#F0F0FF" }}>
        life<span style={{ color: "#4ECDC4" }}>OS</span>
      </p>
      <p style={{ color: "rgba(240,240,255,0.25)" }} className="text-sm">
        Run your life like a system.
      </p>
    </footer>
  );
}
