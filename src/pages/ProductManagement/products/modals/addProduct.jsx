import React, {useState} from 'react';
import axios from 'axios';
const AddProductModal = () => {
    const [productData, setProductData] = useState({
        productName: '',
        productDescription: '',
        productCategory: '',
        productColor: '',
        productSize: '',
        productQuantity: 0,
        productPrice: 0,
        productFile: null,
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = sessionStorage.getItem("userId");
        console.log(user_id);
        const formData = new FormData();
        formData.append('productName', productData.productName);
        formData.append('productDescription', productData.productDescription);
        formData.append('productCategory', productData.productCategory);
        formData.append('productColor', productData.productColor);
        formData.append('productSize', productData.productSize);
        formData.append('productQuantity', productData.productQuantity);
        formData.append('productPrice', productData.productPrice);
        formData.append('productFile', productData.productFile);
        formData.append('user_id', user_id); // Append user_id to formData
      
        try {
          const response = await axios.post('http://localhost/CampusChime/PHP_files/add_product.php', formData);
          console.log(response.data);
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      };
    
      const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        const newValue = type === 'file' ? files[0] : value;
        setProductData((prevData) => ({
          ...prevData,
          [name]: newValue,
        }));
      };
   


    return (
        <div>
            <div className="modal fade" id="addProductModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content custom-modal">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="addProductModalLabel">Add Product</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <div className="modal-body mx-4 my-2">
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="productName" name="productName" onChange={handleInputChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="productDescription" className="form-label">Product Description</label>
                                <textarea className="form-control" id="productDescription" name="productDescription" onChange={handleInputChange}></textarea>
                            </div>

                                <div className="mb-3">
                                    <label htmlFor="productCategory" className="form-label">Product Category</label>
                                    <input type="text" className="form-control" id="productCategory" name="productCategory" onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productColor" className="form-label">Product Color</label>
                                    <input type="text" className="form-control" id="productColor" name="productColor" onChange={handleInputChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productSize" className="form-label">Product Size</label>
                                    <input type="text" className="form-control" id="productSize" name="productSize" onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productQuantity" className="form-label">Product Quantity</label>
                                    <input type="number" className="form-control" id="productQuantity" name="productQuantity" onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productPrice" className="form-label">Product Price</label>
                                    <input type="number" step="0.01" className="form-control" id="productPrice" name="productPrice" onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productFile" className="form-label">Product File</label>
                                    <input
                                        type="file" 
                                        className="form-control" 
                                        id="productFile" 
                                        name="productFile" 
                                        onChange={handleInputChange}
                                        />
                                     
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
