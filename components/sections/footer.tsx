export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1A1D27" }} className="w-full px-6 py-8">
      <div
        className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ maxWidth: "1100px" }}
      >
        <span className="text-white font-bold text-base">
          Life<span style={{ color: "#1D9E75" }}>OS</span>
        </span>
        <span style={{ fontSize: "13px", color: "#4B5563" }}>
          Stop consuming self-help. Start using it.
        </span>
      </div>
    </footer>
  );
}
