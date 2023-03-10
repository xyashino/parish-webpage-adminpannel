import React, { SyntheticEvent, useLayoutEffect, useState } from "react";
import { LoginInput } from "@components/Login/LoginInput";
import { AxiosBase } from "@utils/network/axios-base";
import { useNavigate } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import { Btn } from "@components/ui/Btn";
import { useValidationState } from "@hooks/useValidationState";
import {useErrorAlert} from "@hooks/useErrorAlert";
import {ErrorAlert} from "@components/alerts/ErrorAlert";

const LOGIN_INPUT_NAME = "email";
const PASSWORD_INPUT_NAME = "password";

export const LoginForm = () => {
  const navigate = useNavigate();
  const {errorData,hideError,showError} = useErrorAlert()
  const {
    setValue: setEmailValue,
    value: emailValue,
    isValid: isEmailValid,
    error: emailError,
  } = useValidationState("Email", {
    min: 3,
    max: 255,
    specialChars: ["@"],
  });

  const {
    setValue: setPwdValue,
    value: pwdValue,
    isValid: isPwdValid,
    error: pwdError,
  } = useValidationState("Hasło", {
    min: 8,
    max: 255,
  });


  const [disableBtn, setDisableBtn] = useState("disabled");
  useLayoutEffect(() => {
    setDisableBtn(isPwdValid && isEmailValid ? "wide" : "disabled");
  }, [isPwdValid, isEmailValid]);

  const logIn = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isEmailValid || !isPwdValid) return;
    try {
      await AxiosBase.post("/auth/login", {
        email: emailValue,
        password: pwdValue,
      });
      navigate(PageRouter.Home);
    } catch (error) {
      let message = 'Unknown Error'
      if (error instanceof Error) message = error.message;
      showError(message);
    }
  };

  return (
    <form
      className="flex flex-col items-center space-y-4"
      onSubmit={(e) => logIn(e)}
      noValidate
    >
      <LoginInput
        type="email"
        placeholder="email@test.com"
        labelText="Email:"
        name={LOGIN_INPUT_NAME}
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        error={emailError}
      />
      <LoginInput
        type="password"
        placeholder="*********"
        labelText="Hasło:"
        name={PASSWORD_INPUT_NAME}
        value={pwdValue}
        onChange={(e) => setPwdValue(e.target.value)}
        error={pwdError}
      />

      <div className="form-control mt-6">
        <Btn className={`btn btn-${disableBtn}`}>Zaloguj</Btn>
      </div>
      {
        errorData.show ?
            <ErrorAlert onClick={hideError} message={errorData.message}/> : null
      }
    </form>
  );
};
