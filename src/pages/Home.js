import React from 'react';
import HomeHero from '../components/HomeHero';
import HomeTicket from '../components/HomeTicket';
import HomeTicketStatus from '../components/HomeTicketStatus';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';

const Home = () => {
    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div className="col-md-10 px-4 py-3 mx-auto d-block">
                    <HomeHero />
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="col-md-5"><HomeTicket /></div>
                        <div className="col-md-6"><HomeTicketStatus /></div>
                    </div>
                </div>
            </div>
            <Modal />
        </section>
    );
};

export default Home;