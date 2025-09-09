import './navBar.css'

import userLogo from '../../assets/images/userLogo.png'

function NavBar() {
    return (
    <nav>
        <div className="logo"></div>
        <div className="burger notForDesktop"></div>
        <div className="extendedMenu forDesktop">
            <span>Marketplace</span>
            <span>Rankings</span>
            <span>Connect a wallet</span>
            <button><img src={userLogo} alt="Sign up" />Sign Up</button>
        </div>
    </nav>
    )
}

export default NavBar