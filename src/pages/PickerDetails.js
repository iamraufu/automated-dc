import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PickerDetails = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const { user } = useAuth()
    const [stoDetails, setStoDetails] = useState({})
    const [stoData, setStoData] = useState([])
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
    }, [id, navigate])

    const handlePickerChange = (index, sto, picker) => {
        let thisStoData = stoData.find(data => data.sto === sto)
        thisStoData = {...thisStoData, picker}
        setStoData(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = {...newArray[index], ...thisStoData};
            return newArray;
          });
    }

    console.log(stoData)
    
    return (
        <div className='container-fluid p-0'>
            <div className="modal-header ticket-modal-header p-2">
                <div className="container d-flex justify-content-between align-items-center">
                    <h2 className='text-white ticket-modal-title'>Picker Assign</h2>
                    <h2 className='text-white ticket-modal-title'>{new Date(stoDetails.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                </div>
            </div>
            <div className="container">
                <div className='row justify-content-between align-items-center m-0'>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-2 view-sto-list-header">STO</div>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-2 view-sto-list-header">Outlet</div>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-1 view-sto-list-header text-center">SKUs</div>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-1 view-sto-list-header text-center"></div>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-2 view-sto-list-header text-center">Assigned</div>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-2 view-sto-list-header text-center">Time</div>
                    <div style={{ backgroundColor: '#DFE0EB', height: '40px' }} className="col-md-2 view-sto-list-header text-center">Priority</div>
                </div>

                <div style={{ height: '600px', overflowY: 'auto', borderTop: '1px solid black', borderBottom: '1px solid black', borderLeft: '1px solid black' }} className="bg-white sto-list-viewer mt-1">

                    {
                        stoDetails.date ?
                            stoDetails.data.map((data, index) =>
                                <div key={index} className="d-flex justify-content-between align-items-center my-3">
                                    <div className="d-flex justify-content-center align-items-center col-md-2 font-ibm fw-bold">
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
                                    
                                    <div className="col-md-2"><span className='outlet-code'>{data.code}</span><br /><span className='outlet-name'>{data.name}</span></div>
                                    
                                    <div className="col-md-2 text-center sku-count d-flex justify-content-between align-items-center px-2">{data.sku} <button style={{ display: 'none' }} id={`sorter-assign-btn-${index + 1}`} className='sorter-assign'>Sorter Assign</button></div>
                                    
                                    <div className="col-md-2 text-center">
                                        <select onChange={(e)=> handlePickerChange(index, data.sto, e.target.value)} className='select-picker' name="" id="">
                                            <option className='font-ibm' value="" selected disabled>Select Picker</option>
                                            {
                                                user.pickers.map((picker, index) => <option key={index} value={picker.name}>{picker.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    
                                    <div className="col-md-2 text-center">
                                        <button>Start</button>
                                        <button>End</button>
                                        <button>Resc</button>
                                    </div>
                                    <div className="col-md-2 text-center today">
                                        {
                                            stoDetails.priority === 'Urgent' && <p className='urgent d-flex justify-content-center align-items-center mx-auto d-block mb-1'>Urgent</p>
                                        }
                                        {
                                            stoDetails.priority === 'By Today' && <p className='by-today d-flex justify-content-center align-items-center mx-auto d-block mb-1'>By Today</p>
                                        }
                                        {
                                            stoDetails.priority === 'Deadline' && <p className='deadline d-flex justify-content-center align-items-center mx-auto d-block mb-1'>Deadline</p>
                                        }
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
        </div>
    );
};

export default PickerDetails;