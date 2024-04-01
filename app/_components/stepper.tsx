"use client";

import React, { useState } from "react";

interface StepperInterface {
  stage: number;
}

const Stepper: React.FC<StepperInterface> = (props) => {
  const { stage } = props;
  const [currStage, setCurrStage] = useState(stage);

  const getStepperClasses = (index: number) => {
    let be4StepperCss =
      "before:absolute before:-left-1/2 before:top-[1.2rem] before:h-[.15rem] before:w-full before:content-[''] first:before:content-[none]";
    let afterStepperCss =
      "after:absolute after:left-1/2 after:top-[1.2rem] after:h-[.15rem] after:w-full after:content-[''] last:after:content-[none]";
    const completed = currStage > index;
    if (completed) afterStepperCss += " after:bg-leather-500";
    else afterStepperCss += " after:bg-gray-200";
    const stepperCss = `${be4StepperCss} ${afterStepperCss}`;
    return stepperCss;
  };

  const getStageDisplayClasses = (index: number) => {
    const completed = currStage > index;
    const active = currStage === index;
    const baseClasses =
      "z-10 flex h-10 w-10 items-center justify-center rounded-full";
    if (active)
      return `${baseClasses} border-leather-500 bg-leather-500 border-2 font-bold text-white`;
    else if (completed)
      return `${baseClasses} border-leather-500 text-leather-500 border-2 bg-white font-medium`;
    else return `${baseClasses} border border-black bg-white`;
  };

  const getTextDisplayClasses = (index: number) => {
    const completed = currStage > index;
    const active = currStage === index;
    if (active) return "text-leather-500 font-bold";
    else if (completed) return "text-leather-500 font-medium";
    else return "text-black";
  };

  return (
    <ul className="mx-auto flex w-full items-center justify-center">
      {[
        ["01", "準備結帳"],
        ["02", "送貨方式"],
        ["03", "付款"],
      ].map(([num, label], index) => (
        <li
          key={num}
          onClick={() => setCurrStage(index)}
          className={`relative flex flex-1 flex-col items-center justify-center gap-1 ${getStepperClasses(index)}`}
        >
          <div className={getStageDisplayClasses(index)}>{num}</div>
          <div className={getTextDisplayClasses(index)}>{label}</div>
        </li>
      ))}
    </ul>
  );
};

export default Stepper;
