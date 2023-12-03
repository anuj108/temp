import React,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import logo from '../../assets/logo.png'
import search from '../../assets/magnifying-glass-solid.svg'
import Avatar from '../../components/Avatar/Avatar'

import './Navbar.css'

const Navbar = () => {
    const dispatch = useDispatch();
    var User = useSelector((state) => state.currentUserReducer);

    useEffect(() => 
    {
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    },[dispatch])
    var User = JSON.parse(localStorage.getItem("Profile"))
    return (
        <nav className='main-nav'>
            <div className='navbar'>
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt='logo'/>
                </Link>
                <Link to='/' className='nav-item nav-btn'>About</Link>
                <Link to='/' className='nav-item nav-btn'>Products</Link>
                <Link to='/' className='nav-item nav-btn'>For Teams</Link>
                <form>
                    <input type='text' placeholder='Search....'/>
                    <img src={search} alt='search' width={18} className='search-icon'/>
                </form>
                {User === null ?
                    <Link to ='/Auth' className='nav-item nav-links'>Log in</Link> : 
                    <>
                    {console.log(User)}
                        <Avatar backgroundColor="#009dff" px="10px" py="7px" borderRadius="50%" color='white'><Link to='/user' style={{color:"white", textDecoration:'none'}} >{User.result!=null?(User.result.name.charAt(0).toUpperCase()):false}</Link></Avatar>
                        <button className='nav-item nav-links'>Log out</button>
                    </>
                }

            </div>
        </nav>
  )
}

export default Navbar