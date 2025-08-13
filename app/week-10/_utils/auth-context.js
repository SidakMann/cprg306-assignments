"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GithubAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const gitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    provider.addScope("user:email");
    return signInWithPopup(auth, provider);
  };

  const firebaseSignOut = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u ?? null); setLoadingInitial(false); });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut, loadingInitial }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(AuthContext);
