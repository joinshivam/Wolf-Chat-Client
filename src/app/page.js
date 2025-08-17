import Navbar from "./components/navbar";
import Home from "./home";

export default function App() {
  return (
    <div className="container min-h-screen min-w-full font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Home />
    </div >
  );
}
