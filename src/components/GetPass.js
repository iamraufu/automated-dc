import React from 'react';
import useAuth from '../hooks/useAuth';

const GetPass = React.forwardRef(({ data }, ref) => {

    const { user } = useAuth()

    return (
        <div className="mt-5 px-5 p-2" ref={ref}>
            <div className="table-responsive">
                <table style={{ fontSize: "13px", fontWeight:'500' }} className="table table-bordered font-inter">
                    <thead>
                        <tr>
                            <th colSpan={9} className='text-center fw-normal h6'>ACI Logistics Limited</th>
                        </tr>
                        <tr>
                            <th colSpan={9} className='font-inter fw-normal'>Reference Code: {data?.ref}/{data?.number}</th>
                        </tr>
                        <tr>
                            <th colSpan={4} className='fw-normal'>Name of DC: {user?.name}</th>
                            <th colSpan={3} className='fw-normal'>Category: {data?.category}</th>
                            <th colSpan={2} className='fw-normal'>Date: {data?.date}</th>
                        </tr>
                        <tr>
                            <th colSpan={4} className='fw-normal'>Name of Driver: {data?.driverName}</th>
                            <th colSpan={3} className='fw-normal'>Delivery Man: {data?.deliveryMan}</th>
                            <th colSpan={2} className='fw-normal'>Delivery Man No: {data.deliveryManNumber}</th>
                        </tr>
                        <tr>
                            <th colSpan={4} className='fw-normal'>Vehicle: {data?.vehicleType}</th>
                            <th colSpan={3} className='fw-normal'>Amount: {Number(data?.amount).toLocaleString()} Taka</th>
                            <th colSpan={2} className='fw-normal'>Vehicle Out Time: </th>
                        </tr>
                        <tr>
                            <th className='fw-normal'>SL</th>
                            <th className='fw-normal'>Code</th>
                            <th className='fw-normal'>Name of Outlet</th>
                            <th className='fw-normal text-center'>STO</th>
                            <th className='fw-normal text-center'>SKU</th>
                            <th className='fw-normal text-center'>Final SKU</th>
                            <th className='fw-normal text-center'>DC</th>
                            <th className='fw-normal'>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data.map((item, index) =>
                                <tr key={index}>
                                    <th className='fw-normal'>{index + 1}</th>
                                    <th className='fw-normal'>{item.code}</th>
                                    <th className='fw-normal'>{item.name}</th>
                                    <th className='fw-normal'>{item.sto}</th>
                                    <th className='fw-normal text-center'>{item.sku}</th>
                                    <th className='fw-normal text-center'>{item.finalSKU}</th>
                                    <th className='fw-normal text-center'>{item.dc}</th>
                                    <th className='fw-normal'></th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className="mt-5 d-flex justify-content-between align-items-center font-inter">
                <div className="col-md-3">
                    <p className=''>In Charge</p>
                </div>
                <div className="col-md-3">
                    <p className=''>Security</p>
                </div>
                <div className="col-md-3">
                    <p className=''>Admin DC</p>
                </div>
                <div className="col-md-3">
                    <p className=''>DC In Charge</p>
                </div>
            </div>

            <p className="mt-3 font-bangla">আমি আমার ডেলিভারি চলাকালীন সময় আমার গাড়িতে কোনো প্রকার অবৈধ মালামাল এবং যাত্রী বহন করিবনা</p>

            <div className="mt-5 d-flex justify-content-between align-items-center">
                <div className="col-md-6 mt-5">
                    <p className='font-inter text-center'>Delivery Man Signature</p>
                </div>
                <div className="col-md-6 mt-5">
                    <p className='font-inter text-center'>Driver's Signature</p>
                </div>
            </div>

        </div>
    );
});

export default GetPass;