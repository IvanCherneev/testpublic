import React from "react";
import Users from "./layouts/users/Users";
import { Switch, Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./layouts/login/Login";
import Main from "./layouts/main/Main";
import NavBar from "./components/ui/navBar/NavBar";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute/ProtectedRoute";
import LogOut from "./layouts/logOut/LogOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
  return (
    <div>
      <AppLoader>
        <NavBar />
        <Switch>
          <ProtectedRoute
            path="/users/:userId?/:edit?"
            component={Users}
          />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route exact path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </div>
  );
};

export default App;
