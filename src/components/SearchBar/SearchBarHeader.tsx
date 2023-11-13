import React, { useEffect, useState } from "react";
import { VscGithubInverted } from "react-icons/vsc";
import { GoInfo } from "react-icons/go"
import { HiSearch } from "react-icons/hi";
import { GoFilter } from "react-icons/go";
import { AiOutlineMedicineBox } from "react-icons/ai"
import "./SearchBarHeader.css";

export const SearchBarHeader = () => {
    return (
        <div className="drug_header">
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{width: "40px", height: "40px"}}>
                    <AiOutlineMedicineBox style={{width: "100%", height: "100%"}} />
                </div>
                <span style={{fontWeight: "bold", fontSize: "1.2em"}}>UniDrug</span>
            </div>
            <div className="drug_search_bar">
                <input 
                    type="text" 
                    //value={query}
                    //onChange={(e) => setQuery(e.target.value)}
                    //onFocus={() => setFocused(true)}
                    //onBlur={() => setFocused(false)}
                />
            </div>
            <div className="drug_buttons">
                <div style={{width: "25px", height: "25px"}}>
                    <VscGithubInverted style={{width: "100%", height: "100%"}} />
                </div>
                <div style={{width: "25px", height: "25px", marginLeft: "10px"}}>
                    <GoInfo style={{width: "100%", height: "100%"}} />
                </div>
            </div>
            {/*
            <div className="header_search_bar">
                <input 
                    type="text" 
                    placeholder="Search for prescription drugs"
                    //value={query}
                    //onChange={(e) => setQuery(e.target.value)}
                    //onFocus={() => setFocused(true)}
                    //onBlur={() => setFocused(false)}
                />
            </div>
             */}

        </div>

    )
}