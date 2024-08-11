import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const Signup = () => {
  const [signupCred, setSignupCred] = useState({
    name: "",
    email: "",
    password: "",
  });

  const ref = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(ref.current, { x: 550, duration: 0.3, stagger: 0.2, opacity: 0 });
  });

  const handleSignup = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="login min-h-[80vh] w-full flex justify-center items-center">
        <form
        onSubmit={(e) => handleSignup(e)}
          ref={ref}
          className="flex gap-4 w-[300px] flex-col bg-white rounded-md p-4"
        >
          <div className="py-2">
            <h1 className="text-2xl text-color font-bold">Signup here...</h1>
          </div>
          <div className="form-group flex items-center">
            {/* <label htmlFor="name" className="bg-white w-8 h-8">
            <MdEmail size={30} />
          </label> */}
            <input
              type="text"
              className="name bg-[rgba(0,0,0,.1)] border border-gray-400 text-gray-700 placeholder:text-gray-950 w-full outline-none px-4 py-2 rounded-sm"
              value={signupCred.name}
              placeholder="Fullname"
              onChange={(e) =>
                setSignupCred({ ...signupCred, name: e.target.value })
              }
              id="name"
            />
          </div>
          <div className="form-group flex items-center">
            {/* <label htmlFor="email" className="bg-white w-8 h-8">
            <MdEmail size={30} />
          </label> */}
            <input
              type="text"
              className="email bg-[rgba(0,0,0,.1)] border border-gray-400 text-gray-700 placeholder:text-gray-950 w-full outline-none px-4 py-2 rounded-sm"
              value={signupCred.email}
              placeholder="Email"
              onChange={(e) =>
                setSignupCred({ ...signupCred, email: e.target.value })
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
              value={signupCred.password}
              placeholder="Password"
              onChange={(e) =>
                setSignupCred({ ...signupCred, password: e.target.value })
              }
              id="password"
            />
          </div>
          <button className="flex gap-1 items-center justify-center p-2 bg-login-button text-white">
            <MdAdd />
            <span>Login</span>
          </button>

          <div className="py-2 text-center">
            <div className="new">
              <span>Have an account? </span>
              <Link className="text-blue-700 hover:underline" to={"/login"}>
                Login
              </Link>
            </div>
            {/* <div className="forgot-password mt-2">
              <Link className="text-blue-700 text-sm hover:underline" to={"#"}>
                Forgot Password
              </Link>
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
