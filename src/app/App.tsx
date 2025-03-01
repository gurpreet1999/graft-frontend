import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
import style from "./App.module.css";
import { useEffect, useMemo, useState } from "react";
import { NotFoundPage } from "pages/NotFoundPage";
import { SignIn } from "pages/auth";
import { useFetchUser } from "shared/hooks/useFetchUser";
import { adminRoutes, candidateRoutes, recruiterRoutes } from "./routes";
import { BallTriangle } from "react-loader-spinner";
import { useFetchSuggestions } from "shared/hooks/useFetchSuggestions";
import { SnackBar } from "shared/ui";
import { AdminAuth } from "pages/auth-admin";
import {
  isAuthPath,
  isSignUpPath,
  isSubscriptionFree,
  isSubscriptionRoute,
} from "./helpers";
import { Layout } from "./root-layout";

function App() {
  const { userData, status, refreshUserData } = useFetchUser();
  useFetchSuggestions();

  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const routes = useMemo(() => {
    if (status === "succeeded") {
      if (userData?.role === "CANDIDATE") return candidateRoutes;
      if (userData?.role === "RECRUITER") return recruiterRoutes;
      if (userData?.role === "ADMIN") return adminRoutes;
    }
    return [];
  }, [status, userData]);

  useEffect(() => {
    if (window.location.search.includes("success-credits=true")) {
      SnackBar({ text: "Credits successfully added", variant: "success" });
      setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.delete("success-credits");
        window.history.replaceState({}, document.title, url.toString());
        refreshUserData();
      }, 1000);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (status === "succeeded" && userData) {
      if (searchParams.get("redirect_status")) {
        setTimeout(() => {
          if (userData.billing.pricing_plan.value !== "free") {
            setSearchParams();
            setLoading(false);
            return;
          }
          refreshUserData();
        }, 2000);
        return;
      }
      setLoading(false);
      if (isSubscriptionFree(userData)) {
        if (isSignUpPath()) return;
        navigate("/auth/signup/subscriptions");
        return;
      }
      if (!userData && !isAuthPath() && isSubscriptionRoute()) {
        navigate("/auth/login");
        return;
      }
      if (userData && isAuthPath()) {
        // eslint-disable-next-line no-console
        console.log("navigating /", isAuthPath);
        navigate("/");
        return;
      }
      return;
    }
    if (status === "failed") {
      setLoading(false);
      if (!isAuthPath()) {
        // eslint-disable-next-line no-console
        console.log("navigating /auth/login", status);

        navigate("/auth/login");
        return;
      }
    }
  }, [navigate, userData, status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Debug____ : ", status, loading);
  }, [status, userData, loading]);

  if (loading || (routes.length === 0 && !isAuthPath())) {
    return (
      <div className={style.loader__container}>
        <div className={style.loader}>
          <BallTriangle
            height="0.3125rem"
            width="0.3125rem"
            radius={5}
            color="#38b6ff"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    );
  }
  return (
    <div className={style.container}>
      <div className={style.firstBg}></div>
      <div className={style.secondBg}></div>
      <Routes>
        <Route path="/auth/admin/*" element={<AdminAuth />} />
        <Route path="/auth/*" element={<SignIn />} />
        <Route
          path="/*"
          element={
            <Layout routes={routes}>
              <Routes>
                {routes.map(({ path, element }) => (
                  <Route
                    key={path}
                    path={path}
                    element={element && element()}
                  />
                ))}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
