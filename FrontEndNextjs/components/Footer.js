import styled from "styled-components"

import React from "react"

export const Footer = () => {
    return (
        <Foot>
            <p>
                © {new Date().getFullYear()} Open Source Project Developed By{" "}
                <span>
                    <a
                        href="https://github.com/rezowansifat"
                        target="_B
                    "
                    >
                        REZOWAN SIFAT
                    </a>
                </span>
            </p>
            <Contribution
                href="https://github.com/rezowansifat/Decentralized-Lottery.git"
                target="_Blank"
            >
                Open For Contribution
            </Contribution>
        </Foot>
    )
}

const Foot = styled.nav`
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #222222;
    color: #fff;

    @media (max-width: 425px) {
    }

    p {
        text-align: center;
        line-height: 25px;
        span {
            transition: all 200ms ease;
            color: rgb(239, 75, 37);
            &:hover {
                color: rgb(255, 255, 255, 0.9);
            }
        }
    }
`
const Contribution = styled.a`
    display: flex;
    font-size: 12px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    background-color: rgb(34, 34, 34);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgb(239, 75, 37);
    color: #fff;
    cursor: pointer;
    margin: 6px 0px;
    text-transform: uppercase;
    &:hover {
        color: rgb(239, 75, 37);
    }
`
export default Footer
