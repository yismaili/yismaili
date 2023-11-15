import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import BG from "../../asset/yismaili.jpg";
import LOGO from "../../asset/yismaili.jpg";
import { app } from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);

  const HandelSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          navigate("/dashboard");
        }
        // ...
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <img
          src={BG}
          className="h-4/5 w-4/5 object-cover rounded-lg brightness-75"
          alt="lock image"
        />
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold text-center">
          <p>Unlock Your Imagination 🌟</p>
          <p>Let Your Dreams Take Flight 🌌</p>
        </div>
      </div>
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-4/5 p-8 bg-white rounded-lg shadow-md">
          <a href="/" className="flex items-center mb-4 text-primary">
            <BiArrowBack className="mr-2" /> Back to Home
          </a>
          <p className="text-3xl font-bold text-black h-[30px] flex gap-1">
            <img src={LOGO} alt="" className="h-full" />{" "}
            <span className="font-normal text-2xl my-auto">|</span>{" "}
            <em className="font-normal text-2xl my-auto">Admin</em>
          </p>
          <div>
            <div className="mb-8">
              <div className="mt-5">
                <h2 className="text-2xl font-semibold">Login</h2>
              </div>
            </div>
            <form onSubmit={HandelSubmit}>
              <div className="flex flex-col gap-2 my-5">
                <input
                  type="text"
                  placeholder="Email"
                  className="border-[1px] px-4 py-2 rounded-md w-full outline-slate-500"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border-[1px] px-4 py-2 rounded-md w-full outline-slate-500"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </div>
              <button
                className="w-full py-3 bg-slate-600 rounded-md text-white font-semibold disabled:opacity-50"
                disabled={false}
              >
                {isProcessing ? "Processing..." : "Submit"}
              </button>
            </form>
            {errorMessage && (
              <div className="text-red-500 mt-4">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
