import { Button } from "shared/ui";

export const renderButton = (
  price: string | number,
  current: IPlan | undefined,
  handleChoosePlan: (plan: IPlan) => void,
  plan: IPlan,
  style: any
) => {
  if (plan.value === current?.value) {
    return <div className={style.button__current}>Current Plan</div>;
  }

  if (price === "Individual") {
    return (
      <Button
        variant="primaryBlue"
        className={style.button}
        onClick={() => handleChoosePlan(plan)}
      >
        Get Contact
      </Button>
    );
  }

  if (plan.value !== current?.value && price !== "Individual") {
    if (typeof price === "number" && price > Number(current?.price)) {
      return (
        <Button
          variant="primary"
          className={style.button}
          onClick={() => handleChoosePlan(plan)}
        >
          Upgrade Plan
        </Button>
      );
    } else {
      return (
        <Button
          variant="primary"
          className={style.button}
          onClick={() => handleChoosePlan(plan)}
        >
          Downgrade Plan
        </Button>
      );
    }
  }

  return null;
};
