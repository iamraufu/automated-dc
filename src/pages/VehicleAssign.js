import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import vehicleInfo from '../data/vehicleInfo.json'
import useAuth from '../hooks/useAuth';
import _ from 'lodash';
import UploadDN from '../components/UploadDN';
import Swal from 'sweetalert2';
// import { groupBy } from 'lodash';
// import { useForm } from 'react-hook-form';

const VehicleAssign = () => {
    const { user, startDate, setStartDate, endDate, setEndDate, viewDn } = useAuth()
    const [vehicle, setVehicle] = useState()
    const [vehicleType, setVehicleType] = useState("")
    const [selectedVehicleId, setSelectedVehicleId] = useState("")
    const [vehicleData, setVehicleData] = useState([])
    const [vehicleRegNo, setVehicleRegNo] = useState()
    const [vehicleWiseData, setVehicleWiseData] = useState([])
    // const [selectedSto, setSelectedSto] = useState([])
    const [toggle, setToggle] = useState(false)
    const [driverName, setDriverName] = useState("")
    const [driverPhone, setDriverPhone] = useState("")
    const [deliveryMan, setDeliveryMan] = useState("")

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

    // const handleSelectedSTO = (sto) => {
    //     if (document.getElementById(sto).checked) {
    //         selectedSto.indexOf(sto) === -1 ? setSelectedSto([...selectedSto, sto]) : setSelectedSto(selectedSto)
    //     }
    //     else {
    //         setSelectedSto(selectedSto.filter((item) => item !== sto))
    //     }
    // }

    const updateVehicleWiseData = async () => {
        // let filteredData = vehicleData.filter(data => selectedSto.includes(data.sto));

        // filteredData.forEach(data => {
        //     data.status = "Delivered";
        // });

        // console.log(filteredData)

        const updatedVehicleData = vehicleData.map(vehicleItem => {
            const matchingDn = viewDn.find(dnItem => dnItem.sto === vehicleItem.sto);

            if (matchingDn) {
                return {
                    ...vehicleItem,
                    dn: matchingDn.dn
                };
            } else {
                return vehicleItem;
            }
        });

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
                }, []),
                stoData: updatedVehicleData
            }
            // toggle === false ?
            //     details = {
            //         vehicle_type: vehicleType,
            //         vehicle_reg_no: vehicleRegNo,
            //         deliveryOutlets: vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === vehicle).stoData.reduce((result, item) => {
            //             const key = item.code + item.name;
            //             if (!result.some((entry) => entry.code + entry.name === key)) {
            //                 result.push({ code: item.code, name: item.name });
            //             }
            //             return result;
            //         }, []),
            //         stoData: updatedVehicleData
            //     }
            //     :
            //     details = {
            //         vehicle_type: vehicleType,
            //         vehicle_reg_no: vehicleRegNo,
            //         driver_name: document.getElementById('driver_name').value,
            //         driver_phone: document.getElementById('driver_phone').value,
            //         helper_name: document.getElementById('helper_name').value,
            //         // deliveryOutlets: vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === vehicle).stoData.reduce((result, item) => {
            //         //     const key = item.code + item.name;
            //         //     if (!result.some((entry) => entry.code + entry.name === key)) {
            //         //         result.push({ code: item.code, name: item.name });
            //         //     }
            //         //     return result;
            //         // }, []),
            //         // stoData: updatedVehicleData
            //     }
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
                }, []),
                stoData: updatedVehicleData
            }
            // toggle === false ?
            //     details = {
            //         vehicle_type: vehicleType,
            //         vehicle_reg_no: vehicleRegNo,
            //         deliveryOutlets: vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === vehicle).stoData.reduce((result, item) => {
            //             const key = item.code + item.name;
            //             if (!result.some((entry) => entry.code + entry.name === key)) {
            //                 result.push({ code: item.code, name: item.name });
            //             }
            //             return result;
            //         }, []),
            //         stoData: updatedVehicleData
            //     }
            //     :
            //     details = {
            //         vehicle_type: vehicleType,
            //         vehicle_reg_no: vehicleRegNo,
            //         driver_name: document.getElementById('driver_name').value,
            //         driver_phone: document.getElementById('driver_phone').value,
            //         helper_name: document.getElementById('helper_name').value,
            //         // deliveryOutlets: vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === vehicle).stoData.reduce((result, item) => {
            //         //     const key = item.code + item.name;
            //         //     if (!result.some((entry) => entry.code + entry.name === key)) {
            //         //         result.push({ code: item.code, name: item.name });
            //         //     }
            //         //     return result;
            //         // }, []),
            //         // stoData: updatedVehicleData
            //     }
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
                    // handleUpdate()
                    submit()
                }
                else {
                    console.log(result)
                }
            };
            fetchData();
        }
        result.status === false && console.log(result)
    }

    const handleUpdate = () => {
        setToggle(curr => !curr)
    }

    const submit = () => {
        const details = {
            email: user.email,
            name: user.name,
            dnData: viewDn,
            date: new Date().toISOString().split('T')[0]
        }
        fetch('https://shwapnodc.onrender.com/dn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === true) {
                    // document.getElementById('submit-file-btn').style.display = 'block'
                    // document.getElementById('submit-file-spinner').style.display = 'none'
                    let timerInterval
                    Swal.fire({
                        icon: 'success',
                        title: `${result.message}`,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                            window.location.reload()
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            window.location.reload()
                        }
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: `${result.message}`,
                        timer: 2000
                    })
                }
            })
    }

    const handleDriverDetails = async () => {
        let details
        vehicleRegNo ?
        details = {
            vehicle_type: vehicleType,
            vehicle_reg_no: vehicleRegNo,
            driver_name: driverName,
            driver_phone: driverPhone,
            helper_name: deliveryMan,
        }
        :
        details = {
            driver_name: driverName,
            driver_phone: driverPhone,
            helper_name: deliveryMan,
        }
        console.log(details, selectedVehicleId, vehicleWiseData)
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
        const result =  await response.json()
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
                    handleUpdate()
                }
                else {
                    console.log(result)
                }
            };
            fetchData();
        }
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
                    {/* <button onClick={() => updateVehicleWiseData()} className='btn btn-sm btn-success px-4 font-ibm mt-3'>Save</button> */}
                    {/* <div className="row">
                        <div className="col-sm-5">
                            {
                                vehicle &&
                                <div className="my-3">
                                    <h2 className="h6 font-ibm mt-3">{vehicle} Zone</h2>
                                    <div className="bg-white shadow-sm rounded py-3 ps-3 col-sm-9">
                                        {
                                            vehicleData.map(outlet =>
                                                <div onClick={() => handleSelectedSTO(outlet.sto)} 
                                                key={outlet.sto}>
                                                    <input className='mt-2' type="checkbox" id={`${outlet.sto}`} value={`${outlet.sto}`} />
                                                    <label htmlFor={`${outlet.sto}`} className='ms-2 me-5 font-ibm mb-1'>{outlet.sto}</label>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            }
                        </div>

                        {
                            selectedSto.length > 0 &&
                            <div className="col-sm-5">
                                <h2 className="h6 font-ibm mt-3">Selected Sto</h2>
                                <div className="bg-white shadow-sm rounded py-3 ps-3 col-sm-9">
                                    {
                                        selectedSto.map((item, index) =>
                                            <li style={{ listStyle: 'none' }} key={index} className='mb-2 font-ibm'>
                                                {item}
                                            </li>
                                        )}
                                </div>
                            </div>
                        }
                    </div> */}

                    {
                        vehicle && <UploadDN />
                    }


                    {
                        (vehicleRegNo && vehicleType !== 'Hired Vehicle') &&
                        <div className="mt-3 ps-1">
                            <p className="font-ibm">Vehicle {vehicle} is assigned to <b>{vehicleRegNo}</b></p>
                            {
                                viewDn.length > 0 ?
                                    <button onClick={() => updateVehicleWiseData()} className='btn btn-sm btn-success px-4 font-ibm'>Save</button>
                                    :
                                    <p className='font-ibm text-danger fw-bold'>Please Upload Delivery Note</p>
                            }
                        </div>
                    }

                    {/* <h2 className='font-ibm h6 mt-3 mb-0'>Showing Data for Selected Date Range</h2> */}
                    <button className='btn btn-outline-dark btn-sm px-3 ms-auto d-block my-2 font-ibm' onClick={() => handleUpdate()}>{!toggle ? 'Edit' : 'View'}</button>
                    {
                        toggle &&
                        <button onClick={() => handleDriverDetails()} className='btn btn-success btn-sm px-3 my-2 ms-auto d-block font-ibm'>Save</button>
                    }
                    <div style={{ maxHeight: '450px', overflowY: 'auto' }} className="table-responsive bg-white">
                        <table style={{ fontSize: "13px" }} className="table table-bordered font-ibm m-0">
                            <thead>
                                <tr>
                                    <th scope="col" className='text-center'>Zone</th>
                                    <th scope="col" className='text-center'>Code</th>
                                    <th scope="col" className='text-center'>Name</th>
                                    <th scope="col" className='text-center'>STO</th>
                                    <th scope="col" className='text-center'>DN</th>
                                    <th scope="col" className='text-center'>SKU</th>
                                    <th scope="col" className='text-center'>Vehicle Registration No</th>
                                    <th scope="col" className='text-center'>Driver Name</th>
                                    <th scope="col" className='text-center'>Driver Number</th>
                                    <th scope="col" className='text-center'>Delivery Man</th>
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
                                                        <React.Fragment key={item.dn}>
                                                            {item.dn}
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
                                                {
                                                    !toggle &&
                                                    <>
                                                        <td className='text-center'>{vehicle.vehicle_reg_no}</td>
                                                        <td className='text-center'>{vehicle.driver_name}</td>
                                                        <td className='text-center'>{vehicle.driver_phone}</td>
                                                        <td className='text-center'>{vehicle.helper_name}</td>
                                                    </>
                                                }
                                                {
                                                    toggle &&
                                                    <>
                                                        <td className='text-center'>
                                                            <div className="font-ibm ms-3">
                                                                <select className='py-1' onChange={(e) => {
                                                                    if (e.target.value === 'Hired Vehicle') {
                                                                        setVehicleType('Hired Vehicle')
                                                                    }
                                                                    else {
                                                                        setVehicleRegNo(e.target.value)
                                                                        setVehicleType('Own Vehicle')
                                                                    }
                                                                }
                                                                }>
                                                                    <option className='font-ibm my-1' value="" selected disabled>{vehicle.vehicle_reg_no ? vehicle.vehicle_reg_no : 'Select'}</option>
                                                                    {
                                                                        // vehicleWiseData.length > 0 &&
                                                                        _.orderBy(vehicleInfo, ['no'], ['asc']).map((v, index) =>
                                                                            <option key={index + 1} className='font-ibm my-1' value={v.no}>{v.no}</option>
                                                                        )
                                                                    }
                                                                    <option className='font-ibm my-1' value="Hired Vehicle">Hired Vehicle</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td className='text-center'><input 
                                                        onChange={(e)=> {
                                                            setDriverName(e.target.value)
                                                            setSelectedVehicleId(vehicle._id)
                                                            setSelectedVehicleId(vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === `${vehicle.zone}-${vehicle.vehicle}`)?._id)
                                                            }} defaultValue={vehicle.driver_name} type="text" className='' /></td>
                                                        <td className='text-center'><input 
                                                        onChange={(e)=> {
                                                            setDriverPhone(e.target.value)
                                                            setSelectedVehicleId(vehicle._id)
                                                            setSelectedVehicleId(vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === `${vehicle.zone}-${vehicle.vehicle}`)?._id)
                                                            }} defaultValue={vehicle.driver_phone} type="number" className='' /></td>
                                                        <td className='text-center'><input 
                                                        onChange={(e)=> {
                                                            setDeliveryMan(e.target.value)
                                                            setSelectedVehicleId(vehicle._id)
                                                            setSelectedVehicleId(vehicleWiseData.find(item => `${item.zone}-${item.vehicle}` === `${vehicle.zone}-${vehicle.vehicle}`)?._id)
                                                            }} defaultValue={vehicle.helper_name} type="text" className='' /></td>
                                                    </>
                                                }
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