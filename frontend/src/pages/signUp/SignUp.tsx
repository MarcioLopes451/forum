import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type SignupProps = {
  email: string;
  firstName: string;
  lastName: string;
  number: string;
  password: string;
};

const api_url = "http://localhost/forum-project/backend/forum_api.php";

export default function SignUp() {
  const [user, setUser] = useState<SignupProps>({
    email: "",
    firstName: "",
    lastName: "",
    number: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(api_url, user)
      .then((response) => {
        console.log(
          "Success response:",
          response.data.message || response.data
        );
        setUser({
          email: "",
          firstName: "",
          lastName: "",
          number: "",
          password: "",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing user up:", error);
        if (error.response) {
          console.log("Error response:", error.response.data);
        }
      });
  };

  return (
    <section className="bg-[#262D34] w-full h-full text-white">
      <div className="pt-10 px-7 flex justify-center items-center flex-col gap-5 text-center">
        <h2>Register</h2>
        <p>
          Let's get you all set up so you can verify your personal account and
          begin setting up your profile
        </p>
        <div>
          <form onSubmit={handleSubmit} className="text-black">
            <label htmlFor="firstName">First name</label>
            <br />
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="lastName">Last name</label>
            <br />
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="number">Phone No.</label>
            <br />
            <input
              type="text"
              name="number"
              value={user.number}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="text-black"
            />
            <br />
            <br />
            <div className="flex justify-center items-center">
              <input
                type="submit"
                value="Sign up"
                className="bg-[#FF6934] w-[112px] h-[44px] rounded-md"
              />
            </div>
          </form>
        </div>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </section>
  );
}
