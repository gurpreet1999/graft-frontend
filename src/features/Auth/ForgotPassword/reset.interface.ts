/* eslint-disable @typescript-eslint/no-unused-vars */
interface IResetPasswordByEmail {
  email: string;
}

interface IResetPasswordByPhone {
  phone_number: string;
}

interface IResetPasswordByJWT {
  password: string;
}

interface IResetPasswordByOTP {
  password: string;
  email: string;
}

type RequestFunction = (value: string) => void;

interface IResetProps {
  handleRequest: RequestFunction;
  email?: string;
  setPhoneSendTo?: (value: string) => void;
  handleChangeEmail?: (value: string) => void;
}
