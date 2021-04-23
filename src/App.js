import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <div className="row full-height">
        <div className="col-1 left-margin d-none d-md-flex"></div>
        <div className="col text-center shadow-lg">
          <Router>
            <Navbar active="Home" />
            <Switch>
              <Route path="/posts">
                <h1>Posts</h1>
              </Route>
              <Route path="/projects">
                <h1>Projects</h1>
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
          <Footer />
        </div>
        <div className="col-1 right-margin d-none d-md-flex"></div>
      </div>
    </>
  );
}

export default App;
