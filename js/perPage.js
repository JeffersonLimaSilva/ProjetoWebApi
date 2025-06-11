import { criaListaLogs } from "./listalogs.js";
let aux= 9
export let perPage= aux

export function setPerPage(newperPage){

    console.log(newperPage);
    
    perPage= newperPage;

    criaListaLogs()
    perPage = aux
    
}


