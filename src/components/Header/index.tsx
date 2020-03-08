import React from "react";

type HeaderProps = { className: string };
const Header = ({ className }: HeaderProps) => {
  return <div className={className}>I'm a header</div>;
};

export default Header;
