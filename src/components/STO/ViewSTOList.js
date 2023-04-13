import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

let priority
const ViewSTOList = ({ stoData }) => {

    const { user } = useAuth()
    const [error, setError] = useState("")

    const handleStoSubmit = () => {
        !priority && setError("Click on any priority")
        if (priority) {
            const details = {
                email: user.email,
                name: user.name,
                data: stoData,
                priority,
                date: new Date().toISOString().split('T')[0]

            }
            fetch('http://localhost:5000/sto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === true) {
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

    }

    const handleClick = (e) => {
        setError("")
        priority = e.target.innerText
    }

    return (
        <div className="mt-3 col-md-6">
            <div className='d-flex justify-content-center align-items-center'>
                <div className="col-md-4 view-sto-list-header">STO</div>
                <div className="col-md-5 view-sto-list-header">Outlet</div>
                <div className="col-md-3 view-sto-list-header text-center">SKUs</div>
            </div>

            <div style={{ height: '400px', overflowY: 'auto' }} className="mt-3 bg-white sto-list-viewer">

                {
                    stoData.map((data, index) =>
                        <div key={index} className="d-flex justify-content-between align-items-center my-3">
                            <div className="d-flex justify-content-center align-items-center col-md-4 font-ibm fw-bold">
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
                            {
                                data.sku !== 0 && <div className="col-md-5"><span className='outlet-code'>{data.code}</span><br /><span className='outlet-name'>{data.name}</span></div>
                            }
                            <div className="col-md-3 text-center sku-count">{data.sku}</div>
                        </div>
                    )
                }
            </div>

            <p className='font-ibm p-0 mt-3'>Priority</p>

            <div className="col-md-6 px-0 d-flex">
                {
                    <p onClick={(e) => handleClick(e)} className='urgent d-flex justify-content-center align-items-center mx-auto d-block mb-1 me-2'>Urgent</p>
                }
                {
                    <p onClick={(e) => handleClick(e)} className='by-today d-flex justify-content-center align-items-center mx-auto d-block mb-1 me-2'>By Today</p>
                }
                {
                    <p onClick={(e) => handleClick(e)} className='deadline d-flex justify-content-center align-items-center mx-auto d-block mb-1'>Deadline</p>
                }
            </div>

            {error && <p className='text-danger font-ibm p-0'>{error}</p>}

            <button onClick={() => handleStoSubmit()} className='mt-3 btn-view-sto-list'>Submit File</button>

        </div>
    );
};

export default ViewSTOList;