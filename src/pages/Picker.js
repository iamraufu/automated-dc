import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';
import userIcon from '../images/user2.svg'
import moment from 'moment/moment';
import STOAssign from '../components/STO/STOAssign'

const Picker = () => {

    const { user, sto } = useAuth()
    const tabNames = ['Picker', 'Sorter']
    const [userRole, setUserRole] = useState("Picker")
    const [filtered, setFiltered] = useState(user.pickers)
    const [userDetails, setUserDetails] = useState([])

    const handlePickerSorter = (value) => {
        setUserDetails([])
        if (value === 'Picker') {
            setUserRole('Picker')
            setFiltered(user.pickers)
        }
        else if (value === 'Sorter') {
            setUserRole('Sorter')
            setFiltered(user.sorters)
        }
        else {
            setFiltered(user.pickers.concat(user.sorters))
        }
    }

    const handleClick = (role, name) => {
        role === 'picker' ?
            setUserDetails(sto.flatMap(sto => sto.data).filter(sto => sto.picker === name))
            :
            setUserDetails(sto.flatMap(sto => sto.data).filter(sto => sto.sorter === name))
    }

    console.log(userDetails)

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                    <STOAssign />
                    <ul className='d-flex p-0'>
                        {
                            tabNames.map((item, index) =>
                                <li style={{
                                    cursor: 'pointer',
                                    listStyle: 'none', background: '#E2EEFD', width: '100px', color: '#1D3557',
                                    fontFamily: 'IBM Plex Sans',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    fontSize: '20px',
                                    lineHeight: '26px'
                                }} onClick={(e) => handlePickerSorter(e.target.innerText)} key={index} className='p-3 mx-1 text-center'>{item}</li>
                            )
                        }
                    </ul>

                    <div className="row justify-content-between align-items-center">
                        {
                            filtered.map((user, index) =>
                                <div onClick={() => handleClick(userRole.toLowerCase(), user.name)} key={index} className="col-lg-2 col-md-4 col-sm-6 pe-2 my-2">
                                    <div className='d-flex align-items-center bg-white p-3 hover-box cursor-pointer'>
                                        <div className="">
                                            <img width={35} src={userIcon} alt={user.name} />
                                        </div>
                                        <div className="ms-2">
                                            <h2 className='fs-6 outlet-code m-0'>{user.name}</h2>
                                            <p className='stat-title m-0'>{userRole}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    {
                        userDetails.length > 0 &&
                        userDetails.map((data, index) =>
                            <div className="d-flex align-items-center" key={index}>

                                <div className="d-flex align-items-center font-ibm fw-bold">
                                    <div className="sto-number">{parseInt(data.sto.toString().slice(0, 3))}</div>
                                    <div className="sto-number">{parseInt(data.sto.toString().slice(3, 6))}</div>
                                    <div className="sto-number">{parseInt(data.sto.toString().slice(6))}</div>
                                </div>

                                <div className="d-flex">
                                    <div className="font-ibm">{(moment.duration(moment(data.picking_ending_time).diff(moment(data.picking_starting_time)))).hours()} Hours</div>
                                    <div className="font-ibm px-3">{(moment.duration(moment(data.picking_ending_time).diff(moment(data.picking_starting_time)))).minutes()} Minutes</div>
                                    <div className="font-ibm">{(moment.duration(moment(data.picking_ending_time).diff(moment(data.picking_starting_time)))).seconds()} Seconds</div>
                                </div>

                                {/* {
                                    userRole === 'Picker' ?
                                        <div className="">
                                            {
                                                userDetails.reduce((accumulator, currentValue) => {
                                                    return accumulator + currentValue.picking_ending_time || 0 - currentValue.picking_starting_time || 0;
                                                }, 0)
                                            }
                                        </div>
                                        :
                                        <div className="">
                                            {
                                                userDetails.reduce((accumulator, currentValue) => {
                                                    return accumulator + currentValue.sorting_ending_time || 0 - currentValue.sorting_starting_time || 0;
                                                }, 0)
                                            }
                                        </div>
                                } */}
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default Picker;