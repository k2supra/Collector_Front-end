import './connectWalletSection.css'

import spaceship2 from '../../../assets/images/spaceship2.png'
import metamaskLogo from '../../../assets/images/metamaskLogo.png'
import connectWalletLogo from '../../../assets/images/walletConnectLogo.png'
import coinbaseLogo from '../../../assets/images/coinbaseLogo.png'

function ConnectWalletSection() {
    return <div className="connectWalletSection">
        <img src={spaceship2} alt="spaceship" className='spaceship2'/>
        <div className="data">
            <div className="headline">
                <h3>Connect Wallet</h3>
                <span>Choose a wallet you want to connect. There are several wallet providers.</span>
            </div>
            <div className="options">
                <button className="option">
                    <img src={metamaskLogo} alt="metamask" />
                    <h5>Metamask</h5>
                </button>
                <button className="option">
                    <img src={connectWalletLogo} alt="wallet connect" />
                    <h5>Wallet Connect</h5>
                </button>
                <button className="option">
                    <img src={coinbaseLogo} alt="coinbase" />
                    <h5>Coinbase</h5>
                </button>
            </div>
        </div>
    </div>
}

export default ConnectWalletSection;