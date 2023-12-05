import React from 'react';


const Dash = () => {
    return(
        <div className="mx-3">
            <h1 className="px-3 mb-5">DASHBOARD</h1>
            <div className="row mx-3">

            <div className="card text-white bg-dark mb-3 mx-3" style={{maxWidth: "18rem"}}>
            <div className="card-header">Header</div>
            <div className="card-body">
                <h5 className="card-title">Primary card title</h5>
                <p className="card-text">Some quick example [.. truncated content ..]</p>
            </div>
            </div>
        
                <div className="card text-white bg-dark mb-3 mx-3" style={{maxWidth: "18rem"}}>
                <div className="card-header">Header</div>
                <div className="card-body">
                    <h5 className="card-title">Primary card title</h5>
                    <p className="card-text">Some quick example [.. truncated content ..]</p>
                </div>
                </div>
                
            </div>
        </div>
    );
};

export default Dash;