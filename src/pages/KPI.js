import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import useAuth from '../hooks/useAuth';
import moment from 'moment/moment';
import BarChart from '../components/Charts/BarChart';
import truck from '../images/truck.svg'
import _ from 'lodash'
import { CSVLink } from 'react-csv';

const KPI = () => {

    const { user, startDate, setStartDate, endDate, setEndDate } = useAuth()
    // const [vehicleWiseData, setVehicleWiseData] = useState([])
    const [picker, setPicker] = useState("")
    const [sorter, setSorter] = useState("")
    const [pickedSto, setPickedSto] = useState([])
    const [pickedData, setPickedData] = useState([])
    const [sortedData, setSortedData] = useState([])
    const [sortedSto, setSortedSto] = useState([])
    const [selectedPickerSto, setSelectedPickerSto] = useState([])
    const [selectedSorterSto, setSelectedSorterSto] = useState([])
    const [vehicleData, setVehicleData] = useState([])
    // const [vehicles, setVehicles] = useState([])
    const [pickerKpi, setPickerKpi] = useState([])
    const [sorterKpi, setSorterKpi] = useState([])

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await toast.promise(
                    fetch(`https://shwapnodc.onrender.com/picker-kpi/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`),
                    {
                        pending: "Fetching Picker KPI",
                        success: "Picker KPI Loaded",
                        error: "There is an error fetching. Please try again"
                    }
                )
                const result = await response.json()
                result.status && setPickerKpi(result.pickerData)
            }
            fetchData()
        }
        catch {

        }
    }, [user.email, startDate, endDate])

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await toast.promise(
                    fetch(`https://shwapnodc.onrender.com/sorter-kpi/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`),
                    {
                        pending: "Fetching Sorter KPI",
                        success: "Sorter KPI Loaded",
                        error: "There is an error fetching. Please try again"
                    }
                )
                const result = await response.json()
                result.status && setSorterKpi(result.sorterData)
            }
            fetchData()
        }
        catch {

        }
    }, [user.email, startDate, endDate])

    useEffect(() => {
        setPickedSto([].concat(...pickerKpi.map(item => item.stoData)).filter(item => item.hasOwnProperty("picking_ending_time")))
        setSortedSto([].concat(...sorterKpi.map(item => item.stoData)).filter(item => item.hasOwnProperty("sorting_ending_time")))
    }, [pickerKpi, sorterKpi, picker, sorter])

    useEffect(() => {
        setSelectedPickerSto(pickedSto.filter(item => item.picker === picker))
        setSelectedSorterSto(sortedSto.filter(item => item.sorter === sorter))
    }, [pickedSto, sortedSto, picker, sorter])

    useEffect(() => {
        setPickedData(pickedSto.reduce((result, current) => {
            const existingIndex = result.findIndex(item => item.name === current.picker);

            if (existingIndex !== -1) {
                result[existingIndex].sku += current.sku;
                result[existingIndex].time += (current.picking_ending_time - current.picking_starting_time);
            } else {
                result.push(
                    {
                        name: current.picker,
                        sku: current.sku,
                        time: current.picking_ending_time - current.picking_starting_time
                    }
                );
            }
            return result;
        }, []))

        setSortedData(sortedSto.reduce((result, current) => {
            const existingIndex = result.findIndex(item => item.name === current.sorter);

            if (existingIndex !== -1) {
                result[existingIndex].sku += current.sku;
                result[existingIndex].time += (current.sorting_ending_time - current.sorting_starting_time);
            } else {
                result.push(
                    {
                        name: current.sorter,
                        sku: current.sku,
                        time: current.sorting_ending_time - current.sorting_starting_time
                    },
                );
            }
            return result;
        }, []))
    }, [pickedSto, sortedSto])

    useEffect(() => {
        try {
            setVehicleData([])
            const fetchData = async () => {
                const response = await toast.promise(
                    fetch(`https://shwapnodc.onrender.com/vehicleHistoryData`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            from_date: startDate.toISOString().split("T")[0],
                            from_time: "00:00",
                            to_date: endDate.toISOString().split("T")[0],
                            to_time: "23:59",
                            device_name: ""
                        }),
                    }),
                    {
                        pending: 'Fetching the latest Vehicle data...',
                        success: 'Vehicle Data Loaded',
                        error: 'There is an error fetching vehicle data. Please try again!'
                    }
                );
                const result = await response.json();
                if (result.status === true) {
                    setVehicleData(result?.data?.data)
                }
                else {
                    console.log(result)
                }
            };
            fetchData();
        }
        catch (error) {
            console.log(error)
        }
    }, [startDate, endDate])

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                    {/* <b>KPI</b>
                    <div className="mt-5">
                        <b>Picking, pack and sort KPI</b>
                        <div className="">Picking time</div>
                        <div className="">Picking per day</div>
                        <div className="">Picker Efficiency ( Total SKU allocated / Total time picking)</div>
                        <div className="">STO efficiency - No of products in DN / No of products in STO</div>
                        <div className="">Sorter 800 SKU need to be done per day</div>
                        <div className="">Picker absence count</div>
                    </div>

                    <div className="mt-3">
                        <b>Logistics KPI (Own Car and vendor car)</b>
                        <div className="">Vehicle Mileage*</div>
                        <div className="">Fuel cost</div>
                        <div className="">Maintenance Cost*</div>
                        <div className="">Idle time</div>
                        <div className="">Maintenance time</div>
                        <div className="">Operate time</div>
                        <div className="">Loader Efficiency = All Sku / total time</div>
                        <div className="">Vehicle efficiency - No. of trips/ Total Cost</div>
                    </div>

                    <div className="mt-3">
                        <b>Expense KPI</b>
                        <div className="">Picker cost</div>
                        <div className="">Entertainment cost</div>
                        <div className="">Over time cost</div>
                        <div className="">Convenience cost ( if anyone visit for work)</div>
                        <div className="">Vendor car cost</div>
                        <div className="">Own car cost</div>
                        <div className="">Fuel cost</div>
                        <div className="">Maintenance Cost</div>
                        <div className="">Vehicle cost</div>
                        <div className="">Driver Mobile expense</div>
                        <div className="">DC square rent _Fixed cost</div>
                        <div className="">Driver Salary Expense</div>
                        <div className="">Electricity __Fixed cost</div>
                        <div className="">Depreciation _Fixed cost</div>
                    </div> */}

                    <div className="d-flex align-items-center">
                        <div className="font-ibm">
                            <p className='ms-1 mb-0'>From:</p><DatePicker className='select bg-white' selected={startDate} onChange={(date) => {
                                setStartDate(date)
                            }} />
                        </div>

                        <div className="font-ibm ms-3">
                            <p className='ms-1 mb-0'>To:</p><DatePicker className='select bg-white' selected={endDate} onChange={(date) => {
                                setEndDate(date)
                            }} />
                        </div>

                        <div className="font-ibm ms-3">
                            <p className='mb-0 ms-2'>Picker</p>
                            <select className='select bg-white' onChange={(e) => {
                                setPicker(e.target.value)
                            }
                            }>
                                <option className='font-ibm my-1' value="" selected disabled>Select</option>
                                {
                                    user?.pickers.length > 0 &&
                                    _.sortBy(user.pickers, "name").map((u, index) =>
                                        <option key={index + 1} className='font-ibm my-1' value={u.name}>{u.name}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="font-ibm ms-3">
                            <p className='mb-0 ms-2'>Sorter</p>
                            <select className='select bg-white' onChange={(e) => {
                                setSorter(e.target.value)
                            }
                            }>
                                <option className='font-ibm my-1' value="" selected disabled>Select</option>
                                {
                                    user?.sorters.length > 0 &&
                                    _.sortBy(user.sorters, "name").map((u, index) =>
                                        <option key={index + 1} className='font-ibm my-1' value={u.name}>{u.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="mt-3 bg-white col-md-5 p-3 rounded shadow-sm mx-2">
                            <h2 className="h5 font-ibm text-center">Picking KPI</h2>
                            {/* <p className='font-ibm m-0'>Total Picking Time:
                                <b>{moment.duration(pickedSto.reduce((a, c) => a + (c.picking_ending_time - c.picking_starting_time), 0)).hours()} Hours </b>
                                <b>{moment.duration(pickedSto.reduce((a, c) => a + (c.picking_ending_time - c.picking_starting_time), 0)).minutes()} Minutes </b>
                                <b>{moment.duration(pickedSto.reduce((a, c) => a + (c.picking_ending_time - c.picking_starting_time), 0)).seconds()} Seconds</b>
                            </p> */}
                            <p className='font-ibm m-0'>Total Picked SKU: <b>{pickedSto.reduce((a, c) => a + c.sku, 0)}</b></p>

                            {
                                pickedData.length > 0 ?
                                    <BarChart
                                        chartTitle="Picker KPI"
                                        chartData={pickedData}
                                        label1="Picked SKU"
                                        bgColor="rgba(255, 99, 132, 0.5)"
                                    />
                                    :
                                    <p>Loading</p>
                            }
                        </div>

                        <div className="mt-3 bg-white col-md-5 p-3 rounded shadow-sm mx-2">
                            <h2 className="h5 font-ibm text-center">Sorting KPI</h2>
                            {/* <p className='font-ibm m-0'>Total Sorting Time:
                                <b>{moment.duration(sortedSto.reduce((a, c) => a + (c.sorting_ending_time - c.sorting_starting_time), 0)).hours()} Hours </b>
                                <b>{moment.duration(sortedSto.reduce((a, c) => a + (c.sorting_ending_time - c.sorting_starting_time), 0)).minutes()} Minutes </b>
                                <b>{moment.duration(sortedSto.reduce((a, c) => a + (c.sorting_ending_time - c.sorting_starting_time), 0)).seconds()} Seconds</b>
                            </p> */}
                            <p className='font-ibm m-0'>Total Sorted SKU: <b>{sortedSto.reduce((a, c) => a + c.sku, 0)}</b></p>

                            {
                                sortedData.length > 0 ?
                                    <BarChart
                                        chartTitle="Sorter KPI"
                                        chartData={sortedData}
                                        label1="Sorted SKU"
                                        bgColor="rgba(53, 162, 235, 0.5)"
                                    /> :
                                    <p>Loading</p>
                            }
                        </div>
                    </div>

                    <CSVLink
                        data={pickedSto.map(item => ({
                            Code: item.code,
                            Name: item.name,
                            STO: item.sto,
                            SKU: item.sku,
                            "Picking Starting Time": moment(item.picking_starting_time).format("LTS"),
                            "Picking Ending Time": moment(item.picking_ending_time).format("LTS"),
                            "Picking Time": `${moment.duration(item.picking_ending_time - item.picking_starting_time).hours()}:${moment.duration(item.picking_ending_time - item.picking_starting_time).minutes()}: ${moment.duration(item.picking_ending_time - item.picking_starting_time).seconds()}`,
                            "Picker Name": item.picker
                        }))}
                        filename={`Picker Report ${startDate.toISOString().split('T')[0]} - ${endDate.toISOString().split('T')[0]}.csv`}
                        className="text-decoration-none text-black me-4"
                        target="_blank"
                    >
                        <button className='btn btn-primary mt-3'>Download Picker Report</button>
                    </CSVLink>

                    <CSVLink
                        data={sortedSto.map(item => ({
                            Code: item.code,
                            Name: item.name,
                            STO: item.sto,
                            SKU: item.sku,
                            "Sorting Starting Time": moment(item.sorting_starting_time).format("LTS"),
                            "Sorting Ending Time": moment(item.sorting_ending_time).format("LTS"),
                            "Sorting Time": `${moment.duration(item.sorting_ending_time - item.sorting_starting_time).hours()}:${moment.duration(item.sorting_ending_time - item.sorting_starting_time).minutes()}: ${moment.duration(item.sorting_ending_time - item.sorting_starting_time).seconds()}`,
                            "Sorter Name": item.sorter
                        }))}
                        filename={`Sorter Report ${startDate.toISOString().split('T')[0]} - ${endDate.toISOString().split('T')[0]}.csv`}
                        className="text-decoration-none text-black me-4"
                        target="_blank"
                    >
                        <button className='btn btn-info mt-3 text-white'>Download Sorter Report</button>
                    </CSVLink>


                    {/* Selected Picker Sorter Details */}
                    <div className="row align-items-center">
                        {
                            picker &&
                            <div style={{ borderLeft: '5px solid rgba(255, 99, 132, 0.5)' }} className="mt-3 bg-white p-3 rounded shadow-sm mx-2 col-md-5">
                                <h2 className="h5 font-ibm">{picker} KPI <small>(Picker)</small></h2>
                                {/* <p className='font-ibm m-0'>Total Picking Time:
                                    <b>{moment.duration(selectedPickerSto.reduce((a, c) => a + (c.picking_ending_time - c.picking_starting_time), 0)).hours()}h </b>
                                    <b>{moment.duration(selectedPickerSto.reduce((a, c) => a + (c.picking_ending_time - c.picking_starting_time), 0)).minutes()}min </b>
                                    <b>{moment.duration(selectedPickerSto.reduce((a, c) => a + (c.picking_ending_time - c.picking_starting_time), 0)).seconds()}s</b>
                                </p> */}
                                <p className='font-ibm m-0'>Total Picked SKU: <b>{selectedPickerSto.reduce((a, c) => a + c.sku, 0)}</b></p>
                            </div>
                        }

                        {
                            sorter &&
                            <div style={{ borderLeft: '5px solid rgba(53, 162, 235, 0.5)' }} className="mt-3 bg-white p-3 rounded shadow-sm mx-2 col-md-5">
                                <h2 className="h5 font-ibm">{sorter} KPI <small>(Sorter)</small></h2>
                                {/* <p className='font-ibm m-0'>Total Sorting Time:
                                    <b>{moment.duration(selectedSorterSto.reduce((a, c) => a + (c.sorting_ending_time - c.sorting_starting_time), 0)).hours() || 0}h </b>
                                    <b>{moment.duration(selectedSorterSto.reduce((a, c) => a + (c.sorting_ending_time - c.sorting_starting_time), 0)).minutes() || 0}m </b>
                                    <b>{moment.duration(selectedSorterSto.reduce((a, c) => a + (c.sorting_ending_time - c.sorting_starting_time), 0)).seconds() || 0}s</b>
                                </p> */}
                                <p className='font-ibm m-0'>Total Sorted SKU: <b>{selectedSorterSto.reduce((a, c) => a + c.sku, 0)}</b></p>
                            </div>
                        }
                    </div>

                    <div className="row align-items-center mt-3">
                        {
                            vehicleData.length > 0 ?
                                <>
                                    <h2 className='h5 font-ibm'><img width={25} src={truck} alt="vehicle name" /> Vehicle KPI</h2>
                                    {
                                        vehicleData.map((v, i) =>
                                            <div key={i} style={{ borderLeft: '5px solid rgb(75, 192, 192)' }} className="mt-3 bg-white p-3 rounded shadow-sm mx-2 col-md-3">
                                                <h2 className="h5 font-ibm"><b>{v.name}</b> <img width={25} src={truck} alt="vehicle name" /></h2>
                                                <p className='font-ibm m-0'>Distance Covered: <b>{v.distance_sum}</b></p>
                                                <p className='font-ibm m-0'>Operate time: <b>{v.move_duration}</b></p>
                                                <p className='font-ibm m-0'>Idle time: <b>{v.stop_duration}</b></p>
                                                <p className='font-ibm m-0'>Top Speed: <b>{v.top_speed}</b></p>
                                            </div>)
                                    }
                                </>
                                :
                                <div className="spinner-grow d-flex mx-auto d-block" role="status"></div>
                        }
                    </div>

                    <ToastContainer autoClose={1000} />
                </div>
            </div>
        </section>
    );
};

export default KPI;