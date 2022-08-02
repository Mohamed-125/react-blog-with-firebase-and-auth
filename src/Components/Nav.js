import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Config";
const Nav = ({ signedIn, setSignedIn }) => {
  useEffect(() => {
    setSignedIn(localStorage.getItem("signIn"));
    window.addEventListener("storage", () => {
      setSignedIn(localStorage.getItem("signIn"));
    });
  }, []);
  return (
    <header>
      <div>
        <Link to="/">
          <h3>Nav</h3>
        </Link>
      </div>
      {signedIn !== "true" ? (
        <button
          onClick={() => {
            document.querySelector(".overLay").style.display = "block";
            document.querySelector(".signIn-div").style.display = "flex";
          }}
        >
          SignIn
        </button>
      ) : (
        <button
          onClick={() => {
            signOut(auth).then(() => {
              localStorage.setItem("signIn", "false");
              window.location.reload();
            });
          }}
        >
          SignOut
        </button>
      )}
    </header>
  );
};

export default Nav;
