const { default: Axios } = require("axios");
const people = require ("./people");

function validate(argument,type){

    if(typeof argument !== "string") throw `Parameter sent ${argument} is not of string type`;
    if (type==="P"){
         let phoneno =/\d{3}-\d{3}-\d{4}/;
        if(!((argument.match(phoneno)) && argument.length===12)) throw `Parameter sent ${argument} is not in the correct format xxx-xxx-xxxx`;
        }
         
    if (type==="S"){
        let ssn = /\d{3}-\d{2}-\d{4}/;
        if(!((argument.match(ssn)) && argument.length===11)) throw `Parameter sent ${argument} is not in the correct format xxx-xx-xxxx`;
        }  

    }

async function getWorkData(){
    try{
        const { data } = await Axios.get("https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json");
        return data;
    }
    catch(error){
        console.log('Error', error.message);
        throw `Couldn't fetch data from the server`;
    }
}
async function listEmployees(){
    const data = await getWorkData();
    const peopleData = await people.getPeopleDate();

    let companyName;;
    let ids = [];
    let returnArray = [];
    let addObject = {};
    let peopleObject = {};
    let employeeNameObject = {};
    let employessArray=[];

    for (let singlerecord of data){
        companyName=singlerecord.company_name;
        ids=singlerecord.employees;
        employessArray=[];
        addObject = {};

        for(let i of ids){
            
            employeeNameObject={};

            peopleObject = peopleData.find( obj => {
            return obj.id === i
            });

          employeeNameObject['first_name']=peopleObject.first_name;
          employeeNameObject['last_name'] =peopleObject.last_name; 
          employessArray.push(employeeNameObject);
        
        }

            addObject['company_name'] = companyName;
            addObject['employees'] = employessArray;
            returnArray.push(addObject); 
    } 
   
 return returnArray;

} 

async function fourOneOne(phoneNumber){
    validate(phoneNumber,"P");
    let companyObject = {};
    let returnObject={};
    const data = await getWorkData();
    companyObject = data.find(obj => {
      return obj.company_phone === phoneNumber
  });

  if(companyObject!=null){
     returnObject["company_name"] = companyObject.company_name;
     returnObject["company_address"] = companyObject.company_address;
  } 
    else throw `Paremeter sent ${phoneNumber} does not exist`;
    return returnObject;
}

async function whereDoTheyWork(ssn){
    validate(ssn,"S");
    const data = await getWorkData();
    const peopleData = await people.getPeopleDate();
    let peopleObject={};
    let companyObject={};

    peopleObject = peopleData.find( obj => {
        return obj.ssn === ssn
    });

    if(peopleObject!=null){

        companyObject = data.find( obj => {
            for(let emp of obj.employees){
              if (emp === peopleObject.id) return obj;
            }
        });
    return `${peopleObject.first_name} ${peopleObject.last_name} works at ${companyObject.company_name}.`
    }
    else throw `Paremeter sent ${ssn} does not exist`;
}

module.exports={
    listEmployees,
    fourOneOne,
    whereDoTheyWork
}