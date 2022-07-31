import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../Config";
const Nav = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <h3>Nav</h3>
        </Link>
      </div>
      {localStorage.getItem("signIn") !== "true" ? (
        <Link to="/signIn">
          <button>SignIn</button>
        </Link>
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
