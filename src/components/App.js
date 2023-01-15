import './App.css';
import  Frame  from './Frame';
import { Switch } from "./Switch";
import {useState} from 'react'


function App() {

  const [advanced, changeMode] = useState(false)

  return (
    <div className="App flex-container">
      <header className="App-header"></header>
      <Switch advanced={advanced} changeMode={() => changeMode(!advanced)}/>
      <Frame id="frame" advanced={advanced}/>
    </div>
  );
}

export default App;
