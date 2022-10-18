import './App.css';
import Navbar from './components/Navbar';
import SubscribeModal from "./components/SubscribeModal";
import Home from './components/Home';
import Posts from './components/Posts';
import Post from './components/Post';
import Projects from './components/Projects';
import Project from './components/Project';
import Footer from './components/Footer';
import MinecraftServerControls from './components/MinecraftServerControls';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <div className="row no-gutters full-height">
        <div className="col-2 left-margin d-none d-md-flex"></div>
        <div className="col-12 col-md-8 text-center shadow-lg">
          <Router>
            <Navbar active="Home" />
            <Switch>
              <Route path="/posts/:filename" children={<Post />} />
              <Route path="/posts">
                <Posts />
              </Route>
              <Route path="/projects/:filename" children={<Project />} />
              <Route path="/projects">
                <Projects />
              </Route>
              <Route path="/minecraft">
                <MinecraftServerControls />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
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
