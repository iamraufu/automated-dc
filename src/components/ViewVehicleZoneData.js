import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
// import { toast } from 'react-toastify';

const ViewVehicleZoneData = ({ vehicleData }) => {

    const { user } = useAuth()

    const handleVehicleUpdate = () => {
        document.getElementById('submit_vehicle-file-btn').style.display = 'none'
        document.getElementById('submit_vehicle-file-spinner').style.display = 'block'
        submit()
    }

    const submit = async () => {
        const details = {
            data: vehicleData,
            date: new Date().toISOString().split('T')[0],
            email: user.email
        }

        // const response = await toast.promise(fetch('http://localhost:8000/outlet-zones', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(details)
        // }),
        // {
        //     pending: 'Zoning Data Updating...',
        //     success: 'Updated Zone Data',
        //     error: 'There is an error posting. Please try again!'
        // })

        // const result = await response.json()
        // if (result.status === true) {
        //     document.getElementById('submit_vehicle-file-btn').style.display = 'block'
        //     document.getElementById('submit_vehicle-file-spinner').style.display = 'none'
        // }

        fetch('http://localhost:8000/outlet-zones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === true) {
                    document.getElementById('submit_vehicle-file-btn').style.display = 'block'
                    document.getElementById('submit_vehicle-file-spinner').style.display = 'none'
                    let timerInterval
                    Swal.fire({
                        icon: 'success',
                        title: `${result.message}`,
                        timer: 1500,
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

    return (
        <div className="mt-3 col-md-5">
            <div className='d-flex justify-content-center align-items-center'>
                <div className="col-md-2 view-sto-list-header">Id</div>
                <div className="col-md-2 view-sto-list-header">Code</div>
                <div className="col-md-5 view-sto-list-header text-center">Name</div>
                <div className="col-md-3 view-sto-list-header text-center">Zone</div>
            </div>

            <div style={{ height: '400px', overflowY: 'auto', overflowX: 'hidden' }} className="mt-3 bg-white sto-list-viewer">

                {
                    vehicleData.map((data, index) =>
                        <div key={index} className="d-flex justify-content-between align-items-center my-3">
                            <div className="col-md-2 font-ibm text-center">{data.id}</div>
                            <div className="col-md-2 font-ibm text-center">{data.code}</div>
                            <div className="col-md-5 font-ibm text-center">{data.name}</div>
                            <div className="col-md-3 font-ibm text-center">{data.zone}</div>
                        </div>
                    )
                }
            </div>

            <button id='submit_vehicle-file-btn' onClick={() => handleVehicleUpdate()} className='mt-3 btn-view-sto-list'>Submit File</button>
            <div id='submit_vehicle-file-spinner' style={{ display: 'none' }} className="">
                <button className='mt-3 btn-view-sto-list d-flex justify-content-center align-items-center'><div style={{ width: '18px', height: '18px' }} className="spinner-border text-dark me-2" role="status"></div>Uploading...</button>
            </div>
        </div>
    );
};

export default ViewVehicleZoneData;