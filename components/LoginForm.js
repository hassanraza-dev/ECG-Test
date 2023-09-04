import Image from "next/image";
import React, { useState } from "react";
import { login, signup } from "../network/network";
import { add } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginForm = ({ isSignupForm, preFilled }) => {
  const [email, setEmail] = useState(preFilled?.email || "");
  const [password, setPassword] = useState(preFilled?.password || "");
  const dispatch = useDispatch();
  const router = useRouter();

  // const value = useSelector((state) => state.token);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignupForm) {
      signup({ email, password })
        .then((res) => {
          document.cookie = `token=${res.token}`;
          router.push("/");
          dispatch(add(res.token));
        })
        .catch((err) => alert(err.response.data.error));
    } else {
      login({ email, password })
        .then((res) => {
          document.cookie = `token=${res.token}`;
          router.push("/");
          dispatch(add(res.token));
        })
        .catch((err) => alert(err.response.data.error));
    }
  };
  return (
    <>
      <div className="w-full mx-auto h-auto sm:w-auto shadow-sm bg-black py-3 px-12 m-5 text-gray-400  rounded-xl  md:max-w-lg">
        <div className="flex justify-center"></div>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="title">
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              required
              placeholder="Enter title"
              value={preFilled?.email || email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white font-bold mb-2"
              htmlFor="numberOfSets"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numberOfSets"
              name="reps"
              type="password"
              placeholder="Password"
              required
              value={preFilled?.password || password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              className="bg-blue-600 w-full my-8 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="submit"
            >
              LOGIN
            </button>
          </div>
          {isSignupForm ? (
            <div className="flex items-center justify-center mb-8">
              <Link href={"/login"}>Already Register?</Link>
            </div>
          ) : (
            <div className="flex items-center justify-center mb-8">
              <Link href={"/signup"}>sign up</Link>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
