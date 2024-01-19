import { createContext, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from './../Firebase/Firebase.config';
import useAxiosPublic from "../../Hooks/useAxiosPublic";



export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const google = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
  const registration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  const updateUser = (user, img) => {
    setLoading(true)
    const displayName = `${user.firstName} ${user.lastName}`;
    const number = user.phoneNumber;
    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: img,
      phoneNumber: number
    })
  }




  const logout = () => {
    setLoading(true);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email }
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token)
              setLoading(false);
            }
          })
      } else {
        localStorage.removeItem('access-token')
        setLoading(false)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [axiosPublic])


  const authInfo = {
    user,
    google,
    login,
    registration,
    updateUser,
    loading,
    logout,

  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node
}

export default AuthProvider;