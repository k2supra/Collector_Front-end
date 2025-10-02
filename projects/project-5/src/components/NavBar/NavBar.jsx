import './navBar.css'

import userLogo from '../../assets/images/userLogo.png'

import { Link } from 'react-router-dom'

import SideBar from '../Screens/SideBar'
import { useState } from 'react'

import { useSelector } from 'react-redux';

function NavBar() {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const currentUser = useSelector(state => state.user.currentUser)
    return (
    <nav>
        <Link to='/'><div className="logo"></div></Link>
        
        <div className="burger notForDesktop" onClick={()=>setSideBarOpen(true)}></div>
        <div className="extendedMenu forDesktop">
            <Link to='/marketplace'><span>Marketplace</span></Link>
            <Link to='/rankings'><span>Rankings</span></Link>
            <Link to='/connect-wallet'><span>Connect a wallet</span></Link>
            {!currentUser ? <Link to='/sign-up'><button><img src={userLogo} alt="Sign up" />Sign Up</button></Link>:<Link to={`/artist-page/${currentUser._id}`}><button className='toProfile'>{currentUser.username.length > 7 ? currentUser.username.slice(0, 7)+'...' : currentUser.username}</button></Link>}
            
        </div>

        {sideBarOpen && <SideBar close={() => setSideBarOpen(false)}/>}
    </nav>
    )
}

export default NavBar