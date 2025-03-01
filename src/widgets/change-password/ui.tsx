import { Card, CardHeader, Input, Button, SnackBar } from "shared/ui";
import headerIcon from "assets/images/profile/password.svg";
import style from "./change-password.module.css";
import saveIcon from "assets/images/profile/save.svg";
import saveWhiteIcon from "assets/images/profile/save-white.svg";
import deleteIcon from "assets/images/profile/deleteIcon.svg";
import { useEffect, useState } from "react";
import { useInputState, usePageWidth } from "shared/hooks";
import classNames from "classnames";
import { ResetPasswordApi } from "shared/api/reset-password/lib";
import { Validation } from "shared/validation";

export const ChangePassword = () => {
  const width = usePageWidth();
  const [changesWereAdopted, setChangesWereAdopted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const {
    value: currentPassword,
    setValue: setCurrentPassword,
    error: currentPasswordError,
    setErrorState: setCurrentPasswordError,
  } = useInputState<string>("");
  const {
    value: newPassword,
    setValue: setNewPassword,
    error: newPasswordError,
    setErrorState: setNewPasswordError,
  } = useInputState<string>("");
  const {
    value: confirmPassword,
    setValue: setConfirmPassword,
    error: confirmPasswordError,
    setErrorState: setConfirmPasswordError,
  } = useInputState<string>("");

  const [active, setActive] = useState(false);

  const validateFields = (skipAdopted: boolean = false) => {
    if (!changesWereAdopted && !skipAdopted) return true;
    const error = Validation.validatePassword(currentPassword);
    const errorNewPassword = Validation.validatePassword(newPassword);
    const errorConfirmPassword =
      newPassword !== confirmPassword ? ["Passwords do not match"] : [];

    if (error.length) {
      setCurrentPasswordError(error);
      return false;
    }

    if (errorNewPassword.length) {
      setNewPasswordError(errorNewPassword);
      return false;
    }

    if (errorConfirmPassword.length) {
      setConfirmPasswordError(errorConfirmPassword);
      return false;
    }

    return true;
  };

  useEffect(() => {
    const valid = validateFields();
    setIsFormValid(valid);
  }, [currentPassword, newPassword, confirmPassword]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCurrentPasswordChange = (value: string) => {
    setCurrentPassword(value);
    const error = Validation.validatePassword(value);
    setCurrentPasswordError(error);
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    const error = Validation.validatePassword(value);
    setNewPasswordError(error);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    const error = newPassword !== value ? ["Passwords do not match"] : [];
    setConfirmPasswordError(error);
  };

  useEffect(() => {
    if (currentPassword || newPassword || confirmPassword) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  const deleteUser = () => {};

  const saveChanges = async () => {
    setChangesWereAdopted(true);
    const isValid = validateFields(true);
    setIsFormValid(isValid);

    if (!isValid) return;
    ResetPasswordApi.changePasswordAfterLogin(
      currentPassword,
      newPassword
    ).then(() => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setActive(false);
      setChangesWereAdopted(false);
      SnackBar({ text: "Password changed successfully", variant: "success" });
    });
  };

  return (
    <Card className={style.container}>
      <div className={style.header__container}>
        <CardHeader image={headerIcon} title="Password" />
        <div className={style.buttons}>
          {width > 768 ? (
            <>
              {/* <Button
                variant="red"
                onClick={deleteUser}
                className={style.edit__button}
              >
                <img src={deleteIcon} alt="edit" /> Delete Account
              </Button> */}
              {active && (
                <Button
                  variant="primary"
                  onClick={saveChanges}
                  className={classNames(
                    style.edit__button,
                    isFormValid && style.active
                  )}
                >
                  <img
                    src={isFormValid ? saveWhiteIcon : saveIcon}
                    alt="edit"
                  />{" "}
                  Save
                </Button>
              )}
            </>
          ) : (
            active && (
              <Button
                variant="primary"
                onClick={saveChanges}
                className={classNames(
                  style.edit__button,
                  isFormValid && style.active
                )}
              >
                <img src={isFormValid ? saveWhiteIcon : saveIcon} alt="edit" />{" "}
                Save
              </Button>
            )
          )}
        </div>
      </div>
      <div className={style.inputs}>
        <Input
          label="Current Password"
          placeholder="********"
          type="password"
          value={currentPassword}
          handleChange={handleCurrentPasswordChange}
          error={currentPasswordError}
          className={style.input}
          isPassword
        />
        <Input
          label="New Password"
          placeholder="********"
          type="password"
          value={newPassword}
          handleChange={handleNewPasswordChange}
          className={style.input}
          isPassword
          error={newPasswordError}
        />
        <Input
          label="Confirm Password"
          placeholder="********"
          type="password"
          value={confirmPassword}
          handleChange={handleConfirmPasswordChange}
          className={style.input}
          isPassword
          error={confirmPasswordError}
        />
      </div>
      {width <= 768 && (
        <Button
          variant="red"
          onClick={deleteUser}
          className={style.edit__button}
        >
          <img src={deleteIcon} alt="edit" /> Delete Account
        </Button>
      )}
    </Card>
  );
};
