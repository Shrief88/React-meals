import React from "react";

function FeedbackMessage(props) {
  return (
    <div className={`flex gap-2 items-center text-base ${props.position}`}>
      {props.icon}
      <p className={`${props.textColor} text-sm`}>{props.message}</p>
    </div>
  );
}

export default FeedbackMessage;
