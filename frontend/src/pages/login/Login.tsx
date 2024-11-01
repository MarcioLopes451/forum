import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type LoginProps = {
  email: string;
  password: string;
};

const api_url = "http://localhost/forum-project/backend/forum_api.php";

export default function Login() {
  const [user, setUser] = useState<LoginProps>({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("User data:", user); // To verify payload data before sending

    axios
      .post(`${api_url}?action=login`, user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log("Login response:", res.data.message);
        navigate("/dashboard"); // Redirect on successful login
      })
      .catch((error) => {
        console.error(
          "Error logging in:",
          error.response?.data?.error || error.message
        );
      });
  };

  return (
    <section className="bg-[#262D34] w-full h-full text-white">
      <div className="pt-10 px-7 flex justify-center items-center flex-col gap-5">
        <h2>Login</h2>
        <p>See your growth and get support!</p>
        <form onSubmit={handleSubmit}>
          <label>Email*</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <label>Password*</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="login"
            className="bg-[#FF6934] w-[112px] h-[44px] rounded-md"
          />
        </form>
        <p>
          Not registered yet? <Link to="/signUp">Create a new account</Link>
        </p>
      </div>
    </section>
  );
}
