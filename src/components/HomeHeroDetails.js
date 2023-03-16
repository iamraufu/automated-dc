import React from 'react';

const HomeHeroDetails = () => {

    let number = 1234567890;
    let part1 = parseInt(number.toString().slice(0, 3)); // 1
    let part2 = parseInt(number.toString().slice(3, 6)); // 234
    let part3 = parseInt(number.toString().slice(6)); // 5678

    return (
        <div className="">
            <section className='home-hero-details-container mt-3 p-3'>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-2">
                        <div className="outlet-code">DO58</div>
                        <div className="details-content">Uttara Sector 03</div>
                    </div>
                    <div className="col-md-2 details-content">In Progress</div>
                    <div className="col-md-2 details-content d-flex align-items-center">
                        <div className="sto-number">{part1}</div>
                        <div className="sto-number">{part2}</div>
                        <div className="sto-number">{part3}</div>
                    </div>
                    <div className="col-md-2 details-content">40</div>
                    <div className="col-md-2 details-content">GHA 340 3890 <br /><span className='own-vehicle'><small>Own</small></span></div>
                    <div className="col-md-2 details-content">Assigned</div>
                </div>
            </section>

            {/* ---------------------------------------------------------------------- */}
            <section className='home-hero-details-container mt-3 p-3'>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-2">
                        <div className="outlet-code">F229</div>
                        <div className="details-content">Sarulia Demra Outlet</div>
                    </div>
                    <div className="col-md-2 details-content not-started">Not Started</div>
                    <div className="col-md-2 details-content d-flex align-items-center">
                        <div className="sto-number">{part1}</div>
                        <div className="sto-number">{part2}</div>
                        <div className="sto-number">{part3}</div>
                    </div>
                    <div className="col-md-2 details-content">40</div>
                    <div className="col-md-2 details-content">GHA 340 3890 <br /><span className='vendor-vehicle'><small>Vendor</small></span></div>
                    <div className="col-md-2 details-content">9.40 sent</div>
                </div>
            </section>

            {/* ---------------------------------------------------------------------- */}
            <section className='home-hero-details-container mt-3 p-3'>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-2">
                        <div className="outlet-code">F229</div>
                        <div className="details-content">Sarulia Demra Outlet</div>
                    </div>
                    <div className="col-md-2 details-content not-started">Not Started</div>
                    <div className="col-md-2 details-content d-flex align-items-center">
                        <div className="sto-number">{part1}</div>
                        <div className="sto-number">{part2}</div>
                        <div className="sto-number">{part3}</div>
                    </div>
                    <div className="col-md-2 details-content">40</div>
                    <div className="col-md-2 details-content">GHA 340 3890 <br /><span className='vendor-vehicle'><small>Vendor</small></span></div>
                    <div className="col-md-2 details-content">9.40 sent</div>
                </div>
            </section>

            {/* ---------------------------------------------------------------------- */}
            <section className='home-hero-details-container mt-3 p-3'>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-2">
                        <div className="outlet-code">F229</div>
                        <div className="details-content">Sarulia Demra Outlet</div>
                    </div>
                    <div className="col-md-2 details-content not-started">Not Started</div>
                    <div className="col-md-2 details-content d-flex align-items-center">
                        <div className="sto-number">{part1}</div>
                        <div className="sto-number">{part2}</div>
                        <div className="sto-number">{part3}</div>
                    </div>
                    <div className="col-md-2 details-content">40</div>
                    <div className="col-md-2 details-content">GHA 340 3890 <br /><span className='vendor-vehicle'><small>Vendor</small></span></div>
                    <div className="col-md-2 details-content">9.40 sent</div>
                </div>
            </section>
        </div>
    );
};

export default HomeHeroDetails;