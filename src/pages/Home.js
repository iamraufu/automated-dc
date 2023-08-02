import React from 'react';
import HomeHero from '../components/Home/HomeHero';
import HomeTicketStatus from '../components/Home/HomeTicketStatus';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import HomeNotice from '../components/Home/HomeNotice';
// import CreateTicketBtn from '../components/CreateTicketBtn';
import { ToastContainer } from 'react-toastify';

const Home = () => {

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div className="col-md-10 px-4 py-3 mx-auto d-block">
                    {/* <div className="float-end"><CreateTicketBtn /></div> */}
                    <HomeHero />
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-6"><HomeNotice /></div>
                        <div className="col-lg-6"><HomeTicketStatus /></div>
                    </div>
                </div>
            </div>
            <Modal />
            <ToastContainer autoClose={1000} />
        </section>
    );
};

export default Home;