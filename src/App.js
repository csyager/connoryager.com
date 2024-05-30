import './App.css';
import Navbar from './components/Navbar';
import SubscribeModal from "./components/SubscribeModal";
import Home from './components/Home';
import Posts from './components/Posts';
import About from './components/About';
import Projects from './components/Projects';
import Albums from './components/Albums';
import Footer from './components/Footer';
import MinecraftServerControls from './components/MinecraftServerControls';
import CatchAll from './components/CatchAll';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useState } from 'react';

function Layout(props) {
  return (
    <>
      <div className="row no-gutters full-height">
        <div className="col-2 left-margin d-none d-xl-flex"></div>
        <div className="col-12 col-xl-8 shadow-lg">
          <div className="app-container">
              <Navbar active="Home" darkMode={props.darkMode} setDarkMode={props.setDarkMode} />
              <Outlet />
          </div>
          <Footer />
          {/* popup modal for subscribing to email notifications */}
          <SubscribeModal />  
        </div>
        <div className="col-2 right-margin d-none d-xl-flex"></div>
      </div>
    </>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout darkMode={darkMode} setDarkMode={setDarkMode}/>}>
            <Route index element={<Home />} />
            <Route path="posts/*" element={<Posts darkMode={darkMode} setDarkMode={setDarkMode}/>} />
            <Route path="about" element={<About />} />
            <Route path="projects/*" element={<Projects darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="albums/*" element={<Albums />} />
            <Route path="minecraft" element={<MinecraftServerControls />} />
            <Route path="*" element={<CatchAll />} />
          </Route>    
        </Routes>
      </Router>
    </>
  );
}

export default App;
