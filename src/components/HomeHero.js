import React from 'react';
import HomeHeroDetails from './HomeHeroDetails';

const HomeHero = () => {
    return (
        <section>
            <input type="text" className='home-hero-search' placeholder='Search' />

            <div className="">
                <div className="d-flex justify-content-center align-items-center mt-5 px-3">
                    <div className="col-md-2 home-hero-container-title">Outlet Name</div>
                    <div className="col-md-2 home-hero-container-title">Picking Status</div>
                    <div className="col-md-2 home-hero-container-title">STO Number</div>
                    <div className="col-md-2 home-hero-container-title">SKUs</div>
                    <div className="col-md-2 home-hero-container-title">Vehicle Number</div>
                    <div className="col-md-2 home-hero-container-title">Loading Status</div>
                </div>
            </div>

            <HomeHeroDetails />

        </section>
    );
};

export default HomeHero;