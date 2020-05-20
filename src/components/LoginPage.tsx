import React, { useCallback, useEffect, useRef, useState } from 'react';
import firebase from '../data/firebase';
import Spinner from './commons/Spinner';


const LoginPage = () => {

    const mount = useRef(false);
    const [emailInput, setEmailInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [createStatus, setCreateStatus] = useState<boolean>(false);
    const [forceUpdate, setForceUpdate] = useState<boolean>(false);

    useEffect(() => {
        const fetchAuthData = async () => {
            setIsFetching(true);
            setError('');
            if (createStatus) { // REGISTRATION
                if (checkPassword === passwordInput) {
                    firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput)
                        .catch(() => {
                            setError('Email already exists');
                            errorToggle();
                        })
                } else {
                    setError('Passwords not the same');
                    errorToggle();
                }
            } else { // LOGIN
                firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput)
                    .catch(() => {
                        setError('Wrong Email or Password');
                        setIsFetching(false)
                    })
            }
        }
        if (mount.current) {
            fetchAuthData()
        }// eslint-disable-next-line
    }, [forceUpdate])

    // FIRST RENDER CONTROL
    useEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        }
    }, [])

    // ERROR FUNC
    const errorToggle = () => {
        setPasswordInput('');
        setCheckPassword('')
        setIsFetching(false)
    }

    // LOGIN/REGISTRATION BUTTON
    const handleLoginClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setForceUpdate(forceUpdate => !forceUpdate);// eslint-disable-next-line
    }, [])


    // CHANGE TYPE OF LOGIN/REGISTRATION
    const handleFormChange = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setError('');
        event.preventDefault();
        setCreateStatus(createStatus => !createStatus)// eslint-disable-next-line
        setEmailInput('');
        errorToggle();
    }, [])

    return (
        <div className="loginPage">
            <h1>Login Form</h1>
            <form className="loginForm" autoComplete="off">
                {!isFetching
                    ? <>
                        <div className="loginForm__inputField">
                            <input
                                id="email"
                                value={emailInput}
                                required
                                type="text"
                                onChange={(e) => setEmailInput(e.currentTarget.value)}
                            />
                            <label>Email</label>
                            <span></span>
                        </div>
                        <div className="loginForm__inputField">
                            <input
                                id="password"
                                value={passwordInput}
                                required
                                type="password"
                                onChange={(e) => setPasswordInput(e.currentTarget.value)}
                            />
                            <label>Password:</label>
                            <span></span>
                        </div>
                        {createStatus
                            ? <div className="loginForm__inputField">
                                <input
                                    id="checkPassword"
                                    value={checkPassword}
                                    type="password"
                                    required
                                    onChange={(e) => setCheckPassword(e.target.value)}
                                />
                                <label>Repeat Password:</label>
                                <span></span>
                            </div>
                            : null}
                    </>
                    : <Spinner />}
                {error !== ''
                    ?
                    <div className="loginForm__inputField">
                        <h3>{error}</h3>
                    </div>
                    : null}
                <div className="loginForm__buttons">
                    <button onClick={(e) => { handleLoginClick(e) }}>{createStatus ? 'Sign Up' : 'Login'}</button>
                    <button onClick={(e) => { handleFormChange(e) }}>{createStatus ? 'Login Form' : 'Registration Form'}</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;