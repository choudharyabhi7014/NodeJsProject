import { BsFacebook } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs'
import { BsYoutube } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'
function Footer() {
  return (
    <>
      <footer>
    <div className="footer0">
      <h1>E-Com</h1>
    </div>
    <div className="footer1 ">
      Connect with us<div className="social-media">
        <a href="#"><BsFacebook/></a>
        <a href="#"><BsLinkedin/></a>
        <a href="#"><BsYoutube/></a>
        <a href="#"><BsInstagram/></a>
        <a href="#"><BsTwitter/></a>
      </div>
    </div>
    <div className="footer2">
      <div className="product">
        <div className="heading">Products</div>
        <div className="div">Products</div>
        <div className="div">Advertise</div>
        <div className="div">Pricing</div>
        <div className="div">Product Buisness</div>

      </div>
      <div className="services">
        <div className="heading">Services</div>
        <div className="div">Return</div>
        <div className="div">Cash Back</div>
        <div className="div">Marketing</div>
        <div className="div">Others</div>
      </div>
      <div className="Company">
        <div className="heading">Company</div>
        <div className="div">Complaint</div>
        <div className="div">Careers</div>
        <div className="div">Marketing</div>
        <div className="div">Support</div>
      </div>
      <div className="Get Help">
        <div className="heading">Get Help</div>
        <div className="div">Help Center</div>
        <div className="div">Privacy Policy</div>
        <div className="div">Terms</div>
        <div className="div">Login</div>
      </div>
    </div>
    <div className="footer3">Copyright © <h4>E-Com </h4> 2020-2028</div>
  </footer> 
    </>
  )
}

export default Footer
