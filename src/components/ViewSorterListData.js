import React from 'react';
import useAuth from '../hooks/useAuth';
// import { toast } from 'react-toastify';
import _ from 'lodash'
import Swal from 'sweetalert2';

const ViewPickerListData = ({ sorterData }) => {

      const { user } = useAuth()

      const handleVehicleUpdate = () => {
            document.getElementById('sorter-file-btn').style.display = 'none'
            document.getElementById('sorter-file-spinner').style.display = 'block'
            submit()
      }

      const submit = async () => {

            const details = {
                  sorters: sorterData,
                  email: user.email
            }

            // const response = await toast.promise(fetch(`http://localhost:8000/user/${user._id}`, {
            //       method: 'PATCH',
            //       headers: { 'Content-Type': 'application/json' },
            //       body: JSON.stringify(details)
            // }),
            //       {
            //             pending: 'Sorter List Updating...',
            //             success: 'Updated Sorter Data',
            //             error: 'There is an error posting. Please try again!'
            //       })

            // const result = await response.json()
            // if (result.status === true) {
            //       document.getElementById('sorter-file-btn').style.display = 'block'
            //       document.getElementById('sorter-file-spinner').style.display = 'none'
            // }
            fetch(`http://localhost:8000/user/${user._id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(details)
            })
                  .then(response => response.json())
                  .then(result => {
                        if (result.status === true) {
                              document.getElementById('sorter-file-btn').style.display = 'block'
                              document.getElementById('sorter-file-spinner').style.display = 'none'
                              let timerInterval
                              Swal.fire({
                                    icon: 'success',
                                    title: `${result.message}`,
                                    timer: 1500,
                                    timerProgressBar: true,
                                    didOpen: () => {
                                          Swal.showLoading()
                                          timerInterval = setInterval(() => {
                                          }, 100)
                                    },
                                    willClose: () => {
                                          clearInterval(timerInterval)
                                          window.location.reload()
                                    }
                              }).then((result) => {
                                    if (result.dismiss === Swal.DismissReason.timer) {
                                          window.location.reload()
                                    }
                              })
                        }
                        else {
                              Swal.fire({
                                    icon: 'error',
                                    title: `${result.message}`,
                                    timer: 2000
                              })
                        }
                  })
      }

      return (
            <div className="mt-3 col-md-5">
                  <div className='d-flex justify-content-center align-items-center'>
                        <div className="col-md-2 view-sto-list-header">Id</div>
                        <div className="col-md-10 view-sto-list-header text-center">Name</div>
                  </div>

                  <div style={{ height: '400px', overflowY: 'auto', overflowX: 'hidden' }} className="mt-3 bg-white sto-list-viewer">

                        {
                              _.sortBy(sorterData, 'name').map((data, index) =>
                                    <div key={index} className="d-flex justify-content-between align-items-center my-3">
                                          <div className="col-md-2 font-ibm text-center">{data.id}</div>
                                          <div className="col-md-5 font-ibm text-center">{data.name}</div>
                                    </div>
                              )
                        }
                  </div>

                  <button id='sorter-file-btn' onClick={() => handleVehicleUpdate()} className='mt-3 btn-view-sto-list'>Submit File</button>
                  <div id='sorter-file-spinner' style={{ display: 'none' }} className="">
                        <button className='mt-3 btn-view-sto-list d-flex justify-content-center align-items-center'><div style={{ width: '18px', height: '18px' }} className="spinner-border text-dark me-2" role="status"></div>Uploading...</button>
                  </div>
            </div>
      );
};

export default ViewPickerListData;