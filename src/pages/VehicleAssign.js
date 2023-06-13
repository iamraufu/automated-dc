import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import outletZones from '../data/outletZone.json';
import closeIcon from '../images/close.svg'
import editIcon from '../images/edit.svg'
import _ from 'lodash';

const VehicleAssign = () => {
    const [zone, setZone] = useState('');
    const outletDivisions = [...new Set(outletZones.map(item => item.division))]
    const [zonalOutlet, setZonalOutlet] = useState([]);
    const [zoneOutletArray, setZoneOutletArray] = useState([])

    const handleZoneChange = (e) => {
        const selectedZoneName = e.target.value;
        setZone(selectedZoneName);
    };

    const handleOutletAdd = (value) => {
        zonalOutlet.indexOf(value) === -1 ? setZonalOutlet([...zonalOutlet, value]) : setZonalOutlet(zonalOutlet)
    };

    const handleOutletRemove = elm => {
        setZonalOutlet(zonalOutlet.filter((item) => item !== elm))
    }

    const handleZoneOutletAdd = () => {

        const zoneOutlet = {
            zone,
            outlets: zonalOutlet
        };
        setZoneOutletArray(prev => [...prev, zoneOutlet])
    }

    const handleZoneOutletRemove = elm => {
        setZoneOutletArray(zoneOutletArray.filter(item => item !== elm))
    }

    const handleZoneOutletEdit = elm => {
        console.log(elm)
    }

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                    <div className="bg-white py-3 bg-body-tertiary rounded shadow-sm">
                        <div className='d-flex align-items-center' >
                            {/* <div className="ms-2 ticket-modal-body-title fw-bold">Zone Select:</div> */}
                            <div className="d-flex align-items-center ms-3">
                                <div className="font-ibm me-2">Select Zone:</div>
                                <select className="select font-ibm" value={zone} onChange={handleZoneChange}>
                                    <option className="font-ibm" value="" disabled>Select</option>
                                    {outletDivisions.map((zone, index) => (
                                        <option key={index + 1} className="font-ibm" value={zone}>{zone}</option>
                                    ))}
                                </select>
                            </div>

                            {zone && (
                                <div className="d-flex align-items-center ms-3">
                                    <div className="font-ibm me-2">Select Outlet:</div>
                                    <select className="select font-ibm"
                                        // value={outlet} 
                                        value=""
                                        onChange={(e) => handleOutletAdd(e.target.value)}>
                                        <option className="font-ibm" value="" disabled>Select</option>
                                        {/* {outletZones.filter(item => item.division === zone).map((outlet, index) => ( */}
                                        {
                                            _.orderBy(outletZones.filter(item => item.division === zone), ['name'], ['asc']).map((outlet, index) => (
                                                <option key={index + 1} className="font-ibm" value={`${outlet.name} (${outlet.code})`}>{outlet.name} ({outlet.code})</option>
                                            ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        {zone && (
                            <div className="font-ibm ms-3 mt-2">Zone:<span className="text-primary"> {zone}</span>
                                <br />
                                {zonalOutlet && <span className="text-primary">{zonalOutlet.map(item => <button key={item} onClick={() => handleOutletRemove(item)} className='btn btn-sm btn-dark me-1 mt-1'>{item} <img className='img-fluid mb-1 ms-1' width={15} src={closeIcon} alt="" /></button>)}</span>}
                            </div>
                        )}
                    </div>

                    <button onClick={() => handleZoneOutletAdd()} className='btn btn-sm btn-outline-secondary mt-3 font-ibm'>+ Create a zone</button>
                    <button onClick={() => {
                        setZone("")
                        setZonalOutlet([])
                    }} className='btn btn-sm btn-outline-danger mt-3 font-ibm ms-2'>Clear All</button>

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

                    <div className="row align-items-center">
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VehicleAssign;