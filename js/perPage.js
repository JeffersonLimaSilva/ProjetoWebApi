export let perPage = 0
let aux = 0

export function setPerPage(newperPage){
    console.log(newperPage);
    
    aux= newperPage;
    perPage = aux;
    console.log(aux);
    return newperPage
}



