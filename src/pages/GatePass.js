import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import ReactToPrint from 'react-to-print';
import printIcon from '../images/print.svg'
import GetPass from '../components/GetPass';

const GatePass = () => {

      const { startDate, setStartDate, endDate, setEndDate, user } = useAuth()
      const [gatePass, setGatePass] = useState([])
      const [gatePassData, setGatePassData] = useState([])

      const componentRef = useRef();

      useEffect(() => {
            const fetchData = async () => {
                  const response = await toast.promise(
                        fetch(`https://shwapnodc.onrender.com/gate-pass-email/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`),
                        {
                              pending: 'Fetching the latest data...',
                              success: 'Latest Data Loaded',
                              error: 'There is an error fetching. Please try again!'
                        }
                  );
                  const result = await response.json();
                  if (result.status === true) {
                        setGatePass(result.data)
                  }
                  else {
                        console.log(result)
                  }
            };
            fetchData();
      }, [user.email, startDate, endDate, setGatePass])

      const handleOnBeforeGetContent = (data) => {
            setGatePassData(data)
            return new Promise((resolve) => resolve());
      }

      return (
            <section className='bg-brand container-fluid p-0'>
                  <div className="d-flex">
                        <div style={{ width: '116px' }} className="col-md-2 bg-white">
                              <Sidebar />
                        </div>

                        <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                              <h1 className='font-ibm h6'>Gate Pass</h1>

                              <div className="d-flex align-items-center">
                                    <div className="font-ibm">
                                          <p className='ms-1 mb-0'>From:</p><DatePicker className='select bg-white' selected={startDate} onChange={(date) => {
                                                setStartDate(date)
                                          }} />
                                    </div>

                                    <div className="font-ibm ms-3">
                                          <p className='ms-1 mb-0'>To:</p><DatePicker className='select bg-white' selected={endDate} onChange={(date) => {
                                                setEndDate(date)
                                          }} />
                                    </div>
                              </div>

                              <div style={{ maxHeight: '450px', overflowY: 'auto' }} className="table-responsive bg-white mt-5">
                                    <div className="table-responsive">
                                          <table style={{ fontSize: "12px" }} className="table table-bordered font-inter m-0">
                                                <thead>
                                                      <tr>
                                                            <th>No</th>
                                                            <th>Ref</th>
                                                            <th>Code</th>
                                                            <th>Name</th>
                                                            <th>STO</th>
                                                            <th>SKU</th>
                                                            <th>Final SKU</th>
                                                            <th>Amount</th>
                                                            <th>Category</th>
                                                            <th>Vehicle Type</th>
                                                            <th>Driver Name</th>
                                                            <th>Delivery Man</th>
                                                            <th>Delivery Man Number</th>
                                                            <th>Print</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {
                                                            gatePass.length > 0 &&
                                                            gatePass.map((item, index) =>
                                                                  <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{item.ref}/{item.number}</td>
                                                                        <td>
                                                                              {
                                                                                    item.data.map((i, k) =>
                                                                                          <React.Fragment key={k}>
                                                                                                <span>{i.code}</span>
                                                                                                <br />
                                                                                          </React.Fragment>
                                                                                    )
                                                                              }
                                                                        </td>
                                                                        <td>
                                                                              {
                                                                                    item.data.map((i, k) =>
                                                                                          <React.Fragment key={k}>
                                                                                                <span>{i.name}</span>
                                                                                                <br />
                                                                                          </React.Fragment>
                                                                                    )
                                                                              }
                                                                        </td>
                                                                        <td>
                                                                              {
                                                                                    item.data.map((i, k) =>
                                                                                          <React.Fragment key={k}>
                                                                                                <span>{i.sto}</span>
                                                                                                <br />
                                                                                          </React.Fragment>
                                                                                    )
                                                                              }
                                                                        </td>
                                                                        <td>
                                                                              {
                                                                                    item.data.map((i, k) =>
                                                                                          <React.Fragment key={k}>
                                                                                                <span>{i.sku}</span>
                                                                                                <br />
                                                                                          </React.Fragment>
                                                                                    )
                                                                              }
                                                                        </td>
                                                                        <td>
                                                                              {
                                                                                    item.data.map((i, k) =>
                                                                                          <React.Fragment key={k}>
                                                                                                <span>{i.finalSKU}</span>
                                                                                                <br />
                                                                                          </React.Fragment>
                                                                                    )
                                                                              }
                                                                        </td>
                                                                        <td>{Number(item.amount).toLocaleString()}</td>
                                                                        <td>{item.category}</td>
                                                                        <td>{item.vehicleType}</td>
                                                                        <td>{item.driverName}</td>
                                                                        <td>{item.deliveryMan}</td>
                                                                        <td>{item.deliveryManNumber}</td>
                                                                        <td>
                                                                              <ReactToPrint
                                                                                    onBeforeGetContent={() => handleOnBeforeGetContent(item)}
                                                                                    trigger={() => <img style={{ cursor: 'pointer' }} src={printIcon} width={25} className='mx-auto d-block img-fluid' alt="download get pass" />}
                                                                                    content={() => componentRef.current}
                                                                              />
                                                                        </td>
                                                                  </tr>
                                                            )
                                                      }
                                                </tbody>
                                          </table>
                                    </div>
                              </div>

                              {
                                    gatePassData.email &&
                                    <GetPass data={gatePassData} ref={componentRef} />
                              }
                        </div>
                  </div>

                  <ToastContainer autoClose={1000} />
            </section>
      );
};

export default GatePass;