import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomerNavbar from "./CustomerNavbar";
import ArtisanNavbar from "./ArtisanNavbar";
import AdminNavbar from "./AdminNavbar";
import PublicNavbar from "./PublicNavbar";

const RoleBasedNavbar = () => {
  const { authUser } = useContext(AuthContext);

  if (!authUser) return <PublicNavbar />;
  if (authUser.role === "admin") return <AdminNavbar />;
  if (authUser.role === "artisan") return <ArtisanNavbar />;
  return <CustomerNavbar />;
};

export default RoleBasedNavbar;
