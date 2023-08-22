import React from 'react';
import DatePicker from "react-datepicker";
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import { groupBy } from 'lodash';
import _ from 'lodash';
import moment from 'moment/moment';
// import stopIcon from '../images/stop.svg'

const VehicleZone = () => {

    const { user, startDate, setStartDate, endDate, setEndDate } = useAuth()
    const [vehicle, setVehicle] = useState()
    const [vehicleWiseData, setVehicleWiseData] = useState([])
    const [vehicleData, setVehicleData] = useState([])
    const [selectedVehicleId, setSelectedVehicleId] = useState("")
    const [flag, setFlag] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const response = await toast.promise(
                fetch(`https://shwapnodc.onrender.com/zoneWiseData-email-date-range/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`),
                {
                    pending: 'Fetching the latest data...',
                    success: 'Zone Wise Data Loaded',
                    error: 'There is an error fetching. Please try again!'
                }
            );
            const result = await response.json();
            if (result.status === true) {
                setVehicleWiseData(result.vehicleWiseData)
            }
            else {
                console.log(result)
            }
        };
        fetchData();
    }, [user.email, startDate, endDate])

    useEffect(() => {
        vehicle && setVehicleData(vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === vehicle)?.stoData)
        vehicle && setSelectedVehicleId(vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === vehicle)?._id)
    }, [vehicle, vehicleWiseData])

    const handlePickerChange = (index, stoNumber, picker) => {

        let thisStoData = vehicleData.find(data => data.sto === stoNumber)

        thisStoData = {
            ...thisStoData,
            picker,
            picking_starting_time: Date.now(),
            status: "Assigned"
        }

        setVehicleData(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        })
        setFlag(1)
        // updatePickerStatus(picker, 1)
    }

    const handlePickingEnd = (index, stoNumber) => {

        let thisStoData = vehicleData.find(data => data.sto === stoNumber)

        thisStoData = {
            ...thisStoData,
            picking_ending_time: Date.now(),
        }

        setVehicleData(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        })
        setFlag(1)
        // updatePickerStatus(picker, 1)
    }

    const handleSorterChange = (index, stoNumber, sorter) => {

        let thisStoData = vehicleData.find(data => data.sto === stoNumber)

        thisStoData = {
            ...thisStoData,
            sorter,
            sorting_starting_time: Date.now(),
            status: "Assigned"
        }

        setVehicleData(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
        setFlag(1)
        // updateSorterStatus(sorter, 1)
    }

    const handleSortingEnd = (index, stoNumber) => {

        let thisStoData = vehicleData.find(data => data.sto === stoNumber)

        thisStoData = {
            ...thisStoData,
            sorting_ending_time: Date.now(),
        }

        setVehicleData(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
        setFlag(1)
        // updateSorterStatus(sorter, 1)
    }

    // const updatePickerStatus = (picker, value) => {

    //     const pickerToUpdate = user.pickers.find(p => p.name === picker);
    //     if (pickerToUpdate) {
    //         pickerToUpdate.status = value;
    //     }
    //     // const pickers = {
    //     //     pickers: user.pickers
    //     // }
    //     // updatePickerSorter(pickers)
    // }

    // const updateSorterStatus = (sorter, value) => {
    //     const sorterToUpdate = user.sorters.find(s => s.name === sorter);
    //     if (sorterToUpdate) {
    //         sorterToUpdate.status = value;
    //     }
    //     // const sorters = {
    //     //     sorters: user.sorters
    //     // }
    //     // updatePickerSorter(sorters)
    // }

    // const updatePickerSorter = (person) => {
    //     fetch(`https://shwapnodc.onrender.com/user/${user._id}`, {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(person)
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result.status === true) {
    //                 toast.success(`${result.message}`, {
    //                     position: "top-right",
    //                     autoClose: 2000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                 });
    //             }
    //             else {
    //                 toast.warn(`${result.message}`, {
    //                     position: "top-right",
    //                     autoClose: 2000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                 });
    //             }
    //         })
    //         .catch(err => toast.warn(`${err}`, {
    //             position: "top-right",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         }))
    // }

    // const handleSaveSubmit = () => {
    //     if (vehicleData.length > 0) {
    //         let btn = document.getElementById('vehicle_zone_submit_btn')
    //         btn.disabled = true
    //         btn.innerText = 'Submitting...'

    //         const details = {
    //             stoData: vehicleData
    //         }
    //         fetch(`https://shwapnodc.onrender.com/vehicleWiseData/${selectedVehicleId}`, {
    //             method: 'PATCH',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(details)
    //         })
    //             .then(response => response.json())
    //             .then(result => {
    //                 if (result.status === true) {
    //                     toast.success(`${result.message}`, {
    //                         position: "top-right",
    //                         autoClose: 2000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                         theme: "light",
    //                     });
    //                     setVehicleData([])
    //                     btn.disabled = false
    //                     btn.innerText = 'Save and Submit'
    //                     const fetchData = async () => {
    //                         const response = await fetch(`https://shwapnodc.onrender.com/zoneWiseData-email-date-range/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`)
    //                         const result = await response.json();
    //                         if (result.status === true) {
    //                             setVehicleWiseData(result.vehicleWiseData)
    //                         }
    //                         else {
    //                             console.log(result)
    //                         }
    //                     };
    //                     fetchData();
    //                 }
    //                 else {
    //                     toast.warn(`${result.message}`, {
    //                         position: "top-right",
    //                         autoClose: 2000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                         theme: "light",
    //                     });
    //                 }
    //             })
    //             .catch(err => toast.warn(`${err}`, {
    //                 position: "top-right",
    //                 autoClose: 2000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             }))
    //     }
    // }

    useEffect(()=> {
        const fetchData = async () => {
            const details = {
                stoData: vehicleData
            }
            const response = await fetch(`https://shwapnodc.onrender.com/vehicleWiseData/${selectedVehicleId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details)
            })
            const result = await response.json()
            if(result.status) {
                const fetchData = async () => {
                    const response = await fetch(`https://shwapnodc.onrender.com/zoneWiseData-email-date-range/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`)
                    const result = await response.json();
                    if (result.status === true) {
                        setFlag(0)
                        setVehicleWiseData(result.vehicleWiseData)
                    }
                    else {
                        console.log(result)
                    }
                };
                fetchData();
            }
        }
        flag === 1 && fetchData()
    },[vehicleData, selectedVehicleId, startDate, endDate, user.email, flag])

    console.log(vehicleData)

    return (
        <div>
            <div className="d-flex align-items-center">
                <div className="font-ibm">
                    <p className='ms-1 mb-0'>From:</p><DatePicker className='select bg-white' selected={startDate} onChange={(date) => {
                        setStartDate(date)
                        setVehicleData(vehicleWiseData.find(item => item.vehicle === Number(vehicle))?.stoData)
                        setSelectedVehicleId(vehicleWiseData.find(item => item.vehicle === Number(vehicle))?._id)
                    }} />
                </div>
                <div className="font-ibm ms-3">
                    <p className='ms-1 mb-0'>To:</p><DatePicker className='select bg-white' selected={endDate} onChange={(date) => {
                        setEndDate(date)
                        setVehicleData(vehicleWiseData.find(item => item.vehicle === Number(vehicle))?.stoData)
                        setSelectedVehicleId(vehicleWiseData.find(item => item.vehicle === Number(vehicle))?._id)
                    }} />
                </div>
                <div className="font-ibm ms-3">
                    <p className='mb-0 ms-1'>Zone</p>
                    <select className='select bg-white' onChange={(e) => {
                        setVehicle(e.target.value)
                        // setVehicleWiseData([])
                        // setVehicleData(vehicleWiseData.find(item => item.vehicle === Number(vehicle))?.stoData)
                        // setSelectedVehicleId(vehicleWiseData.find(item => item.vehicle === Number(vehicle))?._id)
                    }
                    }>
                        <option className='font-ibm my-1' value="" selected disabled>Select</option>
                        {
                            vehicleWiseData.length > 0 &&
                            // _.orderBy(vehicleWiseData, ['zone'], ['asc']).map((v, index) =>
                            vehicleWiseData.map((v, index) =>
                                <option key={index + 1} className='font-ibm my-1' value={`${v.zone}-${v.vehicle}`}>{v.zone} {v.vehicle}</option>
                            )
                        }
                    </select>
                </div>
            </div>

            <div className="">
                {/* <button className='btn btn-primary btn-sm ms-auto d-block my-2 font-ibm' id='vehicle_zone_submit_btn' onClick={() => handleSaveSubmit()} >Save and Submit</button> */}
                <div style={{ maxHeight: '600px' }} className="table-responsive mt-3">
                    <table style={{ fontSize: "13px" }} className="table table-bordered font-ibm bg-white">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#DFE0EB', height: '40px', borderRight: '1px solid lightgrey' }} scope="col" className='view-sto-list-header'>No</th>
                                <th style={{ backgroundColor: '#DFE0EB', height: '40px', borderRight: '1px solid lightgrey' }} scope="col" className='view-sto-list-header'>Code</th>
                                <th style={{ backgroundColor: '#DFE0EB', height: '40px', borderRight: '1px solid lightgrey' }} scope="col" className='view-sto-list-header'>Name</th>
                                <th style={{ backgroundColor: '#DFE0EB', height: '40px', borderRight: '1px solid lightgrey' }} scope="col" className='text-center view-sto-list-header'>STO</th>
                                <th style={{ backgroundColor: '#DFE0EB', height: '40px', borderRight: '1px solid lightgrey' }} scope="col" className='text-center view-sto-list-header'>SKUs</th>
                                <th style={{ backgroundColor: '#DFE0EB', height: '40px', borderRight: '1px solid lightgrey' }} scope="col" className='text-center view-sto-list-header'>Picker</th>
                                <th style={{ backgroundColor: '#DFE0EB', height: '40px', borderRight: '1px solid lightgrey' }} scope="col" className='text-center view-sto-list-header'>Sorter</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {Object.values(groupBy(vehicleData, 'code')).map((outletGroup, index) => (
                                <React.Fragment key={index}>
                                    {outletGroup.map((item, innerIndex) => (
                                        <tr key={`${index}-${innerIndex}`}>
                                            {innerIndex === 0 ? (
                                                <>
                                                    <td rowSpan={outletGroup.length} className="text-center">{index + 1}</td>
                                                    <td rowSpan={outletGroup.length} className="text-center">{item.code}</td>
                                                </>
                                            ) : null}
                                            <td className='text-center'>{item.name}</td>
                                            <td className='text-center'>
                                                <div className="d-flex justify-content-center align-items-center font-ibm fw-bold">
                                                    <div className="sto-number">{parseInt(item.sto.toString().slice(0, 3))}</div>
                                                    <div className="sto-number">{parseInt(item.sto.toString().slice(3, 6))}</div>
                                                    <div className="sto-number">{parseInt(item.sto.toString().slice(6))}</div>
                                                </div>
                                            </td>
                                            <td className='text-center'>{item.sku}</td>
                                            <td className='text-center'>
                                                {
                                                    item.picker ?
                                                        <>
                                                            <p style={{ border: '2px solid #0C4C9C', borderRadius: '4px', width: '150px', color:'#0C4C9C' }} className='mx-auto d-block m-0 p-1 fw-bold'>{item.picker} is Picking</p>
                                                            <p className='m-0 pt-1 fw-bold'>Started at {moment(item.picking_starting_time).format('LTS')}</p>
                                                        </> :
                                                        <select
                                                            style={{ maxWidth: '150px', fontSize: '13px' }}
                                                            onChange={(e) => handlePickerChange(index, item.sto, e.target.value)}
                                                            className='select-picker' name="" id={`picker-${index}`}>
                                                            <option className='font-ibm' value="" selected disabled>Select Picker</option>
                                                            {
                                                                user.email &&
                                                                user.pickers.map((picker, index) =>
                                                                    <option key={index} value={picker.name}>{picker.name}</option>
                                                                )}
                                                        </select>
                                                }
                                            </td>
                                            <td className='text-center'>
                                                {
                                                    item.sorter ?
                                                        <>
                                                            <p style={{ border: '2px solid #0C4C9C', borderRadius: '4px', width: '150px', color:'#0C4C9C' }} className='m-0 p-1 mx-auto d-block fw-bold'>{item.sorter} is Sorting</p>
                                                            <p className='m-0 pt-1 fw-bold'>Started at {moment(item.sorting_starting_time).format('LTS')}</p>
                                                        </>
                                                        :
                                                        <select
                                                            style={{ maxWidth: '150px', fontSize: '13px' }}
                                                            onChange={(e) => handleSorterChange(index, item.sto, e.target.value)}
                                                            className='select-picker' name="" id={`picker-${index}`}>
                                                            <option className='font-ibm' value="" selected disabled>Select Sorter</option>
                                                            {
                                                                user.email &&
                                                                user.sorters.map((sorter, index) =>
                                                                    <option key={index} value={sorter.name}>{sorter.name}</option>
                                                                )}
                                                        </select>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))} */}
                            {
                                // _.orderBy(vehicleData, ['code'], ['asc'])
                                (vehicleData?.length > 0 || vehicleData !== undefined) &&
                                vehicleData.map((item, index) =>
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{item.code}</td>
                                        <td className='text-center'>{item.name}</td>
                                        <td className='text-center'>
                                            <div className="d-flex justify-content-center align-items-center font-ibm fw-bold">
                                                <div className="sto-number">{parseInt(item.sto.toString().slice(0, 3))}</div>
                                                <div className="sto-number">{parseInt(item.sto.toString().slice(3, 6))}</div>
                                                <div className="sto-number">{parseInt(item.sto.toString().slice(6))}</div>
                                            </div>
                                        </td>
                                        <td className='text-center'>{item.sku}</td>
                                        <td className='text-center'>
                                            {
                                                item.picker ?
                                                    <div className='d-flex justify-content-center align-items-center'>
                                                        <div className="col-md-8">
                                                            <p style={{ border: '2px solid #0C4C9C', borderRadius: '4px', width: '150px', color: '#0C4C9C' }} className='mx-auto d-block m-0 p-1 fw-bold'>{item.picker}{item.picking_ending_time ? ' Picked': ' is Picking'}</p>
                                                            <p className='m-0 pt-1 fw-bold'>Started at {moment(item.picking_starting_time).format('LTS')}</p>
                                                            {
                                                                item.picking_ending_time && <p className='m-0 pt-1 fw-bold'>Ended at {moment(item.picking_ending_time).format('LTS')}</p>
                                                            }
                                                        </div>
                                                        {
                                                            !item.picking_ending_time && 
                                                            <div onClick={()=> handlePickingEnd(index, item.sto)} className="col-md-4">
                                                            <button className='btn btn-sm px-3 btn-outline-danger'>
                                                                {/* <img width={20} src={stopIcon} alt="stop" /> */}
                                                                End</button>
                                                        </div>
                                                        }
                                                    </div> :
                                                    <select
                                                        style={{ maxWidth: '150px', fontSize: '13px' }}
                                                        onChange={(e) => handlePickerChange(index, item.sto, e.target.value)}
                                                        className='select-picker' name="" id={`picker-${index}`}>
                                                        <option className='font-ibm' value="" selected disabled>Select Picker</option>
                                                        {
                                                            user.email &&
                                                            _.sortBy(user.pickers, 'name' ).map((picker, index) =>
                                                                <option key={index} value={picker.name}>{picker.name}</option>
                                                            )}
                                                    </select>
                                            }
                                        </td>
                                        <td className='text-center'>
                                            {
                                                item.sorter ?
                                                    <div className='d-flex justify-content-center align-items-center'>
                                                        <div className="col-md-8">
                                                            <p style={{ border: '2px solid #0C4C9C', borderRadius: '4px', width: '150px', color: '#0C4C9C' }} className='m-0 p-1 mx-auto d-block fw-bold'>{item.sorter} {item.sorting_ending_time ? " Sorted":" is Sorting"}</p>
                                                            <p className='m-0 pt-1 fw-bold'>Started at {moment(item.sorting_starting_time).format('LTS')}</p>
                                                            {
                                                                item.sorting_ending_time && <p className='m-0 pt-1 fw-bold'>Ended at {moment(item.sorting_ending_time).format('LTS')}</p>
                                                            }
                                                        </div>
                                                        {
                                                            !item.sorting_ending_time && 
                                                            <div onClick={()=> handleSortingEnd(index, item.sto)} className="col-md-4">
                                                            <button className='btn btn-sm px-3 btn-outline-danger'>
                                                                {/* <img width={20} src={stopIcon} alt="stop" /> */}
                                                                End</button>
                                                        </div>
                                                        }
                                                    </div>
                                                    :
                                                    <select
                                                        style={{ maxWidth: '150px', fontSize: '13px' }}
                                                        onChange={(e) => handleSorterChange(index, item.sto, e.target.value)}
                                                        className='select-picker' name="" id={`picker-${index}`}>
                                                        <option className='font-ibm' value="" selected disabled>Select Sorter</option>
                                                        {
                                                            user.email &&
                                                            _.sortBy(user.sorters, 'name').map((sorter, index) =>
                                                                <option key={index} value={sorter.name}>{sorter.name}</option>
                                                            )}
                                                    </select>
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                            <tr>
                                <td colSpan="4" className='text-center'>Grand Total</td>
                                <td className='text-center'>{vehicleData !== undefined && vehicleData.reduce((a, c) => a + c.sku, 0)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer autoClose={1000} />
        </div>
    );
};

export default VehicleZone;