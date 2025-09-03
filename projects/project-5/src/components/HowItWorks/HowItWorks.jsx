import './howItWorks.css'

import howItWorksIcon1 from '../../assets/images/howItWorksIcon1.png'
import howItWorksIcon2 from '../../assets/images/howItWorksIcon2.png'
import howItWorksIcon3 from '../../assets/images/howItWorksIcon3.png'

function HowItWorks() {
    return <div className="howItWorks">
        <div className="headline">
            <h4>How it works</h4>
            <span>Find out how to get started</span>
        </div>
        <div className="cards">
            <div className="infoCard">
                <img src={howItWorksIcon1} alt="Setup Your wallet" />
                <div className="cardDetails">
                    <span>Setup Your wallet</span>
                    <span>Set up your wallet of choice. Connect it to the NFT market by clicking the wallet icon in the top right corner.</span>
                </div>
            </div>
            <div className="infoCard">
                <img src={howItWorksIcon2} alt="Create Collection" />
                <div className="cardDetails">
                    <span>Create Collection</span>
                    <span>Upload your work and setup your collection. Add a description, social links and floor price.</span>
                </div>
            </div>
            <div className="infoCard">
                <img src={howItWorksIcon3} alt="Start Earning" />
                <div className="cardDetails">
                    <span>Start Earning</span>
                    <span>Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.</span>
                </div>
            </div>
        </div>
    </div>
}

export default HowItWorks;