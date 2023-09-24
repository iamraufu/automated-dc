import React from 'react';
import logo from '../images/logo.svg'
import picker from '../images/picker.svg'
import vehicle from '../images/vehicle.svg'
import zone from '../images/zone.svg'
// import ticket from '../images/ticket.svg'
import kpi from '../images/kpi.svg'
// import taka from '../images/taka.svg'
// import stoassign from '../images/stoassign.svg'
import noticeIcon from '../images/notice_red.svg'
import expenseIcon from '../images/expense.svg'
import { NavLink } from 'react-router-dom';
import logout from '../images/logout.svg'
import useAuth from '../hooks/useAuth';

const NavContents = () => {

    const { user, notice, logOut } = useAuth();

    const activeStyles = {
        color: "#10BBC2",
        fontWeight: '700'
    }

    const defaultStyles = {
        color: "#000"
    }

    return (
        <div>
            <NavLink to='/'><div className="mx-auto d-block sidebar-logo-container mt-3"><img className='mx-auto d-block py-1' src={logo} alt="logo of Shwapno" /></div></NavLink>

            <div className="sidebar-logo-divider"></div>

            {/* <NavLink to='/sto-assign' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={34} src={stoassign} className='mx-auto d-block' alt="picker" />
                    <h2 className='sidebar-title text-center pt-1'>STO Assign</h2>
                </div>
            </NavLink> */}

            <NavLink to='/zone-assign' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={34} src={zone} className='mx-auto d-block' alt="zone" />
                    <h2 className='sidebar-title text-center pt-1'>Zone</h2>
                </div>
            </NavLink>

            <NavLink to='/picker' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={34} src={picker} className='mx-auto d-block' alt="picker" />
                    <h2 className='sidebar-title text-center pt-1'>Picker & Sorter</h2>
                </div>
            </NavLink>

            <NavLink to='/vehicle-assign' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={34} src={vehicle} className='mx-auto d-block' alt="vehicle" />
                    <h2 className='sidebar-title text-center pt-1'>Vehicle Assign</h2>
                </div>
            </NavLink>

            {/* <NavLink to='/expense-tracker' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={34} src={taka} className='mx-auto d-block' alt="expense" />
                    <h2 className='sidebar-title text-center pt-1'>Expense Track</h2>
                </div>
            </NavLink> */}

            <NavLink to='/kpi' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={32} src={kpi} className='mx-auto d-block' alt="KPI" />
                    <h2 className='sidebar-title text-center pt-1'>KPI</h2>
                </div>
            </NavLink>

            <NavLink to='/expense-tracker' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={32} src={expenseIcon} className='mx-auto d-block' alt="Expenses" />
                    <h2 className='sidebar-title text-center pt-1'>Expenses</h2>
                </div>
            </NavLink>

            {/* <NavLink to='/tickets' className='text-decoration-none' style={({ isActive }) => (
                isActive ? activeStyles : defaultStyles
            )}>
                <div className="mt-5 mx-auto d-block">
                    <img width={32} src={ticket} className='mx-auto d-block' alt="ticket" />
                    <h2 className='sidebar-title text-center pt-1'>Ticket</h2>
                </div>
            </NavLink> */}

            {
                user.role === 0 &&
                <NavLink to='/notice' className='text-decoration-none' style={({ isActive }) => (
                    isActive ? activeStyles : defaultStyles
                )}>
                    <div className="mt-5 mx-auto d-block">
                        {
                            notice.filter(item => item.status === 0).length === 0 ?
                                <>
                                    <img width={25} src={noticeIcon} className='mx-auto d-block' alt="notice" />
                                    <h2 className='sidebar-title text-center pt-1'>Notice</h2>
                                </>
                                :
                                <>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img width={25} src={noticeIcon} className='' alt="notice" />
                                        <sup style={{ height: '20px', width: "20px", borderRadius: '50%' }} className='mb-2 bg-danger text-white fw-bold font-inter d-flex justify-content-center align-items-center'>{notice.filter(item => item.status === 0).length}</sup>
                                    </div>
                                    <h2 className='sidebar-title text-center pt-1 pe-2'>Notice</h2>
                                </>
                        }
                    </div>
                </NavLink>
            }

            <div style={{ cursor: "pointer", 
            // position: "absolute", bottom: '0', 
            padding: "1rem 2rem" }} onClick={() => logOut()} className="mt-5">
                <img src={logout} alt="log out" className='mx-auto d-block' width={34} />
                <h2 className='sidebar-title text-center'>Logout</h2>
            </div>
        </div>
    );
};

export default NavContents;