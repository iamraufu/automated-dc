import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
// import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';

const STOStatus = () => {

      const { user, startDate, setStartDate, endDate, setEndDate } = useAuth()

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const response = await toast.promise(
                              fetch(`http://localhost:8000/sto-email-date-range/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`),
                              {
                                    pending: 'Fetching the pending STO...',
                                    success: 'Pending STO Data Loaded',
                                    error: 'There is an error fetching. Please try again!'
                              }
                        )
                        const result = await response.json();
                        console.log(result)
                  }
                  catch (error) {
                        fetchData()
                  }
            }
            fetchData()
      }, [user.email, startDate, endDate])

      return (
            <section className='bg-brand container-fluid p-0'>
                  <div className="d-flex">
                        <div style={{ width: '116px' }} className="col-md-2 bg-white">
                              <Sidebar />
                        </div>

                        <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                              {/* <form onSubmit={handleSubmit(onSubmit)}>
                                    <div style={{ borderRadius: '10px' }} className="bg-white m-3 p-3">
                                          <input min='0' type="number" className='number-input font-ibm'  />
                                          <input type="submit" className="font-ibm btn btn-sm btn-danger mt-3 px-3" value="Search STO Status" />
                                    </div>
                              </form> */}
                              <div className="d-flex align-items-center">
                                    <div className="font-ibm">
                                          <p className='ms-1 mb-0'>From:</p><DatePicker className='select bg-white' selected={startDate} onChange={(date) => {
                                                setStartDate(date)
                                          }}
                                          />
                                    </div>
                                    <div className="font-ibm ms-3">
                                          <p className='ms-1 mb-0'>To:</p><DatePicker className='select bg-white' selected={endDate} onChange={(date) => {
                                                setEndDate(date)
                                          }} />
                                    </div>
                                    <div className="font-ibm ms-3">
                                          <p className='mb-0 ms-1'>Category</p>
                                          <select className='select bg-white' onChange={(e) => { }
                                          }>
                                                <option className='font-ibm my-1' value="" selected disabled>Select</option>
                                                {/* {
                            vehicleWiseData.length > 0 &&
                            // _.orderBy(vehicleWiseData, ['zone'], ['asc']).map((v, index) =>
                            vehicleWiseData.map((v, index) =>
                                <option key={index + 1} className='font-ibm my-1' value={`${v.zone}-${v.vehicle}`}>{v.zone} {v.vehicle}</option>
                            )
                        } */}
                                          </select>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <ToastContainer autoClose={1000} />
            </section>
      );
};

export default STOStatus;