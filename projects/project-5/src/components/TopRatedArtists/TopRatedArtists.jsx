import './topRatedArtists.css'

import avatar3 from '../../assets/images/avatar3.png';
import avatar4 from '../../assets/images/avatar4.png';
import avatar5 from '../../assets/images/avatar5.png';
import avatar6 from '../../assets/images/avatar6.png';
import avatar7 from '../../assets/images/avatar7.png';

import rocketLaunchPurple from '../../assets/images/rocketLaunchPurple.png';

function TopRatedArtists() {
    return <div className='topRatedArtists'>
        <div className="headline">
            <h4>Top creators</h4>
            <span>Checkout Top Rated Creators on the NFT Marketplace</span>
        </div>
        <ul className="artistCardsRow">
            <li className='artistCard'>
                <div className="avatar">
                    <img src={avatar3} alt="avatar"/>
                    <span className='ratingPosition'></span>
                </div>
                <div className="artistInfo">
                    <h5 className="name">Keepitreal</h5>
                    <div className="additionalInfo">
                        <span className="totalSales">Total Sales:</span>
                        <span className="spent">34.53 ETH</span>
                    </div>
                </div>
            </li>
            <li className='artistCard'>
                <div className="avatar">
                    <img src={avatar4} alt="avatar"/>
                    <span className='ratingPosition'></span>
                </div>
                <div className="artistInfo">
                    <h5 className="name">DigiLab</h5>
                    <div className="additionalInfo">
                        <span className="totalSales">Total Sales:</span>
                        <span className="spent">32.13 ETH</span>
                    </div>
                </div>
            </li>
            <li className='artistCard'>
                <div className="avatar">
                    <img src={avatar5} alt="avatar"/>
                    <span className='ratingPosition'></span>
                </div>
                <div className="artistInfo">
                    <h5 className="name">GravityOne</h5>
                    <div className="additionalInfo">
                        <span className="totalSales">Total Sales:</span>
                        <span className="spent">28.93 ETH</span>
                    </div>
                </div>
            </li>
            <li className='artistCard'>
                <div className="avatar">
                    <img src={avatar6} alt="avatar"/>
                    <span className='ratingPosition'></span>
                </div>
                <div className="artistInfo">
                    <h5 className="name">Juanie</h5>
                    <div className="additionalInfo">
                        <span className="totalSales">Total Sales:</span>
                        <span className="spent">25.30 ETH</span>
                    </div>
                </div>
            </li>
            <li className='artistCard'>
                <div className="avatar">
                    <img src={avatar7} alt="avatar"/>
                    <span className='ratingPosition'></span>
                </div>
                <div className="artistInfo">
                    <h5 className="name">BlueWhale</h5>
                    <div className="additionalInfo">
                        <span className="totalSales">Total Sales:</span>
                        <span className="spent">22.22 ETH</span>
                    </div>
                </div>
            </li>
        </ul>
        <button><img src={rocketLaunchPurple} alt="View Rankings" />View Rankings</button>
    </div>
}

export default TopRatedArtists;