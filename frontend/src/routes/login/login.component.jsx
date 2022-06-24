import React, { useState, useEffect } from "react";
import "./login.style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/userSlice";

function SignIn() {
  const { error, isError, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const [errorMsg, seterrorMsg] = useState(false);

  useEffect(() => {
    if (isError) {
      seterrorMsg(true);
    } else if (isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isError, isLoggedIn]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password: pwd }));
    setpwd("");
  };

  return (
    <div className="container-sign-in">
      <div className="sign-in">
        <h1>Sign In</h1>
        <div className={`error-msg${errorMsg ? " active" : ""}`}>
          <p>{error}</p>
        </div>
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
