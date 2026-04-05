export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#F4F5F7", borderTop: "1px solid #E5E7EB" }}
      className="w-full px-6 py-8"
    >
      <div
        className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ maxWidth: "1100px" }}
      >
        <span style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
          Life<span style={{ color: "#1D9E75" }}>OS</span>
        </span>

        <div className="flex items-center gap-6">
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Use</a>
        </div>

        <span style={{ fontSize: "13px", color: "#9CA3AF" }}>
          Stop consuming self-help. Start using it.
        </span>
      </div>

      <style>{`
        .footer-link {
          font-size: 13px;
          color: #6B7280;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .footer-link:hover { color: #111827; }
      `}</style>
    </footer>
  );
}
