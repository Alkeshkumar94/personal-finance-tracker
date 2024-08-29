import React, { useState } from "react";
import "./SignUpSignIn.css";
import Input from "../Input/Input";
import Button from "../button/index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { db, auth, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
function SignInSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  // signup
  function signupWithEmail() {
    setLoading(true);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            toast.success("SignUp Successfully!");
            setLoading(false);
            setEmail("");
            setName("");
            setConfirmPassword("");
            setPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("password and confirm password do not match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  // signin
  function loginWithEmail() {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          toast.success("Logged In Successfully!");
          navigate("/dashboard");
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  // userDetailDoc
  async function createDoc(user) {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  // google signup
  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          toast.success("User authenticated");
          createDoc(user);
          navigate("/dashboard");
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  }
  return (
    <>
      {loginForm ? (
        <div className="loginForm">
          <h2 className="title">
            Login In On
            <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Your Password"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login With Email"}
              onClick={loginWithEmail}
            />
            <p style={{ textAlign: "center", marginBlock: ".2rem" }}>Or</p>
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login With Google"}
              onClick={googleAuth}
              blue={true}
            />
            <p
              style={{
                textAlign: "center",
                marginBlock: ".2rem",
                color: "grey",
                paddingTop: "5px",
              }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Don't Have An Account Already?Click Here{" "}
            </p>
          </form>
        </div>
      ) : (
        <div className="signUpForm">
          <h2 className="title">
            Sign Up On <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              label={"FullName"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Your Password"}
            />
            <Input
              type={"password"}
              label={"Confirm password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Confirm Password"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup With Email"}
              onClick={signupWithEmail}
            />
            <p style={{ textAlign: "center", marginBlock: ".2rem" }}>Or</p>
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup With Google"}
              onClick={googleAuth}
              blue={true}
            />
            <p
              style={{
                textAlign: "center",
                marginBlock: ".2rem",
                color: "grey",
                paddingTop: "5px",
              }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Have An Account Already?Click Here{" "}
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignInSignUp;
