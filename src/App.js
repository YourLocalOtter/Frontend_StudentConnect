import logo from './logo.svg';
import './App.css';

import Home from "./pages/home"

import Navbar from "./Navbar"

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <div class="page-wrapper with-navbar">
        <Navbar />
        <div class="content-wrapper">
          <div class="content">
            <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<Home />}>
                    
                  </Route>
                  <Route path="/signin">
                  </Route>
                  <Route path="/signup">
                  </Route>
                </Routes>
              </BrowserRouter>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
