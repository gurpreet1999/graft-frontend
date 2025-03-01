import { useEffect, useState } from "react";

export const useScrollEffect = (
  targetInputValue: string | undefined,
  scrollTo: number = 160
) => {
  const [alreadyScrolled, setAlreadyScrolled] = useState(false);

  useEffect(() => {
    if (!targetInputValue) {
      setAlreadyScrolled(false);
    }
    if (targetInputValue && targetInputValue.length > 0 && !alreadyScrolled) {
      document
        .querySelector(".rt-ScrollAreaViewport")
        ?.scrollTo({ top: scrollTo, behavior: "smooth" });
      setAlreadyScrolled(true);
    }
  }, [scrollTo, alreadyScrolled, targetInputValue]);
};
