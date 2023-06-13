import React from 'react';
import Sidebar from '../components/Sidebar';
import STOAssign from '../components/STO/STOAssign'
import UploadedSTO from '../components/STO/UploadedSTO';
import PickerSorterKPI from '../components/KPI/PickerSorterKPI';

const Picker = () => {

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                    <STOAssign />
                    <UploadedSTO />
                    <PickerSorterKPI />
                </div>
            </div>
        </section>
    );
};

export default Picker;