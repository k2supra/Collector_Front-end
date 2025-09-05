import './footer.css'

import discordLogo from '../../assets/images/discordLogo.png'
import youtubeLogo from '../../assets/images/youtubeLogo.png'
import twitterLogo from '../../assets/images/twitterLogo.png'
import instagramLogo from '../../assets/images/instagramLogo.png'
import mailLogo from '../../assets/images/mailLogo.png'

function Footer() {
    return <footer>
        <div className="info">
            <div className="marketplaceInfo">
                <div className="logo"></div>
                <div className="additionalInfo">
                    <span>NFT marketplace UI created with Anima for Figma.</span>
                    <div className="communityInfo">
                        Join our community
                        <div className="icons">
                            <img src={discordLogo} alt="discord" />
                            <img src={youtubeLogo} alt="youtube" />
                            <img src={twitterLogo} alt="twitter" />
                            <img src={instagramLogo} alt="instagram" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="explore">
                <h5>Explore</h5>
                <div className="pages">
                    <span>Marketplace</span>
                    <span>Rankings</span>
                    <span>Connect a wallet</span>
                </div>
            </div>
            <div className="subscribe">
                <h5>Join Our Weekly Digest</h5>
                <div className="formAndInfo">
                    Get exclusive promotions & updates straight to your inbox.
                    <div className="inputAndButton">
                        <input type="text" placeholder='Enter Your Email Address'/>
                        <button><img src={mailLogo} alt="Subscribe" />Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="bottom">
            Ⓒ NFT Market. Use this template freely.
        </div>
    </footer>
}

export default Footer;