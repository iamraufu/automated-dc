import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import outletZones from '../data/outletZone.json';
import { groupBy } from 'lodash';
// import closeIcon from '../images/close.svg'
import crossIcon from '../images/cross.svg'
import { toast } from 'react-toastify';
import _ from 'lodash';

const ZoneSelect = () => {
    
    const { selectedZone, setSelectedZone, assignedSto, setAssignedSto, user } = useAuth();
    const [zone, setZone] = useState('');
    
    const outletDivisions = _.sortBy([...new Set(outletZones.map(item => item.zone))])

    const handleZoneChange = (e) => {
        const zoneName = e.target.value;
        const filteredSto = assignedSto.filter(sto => {
            return outletZones.filter(item => item.zone === zoneName).some(zone => zone.code === sto.code);
        });
        setSelectedZone(filteredSto)
        setZone(zoneName);
    }

    // const handleOutletAdd = (value) => {
    //     zonalOutlet.indexOf(value) === -1 ? setZonalOutlet([...zonalOutlet, value]) : setZonalOutlet(zonalOutlet)
    // }

    // const handleOutletRemove = elm => {
    //     setZonalOutlet(zonalOutlet.filter((item) => item !== elm))
    // }

    const removeZoneProduct = elm => {
        setSelectedZone(selectedZone.filter(item => item !== elm))
        // setViewSto([elm, ...viewSto])
    }

    const handlePickerChange = (index, stoNumber, picker) => {

        let thisStoData = assignedSto.find(data => data.sto === stoNumber)

        thisStoData = {
            ...thisStoData,
            picker,
            status: "Assigned",
            // code: thisStoData[0].code,
            // name: thisStoData[0].name,
            // sto: thisStoData[0].sto,
            // sku: thisStoData.length
        }

        setAssignedSto(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        })
        updatePickerStatus(picker, 1)
    }

    const handleSorterChange = (index, stoNumber, sorter) => {
        let thisStoData = assignedSto.find(data => data.sto === stoNumber)

        thisStoData = {
            ...thisStoData,
            sorter,
            status: "Assigned",
            // code: thisStoData[0].code,
            // name: thisStoData[0].name,
            // sto: thisStoData[0].sto,
            // sku: thisStoData.length,
        }

        setAssignedSto(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
        updateSorterStatus(sorter, 1)
    }

    const updatePickerStatus = (picker, value) => {

        const pickerToUpdate = user.pickers.find(p => p.name === picker);
        if (pickerToUpdate) {
            pickerToUpdate.status = value;
        }
        const pickers = {
            pickers: user.pickers
        }
        updatePickerSorter(pickers)
    }

    const updateSorterStatus = (sorter, value) => {
        const sorterToUpdate = user.sorters.find(s => s.name === sorter);
        if (sorterToUpdate) {
            sorterToUpdate.status = value;
        }
        const sorters = {
            sorters: user.sorters
        }
        updatePickerSorter(sorters)
    }

    const updatePickerSorter = (person) => {
        fetch(`https://shwapnodc.onrender.com/user/${user._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(person)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === true) {
                    toast.success(`${result.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else {
                    toast.warn(`${result.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
            .catch(err => toast.warn(`${err}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }))
    }

    return (
        <div className="mt-3">
            <div className='d-flex align-items-center' >
                <div className="ms-2 ticket-modal-body-title fw-bold">Zone Select:</div>
                <div className="d-flex align-items-center ms-3">
                    <div className="font-ibm me-2">Select Zone:</div>
                    <select className="select font-ibm" value={zone} onChange={handleZoneChange}>
                        <option className="font-ibm" value="" disabled>Select</option>
                        {outletDivisions.map((zone, index) => (
                            <option key={index + 1} className="font-ibm" value={zone}>{zone}</option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedZone.length > 0 && (
                <div className="mt-3">
                    <div className="table-responsive">
                        <table style={{ fontSize: "13px" }} className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Name</th>
                                    <th scope="col" className='text-center'>STO</th>
                                    <th scope="col" className='text-center'>SKUs</th>
                                    <th scope="col" className='text-center'>Picker</th>
                                    <th scope="col" className='text-center'>Sorter</th>
                                    <th scope="col" className='text-center'>Time</th>
                                    <th scope="col" className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(groupBy(selectedZone, 'code')).map((outletGroup, index) => (
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
                                                <td className='text-center'>
                                                    <select
                                                        style={{ maxWidth: '150px', fontSize: '13px' }}
                                                        onChange={(e) => handlePickerChange(index, item.sto, e.target.value)}
                                                        className='select-picker' name="" id={`picker-${index}`}>
                                                        <option className='font-ibm' value="" selected disabled>Select Picker</option>
                                                        {
                                                            user.email &&
                                                            user.pickers.map((picker, index) =>
                                                                // picker.status === 0 && 
                                                                <option key={index} value={picker.name}>{picker.name}</option>
                                                            )}
                                                    </select>
                                                </td>
                                                <td className='text-center'>
                                                    <select
                                                        style={{ maxWidth: '150px', fontSize: '13px' }}
                                                        onChange={(e) => handleSorterChange(index, item.sto, e.target.value)}
                                                        className='select-picker' name="" id={`picker-${index}`}>
                                                        <option className='font-ibm' value="" selected disabled>Select Sorter</option>
                                                        {
                                                            user.email &&
                                                            user.sorters.map((sorter, index) =>
                                                                // picker.status === 0 && 
                                                                <option key={index} value={sorter.name}>{sorter.name}</option>
                                                            )}
                                                    </select>
                                                </td>
                                                <td className='text-center'>
                                                    <input className='select' style={{ maxWidth: '150px' }} type="time" name="" id="" />
                                                </td>
                                                <td className='text-center d-flex justify-content-between align-items-center'><button onClick={() => console.log(item)} className='picker-details-time-btn' style={{ fontSize: '13px' }}>Start</button><img className='img-fluid ms-2' onClick={() => removeZoneProduct(item)} width={18} src={crossIcon} alt="remove" /></td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ZoneSelect;
