import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

interface ContextProps {
    children: React.ReactNode
}

interface RxNormDrug {
    name: string
    rxcui: string
    tty: string
}

interface RxNormFilter {
    name: string
    checked: boolean
}

type RxNorm = {
    drugs: RxNormDrug[]
    filters: RxNormFilter[]
    setFilters: (filters: RxNormFilter[]) => void
}

export const RxNormContext = createContext<RxNorm>({
    drugs: [],
    filters: [],
    setFilters: () => {},
})

export const RxNormProvider: React.FC<ContextProps> = ({ children }) => {
    const [drugs, setDrugs] = useState<RxNormDrug[]>([]);
    const [filters, setFilters] = useState<RxNormFilter[]>([
        { name: "BN", checked: false },
        { name: "IN", checked: false },
        { name: "SCD", checked: false },
        { name: "SBD", checked: false },
    ]);

    useEffect(() => {
        const fetchDrugs = async () => {
            const res = await axios.get("https://rxnav.nlm.nih.gov/REST/Prescribe/allconcepts.json?tty=BN+IN+SCD+SBD")
            const response = res.data['minConceptGroup']['minConcept'];
            
            if (response) {
                setDrugs(response);
            }
        }

        fetchDrugs()
            .catch(console.error)
    }, []);

    return (
        <RxNormContext.Provider value={{
            drugs, filters, setFilters
        }}>
            {children}
        </RxNormContext.Provider>
    );
}