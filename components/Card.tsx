import React from "react";

type props = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function Card({ children, className, onClick }: props) {
  return (
    <div
      className={`card bg-dark-mode-secondary shadow-xl rounded-3xl text-white ${className}`}
      onClick={onClick}
    >
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
