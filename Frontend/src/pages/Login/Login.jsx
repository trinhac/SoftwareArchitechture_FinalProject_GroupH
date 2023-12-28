import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Login.css"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "bootstrap/dist/css/bootstrap.min.css"
import AdminBooksCRUD from '../Admin/Admin';
const LoginForm = () => {

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyA1xJ0gWOtqL1HsKbjFaMRAsivyWwHmhJ0",
            authDomain: "library-softwareengineering.firebaseapp.com",
            databaseURL: "https://library-softwareengineering-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "library-softwareengineering",
            storageBucket: "library-softwareengineering.appspot.com",
            messagingSenderId: "347751562680",
            appId: "1:347751562680:web:e517d4c5b1a25e9873634d",
            measurementId: "G-10ZHBN8ET4"
        };

        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }, []);

    // const handleGoogleLogin = async () => {
    //     const provider = new firebase.auth.GoogleAuthProvider();

    //     try {
    //         const result = await firebase.auth().signInWithPopup(provider);
    //         // Access the user's information
    //         const user = result.user;
    //         console.log('Logged in user:', user);

    //         // Redirect to the admin page after successful login
    //         history.push('/admin');
    //     } catch (error) {
    //         console.error('Google login error:', error);
    //     }
    // };

    const [auth, setAuth] = useState(
        false || window.localStorage.getItem('auth') === 'true'
    );
    const [token, setToken] = useState('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userCred) => {
            if (userCred) {
                setAuth(true);
                window.localStorage.setItem('auth', 'true');
                userCred.getIdToken().then((token) => {
                    setToken(token);
                });
            }
        });
    }, []);

    const loginWithGoogle = () => {
        firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((userCred) => {
                if (userCred) {
                    setAuth(true);
                    window.localStorage.setItem('auth', 'true');
                }
            });
    };


    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Link to="admin" className="btn btn-primary">Submit</Link>
                        {auth ? (
                            <AdminBooksCRUD token={token} />
                        ) : (
                            <button className="btn btn-primary" onClick={loginWithGoogle}>Login with Google</button>
                        )}
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    )
};

export default LoginForm;