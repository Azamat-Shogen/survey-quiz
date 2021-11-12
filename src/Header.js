import React from "react";

const Header = ({ title }) => {
    return <div>{!title ? "loading..." : title}</div>;
};

export default Header;
