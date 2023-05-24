import React from 'react';

const FolderSkeleton = () => {
    return (
        <div style={{ width: '80px' }} className="">
            <div className="skeleton skeleton-text py-4"></div>
            <div className="skeleton skeleton-text"></div>
        </div>
    );
};

export default FolderSkeleton;