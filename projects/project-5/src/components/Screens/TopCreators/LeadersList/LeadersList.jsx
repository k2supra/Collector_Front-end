import './leadersList.css'

import avatar from '../../../../assets/images/avatar.png'


function LeadersList() {
    return <div className="leadersList">
        <div className="tabs">
            <input type="radio" id="1d" name="tabs" defaultChecked hidden />
            <label htmlFor="1d" className="tab">1d</label>
            <input type="radio" id="7d" name="tabs" hidden />
            <label htmlFor="7d" className="tab">7d</label>
            <input type="radio" id="30d" name="tabs" hidden />
            <label htmlFor="30d" className="tab">30d</label>
            <input type="radio" id="allTime" name="tabs" hidden />
            <label htmlFor="allTime" className="tab">All Time</label>
        </div>
        <ul className="list">
            <li className="header">
                <span>Artist</span>
                <span className='forTabletAndDesktop change'>Change</span>
                <span className='forDesktop sold'>NFTs Sold</span>
                <span className='volume'>Volume</span>
            </li>
            <li className="leaderItem">
                <div className="artist">
                    <img src={avatar} alt="Zain Dikidis" className="avatar" />
                    <span className='name'>Zain Dikidis</span>
                </div>
                <span className='forTabletAndDesktop change green'>+1.41%</span>
                <span className='forDesktop sold'>602</span>
                <span className="volume">14.4 ETH</span>
            </li>
            <li className="leaderItem">
                <div className="artist">
                    <img src={avatar} alt="Zain Dikidis" className="avatar" />
                    <span className='name'>Zain Dikidis</span>
                </div>
                <span className='forTabletAndDesktop change green'>+1.41%</span>
                <span className='forDesktop sold'>602</span>
                <span className="volume">14.4 ETH</span>
            </li>
            <li className="leaderItem">
                <div className="artist">
                    <img src={avatar} alt="Zain Dikidis" className="avatar" />
                    <span className='name'>Zain Dikidis</span>
                </div>
                <span className='forTabletAndDesktop change green'>+1.41%</span>
                <span className='forDesktop sold'>602</span>
                <span className="volume">14.4 ETH</span>
            </li>
            <li className="leaderItem">
                <div className="artist">
                    <img src={avatar} alt="Zain Dikidis" className="avatar" />
                    <span className='name'>Zain Dikidis</span>
                </div>
                <span className='forTabletAndDesktop change green'>+1.41%</span>
                <span className='forDesktop sold'>602</span>
                <span className="volume">14.4 ETH</span>
            </li>
            <li className="leaderItem">
                <div className="artist">
                    <img src={avatar} alt="Zain Dikidis" className="avatar" />
                    <span className='name'>Zain Dikidis</span>
                </div>
                <span className='forTabletAndDesktop change green'>+1.41%</span>
                <span className='forDesktop sold'>602</span>
                <span className="volume">14.4 ETH</span>
            </li>
        </ul>
    </div>
}

export default LeadersList