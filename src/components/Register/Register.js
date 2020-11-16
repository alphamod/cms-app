import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger text-center mt-1" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger text-center mt-1" role="alert">
                This is not a valid Email!. Enter Valid Email.
            </div>
        );
    }
};



const Register = () => {

    const { isLoggedIn } = useSelector(state => state.auth);

    const form = useRef();
    const checkBtn = useRef();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);


    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUserName = e => {
        const userName = e.target.value;
        setUserName(userName);
    };
    const onChangePassword = e => {
        const password = e.target.value;
        setPassword(password);
    };
    const onChangeEmail = e => {
        const email = e.target.value;
        setEmail(email);
    };

    const handleRegister = e => {
        e.preventDefault();
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(userName, email, password))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container  p-5 shadow-lg mt-5">
            <h3 className="text-center text-primary font-weight-bolder">Register</h3>


                <Form onSubmit={handleRegister} ref={form}>
                    {
                        !successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Input type="text" className="form-control" name="username" value={userName} onChange={onChangeUserName} validations = {[required]} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations = {[required]} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input type="email" className="form-control" name="email" value={email} onChange={onChangeEmail} validations = {[required, validEmail]} />
                                </div>

                                <div className="form-group">
                                <button type="submit" className="btn btn-secondary btn-block">Register</button>
                                </div> 
                            </div>
                        )
                    }

                    {
                        message && (
                            <div className="form-group">
                                <div className={successful?"alert alert-success text-center mt-1":"alert alert-danger text-center mt-1"} >{message}</div>
                            </div>
                        )
                    }
                    <CheckButton style={{display:"none"}} ref={checkBtn}/>
                </Form>
                <Link to="/login" className="text-center text-decoration-none">Have an account already? Login here!</Link>

            </div>
        </div>
    )
}

export default Register;
