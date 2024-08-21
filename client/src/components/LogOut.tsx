import { logout } from "../auth/FirebaseAuth";
import { useNavigate } from "react-router-dom";
import { removeCookieSession } from "../auth/Session";

export const LogOut: React.FC = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      removeCookieSession("uid");
      await logout();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button onClick={handleLogOut} className="btn btn-primary">
      SignOut
    </button>
  );
};
