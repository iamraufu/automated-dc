import React from 'react';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';

const Notice = () => {

    const { notice } = useAuth()

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                    <div className="row">
                        {
                            notice.map((notice,index) =>
                                <div key={index+1} className="col-sm-6">
                                    <div style={{borderRadius:'10px', height:'120px' }} className="bg-white p-3 my-2">
                                    <h2 className='fs-5 font-ibm fw-bold'>{notice.title}</h2>
                                    <p className='font-ibm'>{notice.description}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Notice;