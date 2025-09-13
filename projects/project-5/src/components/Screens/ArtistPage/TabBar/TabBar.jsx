import './tabBar.css'

function TabBar() {
    return <div className="tabBar">
        <div className="tabs">
            <div className="tab active">Created</div>
            <div className="tab">Owned</div>
            <div className="tab">Collection</div>
        </div>
    </div>
}

export default TabBar