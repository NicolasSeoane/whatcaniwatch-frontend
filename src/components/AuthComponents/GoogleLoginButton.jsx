import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../features/auth/authSlice";

export const GoogleLoginButton = () => {
  const googleCLientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: googleCLientID,
          callback: handleCallbackResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );
      }
    };
    
    if (window.google) {
      initialize();
    } else {
      // Esperar a que se cargue
      const interval = setInterval(() => {
        if (window.google) {
          initialize();
          clearInterval(interval);
        }
      }, 100);
    }
  }, []);

  const handleCallbackResponse = (response) => {
    dispatch(googleLogin(response.credential));
  };

  return <div id="googleSignInDiv" className="flex justify-center mt-4" />;
};
