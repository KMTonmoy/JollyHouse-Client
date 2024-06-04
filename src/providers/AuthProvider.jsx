import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from 'axios';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
                withCredentials: true,
            });
            await signOut(auth);
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (name, photo) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            });
        } catch (error) {
            console.error("Error updating user profile:", error);
            throw error;
        }
    };

    const getToken = async (email) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/jwt`,
                { email },
                { withCredentials: true }
            );
            return data.token;
        } catch (error) {
            console.error("Error getting token:", error);
            throw error;
        }
    };


    const saveUser = async (user) => {
        try {
            // Check if the user already exists in the user collection
            const existingUserResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/${user?.email}`
            );
            const existingUser = existingUserResponse.data;

            // If user already exists, return the existing user
            if (existingUser) {
                // console.log("User already exists:", existingUser);
                return existingUser;
            }

            // If user doesn't exist, save the user
            const currentUser = {
                email: user?.email,
                name: user.displayName,
                role: 'user',
                status: 'Verified',
                floorNo: "N/A",
                blockName: "N/A",
                apartmentNo: "N/A",
                rent: "N/A",
            };
            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/user`,
                currentUser
            );
            // console.log("User saved:", data);
            return data;
        } catch (error) {
            console.error("Error saving user:", error);
            throw error;
        }
    };



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const token = await getToken(currentUser.email);
                    await saveUser(currentUser);
                    localStorage.setItem('access-token', token);

                    // Set Axios default headers
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } catch (error) {
                    console.error("Error handling auth state change:", error);
                }
            } else {
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;