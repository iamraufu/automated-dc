import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import ZoneSelect from '../components/ZoneSelect';

const PickerDetails = () => {

    const navigate = useNavigate()
    const { user, setUser, viewSto, setSto, setSelectedZone, selectedZone, productCategory, startDate, endDate } = useAuth()
    const skeletonLength = Array.from(Array(9).keys())

    useEffect(() => {
        !viewSto.length > 0 && navigate('/picker')
    }, [navigate, viewSto])

    // eslint-disable-next-line
    const handlePickerChange = (index, sto, picker) => {
        let thisStoData = sto.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, picker }
        setSto(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
        updatePickerStatus(picker, 1)
    }

    // eslint-disable-next-line
    const handleSorterChange = (index, sto, sorter) => {
        let thisStoData = sto.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, sorter }
        setSto(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
        updateSorterStatus(sorter, 1)
    }

    // eslint-disable-next-line
    const handleStartingTime = (index, sto) => {
        let thisStoData = sto.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, picking_starting_time: Date.now() }
        setSto(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
    }

    // eslint-disable-next-line
    const handleEndingTime = (index, sto, picker) => {
        let thisStoData = sto.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, picking_ending_time: Date.now() }
        setSto(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
        document.getElementById(`picker-details-ending-btn-${index}`).style.display = 'none'
        updatePickerStatus(picker, 0)
    }

    // eslint-disable-next-line
    const sortingStart = (index, sto) => {
        let thisStoData = sto.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, sorting_starting_time: Date.now() }
        setSto(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = { ...newArray[index], ...thisStoData };
            return newArray;
        });
    }

    // eslint-disable-next-line
    const sortingEnd = (index, sto, sorter) => {
        let thisStoData = sto.find(data => data.sto === sto)
        thisStoData = { ...thisStoData, sorting_ending_time: Date.now() }
        setSto(prevArray => {
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
        
        const fetchData = async () => {
            const response = await toast.promise(
                fetch(`https://shwapnodc.onrender.com/update-products-status/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}/${selectedZone.map(item => item.sto)}/${productCategory.map(item => item)}/${selectedZone.map(item => item.code)}`),
                {
                  pending: 'SKU is Assigning...',
                  success: 'SKU Assigned Successfully',
                  error: 'There is an error saving. Try again!'
                }
            );
            const result = await response.json();
            result.status && setSelectedZone([])
        }
        selectedZone.length && fetchData()
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

        fetch(`https://shwapnodc.onrender.com/user/${user._id}`, {
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

    // const groupByOutlet = () => {
    //     const uniqueOutletArray = [...new Set(filteredData.map(item => item.code))];
    //     const resultArray = uniqueOutletArray.map(code => {
    //         return {
    //             data: filteredData.filter(data => data.code === code),
    //             code: code,
    //             sto: filteredData.filter(data => data.code === code)[0].sto,
    //             name: filteredData.filter(data => data.code === code)[0].name,
    //             sku: filteredData.filter(item => item.code === code).reduce((accumulator, currentValue) => {
    //                 // const skuValue = typeof currentValue.sku === 'undefined' ? 0 : currentValue.sku;
    //                 return accumulator + currentValue.sku;
    //             }, 0)
    //         }
    //     })
    //     setFilteredData(resultArray)
    //     setFlag(1)
    // }

    const addToZone = (product, index) => {
        delete viewSto[index]
        // setViewSto(viewSto.splice(index,1))
        setSelectedZone([...selectedZone, product])
        // console.log(viewSto.splice(index,1))
    }


    // const handleCategoryAdd = value => {
    //     productCategory.indexOf(value) === -1 ? setProductCategory([...productCategory, value]) : setProductCategory(productCategory)
    // }

    // const handleCategoryRemove = elm => {
    //     setProductCategory(productCategory.filter((item) => item !== elm))
    // }

    return (
        <div className='container-fluid p-0'>
            <div className="modal-header ticket-modal-header py-2">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <h2 className='text-white ticket-modal-title'>Picker Assign</h2>
                    <button onClick={() => updateSto()} className='btn btn-sm btn-danger px-3 ms-auto d-block font-ibm'>Save and Submit</button>
                </div>
            </div>

            {/* <div className="d-flex justify-content-between align-items-center">
                <span className='ms-2 ticket-modal-body-title'>Product Category</span>
                <select className='select ms-3 font-ibm' onChange={(e) => {
                    setFlag(0)
                    setProductCategory(e.target.value)
                    handleCategoryAdd(e.target.value)
                }
                }>
                    <option className='font-ibm my-1' value="" selected disabled>Select</option>
                    {
                        categoryCodeData.map((product, index) =>
                            <option key={index + 1} className='font-ibm my-1' value={product.category}>{product.category}</option>
                        )
                    }
                </select>
                <button onClick={() => groupByOutlet()} className='btn btn-sm btn-primary ms-2'>Group By Outlet</button>
                <button onClick={() => updateSto()} className='btn btn-sm btn-danger px-3 my-2 ms-auto d-block font-ibm me-2'>Save and Submit</button>
            </div>

            <div className="mb-2 font-ibm">
                {
                    productCategory.map((item, index) =>
                        <button key={index} onClick={() => handleCategoryRemove(item)} type="button" className="btn btn-sm btn-dark mx-2 align-items-center my-1"><span>{item}</span><img className='img-fluid mb-1 ms-1' width={15} src={closeIcon} alt="" /></button>
                    )
                }
            </div>

            <p className='ps-2 font-ibm'>Showing {filteredData.length.toLocaleString()} of {stoData.length.toLocaleString()}</p> */}

            {
                viewSto.length > 0 ?
                    <div className="d-flex mt-3 font-ibm">
                        <div className="col-md-3 px-1 d-none">
                            <div className='row justify-content-between align-items-center m-0'>
                                <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-5 view-sto-list-header">STO & Outlet</div>
                                <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-3 view-sto-list-header text-center">SKU</div>
                                <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-4 view-sto-list-header text-center">Action</div>
                            </div>

                            <div style={{ height: '600px', overflowY: 'auto', borderTop: '1px solid black', borderBottom: '1px solid black', borderLeft: '1px solid black' }} className="bg-white sto-list-viewer mt-1">

                                {
                                    viewSto.length > 0 ?
                                        viewSto.map((data, index) =>
                                            data !== undefined &&
                                            <div key={index} className="d-flex justify-content-between align-items-center my-3 px-2">
                                                <div className="col-md-5 font-ibm fw-bold">
                                                    <div className="d-flex align-items-center">
                                                        <div className="sto-number">{parseInt(data.sto.toString().slice(0, 3))}</div>
                                                        <div className="sto-number">{parseInt(data.sto.toString().slice(3, 6))}</div>
                                                        <div className="sto-number">{parseInt(data.sto.toString().slice(6))}</div>
                                                    </div>
                                                    <div className="ps-2">
                                                        <span className='outlet-code'>{data.code}</span><br /><span className='outlet-name'>{data.name}</span>
                                                    </div>
                                                </div>

                                                <div className="col-md-3 sku-count text-center">{data.sku}</div>

                                                <div className="col-md-4 ps-2">
                                                    <button onClick={() => addToZone(data, index)} className='mx-auto d-block btn btn-sm btn-outline-secondary'>Add to Zone</button>
                                                </div>

                                                {/* <div className="col-md-4 d-flex justify-content-around align-items-center">
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
                                        </div> */}
                                            </div>
                                        )
                                        :
                                        skeletonLength.map(item =>
                                            <p key={item} className="placeholder-glow px-2">
                                                <span className="placeholder col-12 my-3"></span>
                                            </p>
                                        )
                                        // <p className='font-ibm text-center'>Loading...</p>
                                }
                            </div>
                        </div>

                        <div className="col-md-12 px-2">
                            <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="d-flex justify-content-between align-items-center view-sto-list-header">
                                <p className='m-0'>Total SKU: {parseInt(viewSto.reduce((accumulator, currentValue) => {
                                    return accumulator + (currentValue === undefined ? 0 : currentValue.sku) ;
                                }, 0)).toLocaleString()}</p>

                                <p className='m-0'>Selected SKU: {parseInt(selectedZone.reduce((accumulator, currentValue) => {
                                    return accumulator + currentValue.sku;
                                }, 0)).toLocaleString()}</p>
                            </div>

                            <div style={{ height: '600px', overflowY: 'auto', borderTop: '1px solid black', borderBottom: '1px solid black', borderLeft: '1px solid black' }} className="bg-white sto-list-viewer mt-1">
                                <ZoneSelect />
                            </div>

                            <div className="d-flex justify-content-between align-items-center ms-1">
                                <div className="">
                                    <h2 className='font-ibm fs-6'>Pickers: {user.pickers.map(picker => picker.status === 0 ? <span key={picker.name} className='px-2 text-success'>{picker.name}</span> : <span key={picker.name} className='px-2 text-danger'>{picker.name}</span>)}</h2>
                                    <h2 className='font-ibm fs-6'>Sorters: {user.sorters.map(sorter => sorter.status === 0 ? <span key={sorter.name} className='px-2 text-success'>{sorter.name}</span> : <span key={sorter.name} className='px-2 text-danger'>{sorter.name}</span>)}</h2>
                                </div>
                                <button onClick={() => handleReset()} className='btn btn-sm btn-warning font-ibm'>Reset</button>
                            </div>
                        </div>
                    </div>
                    :
                    <p className='font-ibm text-center'>Loading...</p>
            }
            <ToastContainer />
        </div>
    );
};

export default PickerDetails;