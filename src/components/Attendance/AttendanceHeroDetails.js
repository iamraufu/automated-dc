import React from 'react';

const AttendanceHeroDetails = () => {

    let number = 1234567890;
    let part1 = parseInt(number.toString().slice(0, 3)); // 1
    let part2 = parseInt(number.toString().slice(3, 6)); // 234
    let part3 = parseInt(number.toString().slice(6)); // 5678

    return (
        <div className="">
            <section className='home-hero-details-container mt-3 p-3 d-none d-lg-block'>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-2">
                        <div className="outlet-code">DO58</div>
                        <div className="details-content">Uttara Sector 03</div>
                    </div>
                    <div className="col-md-2 details-content">08.00 AM</div>
                    <div className="col-md-2 ">
                        <div style={{ width: '150px' }} className="details-content text-center">40</div>
                        <div className="details-content d-flex align-items-center">
                            <div className="sto-number">{part1}</div>
                            <div className="sto-number">{part2}</div>
                            <div className="sto-number">{part3}</div>
                        </div>
                    </div>
                    <div className="col-md-2 details-content">09.40 AM</div>
                    <div className="col-md-2 details-content">Salam</div>
                    <div className="col-md-2 details-content">Arif</div>
                </div>
            </section>

            <section className='home-hero-details-container mt-3 p-3 d-lg-none'>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md-4">
                        <div className="outlet-code">DO58</div>
                        <div className="details-content-sm">Uttara Sector 03</div>
                        <div className="details-content-sm d-flex align-items-center">
                            <div className="fw-bold">STO</div>
                            <div className="sto-number">{part1}</div>
                            <div className="sto-number">{part2}</div>
                            <div className="sto-number">{part3}</div>
                        </div>
                        <div className="details-content-sm"><b>SKU</b> 40</div>
                        <div className="details-content-sm">In Progress</div>
                    </div>

                    <div className="col-md-4 details-content-sm">08.00 AM<br />Salam<br />09:40 AM</div>

                    <div className="col-md-4 details-content-sm">Arif</div>
                </div>
            </section>

            {/* ---------------------------------------------------------------------- */}
            <section className='home-hero-details-container mt-3 p-3 d-none d-lg-block'>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-2">
                        <div className="outlet-code">F229</div>
                        <div className="details-content">Sarulia Demra Outlet</div>
                    </div>
                    <div className="col-md-2 details-content">08.00 AM</div>
                    <div className="col-md-2 ">
                        <div style={{ width: '150px' }} className="details-content text-center">40</div>
                        <div className="details-content d-flex align-items-center">
                            <div className="sto-number">{part1}</div>
                            <div className="sto-number">{part2}</div>
                            <div className="sto-number">{part3}</div>
                        </div>
                    </div>
                    <div className="col-md-2 details-content">09.40 AM</div>
                    <div className="col-md-2 details-content">Jobbar</div>
                    <div className="col-md-2 details-content">Sezan</div>
                </div>
            </section>

            {/* ---------------------------------------------------------------------- */}
            <section className='home-hero-details-container mt-3 p-3 d-none d-lg-block'>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-2">
                        <div className="outlet-code">F229</div>
                        <div className="details-content">Sarulia Demra Outlet</div>
                    </div>
                    <div className="col-md-2 details-content">08.00 AM</div>
                    <div className="col-md-2 ">
                        <div style={{ width: '150px' }} className="details-content text-center">40</div>
                        <div className="details-content d-flex align-items-center">
                            <div className="sto-number">{part1}</div>
                            <div className="sto-number">{part2}</div>
                            <div className="sto-number">{part3}</div>
                        </div>
                    </div>
                    <div className="col-md-2 details-content">09.40 AM</div>
                    <div className="col-md-2 details-content">Rahim</div>
                    <div className="col-md-2 details-content">Nazim</div>
                </div>
            </section>

            {/* ---------------------------------------------------------------------- */}
            <section className='home-hero-details-container mt-3 p-3 d-none d-lg-block'>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-2">
                        <div className="outlet-code">F229</div>
                        <div className="details-content">Sarulia Demra Outlet</div>
                    </div>
                    <div className="col-md-2 details-content">08.00 AM</div>
                    <div className="col-md-2 ">
                        <div style={{ width: '150px' }} className="details-content text-center">40</div>
                        <div className="details-content d-flex align-items-center">
                            <div className="sto-number">{part1}</div>
                            <div className="sto-number">{part2}</div>
                            <div className="sto-number">{part3}</div>
                        </div>
                    </div>
                    <div className="col-md-2 details-content">09.40 AM</div>
                    <div className="col-md-2 details-content">Karim</div>
                    <div className="col-md-2 details-content">Mizan</div>
                </div>
            </section>
        </div>
    );
};

export default AttendanceHeroDetails;