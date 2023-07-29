import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import vehicleInfo from '../data/vehicleInfo.json'
import useAuth from '../hooks/useAuth';
import _ from 'lodash';

const VehicleAssign = () => {
    const { user, startDate, setStartDate, endDate, setEndDate } = useAuth()
    const [vehicle, setVehicle] = useState()
    const [vehicleType, setVehicleType] = useState("")
    const [selectedVehicleId, setSelectedVehicleId] = useState("")
    const [vehicleRegNo, setVehicleRegNo] = useState()
    const [vehicleWiseData, setVehicleWiseData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await toast.promise(
                fetch(`https://shwapnodc.onrender.com/vehicleWiseData-email-date-range/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`),
                {
                    pending: 'Fetching the latest data...',
                    success: 'Vehicle Number Loaded',
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
        vehicle && setSelectedVehicleId(vehicleWiseData.find(item => item.vehicle === Number(vehicle))?._id)
    }, [vehicle, vehicleWiseData])

    // const vehicleAssign = () => {
    //     let thisVehicleData = vehicleWiseData.find(data => data.vehicle === Number(vehicle))

    //     thisVehicleData = {
    //         ...thisVehicleData,
    //         vehicle_reg_no: vehicleRegNo
    //     }

    //     const index = vehicleWiseData.findIndex(object => {
    //         return object.vehicle === Number(vehicle);
    //     });

    //     setVehicleWiseData(prevArray => {
    //         const newArray = [...prevArray];
    //         newArray[index] = { ...newArray[index], ...thisVehicleData };
    //         return newArray;
    //     });
    //     // updateVehicleWiseData(thisVehicleData)
    // }

    const updateVehicleWiseData = async () => {
        
        let details
        if (vehicleType === 'Hired Vehicle') {
            details = {
                vehicle_type: vehicleType,
                vehicle_reg_no: document.getElementById('vehicle_number_input').value,
                deliveryOutlets: vehicleWiseData.find(item => item.vehicle === Number(vehicle)).stoData.reduce((result, item) => {
                    const key = item.code + item.name;
                    if (!result.some((entry) => entry.code + entry.name === key)) {
                        result.push({ code: item.code, name: item.name });
                    }
                    return result;
                }, [])
            }
        }
        else {
            details = {
                vehicle_type: vehicleType,
                vehicle_reg_no: vehicleRegNo,
                deliveryOutlets: vehicleWiseData.find(item => item.vehicle === Number(vehicle)).stoData.reduce((result, item) => {
                    const key = item.code + item.name;
                    if (!result.some((entry) => entry.code + entry.name === key)) {
                        result.push({ code: item.code, name: item.name });
                    }
                    return result;
                }, [])
            }
        }
        const response = await toast.promise(
            fetch(`https://shwapnodc.onrender.com/vehicleWiseData/${selectedVehicleId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details)
            }),
            {
                pending: 'Please wait. Vehicle assigning',
                success: 'Vehicle Assigned Successfully',
                error: 'There is an error adding new vehicle wise sto. Please try again later!'
            }
        );
        const result = await response.json();
        result.status === true && console.log(result)
        result.status === false && console.log(result)
    }

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">

                    <div className="d-flex align-items-center">
                        <div className="font-ibm">
                            <p className='ms-1 mb-0'>From:</p><DatePicker className='select bg-white' selected={startDate} onChange={(date) => {
                                setStartDate(date)
                                vehicle && setSelectedVehicleId(vehicleWiseData.find(item => item.vehicle === Number(vehicle))?._id)
                            }} />
                        </div>
                        <div className="font-ibm ms-3">
                            <p className='ms-1 mb-0'>To:</p><DatePicker className='select bg-white' selected={endDate} onChange={(date) => {
                                setEndDate(date)
                                vehicle && setSelectedVehicleId(vehicleWiseData.find(item => item.vehicle === Number(vehicle))?._id)
                            }} />
                        </div>

                        {
                            vehicleWiseData.length > 0 &&
                            <div className="font-ibm ms-3">
                                <p className='mb-0 ms-1'>Vehicle Number</p>
                                <select className='select bg-white' onChange={(e) => {
                                    setVehicle(e.target.value)
                                }
                                }>
                                    <option className='font-ibm my-1' value="" selected disabled>Select</option>
                                    {
                                        vehicleWiseData.length > 0 &&
                                        vehicleWiseData.map((v, index) =>
                                            <option key={index + 1} className='font-ibm my-1' value={v.vehicle}>Vehicle {v.vehicle}</option>
                                        )
                                    }
                                </select>
                            </div>
                        }

                        {
                            vehicle &&
                            <div className="font-ibm ms-3">
                                <p className='mb-0 ms-1'>Vehicle Registration Number</p>
                                <select className='select bg-white' onChange={(e) => {
                                    if (e.target.value === 'Hired Vehicle') {
                                        setVehicleType('Hired Vehicle')
                                    }
                                    else {
                                        setVehicleRegNo(e.target.value)
                                        setVehicleType('Own Vehicle')
                                    }
                                }
                                }>
                                    <option className='font-ibm my-1' value="" selected disabled>Select</option>
                                    {
                                        // vehicleWiseData.length > 0 &&
                                        _.orderBy(vehicleInfo, ['no'], ['asc']).map((v, index) =>
                                            <option key={index + 1} className='font-ibm my-1' value={v.no}>{v.no}</option>
                                        )
                                    }
                                    <option className='font-ibm my-1' value="Hired Vehicle">Hired Vehicle</option>
                                </select>
                            </div>
                        }

                    </div>

                    {
                        vehicleType === 'Hired Vehicle' &&
                        <div className="mt-3 ps-1">
                            <input className='font-ibm mb-3' placeholder='DM-MA-11-2483' type="text" id="vehicle_number_input" required />
                            <br />
                            <button onClick={() => updateVehicleWiseData()} className='btn btn-sm btn-success px-4 font-ibm'>Save</button>
                        </div>
                    }

                    {
                        (vehicleRegNo && vehicleType !== 'Hired Vehicle') &&
                        <div className="mt-3 ps-1">
                            <p className="font-ibm">Vehicle {vehicle} is assigned to <b>{vehicleRegNo}</b></p>
                            <button onClick={() => updateVehicleWiseData()} className='btn btn-sm btn-success px-4 font-ibm'>Save</button>
                        </div>
                    }

                    <ToastContainer />
                </div>
            </div>
        </section>
    );
};

export default VehicleAssign;