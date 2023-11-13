import React, { useContext, useEffect, useMemo, useState } from "react";
import { RxNormContext } from "../../context/Context";
import { HiSearch } from "react-icons/hi";
import { GoFilter } from "react-icons/go";
import { TbHistory } from "react-icons/tb";
import "./SearchBar.css";

interface RxNormDrug {
    name: string;
    rxcui: string;
    tty: string;
}

export const SearchBar = () => {
    const {drugs, filters, setFilters} = useContext(RxNormContext);
    const [filtersToggle, setFiltersToggle] = useState<boolean>(false);
    const [filtered, setFiltered] = useState<RxNormDrug[]>([]);
    const [query, setQuery] = useState<string>('');
    const [focused, setFocused] = useState<boolean>(false);
    let init = false;

    const update = (index: any) => {
        setFocused(false);
        setFilters(
            filters.map((filter: any, current: any) => 
                current === index
                    ? {...filter, checked: !filter.checked}
                    : filter
            )
        )
    }

    useEffect(() => {
        if (!init) {
            init = true;
            filter();
        }
    }, [])

    useEffect(() => {
        filter();
    }, [query, filters])

    const filter = () => {
        if (query.length === 0) {
            setFiltered(drugs);
        }

        const results = drugs.filter((drug: any) => {
            return ((drug.name.toLowerCase()).startsWith(query.toLowerCase()))
        })
        
        setFiltered(results);
    }
    
    return (
        <div style={{padding: "15px"}}>
            <div className="search_bar_container">
                <div className={focused ? "search_bar focused" : "search_bar"}>
                    <div className="icon">
                        <HiSearch />
                    </div>
                    <input 
                        className="search_input" 
                        type="text" 
                        placeholder="Search for prescription drugs"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />
                    <div className="icon">
                        <GoFilter onClick={() => setFiltersToggle(!filtersToggle)} />
                        <div className={filtersToggle ? "filter_dropdown" : "filter_dropdown hidden"}>
                            <div className="filters">
                                {filters.map((filter: any, index: any) => {
                                return (
                                    <div className="filter">
                                        <input 
                                            type="checkbox" 
                                            name={filter.name} 
                                            id={filter.name} 
                                            checked={filter.checked}
                                            onChange={() => update(index)}
                                        />
                                        <label htmlFor={filter.name}>{filter.name}</label>
                                    </div>
                                )})}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={focused ? "search_bar_dropdown" : "search_bar_dropdown hidden"}>
                {filtered.length > 0
                    ?
                    <div className="search_results">
                    {filtered.slice(0,7).map((drug: any) => (
                        <div className="result">
                            <div className="icon">
                                <HiSearch style={{fontSize: "0.8em"}} />
                            </div>
                            <div style={{flex: "1"}}>
                                <span style={{fontWeight: "bold"}}>
                                    {query.length >= 1 && query[0].toUpperCase() + query.slice(1)}
                                </span>
                                <span>
                                    {query.length > 0 
                                        ? (drug.name.substring(query.length)) 
                                        : drug.name
                                    }
                                </span>
                            </div>
                            <span style={{marginRight: "15px"}}>{drug.tty}</span>
                        </div>
                    ))}
                    </div>
                    :
                    <></>
                }
                </div>
            </div>
        </div>
    )
}