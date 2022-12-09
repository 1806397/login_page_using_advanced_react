import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passReducer = (state, action) => {
  if (action.type === "USER_PASS") {
    return {
      value: action.val,
      isValid: action.val.length >= 6,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length >= 6 };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [passState, dispatchPass] = useReducer(passReducer, {
    value: "",
    isValid: false,
  });
  const { isValid: emailIsValid } = emailState;
  const { isValid: passIsValid } = passState;
  useEffect(() => {
    //with every keystroke useEffect is called which is not good in terms of efficiency
    const timerForEffect = setTimeout(() => {
      console.log("checking for validity");
      setFormIsValid(emailState.isValid && passState.isValid);
    }, 500);
    //we are cleaning the timer everytime use press the button,therefore useEffect will called
    //only when user is done entering data
    return () => {
      clearTimeout(timerForEffect);
    };
  }, [emailIsValid, passIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
    dispatchPass({ type: "USER_PASS", val: event.target.value });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({
      type: "INPUT_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passState.value.trim().length > 6);
    dispatchPass({
      type: "INPUT_BLUR",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passIsValid}
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!(emailState.isValid && passState.isValid)}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
