import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MdLogin } from "react-icons/md";
const Login = () => {
  const [loginCred, setLoginCred] = useState({ email: "", password: "" });
  const ref = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(ref.current, {
        x: -550,
        duration: 0.3,
        stagger: 0.2,
        opacity: 0,
      });
    },
    { scope: ref }
  );
  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="login min-h-[80vh] w-full flex justify-center items-center">
        <form
          ref={ref}
          onClick={(e) => handleLogin(e)}
          className="flex gap-4 w-[300px] flex-col bg-white p-4 rounded-md"
        >
          <div className="py-2">
            <h1 className="text-2xl text-color font-bold">LOGIN HERE...</h1>
          </div>
          <div className="form-group flex items-center">
            {/* <label htmlFor="email" className="bg-white w-8 h-8">
              <MdEmail size={30} />
            </label> */}
            <input
              type="text"
              className="email bg-[rgba(0,0,0,.1)] border border-gray-400 text-gray-700 placeholder:text-gray-950 w-full outline-none px-4 py-2 rounded-sm"
              value={loginCred.email}
              placeholder="Email"
              onChange={(e) =>
                setLoginCred({ ...loginCred, email: e.target.value })
              }
              id="email"
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="password">
              <MdPassword />
            </label> */}
            <input
              type="text"
              className="password bg-[rgba(0,0,0,.1)] border border-gray-400 text-gray-700 placeholder:text-gray-950 w-full outline-none px-4 py-2 rounded-sm"
              value={loginCred.password}
              placeholder="Password"
              onChange={(e) =>
                setLoginCred({ ...loginCred, password: e.target.value })
              }
              id="password"
            />
          </div>
          <button className="flex gap-1 items-center justify-center p-2 bg-login-button text-white">
            <MdLogin />
            <span>Login</span>
          </button>

          <div className="py-2 text-center">
            <div className="new">
              <span>Need an account? </span>
              <Link className="text-blue-700 hover:underline" to={"/signup"}>
                Signup
              </Link>
            </div>
            <div className="forgot-password mt-2">
              <Link className="text-blue-700 text-sm hover:underline" to={"#"}>
                Forgot Password
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
