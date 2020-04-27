import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";

import axios from "axios";

import { useHistory } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const user = {
      email,
      username,
      password,
    };
    try {
      const response = await axios.post(`http://localhost:5000/user/addUser`, {
        user,
      });
      const { data, status } = response;
      if (data.success && status / 100 === 2) {
        // setsubmitBol(true);
        history.push("/chat");
      } else {
        alert("signup failed");
      }
      setEmail("");
      setPassword("");
      setUsername("");
      setConfirmPassword("");
      // history.push("/chat");
    } catch (err) {
      console.log("error : ", err);
      alert("signup failed");
    }

    // history.push("/chat");
  }

  return (
    <form onSubmit={handleSubmit}>
      <br></br>
      <FormGroup controlId="username">
        Name
        <FormControl
          autoFocus
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormGroup>
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
      <FormGroup controlId="confirmPassword">
        confirm Password
        <FormControl
          value={confirmPassword}
          type="password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormGroup>
      <Button disabled={!validateForm()} type="submit">
        Signup
      </Button>
    </form>

    // <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
    //   <input
    //     type="text"
    //     name="title"
    //     style={{ flex: '10', padding: '5px' }}
    //     placeholder="Add Todo ..."
    //     value={this.state.title}
    //     onChange={this.onChange}
    //   />
    //   <input
    //     type="submit"
    //     value="Submit"
    //     className="btn"
    //     style={{flex: '1'}}
    //   />
    // </form>
  );
}

export default Signup;
