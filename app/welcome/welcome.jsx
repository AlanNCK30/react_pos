import { Link } from "react-router";

export function Welcome() {
  return (
    <main>
      <nav className="flex justify-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/pos">Pos</Link>
      </nav>
    </main>
  );
}
