'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.closest(".mobile-menu") || e.target.closest(".menu-btn")) return;
            setMenuOpen(false);
        };
        if (menuOpen) {
            document.addEventListener("click", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [menuOpen]);
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-blue-500 text-white shadow-md">
            <div className="flex justify-between items-center px-4 py-3 border-b border-blue-400">
                {/* Logo */}
                <Link href="/" className="text-2xl font-extrabold">Logo</Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-6 items-center">
                    <ul className="flex gap-4">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/cart">Cart</Link></li>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/help">Help</Link></li>
                    </ul>
                    <Link
                        href="/auth"
                        className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
                    >
                        Signin/Signup
                    </Link>
                </nav>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="menu-btn md:hidden text-2xl"
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>
            <div
                className={`mobile-menu fixed top-0 left-0 h-full w-64 bg-blue-600 text-white transform transition-transform duration-300 z-40 ${menuOpen ? "left-0 translate-x-0" : "-left-[500] -translate-x-full"
                    }`}
            >
                {/* <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="menu-btn w-full bg-blue-600  transform transition-transform translate-x-20 md:hidden text-2xl"
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button> */}
                <ul className="flex flex-col gap-4 p-6">
                    <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link href="/cart" onClick={() => setMenuOpen(false)}>Cart</Link></li>
                    <li><Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                    <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
                    <li><Link href="/help" onClick={() => setMenuOpen(false)}>Help</Link></li>
                    <li>
                        <Link
                            href="/auth"
                            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 block text-center"
                            onClick={() => setMenuOpen(false)}
                        >
                            Signin/Signup
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
export default Navbar;