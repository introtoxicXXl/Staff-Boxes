import { createContext, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from './../Firebase/Firebase.config';



export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  const updateUser = ( user, img) => {
    const displayName = `${user.firstName} ${user.lastName}`;
    const number = user.phoneNumber;
    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: img,
      phoneNumber:number
    })
  }




  const logout = () => {
    setLoading(true);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
    return () => {
      unsubscribe()
    }
  }, [])


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