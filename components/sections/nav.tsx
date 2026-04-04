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
          style={{
            backgroundColor: "#1D9E75",
            color: "#fff",
            borderRadius: "8px",
            padding: "8px 20px",
            fontSize: "14px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Get early access
        </a>
      </div>
    </nav>
  );
}
