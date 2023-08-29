import './App.css';
import Alert from './components/Alert';
import About from './components/About';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter, Route } from "react-router-dom"
import { Routes } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useState } from 'react';

function App() {

  const [alert,setAlert]=useState(null);
  const showAlert =(message,type)=>{
    setAlert({
      msg:message,
      Type:type
    })
    setTimeout(()=>{
      setAlert(null);
   
    },1500);
  }
  return (
  
    <>
  <NoteState>
      <BrowserRouter> <Navbar />
      <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />

          </Routes>
        </div></BrowserRouter >
        </NoteState>
    </>
  );
}

export default App;
