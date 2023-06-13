import React from 'react';
import CreateTicket from '../components/Ticket/CreateTicket';

const Modal = () => {

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-keyboard={true} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header ticket-modal-header">
                        <h2 className='text-white ticket-modal-title'>Create Ticket</h2>
                        <h2 className='text-white ticket-modal-title'>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                    </div>

                    <div className="modal-body ticket-modal-body">
                    <CreateTicket />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;