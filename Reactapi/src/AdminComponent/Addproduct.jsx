import { useState } from "react"
import axios from "axios"
function Addproduct() {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [details, setDetails] = useState('')
    const addProduct = async (event) => {
        event.preventDefault();
        const newProduct = { name, image, price, details }
        await axios.post('http://localhost:3000/admin/add', {
            product: newProduct
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        setName('');
        setImage('');
        setPrice('');
        setDetails('');
    }

    return (
        <div>
            <form>
                <label>Product Name: </label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' /><br />
                <label>Product Image: </label><input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder='Image' /><br />
                <label>Product Price: </label><input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' /><br />
                <label>Product Details: </label><input type="text" value={details} onChange={(e) => setDetails(e.target.value)} placeholder='Details' /><br />
                <button onClick={addProduct}>Add</button>
            </form>
        </div>
    )
}

export default Addproduct
