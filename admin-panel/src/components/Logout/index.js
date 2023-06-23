import { IconButton } from "@mui/material";
import { logout } from "../../actions/authActions";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch } from "react-redux";


const Logout = () => {
    const dispatch = useDispatch();
  
    const handleLogout = () => {
        dispatch(logout);
    }
  
    return (
        <IconButton onClick={handleLogout}>
           logout <ExitToAppIcon />
        </IconButton>
    );
  };

  export default Logout