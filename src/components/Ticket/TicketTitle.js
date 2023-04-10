import React from 'react';

const TicketTitle = () => {
    return (
        <section 
        // style={{backgroundColor:'#f5f5f5'}} className='sticky-top'
        >
            {/* <input type="text" className='home-hero-search' placeholder='Search' /> */}

            <div className="d-none d-lg-block">
                <div className="d-flex justify-content-between align-items-center mt-3 px-3">
                    <div className="col-md-2 home-hero-container-title">Ticket</div>
                    <div className="col-md-2 home-hero-container-title">Time</div>
                    <div className="col-md-2 home-hero-container-title">Categories</div>
                    <div className="col-md-2 home-hero-container-title">Priority</div>
                    <div className="col-md-2 home-hero-container-title">Assigned</div>
                    <div className="col-md-2 home-hero-container-title">Resolved</div>
                </div>
            </div>

            <div className="d-lg-none">
                <div className="d-flex justify-content-between align-items-center mt-5 px-3">
                    <div className="col-md-6 home-hero-container-title-sm">Details</div>
                    <div className="col-md-6 home-hero-container-title-sm">Resolved</div>
                </div>
            </div>
        </section>
    );
};

export default TicketTitle;