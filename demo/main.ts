import {EventBus} from "../src/index"

const ebus = new EventBus<{a:string,b:number}>()


ebus.addEventListener("a",(event) => {
    const d = event.detail;
});


ebus.addEventListener("c",(event) => {
    const d = event;
});


ebus.dispatchEvent("a",23);