import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
function ShowProduct() {
    const [data, setData] = useState([])
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    useEffect(() => {
        async function fetchdata() {
            const res = await axios.get("http://localhost:3000/user/showall", {
                Headers: {
                    Accept: 'application/json'
                }
            })
            setData(res.data)
            // console.log("Data", res);
        }
        fetchdata()
    }, []);
    const handleAddtoCart = async (productId) => {
        const token = localStorage.getItem('token')
        const res = await axios.post(`http://localhost:3000/user/cart/${productId}?token=${token}`,
            { data: 'ehello' },

            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        console.log(res.data.message)
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    {data.map((v) => (
                        <div className="col-lg-4 mb-4" key={v._id}>
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={v.image} className="card-img-top" alt="..." style={{ height: "250px", width: "250px" }} />
                                <div className="card-body">
                                    <h5 className="card-title">Product Name: {v.name}</h5>
                                    <p className="card-text">Price: {v.price}</p>
                                    <p className="card-text">Details: {v.details}</p>
                                </div>
                                <div className="card-footer">
                                    {/* <a href="#" className="btn btn-success">Buy Now</a> */}
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleAddtoCart(v._id)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}


export default ShowProduct
