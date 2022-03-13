import './App.css';
import Main from './Main.js'
import Navbar from './Navbar.js'
import Game from './Game.js'

import { componentChange, updateSelectedPlan } from './storeSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from "react-router-dom";


function App() {
  const plan = useSelector((state) => state.component.plan)

  
    return (<div className="bg-green-200">
      <Navbar></Navbar>
      <Routes>
      <Route path="instructions" element={<Main />}></Route>
      <Route  path="/" element={<Game />}> </Route>
      </Routes>
      </div>)
}


        

export default App;
