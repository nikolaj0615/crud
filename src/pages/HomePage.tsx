import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container} from '@mui/material';
import {Post} from "../interfaces/types";

interface IProps {
    posts: Post[];
}

export function HomePage({posts}: IProps) {
    console.log(posts)
    return (
        <>
            <Container maxWidth="md">
                <div className="post_container">
                    <div className='post_title'>
                        <h1>Home</h1>
                        <Link to='/create'><Button variant="contained">Create</Button></Link>
                    </div>
                    {posts.map(post => (
                        <div className='list' key={post.id}>
                            <div>
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                            </div>
                            <Link to={`/details/${post.id}`}><Button variant="contained">Detail</Button></Link>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
}
