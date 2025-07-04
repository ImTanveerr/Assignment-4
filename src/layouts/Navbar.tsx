import { NavLink } from 'react-router-dom';
import logoIcon from '../assets/images/book.png';

const Navbar = () => {
    return (
        <nav className='h-[60px] bg-gradient-to-r from-blue-500 to-purple-600 shadow-md'>
            <div className='container mx-auto flex items-center justify-between px-5'>
                {/* Logo */}
                <div className='flex items-center gap-2'>
                    <img className='w-8' src={logoIcon} alt="book logo icon" />
                    <h1 className='font-bold text-2xl text-white'>GronthoSheba</h1>
                </div>

                {/* Menu */}
                <ul className='flex items-center gap-4 font-medium text-white'>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            isActive ? 'text-yellow-300 border-b-2 border-yellow-300 pb-1' : 'hover:text-yellow-100'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='/books'
                        className={({ isActive }) =>
                            isActive ? 'text-yellow-300 border-b-2 border-yellow-300 pb-1' : 'hover:text-yellow-100'
                        }
                    >
                        All Books
                    </NavLink>
                    <NavLink
                        to='/create-book'
                        className={({ isActive }) =>
                            isActive ? 'text-yellow-300 border-b-2 border-yellow-300 pb-1' : 'hover:text-yellow-100'
                        }
                    >
                        Add Book
                    </NavLink>
                    <NavLink
                        to='/borrow-summary'
                        className={({ isActive }) =>
                            isActive ? 'text-yellow-300 border-b-2 border-yellow-300 pb-1' : 'hover:text-yellow-100'
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