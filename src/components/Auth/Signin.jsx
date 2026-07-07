import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../redux/features/authSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, session } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(
      signInUser({
        email,
        password,
      })
    );

    // Check whether login succeeded
    if (signInUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  // Optional: Redirect automatically if session exists
  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <div>
      <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
        <h2 className="font-bold pb-2">Sign In</h2>

        <p>
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </p>

        <div className="flex flex-col py-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col py-4">
          <input
            type="password"
            placeholder="Password"
            className="p-3 mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {error && (
          <p className="text-red-600 text-center pt-4">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Signin;