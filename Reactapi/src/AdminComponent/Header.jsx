import { Link, Outlet } from "react-router-dom"

function Header() {
  
  return (
    <div>
      <ul style={{listStyle:'none',display:'flex'}} >
       <li><Link to={'login'}>Login</Link></li> 
        <li><Link to={'add'}>Add </Link></li>
        <li><Link to={'show'}>Show </Link></li>
      </ul>
      <Outlet/>
    </div>
  )
}

export default Header
