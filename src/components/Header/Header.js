import React, { useEffect } from 'react'
import "./Header.css";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import userImg from "../../assets/user.svg"

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user,navigate]);
  const logoutFn = () => {
    try {
      signOut(auth).then(() => {
        // Sign-out successful.
        navigate("/");
        toast.success("Logged out successfully!");
      }).catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className="navbar">
      <p className='logo'>Financely.</p>
      {user &&
      <div style={{display:"flex",gap:"10px"}}>
        <img alt='' style={{width:"30px",height:"30px",borderRadius:"50%"}} src={user.photoURL? user.photoURL:userImg }/>
        <p className='logo link' onClick={logoutFn}> Logout</p>
      </div>
      }
    </div>
  )
}

export default Header