import React from 'react';
import AttendanceHeroDetails from './AttendanceHeroDetails';

const AttendanceHero = () => {
    return (
        <section>
            <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-sm btn-danger px-3 mt-3 ms-auto d-block">Assign Pickers</button>

            <div className="d-none d-lg-block">
                <div className="d-flex justify-content-center align-items-center mt-5 px-3">
                    <div className="col-md-2 home-hero-container-title">Outlet Name</div>
                    <div className="col-md-2 home-hero-container-title">Picking Started</div>
                    <div className="col-md-2 home-hero-container-title">STO | SKUs</div>
                    <div className="col-md-2 home-hero-container-title">Picking End</div>
                    <div className="col-md-2 home-hero-container-title">Picker Assign</div>
                    <div className="col-md-2 home-hero-container-title">Sorter Assign</div>
                </div>
            </div>

            <div className="d-lg-none">
                <div className="d-flex justify-content-between align-items-center mt-5 px-3">
                    <div className="col-md-4 home-hero-container-title-sm">Details</div>
                    <div className="col-md-4 home-hero-container-title-sm">Picker</div>
                    <div className="col-md-4 home-hero-container-title-sm">Sorter</div>
                </div>
            </div>

            <AttendanceHeroDetails />
        </section>
    );
};

export default AttendanceHero;