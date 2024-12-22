import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';



export function Logout() {
  const user = useSelector((state: any) => state.app.authUser as any) as any;
  const history = useHistory();
  const logoutGoogle = () => {
    googleLogout();
    history.push("/");
  };
  return (<>
    Welcome Back {user && user.fullName}
    <button onClick={logoutGoogle} >Logout</button>
  </>);
}
