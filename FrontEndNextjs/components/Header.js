import { ConnectButton } from "web3uikit";
import styled from "styled-components";

import React from "react";

export const Header = () => {
  return (
    <Nav>
      <LogoDiv>
        <img src="logo.png"></img>
      </LogoDiv>

      <div className="ml-auto py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 0.75rem;
  padding-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #222222;
  border-bottom: 1px solid rgb(229, 231, 235, 0.6);

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(239, 75, 37);
    padding: 10px 16px;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: all 100ms ease;
    border: 2px solid #fff;
    &:hover {
      background-color: rgb(239, 75, 37, 0.9);
      span {
        color: rgb(255, 255, 255, 0.9);
      }
    }

    span,
    svg {
      color: #fff;
    }
  }
`;

const LogoDiv = styled.div`
  max-width: 150px;
  height: 100%;

  img {
    width: 100%;
    height: "auto";
  }
`;

export default Header;
