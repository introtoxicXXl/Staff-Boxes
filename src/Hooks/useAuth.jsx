import { useContext } from "react";
import { AuthContext } from "../Utilities/Provider/AuthProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;