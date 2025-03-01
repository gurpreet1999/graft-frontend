import style from "../ForgotPassword.module.css";
import { Button, Input, SnackBar } from "shared/ui";
import { Auth } from "features/Auth/lib";
import { useInputState } from "shared/hooks";
import phoneIcon from "assets/images/sign-in/signup/phone.svg";
import { Validation } from "shared/validation";

export const PhoneReset = ({ handleRequest, setPhoneSendTo }: IResetProps) => {
  const {
    value: phone,
    error,
    setValue: setPhone,
    setErrorState,
  } = useInputState<string>("");

  if (!setPhoneSendTo) return null;

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const getPhone = async () => {
    const error = Validation.validatePhone(phone);
    if (error.length > 0) {
      setErrorState(error);
      SnackBar({ text: "Please fill all fields" });
      return;
    }
    try {
      await Auth.forgotPasswordPhone(phone);
      handleRequest("phone");
      setPhoneSendTo(phone);
    } catch (error) {
      return;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.input}>
        <Input
          icon={phoneIcon}
          placeholder="Mobile Number"
          type="phone"
          error={error}
          value={phone}
          handleChange={handlePhoneChange}
        />
        <Button onClick={getPhone}>Continue</Button>
      </div>
    </div>
  );
};
