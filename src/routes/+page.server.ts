import type {PageLoad} from './$types';
export const load: PageLoad = async() =>{
    let date = new Date();
    /*
        let dd = `${date.getDay()}`
    let mm = `${date.getMonth()}` 
    let yy = `${date.getFullYear()}`
    */
    let dd = "17"
    let mm = "09"
    let yy = "23"
    let response = await fetch(`http://vazgha.chidam.xyz/api/date?date=${dd}-${mm}-${yy}`)
    console.log({response})
    let result:JSON;
    try{
        result = await response.json()
    }catch(e){
        result = {}
        console.log({e})
    }
    console.log({date,result})
    return{
        result
    };
};
