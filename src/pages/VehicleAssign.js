import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import vehicleInfo from '../data/vehicleInfo.json'
import useAuth from '../hooks/useAuth';
import _ from 'lodash';
// import { groupBy } from 'lodash';
// import { useForm } from 'react-hook-form';

const VehicleAssign = () => {
    const { user, startDate, setStartDate, endDate, setEndDate } = useAuth()
    const [vehicle, setVehicle] = useState()
    const [vehicleType, setVehicleType] = useState("")
    const [selectedVehicleId, setSelectedVehicleId] = useState("")
    const [vehicleData, setVehicleData] = useState([])
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
        vehicle && setVehicleData(vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === vehicle)?.stoData)
        vehicle && setSelectedVehicleId(vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === vehicle)?._id)
    }, [vehicle, vehicleWiseData])

    console.log("Vehicle Wise Data ", vehicleWiseData)
    console.log("Selected Zone STO Data ", vehicleData)

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
                deliveryOutlets: vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === vehicle).stoData.reduce((result, item) => {
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
                deliveryOutlets: vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === vehicle).stoData.reduce((result, item) => {
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
        if (result.status) {
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
        }
        result.status === false && console.log(result)
    }

    const handleSelectedSTO = (sto) => {
        document.getElementById(sto).checked ? console.log(sto, "Checked") : console.log(sto, "Not Checked")
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
                                <p className='mb-0 ms-1'>Zone</p>
                                <select className='select bg-white' onChange={(e) => {
                                    setVehicle(e.target.value)
                                }
                                }>
                                    <option className='font-ibm my-1' value="" selected disabled>Select</option>
                                    {
                                        vehicleWiseData.length > 0 &&
                                        vehicleWiseData.map((v, index) =>
                                            <option key={index + 1} className='font-ibm my-1' value={`${v.zone}-${v.vehicle}`}>{v.zone} {v.vehicle}</option>
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

                    {
                        vehicle &&
                        <div className="my-3">
                            <h2 className="h6 font-ibm mt-3">{vehicle} Zone</h2>
                            <div className="bg-white shadow-sm rounded py-3 ps-3 col-sm-3">
                                {
                                    vehicleData.map(outlet =>
                                        <div onClick={() => handleSelectedSTO(outlet.sto)} key={outlet.sto}>
                                            <input className='mt-2' type="checkbox" id={`${outlet.sto}`} value={`${outlet.sto}`} />
                                            <label htmlFor={`${outlet.sto}`} className='ms-2 me-5 font-ibm mb-1'>{outlet.sto}</label>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    }

                    <h2 className='font-ibm h6 mt-3 mb-0'>Showing Data for Selected Date Range</h2>
                    <div style={{ maxHeight: '450px', overflowY: 'auto' }} className="table-responsive bg-white">
                        <table style={{ fontSize: "13px" }} className="table table-bordered font-ibm m-0">
                            <thead>
                                <tr>
                                    <th scope="col" className='text-center'>Zone</th>
                                    <th scope="col" className='text-center'>Code</th>
                                    <th scope="col" className='text-center'>Name</th>
                                    <th scope="col" className='text-center'>STO</th>
                                    <th scope="col" className='text-center'>SKU</th>
                                    <th scope="col" className='text-center'>Vehicle Registration No</th>
                                    <th scope="col" className='text-center'>Driver Name</th>
                                    <th scope="col" className='text-center'>Driver Number</th>
                                    <th scope="col" className='text-center'>Helper Name</th>
                                    {/* <th scope="col" className='text-center'>Vehicle Status</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    vehicleWiseData.length > 0 ?
                                        vehicleWiseData.map((vehicle, index) =>
                                            <tr key={index}>
                                                <td>{vehicle.zone} {vehicle.vehicle}</td>
                                                <td>{
                                                    vehicle.stoData.map((item, innerIndex) =>
                                                        <React.Fragment key={item.sto}>
                                                            {innerIndex > 0 && vehicle.stoData[innerIndex - 1].code === item.code ? "---" : item.code}
                                                            <br />
                                                        </React.Fragment>
                                                    )
                                                }
                                                </td>
                                                <td>{
                                                    vehicle.stoData.map((item, innerIndex) =>
                                                        <React.Fragment key={item.sto}>
                                                            {innerIndex > 0 && vehicle.stoData[innerIndex - 1].name === item.name ? "---" : item.name}
                                                            <br />
                                                        </React.Fragment>
                                                    )
                                                }
                                                </td>
                                                <td>{
                                                    vehicle.stoData.map((item) =>
                                                        <React.Fragment key={item.sto}>
                                                            {item.sto}
                                                            <br />
                                                        </React.Fragment>
                                                    )
                                                }
                                                </td>
                                                <td>{
                                                    vehicle.stoData.map((item) =>
                                                        <React.Fragment key={item.sto}>
                                                            {item.sku}
                                                            <br />
                                                        </React.Fragment>
                                                    )
                                                }
                                                </td>
                                                <td className='text-center'>{vehicle.vehicle_reg_no}</td>
                                                <td className='text-center'>{vehicle.driver_name}</td>
                                                <td className='text-center'>{vehicle.driver_phone}</td>
                                                <td className='text-center'>{vehicle.helper_name}</td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="8" className='font-ibm'>
                                                <div>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <div style={{ width: '18px', height: '18px' }} className="spinner-border text-dark" role="status"></div>
                                                        <p className='font-ibm mt-3 ms-2'>Loading...</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                    <ToastContainer autoClose={1000} />
                </div>
            </div>
        </section>
    );
};

export default VehicleAssign;