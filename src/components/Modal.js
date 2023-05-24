import React from 'react';
import CreateTicket from '../components/Ticket/CreateTicket';
// import PersonAssign from './PersonAssign';

const Modal = () => {

    // const pathName = window.location.pathname

    // function getDayWithSuffix(date) {
    //     const day = date.getDate();
    //     if (day > 3 && day < 21) return day + 'th';
    //     switch (day % 10) {
    //       case 1: return day + 'st';
    //       case 2: return day + 'nd';
    //       case 3: return day + 'rd';
    //       default: return day + 'th';
    //     }
    //   }
      
    //   const date = new Date();
    //   const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //   const formattedDate = getDayWithSuffix(date) + ' ' + date.toLocaleDateString('en-US', options);

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-keyboard={true} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header ticket-modal-header">
                        <h2 className='text-white ticket-modal-title'>
                        Create Ticket
                            {/* {
                                pathName === '/' && 'Create Ticket'
                            }
                            {
                                pathName === '/attendance' && 'Person Assign'
                            } */}
                        </h2>
                        {/* <h2 className='text-white ticket-modal-title'>{formattedDate}</h2> */}
                        <h2 className='text-white ticket-modal-title'>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                    </div>

                    <div className="modal-body ticket-modal-body">
                    <CreateTicket />
                        {/* {
                            pathName === '/' && <CreateTicket />
                        }
                        {
                            pathName === '/attendance' && <PersonAssign />
                        } */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;