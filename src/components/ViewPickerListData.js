import React from 'react';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import _ from 'lodash'

const ViewPickerListData = ({ pickerData }) => {

      const { user } = useAuth()

      const handleVehicleUpdate = () => {
            document.getElementById('picker-file-btn').style.display = 'none'
            document.getElementById('picker-file-spinner').style.display = 'block'
            submit()
      }

      const submit = async () => {

            const details = {
                  pickers: pickerData,
                  email: user.email
            }

            const response = await toast.promise(fetch(`https://shwapnodc.onrender.com/user/${user._id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(details)
            }),
                  {
                        pending: 'Picking Data Updating...',
                        success: 'Updated Picker Data',
                        error: 'There is an error posting. Please try again!'
                  })

            const result = await response.json()
            if (result.status === true) {
                  document.getElementById('picker-file-btn').style.display = 'block'
                  document.getElementById('picker-file-spinner').style.display = 'none'
            }
      }

      return (
            <div className="mt-3 col-md-5">
                  <div className='d-flex justify-content-center align-items-center'>
                        <div className="col-md-2 view-sto-list-header">Id</div>
                        <div className="col-md-10 view-sto-list-header text-center">Name</div>
                  </div>

                  <div style={{ height: '400px', overflowY: 'auto', overflowX: 'hidden' }} className="mt-3 bg-white sto-list-viewer">

                        {
                              _.sortBy(pickerData, 'name').map((data, index) =>
                                    <div key={index} className="d-flex justify-content-between align-items-center my-3">
                                          <div className="col-md-2 font-ibm text-center">{data.id}</div>
                                          <div className="col-md-5 font-ibm text-center">{data.name}</div>
                                    </div>
                              )
                        }
                  </div>

                  <button id='picker-file-btn' onClick={() => handleVehicleUpdate()} className='mt-3 btn-view-sto-list'>Submit File</button>
                  <div id='picker-file-spinner' style={{ display: 'none' }} className="">
                        <button className='mt-3 btn-view-sto-list d-flex justify-content-center align-items-center'><div style={{ width: '18px', height: '18px' }} className="spinner-border text-dark me-2" role="status"></div>Uploading...</button>
                  </div>
            </div>
      );
};

export default ViewPickerListData;