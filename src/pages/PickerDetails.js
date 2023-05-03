import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';

const PickerDetails = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const { user, setUser, stoData, setStoData } = useAuth()
    const [stoDetails, setStoDetails] = useState({})
    const skeletonLength = Array.from(Array(9).keys())

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/sto/${id}`);
            const data = await response.json();
            if (data.status === true) {
                setStoDetails(data.sto);
                setStoData(data.sto.data)
            }
            else {
                navigate('/picker')
            }
        };
        fetchData();
    }, [id, setStoData, navigate])

    const handlePickerChange = (index, sto, picker) => {
        let thisStoData = stoData.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, picker }
        setStoData(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
        updatePickerStatus(picker, 1)
    }

    const handleSorterChange = (index, sto, sorter) => {
        let thisStoData = stoData.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, sorter }
        setStoData(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
        updateSorterStatus(sorter, 1)
    }

    const handleStartingTime = (index, sto) => {
        let thisStoData = stoData.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, picking_starting_time: Date.now() }
        setStoData(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
    }

    const handleEndingTime = (index, sto, picker) => {
        let thisStoData = stoData.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, picking_ending_time: Date.now() }
        setStoData(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
        document.getElementById(`picker-details-ending-btn-${index}`).style.display = 'none'
        updatePickerStatus(picker, 0)
    }

    const sortingStart = (index, sto) => {
        let thisStoData = stoData.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, sorting_starting_time: Date.now() }
        setStoData(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
    }

    const sortingEnd = (index, sto, sorter) => {
        let thisStoData = stoData.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, sorting_ending_time: Date.now() }
        setStoData(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
        document.getElementById(`sorting-details-ending-btn-${index}`).style.display = 'none'
        updateSorterStatus(sorter, 0)
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

    const updateSto = () => {
        const details = {
            data: stoData
        }
        fetch(`http://localhost:5000/sto/${stoDetails._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
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

    const updatePickerSorter = (person) => {
        fetch(`http://localhost:5000/user/${user._id}`, {
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

    const handleReset = () => {

        const resetPicker = user.pickers.map(picker => {
            return { ...picker, status: 0 };
        })

        const resetSorter = user.sorters.map(sorter => {
            return { ...sorter, status: 0 };
        })

        const updatedUser = {
            pickers: resetPicker,
            sorters: resetSorter
        }

        setUser({ ...user, pickers: resetPicker, sorters: resetSorter })

        fetch(`http://localhost:5000/user/${user._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
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
        <div className='container-fluid p-0'>
            <div className="modal-header ticket-modal-header p-2">
                <div className="container d-flex justify-content-between align-items-center">
                    <h2 className='text-white ticket-modal-title'>Picker Assign</h2>
                    <h2 className='text-white ticket-modal-title'>{new Date(stoDetails.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                </div>
            </div>
            <div className="container">
                <button onClick={() => updateSto()} className='btn btn-sm btn-danger px-3 my-2 ms-auto d-block font-ibm'>Save and Submit</button>
                <div className='row justify-content-between align-items-center m-0'>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-1 view-sto-list-header">STO</div>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-2 view-sto-list-header">Outlet</div>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-1 view-sto-list-header text-center">SKUs</div>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-4 view-sto-list-header text-center">Picker</div>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-4 view-sto-list-header text-center">Sorter</div>
                </div>

                <div style={{ height: '600px', overflowY: 'auto', borderTop: '1px solid black', borderBottom: '1px solid black', borderLeft: '1px solid black' }} className="bg-white sto-list-viewer mt-1">

                    {
                        stoDetails.date ?
                            stoData.map((data, index) =>
                                data.sku !== 0 && <div key={index} className="d-flex justify-content-between align-items-center my-3 px-2">
                                    <div className="d-flex justify-content-center align-items-center col-md-1 font-ibm fw-bold">
                                        {
                                            data.sto === undefined ? data.sto
                                                :
                                                <>
                                                    <div className="sto-number">{parseInt(data.sto.toString().slice(0, 3))}</div>
                                                    <div className="sto-number">{parseInt(data.sto.toString().slice(3, 6))}</div>
                                                    <div className="sto-number">{parseInt(data.sto.toString().slice(6))}</div>
                                                </>
                                        }
                                    </div>

                                    <div className="col-md-2 ps-2">
                                        <span className='outlet-code'>{data.code}</span><br /><span className='outlet-name'>{data.name}</span>
                                    </div>

                                    <div className="col-md-1 sku-count text-center">{data.sku}</div>

                                    <div className="col-md-4 d-flex justify-content-around align-items-center">
                                        <div className="text-center">
                                            <select onChange={(e) => handlePickerChange(index, data.sto, e.target.value)} className='select-picker' name="" id={`picker-${index}`}>
                                                <option className='font-ibm' value="" selected disabled>Select Picker</option>
                                                {
                                                    user.email &&
                                                        data.picker ?
                                                        <option key={index} value={data.picker} selected>{data.picker}</option> :
                                                        user.pickers.map((picker, index) =>
                                                            picker.status === 0 && <option key={index} value={picker.name}>{picker.name}</option>
                                                        )}
                                            </select>
                                        </div>

                                        <div className="text-center">
                                            {
                                                data.picking_starting_time ?
                                                    <p className='picker-details-time-btn mx-auto d-block d-flex justify-content-center align-items-center'>{new Date(data.picking_starting_time).toLocaleTimeString()}</p>
                                                    :
                                                    <button onClick={() => handleStartingTime(index, data.sto)} className='picker-details-time-btn'>Start</button>
                                            }
                                            {
                                                data.picking_starting_time && !data.picking_ending_time && <button onClick={() => handleEndingTime(index, data.sto, document.getElementById(`picker-${index}`).value)} className='picker-details-time-btn' id={`picker-details-ending-btn-${index}`}>End</button>
                                            }
                                            {
                                                data.picking_ending_time && <p className='picker-details-time-btn mx-auto d-block d-flex justify-content-center align-items-center'>{new Date(data.picking_ending_time).toLocaleTimeString()}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className="col-md-4 d-flex justify-content-around align-items-center">
                                        <div className="text-center d-flex justify-content-between align-items-center px-2">
                                            <select onChange={(e) => handleSorterChange(index, data.sto, e.target.value)}
                                                // style={{ display: 'none' }} 
                                                id={`sorter-${index}`} className='sorter-assign'>
                                                <option className='font-ibm' value="" selected disabled>Select Sorter</option>
                                                {
                                                    data.sorter ?
                                                        <option key={index} value={data.sorter} selected>{data.sorter}</option>
                                                        :
                                                        user.sorters.map((sorter, index) => sorter.status === 0 && <option key={index} value={sorter.name}>{sorter.name}</option>)
                                                }
                                            </select>
                                        </div>

                                        <div className="text-center">
                                            {
                                                data.sorting_starting_time ?
                                                    <p className='picker-details-time-btn mx-auto d-block d-flex justify-content-center align-items-center'>{new Date(data.sorting_starting_time).toLocaleTimeString()}</p>
                                                    :
                                                    <button onClick={() => sortingStart(index, data.sto)} className='picker-details-time-btn'>Start</button>
                                            }
                                            {
                                                data.sorting_starting_time && !data.sorting_ending_time && <button onClick={() => sortingEnd(index, data.sto, document.getElementById(`sorter-${index}`).value)} className='picker-details-time-btn' id={`sorting-details-ending-btn-${index}`}>End</button>
                                            }
                                            {
                                                data.sorting_ending_time && <p className='picker-details-time-btn mx-auto d-block d-flex justify-content-center align-items-center'>{new Date(data.sorting_ending_time).toLocaleTimeString()}</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            skeletonLength.map(item =>
                                <p key={item} className="placeholder-glow px-2">
                                    <span className="placeholder col-12 my-3"></span>
                                </p>
                            )
                    }
                </div>
            </div>

            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="">
                        <h2 className='font-ibm fs-6'>Pickers: {user.pickers.map(picker => picker.status === 0 ? <span key={picker.name} className='px-2 text-success'>{picker.name}</span> : <span key={picker.name} className='px-2 text-danger'>{picker.name}</span>)}</h2>
                        <h2 className='font-ibm fs-6'>Sorters: {user.sorters.map(sorter => sorter.status === 0 ? <span key={sorter.name} className='px-2 text-success'>{sorter.name}</span> : <span key={sorter.name} className='px-2 text-danger'>{sorter.name}</span>)}</h2>
                    </div>
                    <button onClick={() => handleReset()} className='btn btn-sm btn-warning font-ibm'>Reset</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PickerDetails;