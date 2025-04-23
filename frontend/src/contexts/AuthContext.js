import React, { createContext, useContext, useState, useEffect}  from "react"
import app from "../firebase-config"
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    updatePassword,
    updateEmail,
    deleteUser,
    signOut
} from "firebase/auth"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
};

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const auth = getAuth(app)

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

  function changeName(name) {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

  function changeEmail(email) {
        return updateEmail(auth.currentUser, email)
    }

  function changePassword(password) {
      return updatePassword(currentUser, password)
  }

  function deleteProfile() {
      return deleteUser(currentUser)
  }

  function logout() {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    });

    return unsubscribe // Cleanup subscription on unmount
  }, [auth])

    const value = {
        currentUser,
        signup,
        login,
        changeName,
        changeEmail,
        changePassword,
        deleteProfile,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      )
}