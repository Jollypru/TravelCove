import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.init';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile =(name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    // const fetchUserFromBackend = async(email) => {
    //     try{
    //         const response = await axios.get(`http://localhost:5000/users?email=${email}`);
    //         return response.data;
    //     }catch(error){
    //         console.log('error fetching user from backend', error);
    //         return null;
    //     }
    // }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            // if(currentUser){
            //     try{
            //         const backendUser = await fetchUserFromBackend(currentUser.email);
            //         if(backendUser){
            //             setUser({
            //                 ...currentUser,
            //                 _id:  backendUser._id,
            //                 role: backendUser.role || 'tourist'
            //             });
            //         }else{
            //             console.log('user not found in database');
            //             setUser(currentUser);
            //         }
            //     }catch(error){
            //         console.log('error syncing user with backend', error);
            //         setUser(currentUser);
            //     }
            // }
            // else{
            //     setUser(null)
            // }
            setUser(currentUser);
            console.log('current user', currentUser);
            if(currentUser){
                // get token and store client
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                    }
                })
            }else{
                // remove token(if token stored in client side)
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        googleSignIn,
        logout,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
