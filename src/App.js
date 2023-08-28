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

function App() {
  return (
    <>
  <NoteState>
      <BrowserRouter> <Navbar />
      <Alert message="this is good course"/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp/>} />

          </Routes>
        </div></BrowserRouter >
        </NoteState>
    </>
  );
}

export default App;
