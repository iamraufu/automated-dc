import React from 'react';
import { Link } from 'react-router-dom';

const HomeTicketStatus = () => {
    return (
        <section style={{ border: '1px solid #DFE0EB', borderRadius: '8px' }} className='bg-white mt-4'>
            <div className="d-flex justify-content-between align-items-center px-3 pt-3">
                <h2 className='ticket-status-title'>Unresolved tickets | <span style={{ color: '#E15E68' }}>30</span></h2>
                <Link style={{ color: '#3751FF' }} className='text-decoration-none'><h3 className="view-details">View Details</h3></Link>
            </div>

            <div className="pb-3">
                <div style={{ borderBottom: '1px solid #DFE0EB' }} className="d-flex justify-content-between align-items-center py-3">
                    <div className="ticket-status-content-title ps-3">Waiting on Urgent Delivery</div>
                    <div className="ticket-status-content-number pe-3">30</div>
                </div>

                <div style={{ borderBottom: '1px solid #DFE0EB' }} className="d-flex justify-content-between align-items-center py-3">
                    <div className="ticket-status-content-title ps-3">Excess Stock in Tejgaon DC</div>
                    <div className="ticket-status-content-number pe-3">2</div>
                </div>

                <div style={{ borderBottom: '1px solid #DFE0EB' }} className="d-flex justify-content-between align-items-center py-3">
                    <div className="ticket-status-content-title ps-3">Pending promo STO</div>
                    <div className="ticket-status-content-number pe-3">94</div>
                </div>
            </div>
        </section>
    );
};

export default HomeTicketStatus;