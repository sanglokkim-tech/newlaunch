export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#080F0A", borderTop: "1px solid #1A3A28" }}
      className="w-full px-6 py-8"
    >
      <div
        className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ maxWidth: "1100px" }}
      >
        <span className="text-white font-bold text-base">
          Life<span style={{ color: "#4ADE80" }}>OS</span>
        </span>

        <div className="flex items-center gap-6">
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Use</a>
        </div>

        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.2)" }}>
          Stop consuming self-help. Start using it.
        </span>
      </div>

      <style>{`
        .footer-link {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .footer-link:hover { color: rgba(255,255,255,0.7); }
      `}</style>
    </footer>
  );
}
