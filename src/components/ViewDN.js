import React from 'react';
// import useAuth from '../hooks/useAuth';
// import Swal from 'sweetalert2';
import _ from 'lodash'

const ViewDN = ({ dnData }) => {

    // const { user, viewDn } = useAuth()

    // const handleVehicleUpdate = () => {
    //     document.getElementById('dn-file-btn').style.display = 'none'
    //     document.getElementById('dn-file-spinner').style.display = 'block'
    //     submit()
    // }

    // const submit = async () => {

    //     const details = {
    //         dnData: dnData,
    //         email: user.email
    //     }

    //     console.log(details)
    // }

    return (
        <div className="mt-3 col-md-10">
            <div className='d-flex justify-content-center align-items-center'>
                <div className="col-md-3 view-sto-list-header">STO</div>
                <div className="col-md-3 view-sto-list-header">Outlet</div>
                <div className="col-md-2 view-sto-list-header text-center">SKU</div>
                <div className="col-md-4 view-sto-list-header text-center">DN</div>
            </div>

            <div style={{ height: '400px', overflowY: 'auto', overflowX: 'hidden' }} className="mt-3 bg-white sto-list-viewer">

                {
                    _.sortBy(dnData, 'sto').map((data, index) =>
                        <div key={index} className="d-flex justify-content-between align-items-center my-3">
                            <div className="d-flex justify-content-center align-items-center col-md-3 font-ibm fw-bold">
                                <div className="sto-number">{parseInt(data.sto.toString().slice(0, 3))}</div>
                                <div className="sto-number">{parseInt(data.sto.toString().slice(3, 6))}</div>
                                <div className="sto-number">{parseInt(data.sto.toString().slice(6))}</div>
                            </div>
                            {
                                data.sku !== 0 && <div className="col-md-3"><span className='outlet-code'>{data.code}</span><br /><span className='outlet-name'>{data.name}</span></div>
                            }
                            <div className="col-md-2 text-center sku-count">{data.sku}</div>
                            <div className="d-flex justify-content-center align-items-center col-md-4 font-ibm fw-bold">
                                <div className="sto-number">{parseInt(data.dn.toString().slice(0, 3))}</div>
                                <div className="sto-number">{parseInt(data.dn.toString().slice(3, 6))}</div>
                                <div className="sto-number">{parseInt(data.dn.toString().slice(6))}</div>
                            </div>
                        </div>
                    )
                }
            </div>

            {/* <button id='dn-file-btn' onClick={() => handleVehicleUpdate()} className='mt-3 btn-view-sto-list'>Submit File</button>
            <div id='dn-file-spinner' style={{ display: 'none' }} className="">
                <button className='mt-3 btn-view-sto-list d-flex justify-content-center align-items-center'><div style={{ width: '18px', height: '18px' }} className="spinner-border text-dark me-2" role="status"></div>Uploading...</button>
            </div> */}
        </div>
    );
};

export default ViewDN;