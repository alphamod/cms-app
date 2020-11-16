import React, { useEffect, useState } from 'react';
import contentService from '../../services/content.service';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../actions/auth';



const MyPosts = () => {

    const [myposts, setMyPosts] = useState([]);

    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();


    useEffect(() => {
        contentService.getMyContent(user._id).then(
            response => {
                console.log('works')
                console.log([...response.data.allMyPosts]);
                setMyPosts([...response.data.allMyPosts]);
            },
            error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(logout());
                    }
                }
            }
        );
    },[]);

    return (
        <div className="container-fluid m-2 p-1">
            <h3 className="text-center text-primary font-weight-bolder">My Posts</h3>
            {
                mypostsxr.reverse().map(post => {
                    // if(post === null) return (<div className="text-center">No Posts Available</div>);
                    console.log(post);
                    return (
                        <div className="card border-secondary shadow-lg m-2 p-1" key={post._id}>
                            {/* <header className="jumbotron"> */}
                            <div className="card-title py-2 px-4">
                            <h3 className="">{post.title}</h3>
                            </div>
                            {/* </header> */}
                            <div className="card-body text-secondary">
                                <div>
                                    {post.content}
                                </div>
                            </div>
                            <div className="card-footer text-right p-1">
                                <h6 className=""><span className="text-secondary">Posted by: </span>{post.postedBy.username}</h6>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MyPosts;
