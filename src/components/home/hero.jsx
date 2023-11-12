
import React from 'react';

const HeroForHome = () => {
  return (
    <div>
    <section class="HERO-HOME">
    <div class="container my-5 bg-white rounded">
    <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg" style={{color: 'white'}}>
      <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 class="display-4 fw-bold lh-1 text-body-emphasis">Welcome to Campus Chime</h1>
        <p class="lead text-black">Buying and Selling venturing unique businesses, student's best start-up platform!</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          <button type="button" class="btn btn-success btn-lg px-4 me-md-2 fw-bold">Shop Now!</button>
          <button type="button" class="btn-danger btn btn-lg px-4">Sell</button>
        </div>
      </div>
      <div class="col-lg-4 offset-lg-0 p-0 text-center mb-5">
          <img class="img-fluid mx-auto" src="/CAMPUSCHIME ANIMATED LOGO.gif" alt="CampusChime" width="480"></img>
      </div>
    </div>
  </div>
  </section>
  </div>
  );
};

export default HeroForHome;
