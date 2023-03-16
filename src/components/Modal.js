import React from 'react';
import CreateTicket from './CreateTicket';
import PersonAssign from './PersonAssign';

const Modal = () => {

    const pathName = window.location.pathname

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-keyboard={true} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header ticket-modal-header">
                        <h2 className='text-white ticket-modal-title'>
                            {
                                pathName === '/' && 'Create Ticket'
                            }
                            {
                                pathName === '/attendance' && 'Person Assign'
                            }
                        </h2>
                    </div>

                    <div className="modal-body ticket-modal-body">
                        {
                            pathName === '/' && <CreateTicket />
                        }
                        {
                            pathName === '/attendance' && <PersonAssign />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;