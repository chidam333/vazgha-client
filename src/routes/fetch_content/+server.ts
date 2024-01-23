
import {json} from  "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET:RequestHandler = async({url}) =>{
    let date = url.searchParams.get('date');
    let dd = date?.slice(8) 
    let mm = date?.slice(5,7)
    let yy = '23' 
    console.log({dd,mm,yy,date})
    let response = await fetch(`http://vazgha.chidam.xyz/api/date?date=${dd}-${mm}-${yy}`)
    console.log({response})
    let result:any = {};
    try{
        result = await response.json()
    }catch(e){
        console.log({e})
    }
    //console.log({date,result})
    return json(result)
}
