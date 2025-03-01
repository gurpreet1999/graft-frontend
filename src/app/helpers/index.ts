export const isAuthPath = () => {
  return location.pathname.includes("/auth");
};

export const isSubscriptionRoute = () => {
  return location.pathname.includes("/auth/signup/subscriptions");
};

export const isSubscriptionFree = (userData: IUser) =>
  userData?.role === "RECRUITER" &&
  userData?.billing.pricing_plan.value === "free";

export const isSignUpPath = () => {
  return location.pathname.includes("/auth/signup");
};
