import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/jobify.png';

function Header() {
    const { logout, isAuthenticated, role } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        navigate('/jobs');
        logout();
        localStorage.removeItem('user');
        setMenuOpen(false);
    };

    return (
        <>
            <header className="h-[var(--header-height)] w-full bg-gray-800 fixed z-50 flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-4 w-[200px] h-20">
                    <img src={logo} alt="logo" className="h-full w-full object-cover" />
                </div>

                {/* Hamburger button */}
                <button
                    className="md:hidden text-gray-300"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className={`pi ${menuOpen ? 'pi-times' : 'pi-bars'} text-xl`} />
                </button>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-4">
                    <NavLink
                        to="/jobs"
                        className={({ isActive }) =>
                            `text-gray-300 h-10 px-4 flex items-center hover:bg-gray-700 rounded-md ${isActive ? 'bg-gray-900 text-white' : ''}`
                        }
                    >
                        Jobs
                    </NavLink>

                    {role === 'admin' && (
                        <>
                            <NavLink
                                to="/jobs-management"
                                className={({ isActive }) =>
                                    `text-gray-300 h-10 px-4 flex items-center hover:bg-gray-700 rounded-md ${isActive ? 'bg-gray-900 text-white' : ''}`
                                }
                            >
                                Jobs Management
                            </NavLink>
                            <NavLink
                                to="/candidates"
                                className={({ isActive }) =>
                                    `text-gray-300 h-10 px-4 flex items-center hover:bg-gray-700 rounded-md ${isActive ? 'bg-gray-900 text-white' : ''}`
                                }
                            >
                                Candidates
                            </NavLink>
                        </>
                    )}
                </nav>

                {/* Auth buttons */}
                <div className="hidden md:flex">
                    {isAuthenticated ? (
                        <span
                            className="text-gray-300 cursor-pointer hover:bg-gray-700 rounded-md p-2 hover:text-red-500"
                            onClick={handleLogout}
                        >
                            <i className="pi pi-sign-out"></i>
                        </span>
                    ) : (
                        <NavLink
                            to="/login"
                            className="text-gray-300 hover:text-white cursor-pointer p-2"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </header>

            {/* Mobile dropdwn menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-800 pt-[var(--header-height)] fixed top-0 left-0 w-full z-40 px-4 pb-4 space-y-2">
                    <NavLink
                        to="/jobs"
                        className={({ isActive }) =>
                            `block text-gray-300 py-2 px-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-900 text-white' : ''}`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Jobs
                    </NavLink>

                    {role === 'admin' && (
                        <>
                            <NavLink
                                to="/jobs-management"
                                className={({ isActive }) =>
                                    `block text-gray-300 py-2 px-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-900 text-white' : ''}`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Jobs Management
                            </NavLink>
                            <NavLink
                                to="/candidates"
                                className={({ isActive }) =>
                                    `block text-gray-300 py-2 px-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-900 text-white' : ''}`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Candidates
                            </NavLink>
                        </>
                    )}

                    {isAuthenticated ? (
                        <span
                            className="flex items-center gap-2 text-gray-300 cursor-pointer hover:bg-gray-700 rounded-md py-2 px-2 hover:text-red-500"
                            onClick={handleLogout}
                        >
                            <i className="pi pi-sign-out"></i> Logout
                        </span>
                    ) : (
                        <NavLink
                            to="/login"
                            className="block text-gray-300 hover:text-white cursor-pointer py-2 px-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            )}
        </>
    );
}

export default Header;
