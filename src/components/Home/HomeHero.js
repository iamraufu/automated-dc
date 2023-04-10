import React from 'react';
// import HomeHeroDetails from './HomeHeroDetails';
import TicketTitle from '../Ticket/TicketTitle';
import useAuth from '../../hooks/useAuth';
import TicketDetails from '../Ticket/TicketDetails';

const HomeHero = () => {

    const { tickets } = useAuth()

    return (
        <section>
            {/* <input type="text" className='home-hero-search' placeholder='Search' /> */}

            {/* <div className="d-none d-lg-block">
                <div className="d-flex justify-content-between align-items-center mt-5 px-3">
                    <div className="col-md-2 home-hero-container-title">Outlet Name</div>
                    <div className="col-md-2 home-hero-container-title">Picking Status</div>
                    <div className="col-md-2 home-hero-container-title">STO Number</div>
                    <div className="col-md-2 home-hero-container-title">SKUs</div>
                    <div className="col-md-2 home-hero-container-title">Vehicle Number</div>
                    <div className="col-md-2 home-hero-container-title">Loading Status</div>
                </div>
            </div>

            <div className="d-lg-none">
                <div className="d-flex justify-content-between align-items-center mt-5 px-3">
                    <div className="col-md-6 home-hero-container-title-sm">Details</div>
                    <div className="col-md-6 home-hero-container-title-sm">Vehicle</div>
                </div>
            </div> */}

            {/* <HomeHeroDetails /> */}
            <TicketTitle />
            {
                tickets.length > 0 ?
                    tickets.slice(0,4).map(ticket => <TicketDetails key={ticket._id} ticket={ticket} />)
                    :
                    <div className="">
                        <p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                        </p>
                    </div>
            }

        </section>
    );
};

export default HomeHero;