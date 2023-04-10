import React from 'react';
import AttendanceHero from '../components/Attendance/AttendanceHero';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';

const Attendance = () => {
    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div className="col-md-10 px-4 py-3 mx-auto d-block">
                    <AttendanceHero />
                </div>
            </div>
            <Modal />
        </section>
    );
};

export default Attendance;