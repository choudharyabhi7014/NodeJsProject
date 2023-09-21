import { useState, useEffect } from "react";
import axios from "axios";

function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

  const removeFromCart = async (productId) => {
    try {
     const res= await axios.delete(`http://localhost:3000/user/remove/${productId}`);
      if (res.status === 200) {
        // Remove the item from the cartItems state
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item._id !== productId)
        );
      }
      // console.log(res)
    } catch (error) {
      console.error("Error remove item from cart:", error);
    }
  };
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/user/cartitems`);
        setCartItems(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Error fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Your Cart</h2>
        <div className="row">
          {cartItems?.map((v) => (
            <div className="col-lg-4 mb-4" key={v._id}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={v.image}
                  className="card-img-top"
                  alt="..."
                  style={{ height: "250px", width: "250px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Product Name: {v.name}</h5>
                  <p className="card-text">Price: {v.price}</p>
                  <p className="card-text">Details: {v.details}</p>
                  <div className="card-footer">
                    <button className="btn btn-danger"
                      onClick={() => removeFromCart(v._id)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AddToCart;
