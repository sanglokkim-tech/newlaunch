export default function Footer() {
  return (
    <footer
      className="w-full py-10 px-6 flex flex-col items-center gap-1.5"
      style={{ backgroundColor: "#1C1C2E", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p className="font-bold text-base text-white">
        life<span style={{ color: "#24A066" }}>OS</span>
      </p>
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
        Run your life like a system.
      </p>
    </footer>
  );
}
