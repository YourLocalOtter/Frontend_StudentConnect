import logo from './logo.svg';
import './App.css';

// Import pages
import Home from "./pages/home"
import NotFound from "./pages/notfound";
import Signup from "./pages/signup";
import Signin from "./pages/signin";

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
                  <Route path="/signin" element={<Signin />}>
                  </Route>
                  <Route path="/signup" element={<Signup />}>
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
