import './artistInfo.css'

import copyLogo from '../../../../assets/images/copyLogo.png'
import plusLogo from '../../../../assets/images/plusLogo.png'
import globeLogo from '../../../../assets/images/globeLogo.png'
import discordLogo from '../../../../assets/images/discordLogo.png'
import youtubeLogo from '../../../../assets/images/youtubeLogo.png'
import twitterLogo from '../../../../assets/images/twitterLogo.png'
import instagramLogo from '../../../../assets/images/instagramLogo.png'

function ArtistInfo() {
    return <div className="artistInfoSection">
        <h4 className="artistName">Animakid</h4>
        <div className="buttons">
            <button><img src={copyLogo} alt="id" />0xc0E3...B79C</button>
            <button><img src={plusLogo} alt="Follow" />Follow</button>
        </div>
        <div className="stats">
            <div className="statsItem">
                <h5>250k+</h5>
                <span>Volume</span>
            </div>
            <div className="statsItem">
                <h5>50k+</h5>
                <span>NFTs Sold</span>
            </div>
            <div className="statsItem">
                <h5>3000+</h5>
                <span>Followers</span>
            </div>
        </div>
        <div className="bio">
            Bio
            <span>The internet's friendliest designer kid.</span>
        </div>
        <div className="webLinks">
            Links
            <div className="list">
                <img src={globeLogo} alt="internet" />
                <img src={discordLogo} alt="discord" />
                <img src={youtubeLogo} alt="youtube" />
                <img src={twitterLogo} alt="twitter" />
                <img src={instagramLogo} alt="instagram" />
            </div>
        </div>
    </div>
}

export default ArtistInfo;