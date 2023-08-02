import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
// import outletZones from '../data/outletZone.json';
import closeIcon from '../images/close.svg'
import _ from 'lodash';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import categoryCodeData from '../data/catcode.json'
import { groupBy } from 'lodash';
import crossIcon from '../images/cross.svg'
import STOAssign from '../components/STO/STOAssign';
import UpdateVehicleZoneData from './UpdateVehicleZoneData';
import STODetailsModal from '../components/STODetailsModal';
import Swal from 'sweetalert2';

const ZoneAssign = () => {

    const { user, setSto, viewSto, setViewSto, setSelectedZone, startDate, setStartDate, endDate, setEndDate, productCategory, setProductCategory } = useAuth()

    const [stoData, setStoData] = useState({})
    const [zone, setZone] = useState('');

    const [outletZones, setOutletZones] = useState([])

    useEffect(() => {
        fetch(`https://shwapnodc.onrender.com/outlet-zones/${user.email}`)
            .then(response => response.json())
            .then(result => result.status && setOutletZones(result.outletZones.data))
    }, [user.email])

    const outletDivisions = _.sortBy([...new Set(outletZones.map(item => item.zone))])
    const [zoneOutletArray, setZoneOutletArray] = useState([])
    const [counts, setCounts] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const response = await toast.promise(
                fetch(`https://shwapnodc.onrender.com/sto-email-date-range-category-code/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}/${productCategory}/${outletZones.filter(outlet => outlet.zone === zone).map(item => item.code)}`),
                {
                    pending: 'Fetching the latest data...',
                    success: 'Zone Wise Data Loaded',
                    error: 'There is an error fetching. Please try again!'
                }
            );
            const result = await response.json();
            if (result.status === true) {
                setSto(result.sto)
                const stoData = result.sto.reduce((result, obj) => {
                    const sto = obj.sto;

                    const existingItem = result.find(item => {
                        return ('category' in obj && item.sto === sto)
                    });

                    if (existingItem) {
                        existingItem.sku += 1;
                    }
                    else if ('category' in obj) {
                        const item = {
                            code: obj.code,
                            name: obj.name,
                            sto: sto,
                            sku: 1,
                            dc: obj.dc,
                            status: 'Pending'
                        };
                        result.push(item);
                    }
                    return result;
                }, []);
                setViewSto(_.orderBy(stoData, ['code'], ['asc']))
                // setAssignedSto(_.orderBy(stoData, ['code'], ['asc']))
                setSelectedZone([])
            }
            else {
                console.log(result)
            }
        };
        (productCategory.length && outletZones.filter(outlet => outlet.zone === zone).map(item => item.code).length) && fetchData();
    }, [user.email, startDate, endDate, setViewSto, setSto, productCategory, setSelectedZone, outletZones, zone])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await toast.promise(
    //             fetch(`https://shwapnodc.onrender.com/sto-email-date-range-category/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}/${productCategory}`),
    //             {
    //                 pending: 'Fetching the latest data...',
    //                 success: 'Zone Wise Data Loaded',
    //                 error: 'There is an error fetching. Please try again!'
    //             }
    //         );
    //         const result = await response.json();
    //         if (result.status === true) {
    //             setSto(result.sto)
    //             const stoData = result.sto.reduce((result, obj) => {
    //                 const sto = obj.sto;

    //                 const existingItem = result.find(item => {
    //                     return ('category' in obj && item.sto === sto)
    //                 });

    //                 if (existingItem) {
    //                     existingItem.sku += 1;
    //                 }
    //                 else if ('category' in obj) {
    //                     const item = {
    //                         code: obj.code,
    //                         name: obj.name,
    //                         sto: sto,
    //                         sku: 1,
    //                         dc: obj.dc,
    //                         status: 'Pending'
    //                     };
    //                     result.push(item);
    //                 }
    //                 return result;
    //             }, []);
    //             setViewSto(_.orderBy(stoData, ['code'], ['asc']))
    //             setAssignedSto(_.orderBy(stoData, ['code'], ['asc']))
    //             setSelectedZone([])
    //         }
    //         else {

    //         }
    //     };
    //     productCategory.length && fetchData();
    // }, [user.email, startDate, endDate, setViewSto, setSto, productCategory, setAssignedSto, setSelectedZone])


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://shwapnodc.onrender.com/counts/${user.email}`)
            const result = await response.json();
            if (result.status === true) {
                setCounts(result.counts)
            }
            else {
                console.log(result)
            }
        }
        fetchData()
    }, [user.email])

    const handleZoneChange = (e) => {
        // const zoneName = e.target.value;
        // const filteredSto = viewSto.filter(sto => {
        //     return outletZones.filter(item => item.zone === zoneName).some(zone => zone.code === sto.code);
        // });
        // setSelectedZone(filteredSto)
        // setZone(zoneName);
        setZone(e.target.value);
    }

    // const handleOutletAdd = (outlet, index) => {
    //     const value = outlet.name
    //     zonalOutlet.indexOf(value) === -1 ? setZonalOutlet([...zonalOutlet, value]) : setZonalOutlet(zonalOutlet)
    // };

    const handleCategoryAdd = value => {
        productCategory.indexOf(value) === -1 ? setProductCategory([...productCategory, value]) : setProductCategory(productCategory)
    }

    const handleCategoryRemove = elm => {
        setProductCategory(productCategory.filter((item) => item !== elm))
        productCategory.filter((item) => item !== elm).length === 0 && setViewSto([])
    }

    // const handleOutletRemove = elm => {
    //     setZonalOutlet(zonalOutlet.filter((item) => item !== elm))
    // }

    // const handleZoneOutletAdd = () => {

    //     const zoneOutlet = {
    //         zone,
    //         outlets: zonalOutlet
    //     };
    //     setZoneOutletArray(prev => [...prev, zoneOutlet])
    // }

    // const handleZoneOutletRemove = elm => {
    //     setZoneOutletArray(zoneOutletArray.filter(item => item !== elm))
    // }

    // const handleZoneOutletEdit = elm => {
    //     console.log(elm)
    // }

    // console.log(_.orderBy(outletZones.filter(item => item.zone === zone), ['name'], ['asc']))
    // const filteredSto = assignedSto.filter(sto => {
    //     return outletZones.filter(item => item.zone === zoneName).some(zone => zone.code === sto.code);
    // });

    const handleZonalSkuAdd = product => {
        zoneOutletArray.indexOf(product) === -1 ? setZoneOutletArray([...zoneOutletArray, product]) : setZoneOutletArray(zoneOutletArray)
    }

    const handleZonalSkuAddRemove = elm => {
        setZoneOutletArray(zoneOutletArray.filter((item) => item !== elm))
    }

    // useEffect(()=> {
    //     zoneOutletArray.length > 0 && localStorage.setItem('deliverPlan', JSON.stringify(zoneOutletArray))
    // },[zoneOutletArray])

    const assignToVehicle = items => {
        let btn = document.getElementById('vehicle_assign')
        btn.disabled = true
        btn.innerText = 'Assigning...'
        const vehicleDetails = {
            date: new Date().toISOString().split('T')[0],
            email: user.email,
            name: user.name,
            stoData: items,
            zone
        }

        fetch(`https://shwapnodc.onrender.com/sto-email/${user.email}/${items.map(item => item.sto)}`)
            .then(response => response.json())
            .then(result => result.status && updateCount(result.sto.reduce((a, c) => a + c.quantity, 0)))

        const updateCount = async (productCount) => {
            const response = await fetch(`https://shwapnodc.onrender.com/counts/${user.email}`)
            const result = await response.json()

            if (result.status === true) {
                if (result.counts.email) {
                    const details = {
                        "email": result.counts.email,
                        "sto": result.counts.sto - items.length,
                        "sku": result.counts.sku - items.reduce((a, c) => a + c.sku, 0),
                        "outlet": result.counts.outlet - [...new Set(items.map(item => item.code))].length,
                        "quantity": result.counts.quantity - productCount
                    }
                    handleCounts(details)
                }
            }
        }

        const handleCounts = details => {
            fetch('https://shwapnodc.onrender.com/counts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === true) {
                        updateStoStatus()
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: `${result.message}`,
                            timer: 1500
                        })
                    }
                })
        }

        const updateStoStatus = async () => {
            const response = await toast.promise(
                // fetch(`https://shwapnodc.onrender.com/update-products-status/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}/${zoneOutletArray.map(item => item.sto)}/${productCategory.map(item => item)}/${zoneOutletArray.map(item => item.code)}`),
                fetch(`https://shwapnodc.onrender.com/update-sto-status/${zoneOutletArray.map(item => item.sto)}`),
                {
                    pending: 'Please wait. Status Updating',
                    success: 'SKU Status Updated Successfully',
                    error: 'There is an error saving. Try again!'
                }
            );
            const result = await response.json();
            result.status === true && fetchData()
        }

        const fetchData = async () => {
            const response = await toast.promise(
                fetch(`https://shwapnodc.onrender.com/vehicle-wise-sto`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(vehicleDetails)
                }),
                {
                    pending: 'Please wait. Vehicle assigning',
                    success: 'Vehicle Assigned Successfully',
                    error: 'There is an error adding new vehicle wise sto. Please try again later!'
                }
            );
            const result = await response.json();

            if (result.status === true) {
                // const fetchData = async () => {
                //     const response = await toast.promise(
                //         fetch(`https://shwapnodc.onrender.com/sto-email-date-range-category/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}/${productCategory}`),
                //         {
                //             pending: 'Fetching the latest data...',
                //             success: 'Latest data updated',
                //             error: 'There is an error fetching. Please try again!'
                //         }
                //     );
                //     const result = await response.json();
                //     if (result.status === true) {
                //         setSto(result.sto)
                //         const stoData = result.sto.reduce((result, obj) => {
                //             const sto = obj.sto;

                //             const existingItem = result.find(item => {
                //                 return ('category' in obj && item.sto === sto)
                //             });

                //             if (existingItem) {
                //                 existingItem.sku += 1;
                //             }
                //             else if ('category' in obj) {
                //                 const item = {
                //                     code: obj.code,
                //                     name: obj.name,
                //                     sto: sto,
                //                     sku: 1,
                //                     dc: obj.dc,
                //                     status: 'Pending'
                //                 };
                //                 result.push(item);
                //             }
                //             return result;
                //         }, []);
                //         setViewSto(_.orderBy(stoData, ['code'], ['asc']))
                //         setAssignedSto(_.orderBy(stoData, ['code'], ['asc']))
                //         setSelectedZone([])
                //         setZoneOutletArray([])
                //         const fetchData = async () => {
                //             const response = await fetch(`https://shwapnodc.onrender.com/counts/${user.email}`)
                //             const result = await response.json();
                //             if (result.status === true) {
                //                 setCounts(result.counts)
                //             }
                //             else {
                //                 console.log(result)
                //             }
                //         }
                //         fetchData()
                //     }
                //     else {

                //     }
                // };
                // productCategory.length && fetchData();
                const fetchData = async () => {
                    const response = await toast.promise(
                        fetch(`https://shwapnodc.onrender.com/sto-email-date-range-category-code/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}/${productCategory}/${outletZones.filter(outlet => outlet.zone === zone).map(item => item.code)}`),
                        {
                            pending: 'Fetching the latest data...',
                            success: 'Zone Wise Data Loaded',
                            error: 'There is an error fetching. Please try again!'
                        }
                    );
                    const result = await response.json();
                    if (result.status === true) {
                        setSto(result.sto)
                        const stoData = result.sto.reduce((result, obj) => {
                            const sto = obj.sto;

                            const existingItem = result.find(item => {
                                return ('category' in obj && item.sto === sto)
                            });

                            if (existingItem) {
                                existingItem.sku += 1;
                            }
                            else if ('category' in obj) {
                                const item = {
                                    code: obj.code,
                                    name: obj.name,
                                    sto: sto,
                                    sku: 1,
                                    dc: obj.dc,
                                    status: 'Pending'
                                };
                                result.push(item);
                            }
                            return result;
                        }, []);
                        setViewSto(_.orderBy(stoData, ['code'], ['asc']))
                        setSelectedZone([])
                        setZoneOutletArray([])
                        const fetchData = async () => {
                            const response = await fetch(`https://shwapnodc.onrender.com/counts/${user.email}`)
                            const result = await response.json();
                            if (result.status === true) {
                                setCounts(result.counts)
                            }
                            else {
                                console.log(result)
                            }
                        }
                        fetchData()
                    }
                    else {
                        console.log(result)
                    }
                };
                (productCategory.length && outletZones.filter(outlet => outlet.zone === zone).map(item => item.code).length) && fetchData();
            }
        }
    }

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                    <STOAssign />

                    <div className="bg-white py-3 bg-body-tertiary rounded shadow-sm mt-3">
                        <div className='d-flex align-items-center' >
                            <div className="d-flex align-items-center ms-3">
                                <div className="font-ibm"><p className='mb-0 ms-1'>From:</p> <DatePicker className='select bg-white' selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                                <div className="font-ibm ms-3"><p className='ms-1 mb-0'>To:</p> <DatePicker className='select bg-white' selected={endDate} onChange={(date) => setEndDate(date)} /></div>
                                <div className="font-ibm ms-3">
                                    <p className='mb-0 ms-1'>Product Division</p>
                                    <select className='select bg-white' onChange={(e) => {
                                        setProductCategory(e.target.value)
                                        handleCategoryAdd(e.target.value)
                                    }
                                    }>
                                        <option className='font-ibm my-1' value="" selected disabled>Select</option>
                                        {
                                            categoryCodeData.map((product, index) =>
                                                // <option key={index + 1} className='font-ibm my-1' value={product.code}>{product.category}</option>
                                                <option key={index + 1} className='font-ibm my-1' value={product.code}>{product.division}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="ms-3">
                                <div className="font-ibm ms-1">Select Zone:</div>
                                <select className="select font-ibm bg-white" value={zone} onChange={(e) => handleZoneChange(e)}>
                                    <option className="font-ibm" value="" disabled>Select</option>
                                    {
                                        outletDivisions.map((zone, index) => (
                                            <option key={index + 1} className="font-ibm" value={zone}>{zone}</option>
                                        ))}
                                </select>
                            </div>

                            {/* {
                                zone && (
                                    <div className="d-flex align-items-center ms-3">
                                        <div className="font-ibm me-2">Select Outlet:</div>
                                        <select className="select font-ibm"
                                            // value={outlet} 
                                            value=""
                                            onChange={(e) => handleOutletAdd(e.target.value)}>
                                            <option className="font-ibm" value="" disabled>Select</option>
                                            {
                                                _.orderBy(outletZones.filter(item => item.zone === zone), ['name'], ['asc']).map((outlet, index) => (
                                                    <option key={index + 1} className="font-ibm" value={`${outlet.name} (${outlet.code})`}>{outlet.name} ({outlet.code})</option>
                                                ))}
                                        </select>
                                    </div>
                                )} */}
                        </div>

                        <p className='font-ibm ms-3 mt-3'>Pending:
                            <span style={{ border: '1px solid lightgrey' }} className='mx-2 p-2 shadow-sm rounded bg-white'>{counts?.outlet?.toLocaleString()} Outlets</span>
                            <span style={{ border: '1px solid lightgrey' }} className='mx-2 p-2 shadow-sm rounded bg-white'>{counts?.sto?.toLocaleString()} STO</span>
                            <span style={{ border: '1px solid lightgrey' }} className='mx-2 p-2 shadow-sm rounded bg-white'>{counts?.sku?.toLocaleString()} SKU</span>
                            <span style={{ border: '1px solid lightgrey' }} className='mx-2 p-2 shadow-sm rounded bg-white'>{counts?.quantity?.toLocaleString()} Quantity</span>
                        </p>

                        {
                            productCategory.length > 0 &&
                            <div className="my-2 font-ibm ms-3">
                                <span>Master Category: </span>
                                {
                                    productCategory.map((item, index) =>
                                        <button key={index} onClick={() => handleCategoryRemove(item)} type="button" className="btn btn-sm btn-dark me-2 align-items-center my-1"><span>{item}</span><img className='img-fluid mb-1 ms-1' width={15} src={closeIcon} alt="" /></button>
                                    )
                                }
                            </div>
                        }

                        <p className='font-ibm ms-3 mb-0'>Showing {viewSto.reduce((acc, curr) => acc + curr.sku, 0).toLocaleString()} SKU</p>


                        {/* <div className="d-flex mt-2">
                            <div className="ms-3 d-flex">
                                <div style={{ height: '10px', width: '10px' }} className="bg-success mt-1"></div>
                                <p style={{ fontSize: '13px' }} className='font-ibm ms-1'>Available STO</p>
                            </div>
                            <div className="ms-3 d-flex">
                                <div style={{ height: '10px', width: '10px' }} className="bg-danger mt-1"></div>
                                <p style={{ fontSize: '13px' }} className='font-ibm ms-1'>No STO Available</p>
                            </div>
                        </div> */}

                        {/* {
                            zone && (
                                <div className="font-ibm ms-3 mt-2">Zone:<span className="text-primary"> {zone}</span>
                                    <br />
                                    {zonalOutlet && <span className="text-primary">{zonalOutlet.map(item => <button key={item} onClick={() => handleOutletRemove(item)} className='btn btn-sm btn-dark me-1 mt-1'>{item} <img className='img-fluid mb-1 ms-1' width={15} src={closeIcon} alt="" /></button>)}</span>}
                                </div>
                            )} */}
                    </div>

                    {/* <button onClick={() => handleZoneOutletAdd()} className='btn btn-sm btn-outline-secondary mt-3 font-ibm'>+ Create a zone</button>
                    <button onClick={() => {
                        setZone("")
                        setZonalOutlet([])
                    }} className='btn btn-sm btn-outline-danger mt-3 font-ibm ms-2'>Clear All</button> */}

                    {/* <div style={{border: '1px dashed green'}} className="mt-3 p-3 rounded shadow-sm col-md-3">
                        <h2 className='h5 font-ibm m-0 text-center'>Zone 1</h2>
                        <hr style={{ borderTop: '1px dashed green' }} className='m-0' />
                        <h3 className='fs-6 font-ibm'>{zone}</h3>
                        <ul className='p-0 m-0'>
                            {
                                zonalOutlet.map((item, index) => <li key={index} style={{ listStyleType: 'none' }} className='font-ibm'> - {item}</li>)
                            }
                        </ul>
                    </div> */}

                    {/* <div className="row align-items-center">
                        {
                            zoneOutletArray.map((item, index) =>
                                <div key={index} style={{ border: '1px dashed black' }} className="mt-3 p-3 rounded shadow-sm col-lg-3 col-md-4 col-sm-6 position-relative">
                                    <h2 className='h5 font-ibm m-0 text-center'>Zone {index + 1} ({item.zone})</h2>
                                    <hr style={{ borderTop: '1px dashed black' }} className='m-0' />
                                    <ul style={{ height: '100px', overflowX: 'auto' }} className='p-0 m-0'>
                                        {
                                            item.outlets.map((item, innerIndex) => <li key={innerIndex} style={{ listStyleType: 'none' }} className='font-ibm'> - {item}</li>)
                                        }
                                    </ul>
                                    <img onClick={() => handleZoneOutletRemove(item)} style={{ borderRadius: '50%' }} className='img-fluid bg-dark position-absolute top-0 end-0' width={25} src={closeIcon} alt="close" />
                                    <img onClick={() => handleZoneOutletEdit(item)} style={{ borderRadius: '50%' }} className='img-fluid position-absolute top-0 start-0' width={25} src={editIcon} alt="close" />
                                </div>
                            )
                        }
                    </div> */}

                    {/* {
                        zone &&
                        <div style={{ maxHeight: '450px', overflowY: 'auto' }} className="table-responsive mt-3 col-md-4 bg-white">
                            <table style={{ fontSize: "13px" }} className="table table-bordered font-ibm m-0">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        _.orderBy(outletZones.filter(item => item.zone === zone), ['name'], ['asc']).map((outlet, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                {
                                                    viewSto.find(sto => sto.code === outlet.code) ? <td className='bg-success'>{outlet.code}</td> : <td className='bg-danger'>{outlet.code}</td>
                                                }
                                                <td>{outlet.name}</td>
                                                <td><button className='btn btn-sm' onClick={(e) => handleOutletAdd(outlet, index)}>+</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    } */}

                    <div className="row">
                        {
                            zone &&
                            <div style={{ maxHeight: '450px', overflowY: 'auto' }} className="table-responsive mt-3 col-md-5 bg-white p-0 mx-3">
                                <p className="font-ibm m-0 text-center py-2">Showing Category Wise Zonal STO</p>
                                <table style={{ fontSize: "13px" }} className="table table-bordered font-ibm m-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Code</th>
                                            <th scope="col">Name</th>
                                            <th scope="col" className='text-center'>STO</th>
                                            <th scope="col" className='text-center'>SKUs</th>
                                            <th scope="col" className='text-center'>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {

                                            // Object.values(groupBy(selectedZone, 'code')).map((outletGroup, index) => (
                                            Object.values(groupBy(viewSto, 'code')).map((outletGroup, index) => (
                                                <React.Fragment key={index}>
                                                    {outletGroup.map((item, innerIndex) => (
                                                        <tr key={`${index}-${innerIndex}`}>
                                                            {innerIndex === 0 ? (
                                                                <>
                                                                    <td rowSpan={outletGroup.length} className="">{index + 1}</td>
                                                                    <td rowSpan={outletGroup.length} className="">{item.code}</td>
                                                                </>
                                                            ) : null}
                                                            <td>{item.name}</td>
                                                            <td>{item.sto}</td>
                                                            <td className='text-center'>{item.sku}</td>
                                                            <td className='text-center d-flex justify-content-between align-items-center'>
                                                                {
                                                                    // selectedZone.filter(item1 => zoneOutletArray.some(item2 => item2.sto === item1.sto)).filter(i => i.sto === item.sku).length > 0 ?
                                                                    //     <button className='btn btn-sm btn-success d-flex justify-content-center align-items-center'>Added</button> :
                                                                    <>
                                                                        <button onClick={() => {
                                                                            setStoData(item)
                                                                            window.scrollTo(0, 0)
                                                                        }} data-bs-toggle="modal" data-bs-target="#stoDetailsModal" className='btn btn-sm btn-dark d-flex justify-content-center align-items-center mx-2'>Details</button>
                                                                        <button onClick={() => handleZonalSkuAdd(item)} className='btn btn-sm btn-secondary d-flex justify-content-center align-items-center'>Add</button>
                                                                    </>
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            ))
                                        }
                                        <tr>
                                            <td colSpan="4" className='text-center'>Grand Total</td>
                                            {/* <td className='text-center'>{selectedZone.reduce((a, c) => a + c.sku, 0)}</td> */}
                                            <td className='text-center'>{viewSto.reduce((a, c) => a + c.sku, 0)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }

                        {
                            zoneOutletArray.length > 0 &&
                            <div style={{ maxHeight: '450px', overflowY: 'auto' }} className="table-responsive mt-3 col-md-5 bg-white p-0">
                                <p className="font-ibm m-0 d-flex justify-content-between align-items-center p-2">Showing Selected Category Wise Zonal STO <button id='vehicle_assign' onClick={() => assignToVehicle(zoneOutletArray)} className='btn btn-primary btn-sm'>Assign to Zone</button></p>
                                <table style={{ fontSize: "13px" }} className="table table-bordered font-ibm m-0 p-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Code</th>
                                            <th scope="col">Name</th>
                                            <th scope="col" className='text-center'>STO</th>
                                            <th scope="col" className='text-center'>SKUs</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {

                                            Object.values(groupBy(zoneOutletArray, 'code')).map((outletGroup, index) => (
                                                <React.Fragment key={index}>
                                                    {outletGroup.map((item, innerIndex) => (
                                                        <tr key={`${index}-${innerIndex}`}>
                                                            {innerIndex === 0 ? (
                                                                <>
                                                                    <td rowSpan={outletGroup.length} className="">{index + 1}</td>
                                                                    <td rowSpan={outletGroup.length} className="">{item.code}</td>
                                                                </>
                                                            ) : null}
                                                            <td>{item.name}</td>
                                                            <td>{item.sto}</td>
                                                            <td className='text-center'>{item.sku}</td>
                                                            <td><img className='img-fluid ms-2' style={{ cursor: 'pointer' }} onClick={() => handleZonalSkuAddRemove(item)} width={18} src={crossIcon} alt="remove" /></td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            ))
                                        }
                                        <tr>
                                            <td colSpan="4" className='text-center'>Grand Total</td>
                                            <td className='text-center'>{zoneOutletArray.reduce((a, c) => a + c.sku, 0)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>

                    <div className="mt-3">
                        <UpdateVehicleZoneData />
                    </div>
                    <ToastContainer autoClose={1000} />
                    <STODetailsModal data={stoData} />
                </div>
            </div>
        </section>
    );
};

export default ZoneAssign;