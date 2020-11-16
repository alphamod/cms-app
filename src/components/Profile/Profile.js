import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Textarea from "react-validation/build/textarea";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import addPosts from '../../actions/content';
import Posts from '../Posts/Posts';
import MyPosts from '../MyPosts/MyPosts';


const Profile = () => {

    const required = value => {
        if (!value) {
            return (
                <div className="alert alert-danger text-center mt-1" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const [postTitle, setTitle] = useState("");
    const [postContent, setContent] = useState("");
    const [postSuccess, setSuccess] = useState(false)

    const { isLoggedIn, user } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();
    const form = useRef();
    const checkBtn = useRef();

    const onChangeTitle = e => {
        const title = e.target.value;
        setTitle(title);
    }

    const onChangeContent = e => {
        const content = e.target.value;
        setContent(content);
    }

    // console.log(user);
    const handleCreatePost = e => {
        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            if (user) {
                const postedBy = user._id;
                dispatch(addPosts.addPosts(postTitle, postContent, postedBy))
                    .then(() => {
                        setSuccess(true);
                    })
                    .catch(() => {
                        setSuccess(false);
                    });
            };
        };
    };


    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    return (
        <>
            <Link to="/" className="btn btn-outline-dark btn-block">View All posts</Link>
            <hr />
            <div className="border border-black shadow-lg">
                <h3 className="text-center text-primary font-weight-bolder m-2">Create Post</h3>


                <Form className="p-2 m-2" onSubmit={handleCreatePost} ref={form}>
                    {!postSuccess && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="postTitle">Title</label>
                                <Input type="text" className="form-control" name="postTitle" value={postTitle} onChange={onChangeTitle} validations={[required]} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="postContent">Content</label>
                                <Textarea className="form-control" name="postContent" value={postContent} onChange={onChangeContent} validations={[required]} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-secondary btn-block">Post</button>
                            </div>
                        </div>
                    )}
                    {
                        message && (
                            <div className="form-group">
                                <div className={postSuccess ? "alert alert-success text-center mt-1" : "alert alert-danger text-center mt-1"} >{message}</div>
                                {message ? <Redirect to="/" /> : null}
                            </div>
                        )
                    }
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />

                </Form>
            </div>
            <hr />
            <div className="container-fluid my-2 shadow-lg">
                <div className="row">
                    <div className="col-md-12">
                    <MyPosts/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
