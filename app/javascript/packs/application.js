import React from "react";
import ReactDOM from "react-dom";
import Home from "@/pages/Home";
import Detail from "@/pages/Comics/Detail";
import Author from "@/pages/Comics/Author";
import Publisher from "@/pages/Comics/Publisher";
import UpcomingPage from "@/pages/Upcoming/UpcomingPage";
import Shops from "@/pages/Shops";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/styles.scss";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/comics/:id" component={Detail}></Route>
      <Route exact path="/author/:author" component={Author}></Route>
      <Route exact path="/publisher/:id" component={Publisher}></Route>
      <Route exact path="/upcoming" component={UpcomingPage}></Route>
      <Route exact path="/shops" component={Shops}></Route>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
