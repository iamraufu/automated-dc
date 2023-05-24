import React from 'react';
import statsIcon from '../../images/stats.svg'
import clockIcon from '../../images/clock.svg'
import productIcon from '../../images/product.svg'
import boxesIcon from '../../images/boxes.svg'
import writingIcon from '../../images/writing.svg'

const HomeHero = () => {

    return (
        <section style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }} className='bg-white p-5'>
            <div className="d-flex align-items-center ms-2">
                <img src={statsIcon} className='mb-3' alt="DC Stats" />
                <h2 className='fs-5 font-ibm fw-bold ms-2'>DC Stats</h2>
            </div>

            <div className="col-md-8">
                <div className="">
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h2 className="stat-title">STO Efficiency</h2>
                        <p style={{ fontSize: '18px' }} className="outlet-code">65%</p>
                    </div>

                    <div style={{ background: '#7992B5', borderRadius: '10px' }} className="progress" role="progressbar" aria-label="Success example" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
                        <div className="" style={{ width: "65%", backgroundColor: '#B5D2FA', borderRadius: '10px' }}></div>
                    </div>

                    <div className="row justify-content-between align-items-center mt-3">
                        <div className="d-flex justify-content-around align-items-center col-md-6">
                            <div className="">
                                <img src={clockIcon} alt="Total Picking Time" />
                                <span className='outlet-code ms-2'>Total Picking Time</span>
                            </div>
                            <div className="ms-3">
                                <span className='outlet-code'>8 Hours</span>
                            </div>
                        </div>

                        <div className="d-flex justify-content-around align-items-center col-md-6">
                            <div className="">
                                <img src={productIcon} alt="SKU Allocated" />
                                <span className='outlet-code ms-2'>SKU Allocated</span>
                            </div>
                            <div className="ms-3">
                                <span className='outlet-code'>500</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="stat-title">Picker Efficiency</h2>
                        <p style={{ fontSize: '18px', color:'#10BBC2' }} className="outlet-code">55%</p>
                    </div>

                    <div style={{ background: '#10BBC2', borderRadius: '10px' }} className="progress" role="progressbar" aria-label="Success example" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">
                        <div className="" style={{ width: "55%", backgroundColor: '#A8DADC', borderRadius: '10px' }}></div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="d-flex justify-content-around align-items-center col-md-6">
                            <div className="">
                                <img src={writingIcon} alt="Total Delivery Note" />
                                <span className='outlet-code ms-2'>Total Delivery Note</span>
                            </div>
                            <div className="ms-3">
                                <span className='outlet-code'>20</span>
                            </div>
                        </div>

                        <div className="d-flex justify-content-around align-items-center col-md-6">
                            <div className="">
                                <img src={boxesIcon} alt="STO Allocated" />
                                <span className='outlet-code ms-2'>STO Allocated</span>
                            </div>
                            <div className="ms-3">
                                <span className='outlet-code'>150</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="d-flex justify-content-between align-items-center">
                <h2 className="outlet-code">Sorter Efficiency</h2>
                <p style={{ fontSize: '18px' }} className="outlet-code">65%</p>
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <h2 className="outlet-code">Loader Efficiency</h2>
                <p style={{ fontSize: '18px' }} className="outlet-code">65%</p>
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <h2 className="outlet-code">Vehicle Efficiency</h2>
                <p style={{ fontSize: '18px' }} className="outlet-code">65%</p>
            </div> */}

            {/* <TicketTitle />
            {
                tickets.length > 0 ?
                    tickets.slice(0, 4).map(ticket => <TicketDetails key={ticket._id} ticket={ticket} />)
                    :
                    <div className="">
                        <p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                        </p>
                    </div>
            } */}

        </section>
    );
};

export default HomeHero;