import React from 'react';

const AddProductModal = () => {
    return (
        <div>
            <div className="modal fade" id="addProductModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content custom-modal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProductModalLabel">Add Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body mx-3 my-2">
                            {/* Add your modal body content here */}
                            <p className="mx-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet purus gravida quis blandit turpis cursus in hac. Amet dictum sit amet justo donec enim diam. Sit amet dictum sit amet justo donec enim diam vulputate. Suspendisse faucibus interdum posuere lorem ipsum dolor sit. Arcu ac tortor dignissim convallis aenean. Et ultrices neque ornare aenean. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Urna molestie at elementum eu facilisis sed odio morbi. At consectetur lorem donec massa sapien faucibus et molestie ac. Netus et malesuada fames ac. Bibendum neque egestas congue quisque egestas diam. Etiam dignissim diam quis enim lobortis scelerisque. Blandit turpis cursus in hac habitasse platea dictumst. Odio aenean sed adipiscing diam donec adipiscing tristique. Enim sit amet venenatis urna cursus. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Morbi tincidunt augue interdum velit euismod in.

                                Vulputate odio ut enim blandit volutpat maecenas volutpat. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Fames ac turpis egestas integer eget. Pellentesque eu tincidunt tortor aliquam. Massa eget egestas purus viverra accumsan in nisl nisi. Nulla posuere sollicitudin aliquam ultrices sagittis orci. Dui sapien eget mi proin sed. Egestas dui id ornare arcu odio ut sem nulla. Libero justo laoreet sit amet. Faucibus vitae aliquet nec ullamcorper sit amet. Odio tempor orci dapibus ultrices. Commodo nulla facilisi nullam vehicula ipsum a. Mollis aliquam ut porttitor leo a diam. Et malesuada fames ac turpis. Ornare arcu dui vivamus arcu felis bibendum ut. Mattis molestie a iaculis at.

                                At varius vel pharetra vel turpis. Pellentesque elit ullamcorper dignissim cras tincidunt. Mauris vitae ultricies leo integer. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Quam vulputate dignissim suspendisse in est ante in nibh mauris. Ultricies leo integer malesuada nunc vel risus. Mattis aliquam faucibus purus in massa. Eget felis eget nunc lobortis mattis aliquam faucibus purus in. Consectetur adipiscing elit pellentesque habitant morbi. Vitae tortor condimentum lacinia quis vel eros donec ac odio. Vulputate mi sit amet mauris commodo quis imperdiet.

                                Id diam vel quam elementum pulvinar etiam non quam lacus. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique. Vitae nunc sed velit dignissim sodales ut eu. Lorem ipsum dolor sit amet. Sem et tortor consequat id. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Sit amet risus nullam eget felis. Dignissim suspendisse in est ante in nibh. Est velit egestas dui id ornare arcu. Turpis massa tincidunt dui ut.

                                Purus sit amet luctus venenatis lectus. Tempor nec feugiat nisl pretium fusce id velit. Ut eu sem integer vitae. Turpis nunc eget lorem dolor sed viverra. Pharetra diam sit amet nisl suscipit. Iaculis urna id volutpat lacus laoreet non. Gravida quis blandit turpis cursus in hac habitasse platea. Gravida neque convallis a cras semper auctor neque vitae. Dis parturient montes nascetur ridiculus mus. Ac auctor augue mauris augue neque gravida in. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Et malesuada fames ac turpis. In aliquam sem fringilla ut morbi tincidunt. Placerat vestibulum lectus mauris ultrices eros in. Amet est placerat in egestas. A diam maecenas sed enim ut sem viverra.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;