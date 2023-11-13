import React, { useState } from "react";
import { GoInfo } from "react-icons/go"
import { VscGithubInverted } from "react-icons/vsc";
import { TbSunMoon } from "react-icons/tb";
import { ImCross } from "react-icons/im"
import { Outlet } from "react-router-dom";
import "./Header.css"

export const Header = () => {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <div className="container">
            <div className="header">
                <a onClick={() => setToggle(true)}  className="link left">
                    <GoInfo style={{fontSize: '1.2em'}}/><span>API Information</span>
                </a>
                <div style={{flexGrow: "1"}}>
                    <div className="right">
                        <a className="link right">
                            <VscGithubInverted style={{fontSize: "1.2em"}}/>
                        </a>
                        <a className="link right">
                            <TbSunMoon style={{fontSize: "1.2em"}}/>
                        </a>
                    </div>
                </div>
            </div>
            <div className={toggle ? "modal" : "modal disabled"}>
                <div className="content">
                    <div className="icon">
                        <ImCross onClick={() => setToggle(false)} style={{fontSize: "0.8em", cursor: "pointer"}} />
                    </div>
                    <span>
                        This product uses publicly available data from the U.S. National Library of Medicine (NLM), 
                        National Institutes of Health, Department of Health and Human Services; NLM is not responsible 
                        for the product and does not endorse or recommend this or any other product.
                    </span>
                </div>
            </div>
            <Outlet />
        </div>
    )
}