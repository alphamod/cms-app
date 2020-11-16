import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import { login } from '../../actions/auth';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger text-center" role="alert">
                This field is required!!
            </div>
        );
    }
};

const Login = props => {

    const form = useRef();
    const checkBtn = useRef();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn, user } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeUserName = event => {
        const userName = event.target.value;
        setUserName(userName);
    };

    const onChangePassword = event => {
        const password = event.target.value;
        setPassword(password);
    };

    const handleLogin = event => {
        event.preventDefault();
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(userName, password)).then(() => {
                props.history.push("/");
                window.location.reload();
            })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        console.log(user);
        return <Redirect to={`/`} />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container p-5 shadow-lg mt-5">
            <h3 className="text-center text-primary font-weight-bolder">Login</h3>

                <Form onSubmit={handleLogin} ref={form}>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input type="text" className="form-control" name="username" value={userName} onChange={onChangeUserName} validations={[required]} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required]} />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-secondary btn-block" disabled={loading}>{loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )} <span>Login</span>
                        </button>
                    </div>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger text-center" role="alert">{message}</div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
                <Link to="/register" className="text-center text-decoration-none">Not an user already? No problem, Sign up here!</Link>
            </div>
        </div>
    );
};

export default Login;
