<script lang="ts">
    import * as Card from "$lib/components/ui/card"
    import {toast} from "svelte-sonner";
    import {cn} from "$lib/utils";
    import {Button} from "$lib/components/ui/button";
    import {Calendar} from "$lib/components/ui/calendar";
    import {
        type DateValue,
        DateFormatter,
        getLocalTimeZone
    } from "@internationalized/date";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import * as Popover from "$lib/components/ui/popover";
    import { onMount } from 'svelte'
    let data = {};
    let data_arr:Array<any> = []
    onMount(async()=>{
        let date = new Date()
        let dd = `${date.getDate()}`
        let mm = `${date.getMonth()+1}`
        let yy = date.getFullYear() - 1
        if (mm.length<2){
            mm = '0' + mm
        }
        if (dd.length<2){
            dd = '0' + dd
        }
        let response = await fetch(`/fetch_content?date=${yy}-${mm}-${dd}`) 
        data = await response.json()
        console.log({data})
        for(let key in data){
            data_arr.push(data[key])
            data_arr = [...data_arr]
            console.log({data_arr})
        }
    })
    let value:DateValue | undefined = undefined;
    let copyText = (e:PointerEvent)=>{
        let spanTarget = e.target as HTMLSpanElement;
        let text = spanTarget.innerHTML;
        //console.log(text);
        navigator.clipboard.writeText(text)
        toast("messgae copied")
    }
    let rerun = async(value:DateValue):void =>{
        if (value==undefined) return
        let yy = '2023'
        let value_str:string = value.toString()
        //value_str = '20'+value_str // this is to mitigate the fact that valuestr is just has suffix and not the full year
        let mm = value_str.slice(5,7)
        let dd = value_str.slice(8)
        console.log({value_str,dd,mm,yy})
        let response = await fetch(`/fetch_content?date=${yy}-${mm}-${dd}`) 
        data = await response.json()
        data_arr = []
        for(let key in data){
            data_arr.push(data[key])
            data_arr = [...data_arr]
        }
        console.log({data_arr})

    }
    $: lol = rerun(value)
</script>
<main class="relative">
    <div class={cn("grid mt-12 place-items-center mx-[8vh] mt-24F")} >
    <Carousel.Root>
    <Carousel.Content class="w-[80vw]">
    {#if data_arr.length<=0}
        <Card.Root >
            <Card.Content> 
                <span class="w-[100%]">No data found for the current date (you can try other dates)</span>
            </Card.Content>
        </Card.Root>
    {/if}
    {#each data_arr as key}
        <Carousel.Item class="">
            <Card.Root >
                    <Card.Content> 
                    <span role="button" on:click={(e)=>{copyText(e)}} on:keydown={(e)=>{copyText(e)}} tabindex="0">{key}</span>
                </Card.Content>
            </Card.Root>
        </Carousel.Item>
    {/each}
    </Carousel.Content>
    <Carousel.Previous/>
    <Carousel.Next />
    </Carousel.Root>
    <Popover.Root>
        <Popover.Trigger asChild let:builder>
            <Button class="bg-lime-400 mt-4" builders={[builder]}>
                change date
            </Button>
            {value ? value : "undefined"}
        </Popover.Trigger>
        <Popover.Content>
            <Calendar bind:value initialFocus/>
        </Popover.Content>
    </Popover.Root>
    </div>
</main>
<style>
    *{
        min-width: 0px;
    }
    .allunset{
        width: 100% !important;
        all: unset;
    } 
</style>
