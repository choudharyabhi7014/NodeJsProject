
import { Link } from 'react-router-dom';

function UserHeader() {
    // const isAuthenticated = localStorage.getItem('token');
    // const handleLogout = () => {
    //     localStorage.removeItem("token");
    //     window.location="/";

    // }
    return (
        <>
            <div className="header">
                <div className="logo"><a href="#">E-Com</a></div>

                <div className="search">

                    <a href=""><input type="text" placeholder="search products" id="input" />
                    </a>
                </div>
                <div className="heading">
                    <ul>
                        <li><Link to={''} className="heading">HOME</Link></li>
                        <li><Link to={'contact'} className="heading">CONTACT US</Link></li>
                        <li><Link to={'about'} className="heading">ABOUT US</Link></li>
                        <li><Link to={'cart'} className="heading">ADD TO CART</Link></li>
                        <li><Link to={'login'} className="heading">LOG IN</Link></li>
                        {/* {isAuthenticated ? (
                            <li>
                                <Link onClick={handleLogout}>LOG OUT</Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login">LOGIN</Link>
                            </li>
                        )} */}
                    </ul>
                </div>
            </div>

        </>
    )
}

export default UserHeader
