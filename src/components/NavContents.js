import React from 'react';
import logo from '../images/logo.svg'
// import user from '../images/user.svg'
import picker from '../images/picker.svg'
import vehicle from '../images/vehicle.svg'
import ticket from '../images/ticket.svg'
import notice from '../images/notice_red.svg'
import { NavLink } from 'react-router-dom';
import logout from '../images/logout.svg'
import useAuth from '../hooks/useAuth';

const NavContents = () => {

    const { logOut } = useAuth();

    const activeStyles = {
        color: "#10BBC2",
        fontWeight:'700'
    }

    const defaultStyles = {
        color: "#000"
    }

    return (
        <div>
            <NavLink to='/'><div className="mx-auto d-block sidebar-logo-container mt-3"><img className='mx-auto d-block py-1' src={logo} alt="logo of Shwapno" /></div></NavLink>

            <div className="sidebar-logo-divider"></div>

            {/* <NavLink to='/attendance' className='text-black text-decoration-none'>
                <div className="mt-5 mx-auto d-block">
                    <img src={user} className='mx-auto d-block' alt="attendance" />
                    <h2 className='sidebar-title text-center'>Attendance</h2>
                </div>
            </NavLink> */}

            <NavLink to='/picker' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={34} src={picker} className='mx-auto d-block' alt="picker" />
                    <h2 className='sidebar-title text-center pt-1'>Picker</h2>
                </div>
            </NavLink>

            <NavLink to='/vehicle-assign' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={34} src={vehicle} className='mx-auto d-block' alt="vehicle" />
                    <h2 className='sidebar-title text-center pt-1'>Vehicle <br />Assign</h2>
                </div>
            </NavLink>

            <NavLink to='/tickets' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={32} src={ticket} className='mx-auto d-block' alt="ticket" />
                    <h2 className='sidebar-title text-center pt-1'>Ticket</h2>
                </div>
            </NavLink>

            <NavLink to='/notice' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={25} src={notice} className='mx-auto d-block' alt="notice" />
                    <h2 className='sidebar-title text-center pt-1'>Notice</h2>
                </div>
            </NavLink>

            <div style={{ cursor: "pointer", position: "absolute", bottom: '0', padding: "1rem 2rem" }} onClick={() => logOut()} className="mt-5">
                <img src={logout} alt="log out" className='mx-auto d-block' width={34} />
                <h2 className='sidebar-title text-center'>Logout</h2>
            </div>
        </div>
    );
};

export default NavContents;