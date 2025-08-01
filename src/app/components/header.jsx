import React from 'react'
import {useAuth} from '../context/AuthContext'
import {NavLink, useNavigate} from 'react-router-dom'
import logo from '../../assets/jobify.png'

function Header() {
    const {logout, isAuthenticated} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        localStorage.removeItem('user')
    }

    return (
        <div className="h-[var(--header-height)] w-full bg-gray-800 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
                <img src={logo} alt="logo" className="h-50"/>
                <nav>
                    <ul className="flex items-center gap-4">
                        <li>
                            <NavLink
                                to="/jobs"
                                className={({isActive}) =>
                                    `flex items-center justify-center text-gray-300 h-10 w-auto p-4 hover:bg-gray-700 rounded-md cursor-pointer ${isActive ? 'bg-gray-900 text-white' : ''}`
                                }
                            >
                                Jobs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/jobs-management"
                                className={({isActive}) =>
                                    `flex items-center justify-center text-gray-300 h-10 w-auto p-4 hover:bg-gray-700 rounded-md cursor-pointer ${isActive ? 'bg-gray-900 text-white' : ''}`
                                }
                            >
                                Jobs Management
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            {isAuthenticated ? (
                <span className="text-gray-300 cursor-pointer hover:bg-gray-700 rounded-md p-2 hover:text-red-500"
                      onClick={handleLogout}>
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
    )
}

export default Header;