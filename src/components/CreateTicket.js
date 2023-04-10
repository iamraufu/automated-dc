import React, { useState } from 'react';
import PickerManagement from './Forms/PickerManagement';
import SorterManagement from './Forms/SorterManagement';
import VehicleManagement from './Forms/VehicleManagement';

const CreateTicket = () => {

    const [ticketCategory, setTicketCategory] = useState("")

    return (
        <div style={{ borderRadius: '10px' }} className="bg-white m-3 p-3">
            <span className='ticket-modal-body-title'>Ticket Category</span> <select className='select mt-3 font-ibm' onChange={(e) => setTicketCategory(e.target.value)}>
                <option className='font-ibm my-1' value="" selected disabled>Select</option>
                <option className='font-ibm my-1' value="picker-management">Picker Management</option>
                <option className='font-ibm my-1' value="vehicle-management">Vehicle Management</option>
                <option className='font-ibm my-1' value="sorter-management">Sorter Management</option>
            </select>
            {ticketCategory === "picker-management" ? <PickerManagement /> : ""}
            {ticketCategory === "vehicle-management" ? <VehicleManagement /> : ""}
            {ticketCategory === "sorter-management" ? <SorterManagement /> : ""}
        </div>
    );
};

export default CreateTicket;