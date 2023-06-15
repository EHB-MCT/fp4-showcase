import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import { registerUser, loginUser } from "../lib/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import ButtonPink from "./ButtonPink";

const onClick = () => {
  return null;
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("register");

  const onSubmit = async (e) => {
    e.preventDefault();
    let user = null;
    if (mode === "login") {
      user = await loginUser(email, password);
    } else {
      user = await registerUser(email, password);
    }

    if (!user.code && !user.message) {
      //Redirect to home page or profile
      router.push("/");
    } else {
      console.log("failed");
      console.log(user);
      toast.error("Failed to register user");
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-2/2 flex flex-col gap-4 items-cente p-5 rounded-xl mb-5 mt-5 border-2 border-purple-500"
      >
        {mode === "register" ? (
          <h1 className="text-center text-white text-2xl">Register User</h1>
        ) : (
          <h1 className="text-center text-white text-2xl">Log in</h1>
        )}
        <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
        <div className="flex flex-col gap-2 items-start w-full"></div>
        <label className="text-white" htmlFor="email">
          Email:
        </label>
        <div style={{ position: "relative" }}>
          <svg
            width="100%"
            height="50"
            viewBox="0 0 570 50"
            preserveAspectRatio="none"
          >
            <path
              id="Path_1213"
              data-name="Path 1213"
              d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
              transform="translate(-1061 -5889.645)"
              fill="#202033"
              stroke="#fff"
              strokeWidth="2"
              opacity="0.66"
            />
          </svg>
          <input
            type="email"
            placeholder="studentname@student.ehb.be"
            id="emailInput"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ position: "absolute", top: "1px", width: "80%" }}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white w-90 mx-4  "
            required
          />
        </div>

        <label className="text-white" htmlFor="password">
          Password:
        </label>
        <div style={{ position: "relative" }}>
          <svg
            width="100%"
            height="50"
            viewBox="0 0 570 50"
            preserveAspectRatio="none"
          >
            <path
              id="Path_1213"
              data-name="Path 1213"
              d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
              transform="translate(-1061 -5889.645)"
              fill="#202033"
              stroke="#fff"
              strokeWidth="2"
              opacity="0.66"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            id="passwordInput"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ position: "absolute", top: "1px", width: "80%" }}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white mx-4"
            required
          />
        </div>

        <ButtonPink title="Submit" color="white" onClick={onClick} />
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 w-full"
        >
          Switch to {mode === "login" ? "register" : "login"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
