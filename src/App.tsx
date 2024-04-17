import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {CreatePage} from "./pages/CreatePage";
import {HomePage} from "./pages/HomePage";
import {DetailsPage} from "./pages/DetailsPage";
import {ApiCalls} from "./pages/services";
import {ErrorToast} from "./pages/toasters";
import {Post} from "./interfaces/types";


function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const localPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(localPosts);
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        setLoading(true);
        setTimeout(() => {
            ApiCalls.getAllPosts()
                .then(response => {
                    setPosts(response.map((post, index) => ({...post, id: index + 1})));
                    localStorage.setItem('posts', JSON.stringify(response));
                })
                .catch(error => ErrorToast(error))
                .finally(() => setLoading(false)); // Set loading state to false after fetching
        }, 1000);
    };

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage posts={posts}/>}/>
                    <Route path="/create" element={<CreatePage setPosts={setPosts}/>}/>
                    <Route path="/details/:id" element={<DetailsPage posts={posts} setPosts={setPosts}/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
