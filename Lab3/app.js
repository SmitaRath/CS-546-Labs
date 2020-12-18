const peopleData= require("./people");
const workData= require("./work");

async function main(){
    try{
        console.log(await peopleData.getPersonById(43));
    }catch(e){
        console.log(e);
    }

    try{
        console.log(await peopleData.howManyPerState("NY"));
    }catch(e){
        console.log(e);
    } 

    try{
        console.log(await peopleData.personByAge(999));
    }catch(e){
        console.log(e);
    } 

    try{
        console.log(await peopleData.peopleMetrics());
    }catch(e){
        console.log(e); 
    }

    try{
        console.log(await workData.listEmployees());
    }catch(e){
        console.log(e); 
    } 

    try{
        console.log(await workData.fourOneOne("240-144-7553"));
    }catch(e){
        console.log(e);
    }
    
    try{
        console.log(await workData.whereDoTheyWork("277-85-0056"));
    }catch(e){
        console.log(e); 
    }  
    
}

main();

