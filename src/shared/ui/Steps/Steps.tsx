// import React from "react";
// import style from "./Steps.module.css";
// import classNames from "classnames";

// interface ISteps {
//   maxSteps: number;
//   activeStep: number;
//   className?: string;
// }

// export const Steps = ({ maxSteps, activeStep, className }: ISteps) => {
//   return (
//     <div className={classNames(style.container, className)}>
//       {Array.from({ length: maxSteps }, (_, i) => (
//         <>
//           <div
//             key={i}
//             className={classNames(
//               style.step,
//               i + 1 === activeStep && style.active
//             )}
//           >
//             {i + 1}
//           </div>
//           {i + 1 !== maxSteps && <span></span>}
//         </>
//       ))}
//     </div>
//   );
// };

import React from "react";
import style from "./Steps.module.css";
import classNames from "classnames";

interface ISteps {
  maxSteps: number;
  activeStep: number;
  className?: string;
}

export const Steps = ({ maxSteps, activeStep, className }: ISteps) => {
  return (
    <div className={classNames(style.container, className)}>
      {Array.from({ length: maxSteps }, (_, i) => (
        <React.Fragment key={i}>
          {/* Use React.Fragment with a key */}
          <div
            className={classNames(
              style.step,
              i + 1 === activeStep && style.active
            )}
          >
            {i + 1}
          </div>
          {i + 1 !== maxSteps && <span key={`separator-${i}`}></span>}{" "}
          {/* Assign key to span */}
        </React.Fragment>
      ))}
    </div>
  );
};
