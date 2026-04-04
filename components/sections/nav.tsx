export default function Nav() {
  return (
    <nav
      style={{ backgroundColor: "#1A1D27" }}
      className="sticky top-0 z-50 w-full"
    >
      <div
        className="mx-auto flex items-center justify-between px-6 py-4"
        style={{ maxWidth: "1100px" }}
      >
        <span className="text-white font-bold text-lg">
          Life<span style={{ color: "#1D9E75" }}>OS</span>
        </span>
        <a
          href="#waitlist"
          className="nav-cta"
        >
          Join waitlist
        </a>

        <style>{`
          .nav-cta {
            background-color: #1D9E75;
            color: #fff;
            border-radius: 8px;
            padding: 8px 20px;
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            display: inline-block;
            transition: opacity 0.15s ease, transform 0.15s ease;
          }
          .nav-cta:hover {
            opacity: 0.88;
            transform: translateY(-1px);
          }
        `}</style>
      </div>
    </nav>
  );
}
