import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import outletZones from '../data/outletZone.json';
import closeIcon from '../images/close.svg'
// import editIcon from '../images/edit.svg'
import _ from 'lodash';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import categoryCodeData from '../data/catcode.json'
import { groupBy } from 'lodash';

const VehicleAssign = () => {

    const { user, sto, setSto, viewSto, setViewSto, setAssignedSto, selectedZone, setSelectedZone, startDate, setStartDate, endDate, setEndDate, productCategory, setProductCategory } = useAuth()

    const [zone, setZone] = useState('');
    const outletDivisions = _.sortBy([...new Set(outletZones.map(item => item.zone))])

    // const [zonalOutlet, setZonalOutlet] = useState([])
    // const [zoneOutletArray, setZoneOutletArray] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await toast.promise(
                fetch(`https://shwapnodc.onrender.com/sto-email-date-range-category/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}/${productCategory}`),
                {
                    pending: 'Fetching the latest data...',
                    success: 'Latest data updated',
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
                setAssignedSto(_.orderBy(stoData, ['code'], ['asc']))
            }
            else {

            }
        };
        productCategory.length && fetchData();
    }, [user.email, startDate, endDate, setViewSto, setSto, productCategory, setAssignedSto])

    console.log(viewSto)

    const handleZoneChange = (e) => {
        const zoneName = e.target.value;
        const filteredSto = viewSto.filter(sto => {
            return outletZones.filter(item => item.zone === zoneName).some(zone => zone.code === sto.code);
        });
        setSelectedZone(filteredSto)
        setZone(zoneName);
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

    console.log( "Selected Zone ",selectedZone)
    console.log("Sto ", sto)

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                    <div className="bg-white py-3 bg-body-tertiary rounded shadow-sm">
                        <div className='d-flex align-items-center' >
                            <div className="d-flex align-items-center ms-3">
                                <div className="font-ibm"><p className='mb-0 ms-1'>From:</p> <DatePicker className='select bg-white' selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                                <div className="font-ibm ms-3"><p className='ms-1 mb-0'>To:</p> <DatePicker className='select bg-white' selected={endDate} onChange={(date) => setEndDate(date)} /></div>
                                <div className="font-ibm ms-3">
                                    <p className='mb-0 ms-1'>Product Category</p>
                                    <select className='select bg-white' onChange={(e) => {
                                        setProductCategory(e.target.value)
                                        handleCategoryAdd(e.target.value)
                                    }
                                    }>
                                        <option className='font-ibm my-1' value="" selected disabled>Select</option>
                                        {
                                            categoryCodeData.map((product, index) =>
                                                <option key={index + 1} className='font-ibm my-1' value={product.code}>{product.category}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="ms-3">
                                <div className="font-ibm ms-1">Select Zone:</div>
                                <select className="select font-ibm bg-white" value={zone} onChange={handleZoneChange}>
                                    <option className="font-ibm" value="" disabled>Select</option>
                                    {outletDivisions.map((zone, index) => (
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

                        <div className="my-2 font-ibm ms-3">
                            <span>Master Category: </span>
                            {
                                productCategory.map((item, index) =>
                                    <button key={index} onClick={() => handleCategoryRemove(item)} type="button" className="btn btn-sm btn-dark me-2 align-items-center my-1"><span>{item}</span><img className='img-fluid mb-1 ms-1' width={15} src={closeIcon} alt="" /></button>
                                )
                            }
                        </div>

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

                    {
                        zone &&
                        <div style={{ maxHeight: '450px', overflowY: 'auto' }} className="table-responsive mt-3 col-md-4 bg-white">
                            <table style={{ fontSize: "13px" }} className="table table-bordered font-ibm m-0">
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

                                        Object.values(groupBy(selectedZone, 'code')).map((outletGroup, index) => (
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
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))
                                    }
                                    <tr>
                                        <td colspan="4" className='text-center'>Grand Total</td>
                                        <td className='text-center'>{selectedZone.reduce((a, c) => a + c.sku, 0)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                    <ToastContainer />
                </div>
            </div>
        </section>
    );
};

export default VehicleAssign;