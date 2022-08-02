import React, { useEffect } from "react";
import { onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../Config";
const SignIn = () => {
  const signInHanlder = () => {
    signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("signIn", "true");
        document.querySelector(".overLay").style.display = "none";
        document.querySelector(".signIn-div").style.display = "none";
      }
    });
  }, []);
  return (
    <div>
      <div
        onClick={(e) => {
          document.querySelector(".signIn-div").style.display = "none";
          e.target.style.display = "none";
        }}
        className="overLay"
      ></div>
      <div className="signIn-div">
        <button
          onClick={signInHanlder}
          type="button"
          class="login-with-google-btn"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
