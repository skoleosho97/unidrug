import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Info.css';
import axios from 'axios';

enum TermTypes {
    SCD = 'Semantic Clinical Drug',
    SBD = 'Semantic Branded Drug',
    GPCK = 'Generic Pack',
    BPCK = 'Branded Pack',
}

/*
const getUse = (data: {[key: string]: string}): any => {
    if (data) {
        try {
            const base: string = data.indications_and_usage[0];

            let target: string | undefined = ''
            
            //const regex_start: RegExp = new RegExp('.+(INDICATIONS AND USAGE )');
            const regex_end: RegExp = new RegExp(/([ ])\(([ ])([0-9]+|[\.]+)([ ])\)/);
            //let result: string = '';

            const first_split: string[] = base.split(regex_end);
            target = first_split[0] + first_split[first_split.length-1];

            if (target.indexOf('Uses') !== -1) {
                const result = target.split('Uses ').pop();
                if (result) { return result }
            } else if (target.indexOf('USAGE') !== -1) {
                const result = target.split('INDICATIONS AND USAGE ').pop();
                if (result) { return result }
                //result = [...new Set(second_split[2].split(' '))].join(' ');

                //return result;
            }
        } catch (err) {
            throw new Error (`Error: ${err}`)
        }
    }
}

const getMechanismOfAction = (data: {[key: string]: string}): any => {
    if (data) {
        try {
            const base: string = data.mechanism_of_action[0];
            if (!base) return 'There seems to be no recorded mechanism of action for this clinical drug.'
            const target: string | undefined = base.split("Mechanism of Action ").pop();
            if (target) {
                const result: RegExpMatchArray | null = target.match(/^.*?[.!?](?!.*\))/gm)

                if (result) {
                    return result[0]
                } else {
                    throw new Error();
                }
            } else {
                throw new Error();
            }

        } catch (err) {
            throw new Error(`Error: ${err}`)
        }
    }
}

const getContraindications = (data: {[key: string]: string}): any => {
    if (data) {
        try {
            const results: string = data.contraindications[0];
            if (results.includes('None') || !results) {
                return 'None'
            } else {
                return ''
            }
        } catch (err) {
            throw new Error (`Error: ${err}`)
        }
    } else {
        throw new Error('Something went wrong!');
    }
}

const getAdverseEffects = (data: {[key: string]: string}): any => {
    if (data) {
        console.log(data);
        try {
            const base: string = data.adverse_reactions[0];
            if (!base) return 'There are no recorded side efforts for using this clinical drug.'
            const base: string = data.spl_medguide[0];
            const target: string | undefined = base.split("The most common side effects of ABECMA are: ").pop();
            let bullets: string[] = []
            if (target) {
                const tmp = target.match(/•([^•]+)/g);
                if (tmp) {
                    bullets = tmp.map(item => {
                        const bullet = item.match(/(.+?) [A-Z]/)
                        return bullet ? bullet[1] : item
                    }).map(x => x.replace('•', '').trim()).filter(Boolean)
                }
            }
            return bullets
        } catch (err) {
            throw new Error(`Error: ${err}`)
        }
    } else {
        return []
    }
}
*/

export const Info = () => {
    const location = useLocation()
    const { drugName, rxcui, tty } = location.state
    let endpoint: string = ''

    useEffect(() => {

    }, []);

    return (
        <div className='info_container'>
            <div className='drug_info'>
                <span className='name'>{drugName}</span>
                <span className='type'>{TermTypes[tty as keyof typeof TermTypes]}</span>
            </div>
        </div>
    ) 
}