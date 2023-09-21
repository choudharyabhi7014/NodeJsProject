import axios from "axios";
import { useState } from "react";
import { Outlet } from "react-router-dom";
function ForgetPassword() {
    const [email, setemail] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:3000/user/forget`, {
            email: email

        })
        console.log(res)
    }

    return (
        <><form >
            <input type="text" value={email} onChange={(e) => { setemail(e.target.value) }} />
            <button onClick={handleSubmit}>submit</button>
        </form>
            <Outlet />
        </>
    )
}

export default ForgetPassword
