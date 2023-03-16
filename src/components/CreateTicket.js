import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import rectangle from '../images/rectangle.svg'
import rectangle_checked from '../images/rectangle_checked.svg'

const CreateTicket = () => {

    const [priority, setPriority] = useState("")

    const { register, handleSubmit, 
        // formState: { errors } 
    } = useForm();
    const onSubmit = data => console.log(data, priority);

    const handleCategoryClick = () => {
        document.getElementById('ticket-category-checkboxes').style.display === 'none' ?
            document.getElementById('ticket-category-checkboxes').style.display = 'block' :
            document.getElementById('ticket-category-checkboxes').style.display = 'none'
    }

    // useEffect(() => {
    //     document.getElementById('staticBackdrop').onclick = function (e) {
    //         if (e.target.id !== 'ticket-category') {
    //             document.getElementById('ticket-category-checkboxes').style.display = 'none'
    //         }
    //     };
    // }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ borderRadius: '10px' }} className="bg-white m-3 p-3">
                <div className="d-flex">

                    <div className="col-md-6">
                        <h2 className='ticket-modal-body-title'>Person Assign</h2>
                        <select {...register("person")} name="person-assign" id="person-assign" className='mt-3 font-ibm'>
                            <option className='font-ibm my-1' disabled selected>Select</option>
                            <option className='font-ibm my-1' value="Mujahidul">Mujahidul</option>
                            <option className='font-ibm my-1' value="Al-Amin">Al-Amin</option>
                            <option className='font-ibm my-1' value="Saikat">Saikat</option>
                            <option className='font-ibm my-1' value="Torikul">Torikul</option>
                            <option className='font-ibm my-1' value="Sipon">Sipon</option>
                            <option className='font-ibm my-1' value="Bashir">Bashir</option>
                        </select>

                        <div className="mt-4">
                            <h2 className='ticket-modal-body-title'>Sub Category</h2>
                            <input {...register('sub_category')} type="checkbox" id="vehicle_management" value="Vehicle maintenance" />
                            <label htmlFor="vehicle_management" className='ms-2 me-5'>Vehicle maintenance</label>
                            <input {...register('sub_category')} type="checkbox" id="vehicle_case" value="Vehicle Case" />
                            <label htmlFor="vehicle_case" className='ms-2 me-5'>Vehicle Case</label>
                            <input {...register('sub_category')} type="checkbox" id="others" value="Others" />
                            <label htmlFor="others" className='ms-2'>Others</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h2 className='ticket-modal-body-title'>Ticket Category*</h2>
                        <div id="ticket-category-container">
                            <div id="ticket-category" onClick={() => handleCategoryClick()} className='mt-4 mb-2 font-ibm'>Select</div>
                            {/* <select
                                            {...register("category", { required: true })} 
                                            name="ticket-category" id="ticket-category" className='mt-3'>
                                            <option disabled selected>Select</option>
                                            <option value="">Picker Management</option>
                                            <option value="">Labor Management</option>
                                            <option value="">Vehicle Management</option>
                                            <option value="">Vendor Vehicle issues and fee</option>
                                            <option value="">Sorter Management</option>
                                        </select> */}
                            <div id="ticket-category-checkboxes" style={{ display: 'none', boxShadow: '0 5px 15px #c4c4c44d', width: '400px', borderRadius: '8px', cursor:'pointer' }} className='bg-white position-fixed p-3'>
                                <div className="d-flex">
                                    <img src={rectangle} className='me-2 mb-2' alt="check" />
                                    <h3 className='ticket-modal-body-checker'>Picker Management</h3>
                                </div>
                                <div className="d-flex">
                                    <img src={rectangle} className='me-2 mb-2' alt="check" />
                                    <h3 className='ticket-modal-body-checker'>Labor Management</h3>
                                </div>
                                <div className="d-flex">
                                    <img src={rectangle} className='me-2 mb-2' alt="check" />
                                    <h3 className='ticket-modal-body-checker'>Vehicle Management</h3>
                                </div>
                                <div className="d-flex">
                                    <img src={rectangle} className='me-2 mb-2' alt="check" />
                                    <h3 className='ticket-modal-body-checker'>Vendor Vehicle issues and fee</h3>
                                </div>
                                <div className="d-flex">
                                    <img src={rectangle_checked} className='me-2 mb-2' alt="check" />
                                    <h3 className='ticket-modal-body-checker'>Sorter Management</h3>
                                </div>
                                <button onClick={()=> handleCategoryClick()} className="btn btn-sm btn-danger px-3 ms-auto d-block mt-3">Done</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h2 className='ticket-modal-body-title'>Issues*</h2>
                    <textarea {...register('issues')} style={{ borderRadius: '10px' }} name="ticket-issue" id="ticket-issue" cols="80" rows="6" />
                </div>

                <div className="mt-5">
                    <h2 className='ticket-modal-body-title'>Priority</h2>
                    <div className="d-flex align-items-center">
                        <div
                            onClick={(e) => setPriority(e.target.innerHTML)}
                            className="urgent"><p className='m-0 mx-auto d-block'>Urgent</p></div>
                        <div
                            onClick={(e) => {
                                setPriority(e.target.innerHTML)
                                document.getElementById('ticket_due_date').value = new Date().toISOString().split('T')[0]
                            }}
                            className="by-today ms-3"><p className='m-0 mx-auto d-block'>By Today</p></div>
                        <div
                            onClick={(e) => setPriority(e.target.innerHTML)}
                            className="default ms-3"><p className='m-0 mx-auto d-block'>Default</p></div>
                        <div
                            onClick={(e) => setPriority(e.target.innerHTML)}
                            className="new ms-3"><p className='m-0 mx-auto d-block'>New</p></div>
                    </div>
                </div>

                <div className="mt-5">
                    <h2 className="ticket-modal-body-title">Due Date</h2>
                    <input className='font-ibm' id="ticket_due_date" type="date" min={new Date().toISOString().split('T')[0]} name='ticket_due_date' />
                </div>

                <input type="submit" className="font-ibm btn btn-sm btn-danger mt-3 px-3" value="Assign Ticket" />

            </div>
        </form>
    );
};

export default CreateTicket;