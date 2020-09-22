require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import React from "react";
import ReactDOM from "react-dom";
import Home from "@/pages/Home";
import ComicDetail from "@/pages/Comics/ComicDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "../stylesheets/styles.scss";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/comics/:id" component={ComicDetail}></Route>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
