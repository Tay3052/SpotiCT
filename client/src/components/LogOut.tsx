import { logout } from "../auth/FirebaseAuth";
import { useNavigate } from "react-router-dom";
export const LogOut: React.FC = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
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
