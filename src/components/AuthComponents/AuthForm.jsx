import { useState } from "react";
import { GoogleLoginButton } from "./GoogleLoginButton";

export const AuthForm = ({ onSubmit, buttonText }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="bg-gray-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-900 p-6 rounded-xl w-full max-w-sm mx-auto shadow-lg"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 rounded bg-gray-700 text-white focus:outline-none"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 rounded bg-gray-700 text-white focus:outline-none"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-red-600/50 hover:bg-red-600/80 text-white font-semibold py-2 rounded transition cursor-pointer"
        >
          {buttonText}
        </button>
      </form>
      {/* LOGIN CON GOOGLE */}
      <div className="flex justify-center">
        <GoogleLoginButton/>
      </div>
    </div>
  );
};
