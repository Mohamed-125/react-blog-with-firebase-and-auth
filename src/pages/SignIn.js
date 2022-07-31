import React from "react";
import { signInWithCredential } from "firebase/auth";
import { auth, provider } from "../Config";
const SignIn = () => {
  const signInHanlder = () => {
    signInWithCredential(auth, provider).then((res) => {
      localStorage.setItem("signIn", "true");
      window.history.go(-1);
      console.log(localStorage.getItem("signIn") === "true");
    });
  };
  return (
    <div
      style={{
        height: "87vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={signInHanlder}
        type="button"
        class="login-with-google-btn"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
