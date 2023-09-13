import React from 'react';
import useAuth from '../hooks/useAuth';

const GetPass = React.forwardRef(({ data }, ref) => {

    const { user } = useAuth()

    return (
        <div id='printableDiv' className="mt-3 px-5 p-2" ref={ref}>
            <div className="table-responsive">
                <table style={{ fontSize: "13px" }} className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" colSpan={9} className='h5 text-center font-ibm'>ACI Logistics Limited</th>
                        </tr>
                        <tr>
                            <th scope="col" colSpan={7} className='h6 font-ibm'>Name of DC: {user?.name}</th>
                            <th scope="col" colSpan={2} className='h6 font-ibm'>Date: {data?.date}</th>
                        </tr>
                        <tr>
                            <th scope="col" colSpan={4} className='h6 font-ibm'>Name of Driver: {data?.driver_name}</th>
                            <th scope="col" colSpan={3} className='h6 font-ibm'>Vehicle: {data?.vehicle_reg_no}</th>
                            <th scope="col" colSpan={2} className='h6 font-ibm'>Mobile No: {data.driver_phone}</th>
                        </tr>
                        <tr>
                            <th scope="col" colSpan={7} className='h6 font-ibm'>Vendor's Name: </th>
                            <th scope="col" colSpan={2} className='h6 font-ibm'>Vehicle Out Time: </th>
                        </tr>
                        <tr>
                            <th scope="col" className='font-ibm'>SL</th>
                            <th scope="col" className='font-ibm'>Code</th>
                            <th scope="col" className='font-ibm'>Name of Outlet</th>
                            <th scope="col" className='text-center font-ibm'>Del Note No</th>
                            <th scope="col" className='text-center font-ibm'>SKU</th>
                            <th scope="col" className='text-center font-ibm'>Amount</th>
                            <th scope="col" className='text-center font-ibm'>Category</th>
                            <th scope="col" className='text-center font-ibm'>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.stoData.map((item, index) =>
                                <tr key={index}>
                                    <th className='font-ibm'>{index + 1}</th>
                                    <th className='font-ibm'>{index > 0 && data.stoData[index - 1].code === item.code ? "" : item.code}</th>
                                    <th className='font-ibm'>{index > 0 && data.stoData[index - 1].code === item.code ? "" : item.name}</th>
                                    <th className='font-ibm'>{item.sto}</th>
                                    <th className='font-ibm'>{item.sku}</th>
                                    <th className='font-ibm'></th>
                                    <th className='font-ibm'></th>
                                    <th className='font-ibm'></th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className="mt-5 d-flex justify-content-between align-items-center">
                <div className="col-md-3">
                    <p className='font-ibm fw-bold'>In Charge</p>
                </div>
                <div className="col-md-3">
                    <p className='font-ibm fw-bold'>Security</p>
                </div>
                <div className="col-md-3">
                    <p className='font-ibm fw-bold'>Admin DC</p>
                </div>
                <div className="col-md-3">
                    <p className='font-ibm fw-bold'>DC In Charge</p>
                </div>
            </div>

            <p className="mt-3 fw-bold">আমি আমার ডেলিভারি চলাকালীন সময় আমার গাড়িতে কোনো প্রকার অবৈধ মালামাল এবং যাত্রী বহন করিবনা |</p>

            <div className="mt-5 d-flex justify-content-between align-items-center">
                <div className="col-md-6">
                    <p className='font-ibm fw-bold text-center'>Delivery Man Signature</p>
                </div>
                <div className="col-md-6">
                    <p className='font-ibm fw-bold text-center'>Driver's Signature</p>
                </div>
            </div>

        </div>
    );
});

export default GetPass;