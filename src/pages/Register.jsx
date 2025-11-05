import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { register, reset } from "../features/auth/authSlice";
import { AuthForm } from "../components/AuthComponents/AuthForm";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  const handleRegister = (data) => {
    dispatch(register(data));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      alert(message);
    }
    dispatch(reset());
  }, [isSuccess, isError, message, navigate, dispatch]);

  return (
    <div className="min-h-screen flex flex-col mt-16 items-center text-white">
      <h2 className="text-2xl font-bold mb-6">Sign up</h2>
      <AuthForm onSubmit={handleRegister} buttonText="Sign up" />
      <p className="mt-4 text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};