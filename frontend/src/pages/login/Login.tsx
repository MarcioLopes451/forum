import { Link } from "react-router-dom";

export default function Login() {
  // useEffect(() => {
  //     fetch("http://localhost/forum-project/backend/forum_api.php")
  //   .then((response) => response.json())
  //   .then((data) => setUser(data))
  //   .catch((error) => console.error("Error fetching posts:", error));
  // }, [])
  return (
    <section className="bg-[#262D34] w-full h-full text-white">
      <div className="pt-10 px-7 flex justify-center items-center flex-col gap-5">
        <h2>Login</h2>
        <p>See your growth and get support!</p>
        <form action="" method="post" className="">
          <label htmlFor="">Email*</label>
          <br />
          <input type="text" name="email" id="email" />
          <br />
          <br />
          <label htmlFor="">Password*</label>
          <br />
          <input type="text" name="email" id="email" />
          <br />
          <br />
          <div className="flex justify-center items-center">
            <input
              type="submit"
              value="login"
              className="bg-[#FF6934] w-[112px] h-[44px] rounded-md"
            />
          </div>
        </form>
        <p>
          Not registered yet? <Link to="/signUp">Create a new account</Link>
        </p>
      </div>
    </section>
  );
}
