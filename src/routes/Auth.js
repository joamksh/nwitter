import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "../fbase";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const Auth = () => {
  const onSocialClick = async (event) => {
    const { target: { name } } = event;

    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    try {
      const data = await signInWithPopup(authService, provider);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AuthForm/>
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
