import {Outlet} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {Blocked} from "./Blocked/blocked";
import {getResponse} from "../services/requests";
import {API_URL} from "../config.js";


export const UnblockedRoute = () => {
  const { user }: {user} = useContext(AuthContext)
  const [userStatus, setUserStatus] = useState(true)
  useEffect(() => {
    getResponse(`${API_URL}/users/${user.userId}`).then(r => {
      setUserStatus(r.data.isBlocked)
    })
  }, [])

  return userStatus ? <Blocked />:  <Outlet />;
}