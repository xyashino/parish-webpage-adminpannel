import { ExpandableContent } from "@components/ui/ExpandableContent";
import { Btn } from "@components/ui/Btn";
import React, {SyntheticEvent, useLayoutEffect, useRef, useState} from "react";

import {useValidationState} from "@hooks/useValidationState";
import {LoginInput} from "@components/Login/LoginInput";
import {useConfirmAlert} from "@hooks/useConfirmAlert";
import {ConfirmAlert} from "@components/alerts/ConfirmAlert";

const OLD_PASSWORD_NAME = "oldPassword";
const NEW_PASSWORD_NAME = "newPassword";
const CONFIRM_PASSWORD_NAME = "confirmPassword";

export const UserChangePassword = () => {
  const newPwdRef = useRef(null);
  const {alertData,setConfig} = useConfirmAlert();


  const {
    setValue: setOldPwdValue,
    value: oldPwdValue,
    isValid: isOldPwdValid,
    error: oldPwdError
  } = useValidationState('Hasło', {
    min: 8,
    max: 255,
  });

  const {
    setValue: setNewPwdValue,
    value: newPwdValue,
    isValid: isNewPwdValid,
    error: newPwdError
  } = useValidationState('Hasło', {
    min: 8,
    max: 255,
  });

  const {
    setValue: setConfirmPwdValue,
    value: confirmPwdValue,
    isValid: isConfirmPwdValid,
    error: confirmPwdError
  } = useValidationState('Hasło', {
    min: 8,
    max: 255,
    sameAs: newPwdRef
  });

  const [disableBtn, setDisableBtn] = useState("disabled");
  useLayoutEffect(() => {
    setDisableBtn((isNewPwdValid && isOldPwdValid && isConfirmPwdValid) ? "wide" : "disabled");
  }, [isNewPwdValid, isOldPwdValid, isConfirmPwdValid])


  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setConfig('Czy napewno chcesz zmienic hasło?',()=>{})
  };

  return (
    <ExpandableContent title="Zmień Hasło">
      <form
          className="flex w-full flex-col items-center justify-center bg-accent p-4"
          onSubmit={(e)=> handleSubmit(e)}
          noValidate
      >
        <LoginInput
          type="password"
          placeholder="********"
          name={OLD_PASSWORD_NAME}
          value={oldPwdValue}
          labelText="Stare Hasło:"
          onChange={(e) => setOldPwdValue(e.target.value)}
          error={oldPwdError}
        />
        <LoginInput
            ref={newPwdRef}
            type="password"
            placeholder="********"
            name={NEW_PASSWORD_NAME}
            value={newPwdValue}
            labelText="Nowe Hasło:"
            onChange={(e) => setNewPwdValue(e.target.value)}
            error={newPwdError}
        />

        <LoginInput
          type="password"
          value={confirmPwdValue}
          name={CONFIRM_PASSWORD_NAME}
          placeholder="********"
          labelText="Powtórz Hasło:"
          onChange={(e) => setConfirmPwdValue(e.target.value)}
          error={confirmPwdError}
        />

        <Btn className={`btn btn-${disableBtn}`}>
          Zmień hasło
        </Btn>
        {
          alertData.show ? <ConfirmAlert config={alertData.config}/> : null
        }
      </form>
    </ExpandableContent>
  );
};
