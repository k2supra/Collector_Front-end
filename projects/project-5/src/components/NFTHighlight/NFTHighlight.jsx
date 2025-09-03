import './NFTHighlight.css'

import avatar from '../../assets/images/avatar.png'
import eye from '../../assets/images/eye.png'


function NFTHighlight() {
    return <div className="NFTHighlight">
        <div className="frame">
            <div className="artistCard">
                <img src={avatar} alt="" className="avatar" />
                <span className='name'>Shroomie</span>
            </div>
            <h3>Magic Mashrooms</h3>
            <div className="auctionTimer">
                <span>Auction ends in:</span>
                <div className="timer">
                    <div className="hours">
                        <span className="value">59</span>
                        hours
                    </div>
                    :
                    <div className="minutes">
                        <span className="value">59</span>
                        minutes
                    </div>
                    :
                    <div className="seconds">
                        <span className="value">59</span>
                        seconds
                    </div>
                </div>
            </div>
            <button><img src={eye} alt="See NFT" />See NFT</button>
        </div>
    </div>
}

export default NFTHighlight;