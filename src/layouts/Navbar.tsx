import { NavLink } from 'react-router-dom';
import logoIcon from '../assets/images/book.png';

const Navbar = () => {
    return (
        <nav className="bg-indigo-600 shadow-sm">
            <div className="max-w-screen-xl mx-auto flex items-center justify-center py-3 px-6 relative">
                
                {/* Logo (left-aligned, separate layer) */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <img src={logoIcon} alt="Book Icon" className="h-7 w-7" />
                    <h1 className="text-white text-xl font-bold tracking-wide">GronthoSheba</h1>
                </div>

                {/* Centered Navigation Links */}
                <ul className="flex gap-8 text-white text-base font-medium">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-300 border-b border-yellow-300 pb-0.5"
                                : "hover:text-yellow-100 transition"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/books"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-300 border-b border-yellow-300 pb-0.5"
                                : "hover:text-yellow-100 transition"
                        }
                    >
                        All Books
                    </NavLink>
                    <NavLink
                        to="/create-book"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-300 border-b border-yellow-300 pb-0.5"
                                : "hover:text-yellow-100 transition"
                        }
                    >
                        Add Book
                    </NavLink>
                    <NavLink
                        to="/borrow-summary"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-300 border-b border-yellow-300 pb-0.5"
                                : "hover:text-yellow-100 transition"
                        }
                    >
                        Borrow Summary
                    </NavLink>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
