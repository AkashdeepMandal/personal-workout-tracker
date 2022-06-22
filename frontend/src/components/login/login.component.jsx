import React, { useState, useEffect } from "react";
import "./login.style.scss";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const [error, seterror] = useState("");

  useEffect(() => {
    // seterror("");
  }, [pwd, email]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(email, pwd);
  };

  return (
    <div className="container-sign-in">
      <div className="sign-in">
        <h1>Sign In</h1>
        <p className={error ? "errorMsg active" : "errorMsg"}>{error}</p>
        <form className="signin-form" onSubmit={handelSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="false"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </div>
          <div className="field">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              name="pwd"
              id="pwd"
              onChange={(e) => setpwd(e.target.value)}
              value={pwd}
            />
          </div>
          <button className="login">Login</button>
        </form>
        <div className="nav-link">
          <Link className="" to="/forget-password">
            Forget Your Password?
          </Link>
          <Link className="" to="/register">
            I don't have an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
