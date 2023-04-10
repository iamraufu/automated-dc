import React from 'react'

const CreateTicketBtn = () => {
    return (
        <button style={{borderRadius:'10px'}} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='btn btn-sm btn-danger font-ibm'>Create a Ticket</button>
    );
};

export default CreateTicketBtn;