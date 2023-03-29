import React from 'react';

import menuIcon from '../images/menu.png'
import NavContents from './NavContents';

const Sidebar = () => {
    return (
        <section style={{
            minHeight: '100vh',
            // boxShadow: '0 5px 15px #c4c4c44d' 
        }} className="py-2 bg-white">
            <div className="d-md-none">
                <img style={{position:'fixed'}} width={30} className='img-fluid ms-2 mt-5 sticky-top' data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" src={menuIcon} alt="click to expand menu" />
            </div>

            <div className="d-none d-md-block">
                <NavContents />
            </div>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <button type="button" className="btn-close ms-auto m-2 btn btn-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                <NavContents />
            </div>

        </section>
    );
};

export default Sidebar;