import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./component/Auth/Login";
import Sites from "./component/Sites/SiteList";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/sites" component={Sites} />
    </div>
  );
}

export default App;
