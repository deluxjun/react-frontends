import React from "react";

import Snake from "./Snake";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Snake}></Route>
      {/* <Route exact path="/:level" component={Snake}></Route> */}
    </Switch>
  );
}

export default App;
