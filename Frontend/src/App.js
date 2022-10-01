import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import ParticlesBackground from "./ParticleConfig/ParticlesBackground";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navigation from "./Components/SharedComponents/Navigation/Navigation";
import Authenticate from "./Pages/Authenticate/Authenticate";
import Activate from "./Pages/Activate/Activate";
import Rooms from "./Pages/Rooms/Rooms";

const isAuth = false; //we will get this from out state provider;
const user = {
  isActivate: false,
}; //we will get this from out state provider;
function App() {
  return (
    <Router>
      <ParticlesBackground />
      <Navigation />
      <Switch>
        {/* GuestRoute is a component that will provide routing for its children
        components for the guest user, that is users who have not yet logged in
        ,if logged in will directly move them to rooms */}
        <GuestRoute exact path="/">
          <HomePage />
        </GuestRoute>
        <GuestRoute path="/authenticate">
          <Authenticate />
        </GuestRoute>
        {/* Semiprotected will provide routing for its children for the users who
        have logged in and wants to upload metadata, if not logged in will move
        to homepage.if both logged in and already have uploaded metadata,will
        move them to rooms */}
        <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute>
        {/* protedted routes are for them who have logged in,uploaded metadata ..
        protedted routes basically moves them to rooms */}
        <ProtectedRoute path="/rooms">
          <Rooms />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

const GuestRoute = ({ children, ...props }) => {
  // As GuestRoute is also returning a Route component, it is acting like a route component.
  // But now we can write all the checks to provide protected routing here.

  //If the user is Authenticated , redirect(Redirect is component provided by react router dom, Redirect takes an object for
  // it's "to" paremeter,inside that object we have pass the redirect link as "pathname" ,and a "state" where we have
  // to pass the "location" from which the redirection is happening inside the "from" key)
  //  him to "/login"(Pathname) else return him to children(which in this case the Authentication component).
  //And also if the user id already authenticated,he will directly see the rooms page.
  //This is Private routing in react router dom.
  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuth ? (
          <Redirect
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    ></Route>
  );
};

const SemiProtectedRoute = ({ children, ...props }) => {
  //For semiProtected area such as StepUsername and StepAvatar,
  // only the logged in users who have not yet updated thoes information will redirected to thoes
  // pages. If the user is logged in and isActivate(username ,avatar already uploaded) then the user will directly
  // be redirected to rooms.
  return (
    <Route
      {...props}
      render={({ location }) =>
        !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.isActivate ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          />
        )
      }
    ></Route>
  );
};

const ProtectedRoute = ({ children, ...props }) => {
  //For semiProtected area such as StepUsername and StepAvatar,
  // only the logged in users who have not yet updated thoes information will redirected to thoes
  // pages. If the user is logged in and isActivate(username ,avatar already uploaded) then the user will directly
  // be redirected to rooms.
  return (
    <Route
      {...props}
      render={({ location }) =>
        !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !user.isActivate ? (
          <Redirect
            to={{
              pathname: "/activate",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    ></Route>
  );
};

export default App;
