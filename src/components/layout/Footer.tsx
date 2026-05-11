import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="shell footer">
      <div className="footer-brand">
        <Logo />
        <span className="footer-copy">© 2026 — WILDCATS AI STUDIO.</span>
      </div>
      <div className="links">
        <a href="#course">Course</a>
        <a href="#products">Products</a>
        <a href="#roadmap">Roadmap</a>
        <a href="#trainers">Trainers</a>
      </div>
    </footer>
  );
}
