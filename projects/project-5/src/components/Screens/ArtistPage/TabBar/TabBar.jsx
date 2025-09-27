import './tabBar.css'

function TabBar() {
    return <div className="tabBar">
        <div className="tabs">
            {/* <div className="tab active">Created</div>
            <div className="tab">Owned</div>
            <div className="tab">Collection</div> */}
            <input type="radio" id="Created" name="tabs" defaultChecked hidden />
            <label htmlFor="Created" className="tab">Created</label>
            <input type="radio" id="Owned" name="tabs" hidden />
            <label htmlFor="Owned" className="tab">Owned</label>
            <input type="radio" id="Collection" name="tabs" hidden />
            <label htmlFor="Collection" className="tab">Collection</label>
        </div>
    </div>
}

export default TabBar