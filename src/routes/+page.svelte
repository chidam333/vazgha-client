<script lang="ts">
    import * as Card from "$lib/components/ui/card"
    import {toast} from "svelte-sonner";
    import {cn} from "$lib/utils";
    import type {PageData} from "./$types";
    import {Button} from "$lib/components/ui/button";
    import {Calendar} from "$lib/components/ui/calendar";
    import {
        type DateValue,
        DateFormatter,
        getLocalTimeZone
    } from "@internationalized/date";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import * as Popover from "$lib/components/ui/popover";
    export let data:PageData;
    let data_arr:Array<any> = []
    for(let key in data.result){
        console.log({key},data.result[key],"lol")
        if (key!="date"){
            data_arr.push(data.result[key])
        }
    }
    let value : DateValue | undefined  = undefined;
    console.log({value})
    let copyText = (e:PointerEvent)=>{
        let spanTarget = e.target as HTMLSpanElement;
        let text = spanTarget.innerHTML;
        //console.log(text);
        navigator.clipboard.writeText(text)
        toast("messgae copied")
    }
</script>
<main class="relative">
    <div class={cn("grid place-items-center mx-[8vh] mt-24F")} >
    <Carousel.Root>
    <Carousel.Content class="w-[80vw]">
    {#if data_arr.length<=0}
        <Card.Root >
            <Card.Content> 
                <span>No data found for the current date (you can try other dates)</span>
            </Card.Content>
        </Card.Root>
    {/if}
    {#each data_arr as key,i}
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
        <Popover.Trigger asChild let:builder><Button class="bg-lime-400 mt-4" builders={[builder]}>change date</Button></Popover.Trigger>
        <Popover.Content><Calendar bind:value initialFocus/></Popover.Content>
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
