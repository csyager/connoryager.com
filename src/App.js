import './App.css';
import Navbar from './components/Navbar';
import SubscribeModal from "./components/SubscribeModal";
import Home from './components/Home';
import PostsIndex from './components/PostsIndex';
import About from './components/About';
import ProjectsIndex from './components/ProjectsIndex';
import Footer from './components/Footer';
import MinecraftServerControls from './components/MinecraftServerControls';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation
} from "react-router-dom";
import {
  GreekRhoPost,
  ReactAppS3Post,
  ReactRouterPost,
  CryptoMiningPost,
  ChaosGamePost,
  SurvivorMontyHall,
  SpringCaching,
  K8sSpringboot,
  K8sTLS,
  K8sPostgresPost,
  FargatePost
} from './components/posts/Posts';
import {
  StopMotionProject,
  STSPaperProject,
  PowerOfDifferenceProject,
  RtxStockBotProject,
  TennisMLProject,
  Powerranks
} from "./components/projects/Projects";
import CambridgeAlbum from "./components/albums/2024_3_30_cambridge";

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
            <Route path="posts" element={<Posts />}>
              <Route index element={<PostsIndex />} />
              <Route path="greekrho" element={<GreekRhoPost />} />
              <Route path="reactapps3" element={<ReactAppS3Post />} />
              <Route path="reactrouter" element={<ReactRouterPost />} />
              <Route path="cryptomining" element={<CryptoMiningPost />} />
              <Route path="chaosgame" element={<ChaosGamePost />} />
              <Route path="survivormontyhall" element={<SurvivorMontyHall />} />
              <Route path="springcaching" element={<SpringCaching />} />
              <Route path="k8sspringboot" element={<K8sSpringboot />} />
              <Route path="k8stls" element={<K8sTLS />} />
              <Route path="k8srds" element={<K8sPostgresPost />} />
              <Route path="fargate" element={<FargatePost />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />}>
              <Route index element={<ProjectsIndex />} />
              <Route path="stopmotion" element={<StopMotionProject />} />
              <Route path="stspaper" element={<STSPaperProject />} />
              <Route path="powerofdifference" element={<PowerOfDifferenceProject/>} />
              <Route path="stockbot" element={<RtxStockBotProject />} />
              <Route path="tennisml" element={<TennisMLProject />} />
              <Route path="powerranks" element={<Powerranks />} />
            </Route>
            <Route path="/albums/*">
              <Route path="2024-03-30-cambridge" element={<CambridgeAlbum />} />
            </Route>
            <Route path="/minecraft" element={<MinecraftServerControls />} />
          </Route>    
        </Routes>
      </Router>
    </>
  );
}

function Posts() {
  // reset scroll on page change
  const pathname = useLocation();
  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname])

  return (
      <Outlet />
  )
}

function Projects() {
  // reset scroll on page change
  const pathname = useLocation();
  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname])

  return (
    <Outlet />
  )
}

export default App;
