import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpNewUser, clearError } from "../../redux/features/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, session } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(
      signUpNewUser({
        email,
        password,
      }),
    );

    if (signUpNewUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div>
      <form onSubmit={handleSignUp} className="max-w-md m-auto pt-24">
        <h2 className="font-bold pb-2 text-center">Sign up today!</h2>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/signin" className="hover:text-blue-500">
            Sign In
          </Link>
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

        <button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
