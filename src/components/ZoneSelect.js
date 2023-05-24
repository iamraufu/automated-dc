import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import randomZones from '../data/randomZones'

const ZoneSelect = () => {

      const { selectedZone } = useAuth()
      const [zone, setZone] = useState('')
      const [zonalOutlet, setZonalOutlet] = useState()
      const [outlet, setOutlet] = useState('')

      return (
            <div className="mt-3">
                  <span className='ms-2 ticket-modal-body-title'>Zone Select</span>
                  <select className='select ms-3 font-ibm' onChange={(e) => {
                        setZone(e.target.value)
                        setZonalOutlet(randomZones.find(sz => sz.name === e.target.value))
                  }}>
                        <option className='font-ibm my-1' value="" selected disabled>Select</option>
                        {
                              randomZones.map((zone, index) =>
                                    <option key={index + 1} className='font-ibm my-1' value={zone.name}>{zone.name}</option>
                              )
                        }
                  </select>

                  {
                        zonalOutlet && <select className='select ms-3 font-ibm' onChange={(e) => {
                              setOutlet(e.target.value)
                        }}>
                              <option className='font-ibm my-1' value="" selected disabled>Select</option>
                              {
                                    zonalOutlet.outlets.map((outlet, index) =>
                                          <option key={index + 1} className='font-ibm my-1' value={outlet.name}>{outlet.name}</option>
                                    )
                              }
                        </select>
                  }


                  {
                        zone && <div className="font-ibm ms-2">Selected: <span className='text-primary'>{zone}</span> <span className='text-primary'>{outlet && outlet}</span></div>
                  }

                  {
                        selectedZone.length > 0 &&
                        <div>
                              <div className="d-flex justify-content-between align-items-center px-2">
                                    <div className="font-ibm">SL. No</div>
                                    <div className="font-ibm">Outlet</div>
                                    <div className="font-ibm">...</div>
                                    <div className="font-ibm">STO Number</div>
                                    <div className="font-ibm">SKUs</div>
                                    <div className="font-ibm">Sorter</div>
                                    <div className="font-ibm">Total</div>
                              </div>
                              {
                                    selectedZone.map((item, index) =>
                                          <div key={index + 1} className="d-flex justify-content-between align-items-center px-2">
                                                <div className="font-ibm">{index + 1}</div>
                                                <div className="font-ibm"></div>
                                                <div className="font-ibm">{item.category}</div>
                                                <div className="font-ibm"></div>
                                                <div className="font-ibm">{item.product.sku}</div>
                                                <div className="font-ibm"></div>
                                                <div className="font-ibm"></div>
                                          </div>
                                    )}
                        </div>
                  }
            </div>
      );
};

export default ZoneSelect;