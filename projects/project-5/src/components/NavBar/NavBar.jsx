import './navBar.css'

import userLogo from '../../assets/images/userLogo.png'

import { Link } from 'react-router-dom'

function NavBar() {
    return (
    <nav>
        <Link to='/'><div className="logo"></div></Link>
        
        <div className="burger notForDesktop"></div>
        <div className="extendedMenu forDesktop">
            <Link to='/marketplace'><span>Marketplace</span></Link>
            <Link><span>Rankings</span></Link>
            <Link><span>Connect a wallet</span></Link>
            <Link to='/sign-up'><button><img src={userLogo} alt="Sign up" />Sign Up</button></Link>
        </div>
    </nav>
    )
}

export default NavBar