import Table from 'react-bootstrap/Table';
import {IUser} from "../../types";
import {Container, Form, Nav, Navbar} from "react-bootstrap";
import style from "./Users.module.css"
import { BsXOctagonFill, BsShieldFillCheck, BsPersonFillX } from "react-icons/bs"
import { BiWalk } from "react-icons/bi";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {sendDataAuthRequire} from "../../services/requests";
import {API_URL} from "../../config.js";
import {useNavigate} from "react-router-dom";

export const UsersTable = (props: {users: IUser[], changeUsers:  React.Dispatch<React.SetStateAction<IUser[]>>}) => {
  const {users, changeUsers} = props
  const navigate = useNavigate()
  const { user }: {user} = useContext(AuthContext);
  const {logoutUser}: {logoutUser} = useContext(AuthContext)
  const [checked, setChecked] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!checked.includes(event.target.value)) {
      setChecked(prevState => [...prevState, event.target.value])
    } else {
      setChecked(prevState => prevState.filter(value => value !== event.target.value))
    }
  }


  const changeStatus = (toStatus) => {
    checked.map(userId => {
      sendDataAuthRequire("PATCH", `${API_URL}/users/${userId}`, {isBlocked: toStatus}).then(() => {
        changeUsers(prevState => prevState.map(user => {
          return user.id === userId ? {...user, isBlocked: toStatus} : {...user}
        }))
      })
    })
  }

  const blockUsers = () => {
    if (checked.includes(user.userId)){
      navigate("/sign-in")
    }
    changeStatus(true)
  }

  const unblockUsers = () => {
    changeStatus(false)
  }

  const deleteUsers = () => {
    checked.map(userId => {
      sendDataAuthRequire("DELETE", `${API_URL}/users/${userId}`, {}).then(() => {
        setChecked(prevState => prevState.filter(value => value !== userId))
        changeUsers(prevState => prevState.filter(user => user.id !== userId))
      })
    })
  }

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkers =  document.querySelectorAll(`.${style.check__area} input`) as NodeListOf<HTMLInputElement>
    if (!e.target.checked) {
      setChecked([])
      return
    }

    checkers.forEach(checker=> {
      setChecked(prevState => {
        if (!prevState.includes(checker.value)) {
          return [...prevState, checker.value]
        } else {
          return [...prevState]
        }
      })
    })
  }


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={style.actions__block}>
              <Nav.Link onClick={blockUsers}><BsXOctagonFill /> Block</Nav.Link>
              <Nav.Link onClick={unblockUsers}><BsShieldFillCheck/>Unblock</Nav.Link>
              <Nav.Link onClick={deleteUsers}><BsPersonFillX />Delete</Nav.Link>
              <Nav.Link onClick={logoutUser}><BiWalk />Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table striped bordered variant="dark">
        <thead>
        <tr>
          <th>
            <Form>
              <div key={`select-checkbox`}>
                <Form.Check
                  type={"checkbox"}
                  id={`select-checkbox`}
                  label={`Select All/Unselect All`}
                  onChange={selectAll}
                />
              </div>
            </Form>
          </th>
          <th>id</th>
          <th>Username</th>
          <th>Email</th>
          <th>Join Date</th>
          <th>Last login Date</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {users.map(user => {
          let lastLoginDate = new Date(user.lastLoginDate)
          return (
            <tr key={user.id}>
              <td>
                <Form.Check
                  checked={checked.includes(user.id)}
                  onChange={handleChange}
                  value={user.id}
                  className={style.check__area}
                  type={"checkbox"}
                  id={`select-checkbox`}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{new Date(user.joinDate).toJSON().slice(0, 10)}</td>
              <td>{lastLoginDate.toJSON().slice(0, 10)} {lastLoginDate.getHours()}:{lastLoginDate.getMinutes()}:{lastLoginDate.getSeconds()}</td>
              <td>{user.isBlocked ? "Blocked" : "Active"}</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    </>
  );
}
