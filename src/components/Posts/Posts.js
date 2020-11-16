import React, { useEffect, useState } from 'react';
import contentService from '../../services/content.service';
import { useDispatch } from 'react-redux';

import { logout } from '../../actions/auth';

const Posts = () => {

    const [allPostsArr, setAllPosts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        contentService.getContent().then(
            response => {
                console.log([...response.data.allPosts]);
                setAllPosts([...response.data.allPosts]);
                // setTitle(response.title);
                // setContent(response.content);
                // setPostedBy(response.postedBy);

            },
            error => {
                // const _content = (error.response && error.response.data) || error.message || error.toString();
                // setContent(_content);
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch(logout());
                    }
                }
            }
        );
    }, []);

    return (
        <div className="container py-2 my-2">
            <h3 className="text-center text-primary font-weight-bolder">All Posts</h3>
            {
                allPostsArr.reverse().map(post => {
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

export default Posts;
