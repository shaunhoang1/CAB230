import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Rankings from "./pages/Rankings";
import Footer from "./components/Footer";
import Factors from "./pages/Factors";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Navigation2 from "./components/Navigation2";

const token = localStorage.getItem("token") 

function App() {
    return (
    <div className="App">
      {/* Check for the user status */}
      {token!==null?<Navigation2/>:<Navigation/>} 
    
      <div className="background-color">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rankings" component={Rankings} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Factors" component={Factors} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Search" component={Search} />
      </Switch>
      </div>
      <Footer />
    </div>
  );
  }

export default App;
