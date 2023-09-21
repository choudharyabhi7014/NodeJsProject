import axios from "axios";
import { useState, useEffect } from "react";

function AdminAxios() {
    console.log('hello')
    const [data, setData] = useState([])
    const [updatingProductId, setUpdatingProductId] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedImage, setUpdatedImage] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState("");
    const [updatedDetails, setUpdatedDetails] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    useEffect(() => {
        async function get() {
            const res = await axios.get('http://localhost:3000/admin/showall',
                {
                    Headers: {
                        Accept: 'application/json'
                    }
                })
            setData(res.data),
                console.log("Data", res);
        }
        get();
    });
    const handleDelete = async (productId) => {
        console.log(productId)
        await axios.delete(`http://localhost:3000/admin/remove/${productId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
    const handleUpdateClick = (productId, name, price, details, image) => {
        setUpdatingProductId(productId);
        setUpdatedName(name);
        setUpdatedPrice(price);
        setUpdatedImage(image)
        setUpdatedDetails(details);
    };
    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        const updatedProduct = {
            name: updatedName,
            price: updatedPrice,
            details: updatedDetails,
            image: updatedImage
        }
        await axios.put(`http://localhost:3000/admin/update/${updatingProductId}`, updatedProduct)
        setUpdatingProductId(null);
        setUpdatedName("");
        setUpdatedPrice("");
        setUpdatedDetails("");
    }
    const handleNextPage = () => {
        if (endIndex < data.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (startIndex > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        <>
            <table className="table table-bordered border-dark" >
                <tr>
                    <th>Product Image</th>
                    <th> Product Name</th>
                    <th>Product Price</th>
                    <th>Product Details</th>
                    <th>Delete</th>
                    <th>Update </th>
                </tr>
                {data.slice(startIndex, endIndex).map((v) => (

                    <tr key={v._id}>
                        <td><img src={v.image} alt="image" style={{ height: '100px', width: '100px' }} /></td>
                        <td>{v.name}</td>
                        <td>{v.price}</td>
                        <td>{v.details}</td>
                        <td><a href="" onClick={() => handleDelete(v._id)} className="btn btn-success">Delete</a></td>
                        <td><button onClick={() => handleUpdateClick(v._id, v.name, v.price, v.details, v.image)} className="btn btn-primary">
                            Update
                        </button></td>
                    </tr>
                ))}
            </table>
            <div>
                <button disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>
                <button disabled={endIndex >= data.length} onClick={handleNextPage}>Next</button>
            </div>

            {updatingProductId !== null && (
                <div>
                    <h2>Update Product</h2>
                    <form onSubmit={handleUpdateSubmit}>
                        <label>Product Image: </label>
                        <input type="text" value={updatedImage} onChange={(e) => setUpdatedImage(e.target.value)} placeholder="Image" />
                        <br />
                        <label>Product Name: </label>
                        <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} placeholder="Name" />
                        <br />
                        <label>Product Price: </label>
                        <input type="text" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} placeholder="Price" />
                        <br />

                        <label>Product Details: </label>
                        <input type="text" value={updatedDetails} onChange={(e) => setUpdatedDetails(e.target.value)} placeholder="Details" />
                        <br />
                        <button type="submit" className="btn btn-success">
                            Update
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}


export default AdminAxios
