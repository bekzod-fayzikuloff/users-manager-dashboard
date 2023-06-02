import style from "../Login/Login.module.css";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {ISingUpForm} from "../../types";
import {AuthContext} from "../../context/AuthContext.jsx";

export const Register = () => {
  const navigate = useNavigate()
  const { registerUser }: {registerUser} = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("")

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    const target = e.target as ISingUpForm
    registerUser(
      target.username.value,
      target.email.value,
      target.password.value,
      () => {
        navigate("/sign-in")
      },
      () => {
        setErrorMsg("Check that the entered values are correct")
      }
    )
  }

  return (
    <div className={style.root}>
      <Form onSubmit={handleSignIn} className={style.sign__form}>
        {errorMsg && <p className={style.error_alert}>{errorMsg}</p>}
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button><br/>
        <span className={style.tooltip} onClick={() => navigate("/sign-in")}>Already have account? Sign-in</span>
      </Form>
    </div>
  )
}