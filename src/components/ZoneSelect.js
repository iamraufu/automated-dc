import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import outletZones from '../data/outletZone.json';
import { groupBy } from 'lodash';
import closeIcon from '../images/close.svg'

const ZoneSelect = () => {
      const { selectedZone, 
            // sto, 
            user } = useAuth();
      const [zone, setZone] = useState('');
      const outletDivisions = [...new Set(outletZones.map(item => item.division))]
      const [zonalOutlet, setZonalOutlet] = useState([]);

      const handleZoneChange = (e) => {
            const selectedZoneName = e.target.value;
            setZone(selectedZoneName);
      };

      const handleOutletAdd = (value) => {
            zonalOutlet.indexOf(value) === -1 ? setZonalOutlet([...zonalOutlet, value]) : setZonalOutlet(zonalOutlet)
      };

      const handleOutletRemove = elm => {
            setZonalOutlet(zonalOutlet.filter((item) => item !== elm))
      }

      // const updatedSto = sto.map((data) => {
      //       return { ...data, status: "Assigned" };
      // });

      return (
            <div className="mt-3">
                  <div className='d-flex align-items-center' >
                        <div className="ms-2 ticket-modal-body-title fw-bold">Zone Select:</div>
                        <div className="d-flex align-items-center ms-3">
                              <div className="font-ibm me-2">Select Zone:</div>
                              <select className="select font-ibm" value={zone} onChange={handleZoneChange}>
                                    <option className="font-ibm" value="" disabled>Select</option>
                                    {outletDivisions.map((zone, index) => (
                                          <option key={index + 1} className="font-ibm" value={zone}>{zone}</option>
                                    ))}
                              </select>
                        </div>

                        {zone && (
                              <div className="d-flex align-items-center ms-3">
                                    <div className="font-ibm me-2">Select Outlet:</div>
                                    <select className="select font-ibm"
                                          // value={outlet} 
                                          value=""
                                          onChange={(e) => handleOutletAdd(e.target.value)}>
                                          <option className="font-ibm" value="" disabled>Select</option>
                                          {outletZones.filter(item => item.division === zone).map((outlet, index) => (
                                                <option key={index + 1} className="font-ibm" value={outlet.name}>
                                                      {outlet.name}
                                                </option>
                                          ))}
                                    </select>
                              </div>
                        )}
                  </div>


                  {zone && (
                        <div className="font-ibm ms-2 mt-2">
                              Zone:
                              <span className="text-primary"> {zone}</span>
                              <br />
                              {zonalOutlet && <span className="text-primary">{zonalOutlet.map(item => <button key={item} onClick={() => handleOutletRemove(item)} className='btn btn-sm btn-dark me-1 mt-1'>{item} <img className='img-fluid mb-1 ms-1' width={15} src={closeIcon} alt="" /></button>)}</span>}
                        </div>
                  )}

                  {selectedZone.length > 0 && (
                        <div className="mt-3">
                              <div className="table-responsive">
                                    <table style={{ fontSize: "13px" }} className="table table-bordered">
                                          <thead>
                                                <tr>
                                                      <th scope="col">No</th>
                                                      <th scope="col">Code</th>
                                                      <th scope="col">Name</th>
                                                      <th scope="col" className='text-center'>STO</th>
                                                      <th scope="col" className='text-center'>SKUs</th>
                                                      <th scope="col" className='text-center'>Picked SKU</th>
                                                      <th scope="col" className='text-center'>Picker</th>
                                                      <th scope="col" className='text-center'>Sorter</th>
                                                      <th scope="col" className='text-center'>Time</th>
                                                      <th scope="col" className='text-center'>Action</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {Object.values(groupBy(selectedZone, 'code')).map((outletGroup, index) => (
                                                      <React.Fragment key={index}>
                                                            {outletGroup.map((item, innerIndex) => (
                                                                  <tr key={`${index}-${innerIndex}`}>
                                                                        {innerIndex === 0 ? (
                                                                              <>
                                                                                    <td rowSpan={outletGroup.length} className="">{index + 1}</td>
                                                                                    <td rowSpan={outletGroup.length} className="">{item.code}</td>
                                                                              </>
                                                                        ) : null}
                                                                        <td>{item.name}</td>
                                                                        <td>{item.sto}</td>
                                                                        <td className='text-center'>{item.sku}</td>
                                                                        <td className='text-center'>
                                                                              <input style={{ maxWidth: '85px' }} className='select text-center' type="number" />
                                                                        </td>
                                                                        <td className='text-center'>
                                                                              <select
                                                                                    style={{ maxWidth: '150px', fontSize: '13px' }}
                                                                                    // onChange={(e) => handlePickerChange(index, data.sto, e.target.value)} 
                                                                                    className='select-picker' name="" id={`picker-${index}`}>
                                                                                    <option className='font-ibm' value="" selected disabled>Select Picker</option>
                                                                                    {
                                                                                          user.email &&
                                                                                          user.pickers.map((picker, index) =>
                                                                                                picker.status === 0 && <option key={index} value={picker.name}>{picker.name}</option>
                                                                                          )}
                                                                              </select>
                                                                        </td>
                                                                        <td className='text-center'>
                                                                              <select
                                                                                    style={{ maxWidth: '150px', fontSize: '13px' }}
                                                                                    // onChange={(e) => handlePickerChange(index, data.sto, e.target.value)} 
                                                                                    className='select-picker' name="" id={`picker-${index}`}>
                                                                                    <option className='font-ibm' value="" selected disabled>Select Sorter</option>
                                                                                    {
                                                                                          user.email &&
                                                                                          user.sorters.map((picker, index) =>
                                                                                                picker.status === 0 && <option key={index} value={picker.name}>{picker.name}</option>
                                                                                          )}
                                                                              </select>
                                                                        </td>
                                                                        <td className='text-center'>
                                                                              <input className='select' style={{ maxWidth: '150px' }} type="time" name="" id="" />
                                                                        </td>
                                                                        <td className='text-center'><button onClick={() => console.log(item)} className='picker-details-time-btn' style={{ fontSize: '13px' }}>Start</button></td>
                                                                  </tr>
                                                            ))}
                                                      </React.Fragment>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  )}


            </div>
      );
};

export default ZoneSelect;
