import React from "react";
import ReactDOM from "react-dom";
import Home from "@/pages/Home";
import Author from "@/pages/Comics/Author";
import Publisher from "@/pages/Comics/Publisher";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/styles.scss";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/author/:author" component={Author}></Route>
      <Route exact path="/publisher/:id" component={Publisher}></Route>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
