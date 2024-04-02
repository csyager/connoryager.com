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
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CambridgeAlbum from './components/albums/2024_3_30_cambridge';

function App() {
  return (
    <>
      <div className="row no-gutters full-height">
        <div className="col-2 left-margin d-none d-md-flex"></div>
        <div className="col-12 col-md-8 shadow-lg">
          <div className="app-container">
            <Router>
              <Navbar active="Home" />
              <Routes>
                <Route path="posts/*" element={<Posts />} />
                <Route path="about" element={<About />} />
                <Route path="projects/*" element={<Projects />} />
                <Route path="albums/*" element={<Albums />} />
                <Route path="albums/2024-03-30-cambridge" element={<CambridgeAlbum />} />
                <Route path="minecraft" element={<MinecraftServerControls />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </Router>
          </div>
          <Footer />
          {/* popup modal for subscribing to email notifications */}
          <SubscribeModal />  
        </div>
        <div className="col-2 right-margin d-none d-md-flex"></div>
      </div>
    </>
  );
}

export default App;
