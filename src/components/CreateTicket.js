import React, { useState } from 'react';
import LaborManagement from './Forms/LaborManagement';
import PickerManagement from './Forms/PickerManagement';
import SorterManagement from './Forms/SorterManagement';
import VehicleManagement from './Forms/VehicleManagement';
// import rectangle from '../images/rectangle.svg'
// import rectangle_checked from '../images/rectangle_checked.svg'

const CreateTicket = () => {

    // const [priority, setPriority] = useState("")
    // const [priorityError, setPriorityError] = useState("")
    const [ticketCategory, setTicketCategory] = useState("")

    // const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = data => {

    //     // if (!priority) {
    //     //     setPriorityError("Priority is required")
    //     // }
    //     // else {
    //     //     setPriorityError("")
    //     //     assignTicket(data)
    // };

    // const assignTicket = data => {

    //     const ticketDetails = {
    //         person: data.person,
    //         category: data.category,
    //         sub_category: data.sub_category,
    //         issues: data.issues,
    //         priority,
    //         date: data.date
    //     }
    //     console.log("Ticket Details ", ticketDetails, priority)
    // }

    // const handleCategoryClick = () => {
    //     document.getElementById('ticket-category-checkboxes').style.display === 'none' ?
    //         document.getElementById('ticket-category-checkboxes').style.display = 'block' :
    //         document.getElementById('ticket-category-checkboxes').style.display = 'none'
    // }

    // useEffect(() => {
    //     document.getElementById('staticBackdrop').onclick = function (e) {
    //         if (e.target.id !== 'ticket-category') {
    //             document.getElementById('ticket-category-checkboxes').style.display = 'none'
    //         }
    //     };
    // }, [])

    return (
        <div style={{ borderRadius: '10px' }} className="bg-white m-3 p-3">
            <span className='ticket-modal-body-title'>Ticket Category</span> <select className='select mt-3 font-ibm' onChange={(e) => setTicketCategory(e.target.value)}>
                <option className='font-ibm my-1' value="" selected disabled>Select</option>
                <option className='font-ibm my-1' value="picker-management">Picker Management</option>
                <option className='font-ibm my-1' value="labor-management">Labor Mangement</option>
                <option className='font-ibm my-1' value="vehicle-management">Vehicle Management</option>
                <option className='font-ibm my-1' value="sorter-management">Sorter Management</option>
            </select>
            {ticketCategory === "picker-management" ? <PickerManagement /> : ""}
            {ticketCategory === "labor-management" ? <LaborManagement /> : ""}
            {ticketCategory === "vehicle-management" ? <VehicleManagement /> : ""}
            {ticketCategory === "sorter-management" ? <SorterManagement /> : ""}
        </div>
    );
};

export default CreateTicket;