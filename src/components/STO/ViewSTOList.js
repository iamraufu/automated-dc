import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

// let priority
const ViewSTOList = ({ stoData }) => {

    const { user, viewSto } = useAuth()

    // const [error, setError] = useState("")

    const handleStoSubmit = () => {
        document.getElementById('submit-file-btn').style.display = 'none'
        document.getElementById('submit-file-spinner').style.display = 'block'

        // !priority && setError("Click on any priority")
        // if (priority) {
        const details = {
            email: user.email,
            name: user.name,
            stoData: viewSto,
            date: new Date().toISOString().split('T')[0]
        }
        fetch('https://shwapnodc.onrender.com/sto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === true) {
                    document.getElementById('submit-file-btn').style.display = 'block'
                    document.getElementById('submit-file-spinner').style.display = 'none'
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

    // const handleFileSubmit = () => {
    //     document.getElementById('submit-file-btn').style.display = 'none'
    //     document.getElementById('submit-file-spinner').style.display = 'block'

    //     fetch('https://shwapnodc.onrender.com/file-upload', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({stoData})
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result.status === true) {
    //                 handleStoSubmit(result.id)
    //             }
    //             else {
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: `${result.message}`,
    //                     timer: 2000
    //                 })
    //             }
    //         })
    // }

    // const handleClick = (e) => {
    //     setError("")
    //     priority = e.target.innerText
    // }

    return (
        <div className="mt-3 col-md-5">
            <div className='d-flex justify-content-center align-items-center'>
                <div className="col-md-6 view-sto-list-header">STO</div>
                <div className="col-md-4 view-sto-list-header">Outlet</div>
                <div className="col-md-2 view-sto-list-header text-center">SKU</div>
                {/* <div className="col-md-4 view-sto-list-header text-center">Product</div> */}
            </div>

            <div style={{ height: '400px', overflowY: 'auto', overflowX: 'hidden' }} className="mt-3 bg-white sto-list-viewer">

                {
                    stoData.map((data, index) =>
                        data.sku !== 0 && <div key={index} className="d-flex justify-content-between align-items-center my-3">
                            <div className="d-flex justify-content-center align-items-center col-md-6 font-ibm fw-bold">

                                <div className="sto-number">{parseInt(data.sto.toString().slice(0, 3))}</div>
                                <div className="sto-number">{parseInt(data.sto.toString().slice(3, 6))}</div>
                                <div className="sto-number">{parseInt(data.sto.toString().slice(6))}</div>

                            </div>
                            {
                                data.sku !== 0 && <div className="col-md-4"><span className='outlet-code'>{data.code}</span><br /><span className='outlet-name'>{data.name}</span></div>
                            }
                            <div className="col-md-2 text-center sku-count">{data.sku}</div>
                            {/* <div className="col-md-4 sku-count">
                                <span className='outlet-code'>{data.article}</span><br /><span className='outlet-name'>{data.product}</span>
                            </div> */}
                        </div>
                    )
                }
            </div>

            <button id='submit-file-btn' onClick={() => handleStoSubmit()} className='mt-3 btn-view-sto-list'>Submit File</button>
            <div id='submit-file-spinner' style={{ display: 'none' }} className="">
                <button className='mt-3 btn-view-sto-list d-flex justify-content-center align-items-center'><div style={{ width: '18px', height: '18px' }} className="spinner-border text-dark me-2" role="status"></div>Uploading...</button>
            </div>
        </div>
    );
};

export default ViewSTOList;