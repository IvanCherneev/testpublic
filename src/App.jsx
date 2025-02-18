import React from "react";
import Users from "./layouts/users/Users";
import { Switch, Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./layouts/login/Login";
import Main from "./layouts/main/Main";
import NavBar from "./components/ui/navBar/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
