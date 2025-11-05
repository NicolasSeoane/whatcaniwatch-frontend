import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { login, reset } from "../features/auth/authSlice";
import { AuthForm } from "../components/AuthComponents/AuthForm";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isError, message } = useSelector((state) => state.auth);

  const handleLogin = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }
    if (isError) {
      alert(message);
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  return (
    <div className="min-h-screen flex flex-col mt-16 items-center text-white">
      <h2 className="text-2xl font-bold mb-6">Sign in</h2>
      <AuthForm onSubmit={handleLogin} buttonText="Sign in" />
      <p className="mt-4 text-gray-400">
        Dont have an account?{" "}
        <Link to="/register" className="text-blue-400 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};