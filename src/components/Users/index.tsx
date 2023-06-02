import {UsersTable} from "./Table";
import {useEffect, useState} from "react";
import {IUser} from "../../types";
import {getResponse} from "../../services/requests";
import {API_URL} from "../../config.js";

export const UsersManager = () => {
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    getResponse(`${API_URL}/users/`).then(res => setUsers(res.data))
  }, [])
  return (
      <UsersTable users={users} changeUsers={setUsers}/>
  )
}