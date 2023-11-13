import React, { useContext, useEffect, useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import axios from "axios";
import './Info.css';

interface FilterList {
    name: string;
    checked: boolean;
}

interface RxNormDrug {
    name: string;
    rxcui: string;
    tty: string;
}

const ListFilter: FilterList[] = [
    { name: "BN", checked: false },
    { name: "SCD", checked: false },
    { name: "SBD", checked: false },
]

export const Ingredient = () => {
    const [listFilters, setListFilters] = useState<FilterList[]>(ListFilter);
    const [drug, setDrug] = useState<RxNormDrug[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    
    const perPage: number = 20;
    const start: number = currentPage*perPage;
    const end: number = start+perPage;
    const drugSubset: any = drug.slice(start, end);
    let init: boolean = false;

    const pageUpdate = (page: any) => {
        setCurrentPage(page.selected)
    }

    const update = (index: any) => {
        //setFocused(false);
        setListFilters(
            listFilters.map((filter: any, current: any) => 
                current === index
                    ? {...filter, checked: !filter.checked}
                    : filter
            )
        );
    }

    useEffect(() => {
        const fetchDrug = async () => {
            const res = await axios.get("https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui/161/related.json?tty=BN+SBD");
            const response = res.data["relatedGroup"]["conceptGroup"];
            
            if (response) {
                let data: RxNormDrug[] = [];
                let key: string = "T0VA7BjczAL7YLGMUHZ0pqJJAOi9HkDWVSWlMwPM";

                response.map((arr: any) => {
                    arr.conceptProperties.forEach(async (drug: any) => {
                        //const innerRes = await axios.get(`https://api.fda.gov/drug/label.json?api_key=${key}&search=openfda.rxcui:'${drug.rxcui}'`)
                        //if (response.ok) {
                            //data.push({name: drug.name, rxcui: drug.rxcui, tty: drug.tty, label: true});
                        //} else {
                            //data.push({name: drug.name, rxcui: drug.rxcui, tty: drug.tty, label: false});
                        //}
                        data.push({name: drug.name, rxcui: drug.rxcui, tty: drug.tty})
                    })
                })

                data.sort(function(a, b) {
                    return a.name.toLowerCase() === b.name.toLowerCase() ? 0 : a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
                });

                setDrug(data);
                setTotalPages(Math.ceil(data.length/perPage));
            }
        }

        if (!init) {
            init = true;
    
            fetchDrug()
                .catch(console.error);
        }
    }, []);

    return (
        <div style={{ height: "100%" }}>
            <div className="drug_container">
                <div className="drug_content">
                    <div style={{padding: "10px"}}>
                        <div style={{height: "25px", display: "flex", justifyContent: "space-between"}}>
                            <div><span style={{fontSize: "1.2em", fontWeight: "bold"}}>Ingredient</span></div>
                            <div>
                                <ReactPaginate 
                                    previousLabel={
                                        <IoIosArrowBack />
                                    }
                                    nextLabel={
                                        <IoIosArrowForward />
                                    }
                                    activeClassName="active"
                                    pageCount={totalPages}
                                    onPageChange={pageUpdate}
                                    containerClassName="pages"

                                />
                            </div>
                        </div>
                        <div>
                            <div className="drug_filters">
                                {listFilters.map((filter: any, index: any) => {
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
                    <div className="drug_list">
                        {drugSubset.map((drug: any) => (
                            <div className="drug_item">
                                <span style={{fontSize: "0.9em", fontWeight: "bold"}}>{drug.name}</span>
                                <span className="tty">{drug.tty}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) 
}