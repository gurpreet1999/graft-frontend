import { useEffect, useCallback, RefObject } from "react";

type EventListener = (event: MouseEvent | TouchEvent) => void;

/**
 * Custom hook to handle clicks outside a specified ref element.
 * @param ref The ref object that represents the element to detect clicks outside of.
 * @param handler The callback function to call when a click outside the element occurs.
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: EventListener
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    },
    [ref, handler]
  );

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) =>
      handleClickOutside(event);
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handleClickOutside]);

  return handleClickOutside;
};
