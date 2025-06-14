import React, { useRef, useState, useEffect } from "react";
import "./LoginSignup.css";
import Loader from "../layout/Loader/Loader.jsx";
import { Link } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { Login, ClearLoginErrors, Register } from "../../action/UserAction.js";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoginSignup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { LogedUser, loading, isAuthenticated, error } = useSelector(
    (state) => state.User
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  //to get url formate of the default avatar image

  // const defaultAvatar = `https://api.multiavatar.com`;
  const defaultAvatar1 = `https://robohash.org/`;
  const defaultAvatar2 = `-one`;
  // const defaultAvatar = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=`;
  const defaultAvatar = `https://source.boringavatars.com/bauhaus/120/hd?colors=264653,2a9d8f,e9c46a`;

  const getBase64FromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  const setDefaultAvatar = async (name) => {
    if (name.length > 0) {
      // const base64Avatar = await getBase64FromUrl(
      //     `${defaultAvatar}`
      //     // `${defaultAvatar1}${name})}${defaultAvatar2}`
      // );

      setAvatar(`${defaultAvatar1}${name}${defaultAvatar2}`);
      setAvatarPreview(`${defaultAvatar1}${name}${defaultAvatar2}`);
    }
  };
  // useEffect(() => {
  // const setDefaultAvatar = async () => {
  //     const base64Avatar = await getBase64FromUrl("/Profile.png");
  //     setAvatar(base64Avatar);
  // };

  //     setDefaultAvatar();
  // }, []);
  //after registerDataChange
  const [autoAvatar, setAutoAvatar] = useState(1);
  const { name, email, password } = user;
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      setAutoAvatar(0);
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      if (autoAvatar) {
        if (e.target.name === "name") setDefaultAvatar(e.target.value);
      }
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(Register(myForm));
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(Login(loginEmail, loginPassword));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearLoginErrors());
    }
    if (isAuthenticated) {
      if (location.search && location.search.endsWith("shipping"))
        navigate("/shipping");
      else navigate("/account");
    }
  }, [error, dispatch, toast, isAuthenticated, navigate]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">
                  <p className="forgot">Forget Password ?</p>
                </Link>
                <input type="submit" value="Login" className="loginBtn" />
                <div>
                  <div
                    style={{
                      marginLeft: "19px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div>Email: test@gmail.com</div>
                    <div>Password: Password</div>
                  </div>
                </div>
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="avatar"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default LoginSignup;
