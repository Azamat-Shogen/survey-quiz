import React from "react";

const Header = ({ title }) => {
    return <div><h2>{!title ? "loading..." : title}</h2></div>;
};

export default Header;
