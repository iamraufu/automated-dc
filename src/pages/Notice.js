import React from 'react';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import Toast from '../components/Home/Toast';

const Notice = () => {

    const { user, notice } = useAuth()

    const updateNotice = id => {

        const details = {
            status: 1
        }

        fetch(`http://localhost:5000/notice/${id}`, {
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
                    window.location.reload()
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
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                    <div className="row">
                        {
                            notice.filter(notice => notice.status === 0 ).map((notice, index) =>
                                <div key={index + 1} className="col-sm-6">
                                    <div style={{ borderRadius: '10px', height: '120px' }} className="bg-white p-3 my-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="">
                                                <h2 className='fs-5 font-ibm fw-bold'>{notice.title}</h2>
                                                <p className='font-ibm'>{notice.description}</p>
                                            </div>
                                            {
                                                user.role === 0 && 
                                                <button onClick={() => updateNotice(notice._id)} className='btn btn-sm btn-danger font-ibm'>Acknowledge</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Toast />
        </section>
    );
};

export default Notice;