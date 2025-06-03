import React from "react";
import Users from "./layouts/users/Users";
import { Switch, Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./layouts/login/Login";
import Main from "./layouts/main/Main";
import NavBar from "./components/ui/navBar/NavBar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute/ProtectedRoute";
import LogOut from "./layouts/logOut/LogOut";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <QualitiesProvider>
          <ProfessionProvider>
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
          </ProfessionProvider>
        </QualitiesProvider>
      </AuthProvider>

      <ToastContainer />
    </div>
  );
};

export default App;
