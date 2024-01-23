/*
    
    import type {PageServerLoad} from './$types';
export const load: PageServerLoad = async({params}) =>{
    let date = new Date();
    console.log({params})
    /*
        let dd = "17"
    let mm = "09"
    let yy = "23"
    */
    let dd = `${date.getDay()}`
    let mm = `${date.getMonth()}` 
    let yy = `${date.getFullYear()}`
    let response = await fetch(`http://vazgha.chidam.xyz/api/date?date=${dd}-${mm}-${yy}`)
        console.log({response})
    let result:any = {};
    try{
        result = await response.json()
    }catch(e){
        console.log({e})
    }
    console.log({date,result})
    return{
        result
    };
};
*/
