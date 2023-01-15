export const Switch = ({advanced, changeMode}) => {
    return (<div className="switch">
            <p>Basic</p>
                <input className="switchInput" id="modeSwitch" type="checkbox" checked={advanced}
                    onChange={changeMode}/>
                    <label className="switchLabel" htmlFor="modeSwitch" style={{ background: advanced && 'rgba(255, 123, 0, 0.8)'}}>
                        <span className="switchButton"></span>
                    </label>
            <p>Advanced</p>
            </div>)
}