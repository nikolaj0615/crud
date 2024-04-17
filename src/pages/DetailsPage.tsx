import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ApiCalls} from './services';
import {ErrorToast, SuccessToast} from './toasters';
import {Button, Container, TextField} from '@mui/material';
import {Post} from '../interfaces/types';

interface DetailsPageProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export function DetailsPage({posts, setPosts}: DetailsPageProps) {
    const {id} = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post>({id: 0, title: '', body: '', userId: 0});


    useEffect(() => {
        fetchPostDetails();
    }, []);

    const fetchPostDetails = () => {
        const selectedPost = posts.find(post => post.id === parseInt(id as string));

        if (selectedPost) {
            setPost(selectedPost);
        } else {
            ApiCalls.getPost(parseInt(id as string))
                .then(response => {
                    setPost(response as Post);
                })
                .catch(error => ErrorToast(error));
        }
    };

    const handleUpdate = () => {
        if (!post.id) {
            console.error('Post ID is not defined');
            return;
        }
        const newId = generateUniqueId();

        ApiCalls.updatePost(post.id, {id: newId, title: post.title, body: post.body})
            .then(updatedPost => {
                const updatedPosts = posts.map(p => (p.id === updatedPost.id ? updatedPost : p));
                setPosts(updatedPosts);
                navigate('/');
                SuccessToast('Post updated successfully')
            })
            .catch(error => ErrorToast(error));
    };

    const handleDelete = () => {
        ApiCalls.deletePost(post.id)
            .then(() => {
                const updatedPosts = posts.filter(p => p.id !== post.id);
                setPosts(updatedPosts);
                navigate('/');
            })
            .catch(error => ErrorToast(error));
    };

    return (
        <Container maxWidth="md">
            <h2>Edit Post</h2>
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                margin="normal"
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                margin="normal"
            />

            <Button className='update__button' variant="contained"
                    onClick={handleUpdate}>Update</Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
        </Container>
    );
}


// Function to generate unique IDs
function generateUniqueId() {
    return Date.now();
}
