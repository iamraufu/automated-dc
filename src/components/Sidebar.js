import React from 'react';
import logo from '../images/logo.svg'
import user from '../images/user.svg'
import picker from '../images/picker.svg'
import vehicle from '../images/vehicle.svg'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <section style={{ minHeight: '100vh', 
        // boxShadow: '0 5px 15px #c4c4c44d' 
        }} className="py-2 bg-white">

            <NavLink to='/'><div className="mx-auto d-block sidebar-logo-container mt-3"><img className='mx-auto d-block py-1' src={logo} alt="logo of Shwapno" /></div></NavLink>

            <div className="sidebar-logo-divider"></div>

            <NavLink to='/attendance' className='text-black text-decoration-none'>
                <div className="mt-5 mx-auto d-block">
                    <img src={user} className='mx-auto d-block' alt="attendance" />
                    <h2 className='sidebar-title text-center'>Attendance</h2>
                </div>
            </NavLink>

            <NavLink to='/picker' className='text-black text-decoration-none'>
                <div className="mt-5 mx-auto d-block">
                    <img src={picker} className='mx-auto d-block' alt="picker" />
                    <h2 className='sidebar-title text-center'>Picker</h2>
                </div>
            </NavLink>

            <NavLink to='/vehicle-assign' className='text-black text-decoration-none'>
                <div className="mt-5 mx-auto d-block">
                    <img width={34} src={vehicle} className='mx-auto d-block' alt="vehicle" />
                    <h2 className='sidebar-title text-center'>Vehicle <br />Assign</h2>
                </div>
            </NavLink>

        </section>
    );
};

export default Sidebar;