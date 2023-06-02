import {Button, Form} from "react-bootstrap";
import style from "./Login.module.css"
import {useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {ISingInForm} from "../../types";


export const Login = () => {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("")
  const {loginUser}: {loginUser} = useContext(AuthContext)

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // @ts-ignore
    const target = e.target as ISingInForm
    loginUser(
      target.email.value,
      target.password.value,
      () => navigate("/"),
      () => setErrorMsg("Check that the entered values are correct")
    )
  }


  return(
    <div className={style.root}>
      <Form onSubmit={handleSignUp} className={style.sign__form}>
        {errorMsg && <p className={style.error_alert}>{errorMsg}</p>}
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
        </Button> <br/>
        <span className={style.tooltip} onClick={() => navigate("/sign-up")}>Create new account</span>
      </Form>
    </div>
  )
}