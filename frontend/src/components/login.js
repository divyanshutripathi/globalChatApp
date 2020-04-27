import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import axios from "axios";
// import Chat from "./chat";

import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [submitBol, setsubmitBol] = useState(false);

  const history = useHistory();
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post(`http://localhost:5000/user/login`, {
        user,
      });
      const { data, status } = response;
      if (data.success && status / 100 === 2) {
        alert("login successfull");
        // setsubmitBol(true);
        history.push("/chat");
      } else {
        alert("login failed");
      }
      setEmail("");
      setPassword("");
      // history.push("/chat");
    } catch (err) {
      console.log("error : ", err);
      alert("login failed");
    }
  }
  function signUpButton() {
    history.push("/signup");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br></br>
        <FormGroup controlId="email">
          Email
          <FormControl
            autoFocus
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          Password
          <FormControl
            value={password}
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button disabled={!validateForm()} type="submit">
          Login
        </Button>
        <br></br>
      </form>
      <button onClick={signUpButton}>signup</button>
      {/* {submitBol && <Chat email={email} />} */}
    </div>
  );
}

export default Login;
