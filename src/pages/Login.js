import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const [login, setLogin] = useState(null);

  console.log(loginData);
  console.log(login);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.REACT_APP_MONGODB_URL_SERVER}/login`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(loginData),
        }
      );
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.token));
        navigate(0);
      }

      setLogin(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //  const redirectLoginGithub = () => {
  //   window.location.href = `${process.env.REACT_APP_MONGODB_URL_SERVER}/auth/github`
  //  }

  return (
    <div className="mt-20 flex justify-center h-[1100px] w-full">
      <form onSubmit={onSubmit} className="w-[450px] items-center p-20 flex flex-col gap-1">
        <label className="m-3">Your Email</label>
        <input
          className="sm: text-sm m-3 block w-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-300 sm:text-md sm:leading-6"
          placeholder="name@company.com"
          type="text"
          name="email"
          required
          onChange={handleInputChange}
        />
        <label className="m-3">Your Password</label>
        <input
          className="sm: text-sm m-3 block w-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-300 sm:text-md sm:leading-6"
          placeholder="●●●●●●●●●●●"
          type="password"
          name="password"
          required
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="w-100 mt-3 text-black bg-lime-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Sign in
        </button>

        {/* <button onClick={() => redirectLoginGithub()} className="w-100 mt-3 text-black bg-lime-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Login with Github
        </button> */}
      </form>
    </div>
  );
};

export default Login;
