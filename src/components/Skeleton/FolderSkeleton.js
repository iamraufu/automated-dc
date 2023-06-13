import React from 'react';

const FolderSkeleton = () => {
    return (
        <div style={{ width: '50px' }} className="m-1">
            <div className="skeleton skeleton-text py-4"></div>
            {/* <div className="skeleton skeleton-text"></div> */}
        </div>
    );
};

export default FolderSkeleton;