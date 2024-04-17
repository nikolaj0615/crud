import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Container, TextField} from '@mui/material';
import {ApiCalls} from './services';
import {Post} from "../interfaces/types";

interface IProps {
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

let lastUsedId = 100;

export function CreatePage({setPosts}: IProps) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const handleSave = () => {
        // Check if either the title or body is empty
        if (!title.trim() || !body.trim()) {
            alert('Please fill in all fields');
            return;
        }
        lastUsedId++ //  Increment the last used ID
        const newPostId = lastUsedId;
        const newPost: Post = {id: newPostId, title, body, userId: 1};
        setPosts(prevPosts => [newPost, ...prevPosts]);
        ApiCalls.createPost(newPost)
            .then((postData) => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });
    };


    return (
        <Container maxWidth="md">
            <h1>Create Post</h1>
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={e => setTitle(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={body}
                onChange={e => setBody(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" onClick={handleSave}>Save</Button>
        </Container>
    );
};
