import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

function Home() {
    let [loading, setLoading] = useState(false)
    let [posts, setPosts] = useState([]);
    let [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        let loadPosts = async () => {
            setLoading = (true);
            let response = await axios.get('https://jsonplaceholder.typicode.com/photos', {
                params: {
                    _limit: 10
                }
            });
            setPosts(response.data);
            setLoading(false);
        }
        loadPosts();
    }, []);

    return (
        <div>
            <div className='navigation'>
                <nav className="navbar fixed-top">
                    <form className="form-inline">
                        <input className='input' type="text"
                            placeholder="Search..."
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                    </form>
                </nav>
            </div>
            <div className='card-grid'>
                {loading ? (<h4>loading...</h4>) : (
                    (posts.
                        filter((value) => {
                            if (searchTitle === "") {
                                return value
                            } else if (value.title.toLowerCase().includes(searchTitle.toLowerCase())) {
                                return value
                            }
                        })
                        .map(item =>
                            <div className="card text-center shadow">
                                <div className="overflow">
                                    <img src={item.url} alt="image" className="card-img-top" />
                                </div>
                                <div className="card-body text-dark " key={item.id}>
                                    <h4 className="card-title">

                                    </h4>
                                    <p className="card-text text-secondary" >
                                        {item.title}
                                    </p>
                                    <BrowserRouter>
                                        <div>
                                            <nav>
                                                <Link className="btn btn-outline-success" to="/window">Look Inside!</Link>
                                            </nav>
                                            <Routes >
                                                <Route path="/window" component={Window}>
                                                </Route>
                                            </Routes >
                                        </div>
                                    </BrowserRouter>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    )
}

export default Home;