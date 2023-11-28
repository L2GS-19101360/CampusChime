import React from 'react';
import { Form, Button } from 'react-bootstrap'; 

const Shop = () => {
 return (
 
<div>
    <section className="py-0 py-lg-0">
        <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
                <h1 className="display-4 fw-bolder">SEE WHAT'S IN STORE!</h1>
                <p className="lead fw-normal text-white-50 mb-0">Simplified Shopping Experience!</p>
            </div>
            </div>
        </header>
        </section>
       <div className="row">
            <div className="col-3 bg-success" data-bs-theme="dark" hidden>
               <p className="fw-bolder p-4 text-white">Test</p>
               <Form>
                <Form.Group controlId="formFilter">
                <Form.Label>Filter Options</Form.Label>
                <Form.Control type="text" placeholder="Filter by keyword" />
                </Form.Group>

                <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select">
                    <option>Select category...</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                    {/* Add more categories as needed */}
                </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                Apply Filters
                </Button>
                 </Form>
            </div>
            
            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Filter</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <p>See the things you want your way</p>
            </div>
            </div>
            <div className="col-12 bg-danger" data-bs-spy="scroll"  data-bs-target=".container" data-bs-offset="50">
            <div className="px-4 mt-4 d-flex align-items-center">
            <button className="btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">   
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-filter-circle-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M3.5 5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1M5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5"/>
            </svg>
            <h2 className="d-inline px-2">Filter Results</h2>
            </button> 
            </div>

                <div className="container px-4 px-lg-5 mt-5">
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Product image */}
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    {/* Product details */}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name */}
                                            <h5 className="fw-bolder">Fancy Product</h5>
                                            {/* Product price */}
                                            $40.00 - $80.00
                                        </div>
                                    </div>
                                    {/* Product actions */}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                                        </div>
                                    </div>
                            </div>

                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Product image */}
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    {/* Product details */}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name */}
                                            <h5 className="fw-bolder">Fancy Product</h5>
                                            {/* Product price */}
                                            $40.00 - $80.00
                                        </div>
                                    </div>
                                    {/* Product actions */}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                                        </div>
                                    </div>
                            </div>

                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Product image */}
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    {/* Product details */}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name */}
                                            <h5 className="fw-bolder">Fancy Product</h5>
                                            {/* Product price */}
                                            $40.00 - $80.00
                                        </div>
                                    </div>
                                    {/* Product actions */}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                                        </div>
                                    </div>
                            </div>

                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Product image */ }
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    {/* Product details */}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name */}
                                            <h5 className="fw-bolder">Fancy Product</h5>
                                            {/* Product price */}
                                            $40.00 - $80.00
                                        </div>
                                    </div>
                                    {/* Product actions */}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                                        </div>
                                    </div>
                            </div>

                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Sale badge */}
                                    <div className="badge bg-dark text-white position-absolute" style={{top: '0.5rem', right: '0.5rem'}}>Sale</div>
                                    {/* Product image */}
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    {/* Product details */}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name */}
                                            <h5 className="fw-bolder">Sale Item</h5>
                                            {/* Product price */}
                                            <span className="text-muted text-decoration-line-through">$50.00</span>
                                            $25.00
                                        </div>
                                    </div>
                                    {/* Product actions */}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                        </div>
                                </div>
                            </div>

                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Sale badge */}
                                    <div className="badge bg-dark text-white position-absolute" style={{top: '0.5rem', right: '0.5rem'}}>Sale</div>
                                    {/* Product image */}
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    {/* Product details */}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name */}
                                            <h5 className="fw-bolder">Sale Item</h5>
                                            {/* Product price */}
                                            <span className="text-muted text-decoration-line-through">$50.00</span>
                                            $25.00
                                        </div>
                                    </div>
                                    {/* Product actions */}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                        </div>
                                </div>
                            </div>

                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Sale badge */}
                                    <div className="badge bg-dark text-white position-absolute" style={{top: '0.5rem', right: '0.5rem'}}>Sale</div>
                                    {/* Product image */}
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    {/* Product details */}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name */}
                                            <h5 className="fw-bolder">Sale Item</h5>
                                            {/* Product price */}
                                            <span className="text-muted text-decoration-line-through">$50.00</span>
                                            $25.00
                                        </div>
                                    </div>
                                    {/* Product actions */}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                        </div>
                                </div>
                            </div>

                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Sale badge */}
                                    <div className="badge bg-dark text-white position-absolute" style={{top: '0.5rem', right: '0.5rem'}}>Sale</div>
                                    {/* Product image */}
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    {/* Product details */}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name */}
                                            <h5 className="fw-bolder">Sale Item</h5>
                                            {/* Product price */}
                                            <span className="text-muted text-decoration-line-through">$50.00</span>
                                            $25.00
                                        </div>
                                    </div>
                                    {/* Product actions */}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                        </div>
                                </div>
                            </div>

                        </div>     
                    </div>
                </div>  {/*Product Show case Div*/}
        </div> 
</div> 
 );
};

export default Shop;