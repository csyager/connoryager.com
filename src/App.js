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

function Layout() {
  return (
    <>
      <div className="row no-gutters full-height">
        <div className="col-2 left-margin d-none d-md-flex"></div>
        <div className="col-12 col-md-8 shadow-lg">
          <div className="app-container">
              <Navbar active="Home" />
              <Outlet />
          </div>
          <Footer />
          {/* popup modal for subscribing to email notifications */}
          <SubscribeModal />  
        </div>
        <div className="col-2 right-margin d-none d-md-flex"></div>
      </div>
    </>
  )
}

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="posts/*" element={<Posts />} />
            <Route path="about" element={<About />} />
            <Route path="projects/*" element={<Projects />} />
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
