import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Navbar from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import CakeDetail from "../CakeDetail/CakeDetail";
import Checkout from "../Checkout/Checkout";
import Cart from "../Cart/Cart";
import Admin from "../Admin/Admin";
import EditForm from "../EditForm/EditForm";
import SuccessPage from "../SuccessPage/SuccessPage";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer />
      <div>
        <Navbar />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          <Route path="/cart" exact>
            <Cart />
          </Route>
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/cart"
          >
            <Cart />
          </ProtectedRoute>

          {/* Details page */}
          {/* app.get('/cakes/:id') <- req.params.id */}
          <ProtectedRoute path="/cakes/:id" exact>
            <CakeDetail />
          </ProtectedRoute>

          {/* Checkout */}
          <ProtectedRoute path="/checkout" exact>
            <Checkout />
          </ProtectedRoute>

          {/* Success Page */}
          <ProtectedRoute path="/cart/checkout/success" exact>
            <SuccessPage />
          </ProtectedRoute>

          {/* Edit cake inventory view */}
          <ProtectedRoute path="/cakes/:id/edit" exact>
            <EditForm />
          </ProtectedRoute>

          {/* admin view */}
          <ProtectedRoute path="/admin" exact>
            <Admin />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <UserPage />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <UserPage />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <LandingPage />
            ) : (
              // Otherwise, show the Landing page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/admin">
            {user.id ? (
              <Admin />
            ) : (
              // Otherwise show Landing Page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
