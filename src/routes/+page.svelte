<script lang="ts">
    import * as Card from "$lib/components/ui/card"
    import {toast} from "svelte-sonner";
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
</script>
<main class="relative">
    <div class="grid place-items-center mx-[8vh] mt-24">
    <Carousel.Root>
    <Carousel.Content class="w-[80vw]">
    {#each data_arr as key,i}
        <Carousel.Item class="">
            <Card.Root>
                <Card.Content>
                    {key}
                </Card.Content>
            </Card.Root>
        </Carousel.Item>
    {/each}
    </Carousel.Content>
    <Carousel.Previous/>
    <Carousel.Next />
    </Carousel.Root>
    <Popover.Root>
        <Popover.Trigger><Button class="bg-lime-400 mt-4">change date</Button></Popover.Trigger>
        <Popover.Content><Calendar bind:value initialFocus/></Popover.Content>
    </Popover.Root>
    <!--
    <Carousel.Root class="">
      <Carousel.Content class="">
        {#each data_arr as key,i}
          <Carousel.Item >
            <button class="allunset" on:keydown={()=>toast("copied")} on:click={()=>{toast("copied")}}>
              <Card.Root >
                <Card.Content 
                  class=""
                >
                  <span class="" >{key}</span>
                </Card.Content>
              </Card.Root>
            </button>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Root>-->
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
