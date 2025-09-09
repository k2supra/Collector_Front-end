import './subscribeWidget.css'

import astronaut from '../../../../assets/images/astronaut.png'
import mailLogo from '../../../../assets/images/mailLogo.png'


function SubscribeWidget() {
    return <div className="subscribeWidget">
        <div className='frame'>
            <img src={astronaut} alt="astronaut" className='astronaut'/>
            <div className="data">
                <div className="headline">
                    <h4>Join Our Weekly Digest</h4>
                    <span>Get exclusive promotions & updates straight to your inbox.</span>
                </div>
                <div className="inputAndButton">
                    <input type="text" placeholder='Enter Your Email Address'/>
                    <button><img src={mailLogo} alt="Subscribe" />Subscribe</button>
                </div>
            </div>
        </div>
        
    </div>
}

export default SubscribeWidget;