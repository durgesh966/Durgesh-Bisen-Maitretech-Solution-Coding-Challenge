import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const IndexPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('isAuthenticated');
        if (token) {
            setIsLoggedIn(true); 
        } else {
            setIsLoggedIn(false); 
        }
    }, []);

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="display-4 text-primary">Welcome to Our Application! This Application Provides You Services like delivering food orders to your home</h1>
                <p className="lead text-muted">
                    A one-stop solution for managing modules and enhancing productivity.
                </p>
                <div className="mt-4">
                    <h3>Explore Our Features:</h3>
                    <ul className="list-unstyled">
                        <li>✔ Easy-to-use modules for all your needs</li>
                        <li>✔ User-friendly interface for quick navigation</li>
                        <li>✔ Real-time data management and reporting</li>
                        <li>✔ Secure and customizable permissions</li>
                    </ul>
                </div>
                <div>

                    <div className="mt-5">
                        <Link to="/fooditems" className="btn btn-primary btn-lg me-3">
                            Go to Food Items
                        </Link>
                    </div>

                    {!isLoggedIn && (
                        <div className="mt-5">
                            <h3 className="mb-4">Get Started</h3>
                            <Link to="/signup" className="btn btn-primary btn-lg me-3">
                                Signup
                            </Link>
                            <Link to="/login" className="btn btn-secondary btn-lg">
                                Login
                            </Link>
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                <footer className="mt-5 text-center">
                    <p className="text-muted">© 2025 Our Application. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default IndexPage;
