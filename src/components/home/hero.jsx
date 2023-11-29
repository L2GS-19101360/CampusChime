import React, { useState, Suspense } from 'react';
import Shop from '../shop/shop';
// import SellComponent from './SellComponent';
import Loader from '../loader/loader';

const HeroForHome = () => {
  const [showHero, setShowHero] = useState(true);
  const [showShop, setShowShop] = useState(false);
  /*const [showSell, setShowSell] = useState(false);*/
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
    {showHero && (
      <section className="HERO-HOME">
        <div className="container my-5  rounded" style={{backgroundColor: '#C0C0C0'}}>
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Welcome to Campus Chime</h1>
            <p className="lead text-black">Buying and Selling venturing unique businesses, student's best start-up platform!</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <button type="button" className="btn btn-success btn-lg px-4 me-md-2 fw-bold"  onClick={() => {
                  setShowHero(false);
                  <Suspense fallback={setIsLoading(true)}>
                  {setShowShop(true)}
                  {setIsLoading(false)}
                  </Suspense>
                 
                 // setShowShop(true);
                  
                }}>Shop Now!</button>
              <button type="button" className="btn-danger btn btn-lg px-4" onClick={() =>{ 
                setShowHero(false);
                setIsLoading(true);
                //setShowSell(true);
                
                }}>Sell</button>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-0 p-0 text-center mb-5">
              <img className="img-fluid mx-auto" src="/CAMPUSCHIME ANIMATED LOGO.gif" alt="CampusChime" width="480"></img>
          </div>
        </div>
      </div>
  </section>
    )}
    {isLoading && (
     <Loader></Loader>
    )}
    {showShop && <Shop />}
    {/*showSell && <SellComponent />*/}
  </div>
  );
};

export default HeroForHome;
