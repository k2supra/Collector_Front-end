import './createAccountSection.css'

import { Link } from 'react-router-dom';

import spaceship from '../../../../assets/images/spaceship.png'

function CreateAccountSection() {
    return<div className='createAccountSection'>
        <img src={spaceship} alt="spaceship" />
        <div className="createAccount">
            <div className="headline">
                <h3>Create account</h3>
                <span>Welcome! Enter your details and start creating, collecting and selling NFTs.</span>
            </div>
            <form>
                <div className="inputs">
                    <div className="wrapper"><input type="text" placeholder='Username'/></div>
                    
                    <div className="wrapper"><input type="text" placeholder='Email Address'/></div>
                    <div className="wrapper"><input type="text" placeholder='Password'/></div>
                    <div className="wrapper"><input type="text" placeholder='Confirm Password'/></div>
                </div>
                <Link to='/'><button>Create account</button></Link>
            </form>
        </div>
    </div>
}

export default CreateAccountSection;