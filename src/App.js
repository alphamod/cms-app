import React, { useState, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from './components/Profile/Profile';

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './history';
import Posts from './components/Posts/Posts';


const App = () => {

  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(location => {
      dispatch(clearMessage());
    });

  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };


  return (
    <Router history={history}>
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        {currentUser ?
          (<Link to={"/"} className="navbar-brand">
            CMS
          </Link>)
          : (<><Redirect to="/login" />
            <Link to={"/login"} className="navbar-brand">
              CMS
        </Link></>)
        }

        {/* <div className="navbar-nav mr-auto">

            {currentUser && (
              <li className="nav-item">
                <Link to={"/ur"} className="nav-link">
                  Home
                </Link>
              </li>
            )}
          </div> */}

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={`/profile/${currentUser._id}`} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
                </a>
            </li>
          </div>
        ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
      </nav>

      <div className="container">
      {
        currentUser ? (
          <>
            <Link to={`/profile/${currentUser._id}`} className="btn btn-outline-primary newPostBtn m-4">Add New Post</Link>
          </>
        ) : null
      }
        <Switch>
          <div className="container mt-2">
            <div className="row justify-content-center">
              <div className="col-md-8">
                {(currentUser) ?
                  (<>
                    <Route exact path="/" component={Posts} />
                    <Route exact path={`/profile/${currentUser._id}`} component={Profile} />
                  </>) : (
                    <>
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/register" component={Register} />
                    </>)
                }
              </div>
            </div>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
