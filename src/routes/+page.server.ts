import type {PageLoad} from './$types';
export const load: PageLoad = async() =>{
    let date = new Date();
    let dd = "20";
    let mm = "08";
    let yy = "23";
    let response = await fetch(`http://vazgha.chidam.xyz/api/date?date=${dd}-${mm}-${yy}`)
    console.log({response})
    let result = await response.json()
    console.log({date,result})
    return{
        result
    };
};
