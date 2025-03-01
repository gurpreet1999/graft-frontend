import style from "./SignIn.module.css";
import { Routes, Route, Link } from "react-router-dom";
import { ForgotPassword, ResetPassword } from "widgets/auth";
import LogoLight from "assets/images/logo-light.svg";
import LogoDark from "assets/images/logo-dark.svg";
import { useTheme } from "shared/ui/Theme/useThemes";
import { ThemeProvider } from "shared/ui";
import { NotFoundPage } from "pages/NotFoundPage";
import { AdminLogin } from "widgets/auth-admin";
import { AdminFirstLogin } from "features/admin-first-login";

interface IAuthLayoutProps {
  logo: string;
  children: React.ReactNode;
}

const AuthLayout = ({ logo, children }: IAuthLayoutProps) => {
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <div className={style.link__container}>
          <Link to="https://www.onthegraft.co.uk/" className={style.logo__link}>
            <img src={logo} alt="logo" />
          </Link>
          <div className={style.theme}>
            <ThemeProvider.Toggler />
          </div>
        </div>
        <div className={style.form__container}>
          <Link
            to="https://www.onthegraft.co.uk/"
            className={style.logo__link_small}
          >
            <img src={logo} alt="logo" />
          </Link>
          {children}
        </div>
      </section>
    </div>
  );
};

export function AdminAuth() {
  const { theme } = useTheme();
  const logo = theme === "light" ? LogoLight : LogoDark;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthLayout logo={logo}>
            <AdminLogin />
          </AuthLayout>
        }
      />
      <Route
        path="/invitation/?*"
        element={
          <AuthLayout logo={logo}>
            <AdminFirstLogin />
          </AuthLayout>
        }
      />
      <Route
        path="/forgot-password/*"
        element={
          <AuthLayout logo={logo}>
            <ForgotPassword />
          </AuthLayout>
        }
      />
      <Route
        path="/reset-password/:id"
        element={
          <AuthLayout logo={logo}>
            <ResetPassword method="email" />
          </AuthLayout>
        }
      />
      <Route
        path="/reset-password"
        element={
          <AuthLayout logo={logo}>
            <ResetPassword method="phone" />
          </AuthLayout>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
