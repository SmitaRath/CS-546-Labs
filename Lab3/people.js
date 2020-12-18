const { default: Axios } = require("axios");

function validate(argument,type="N"){
    if (type==="N")
    {
        if (typeof  argument !== 'number') throw `Parameter sent ${argument} is not a number`;
        if (!Number.isInteger(argument)) throw `Parameter sent ${argument} is not an Integer`;
        
    }
        
    if (type ==="S"){
        if (typeof  argument !== 'string') throw `Parameter sent ${argument} is not a string`;
    }
}

async function getPeopleDate(){
    try{
    const {data} = await Axios.get("https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json");
        return data;  
    }
    catch(error){
            console.log('Error', error.message);
            throw `Couldn't fetch data from the server`;
    }
}

async function getPersonById(id){
    validate(id,"N");
    if (!(id>=1 && id <=1000)) throw `Parameter sent ${id} is not in the range`;
    const data = await getPeopleDate();

    let peopleDataById = data.find( obj => {
        return obj.id === id
      });

    if (peopleDataById!=null) return peopleDataById;
    else throw `Sent Parameter ${id} does not exist`;
   
}


async function howManyPerState(stateAbbrv){
    validate(stateAbbrv,"S");
    let count=0;
    const data = await getPeopleDate();

    for(let arr of data){
        if (arr.address.state === stateAbbrv)
        count++;
    }

    if(count===0) throw `This state is not listed, no one is staying in ${stateAbbrv}`;
    else return count;

}

async function personByAge(index){
    validate(index,"N");
    if (!(index>=0 && index <=999)) throw `Parameter sent ${index} is not in the range`;
    let returnObject = {};
    let result;
    let today=new Date()
    const data = await getPeopleDate();
    data.sort(function(a,b) {
        let d1=new Date(a.date_of_birth);
        let d2=new Date(b.date_of_birth);
        return (d1 - d2);
    })

    result=data[index];

    let dob = new Date(result.date_of_birth);
    function age(){ 
        let year = today.getFullYear() - dob.getFullYear();
        if(dob.getMonth() > today.getMonth()) year--;
        if(dob.getMonth() === today.getMonth()) {
            if(dob.getDate() > today.getDate()) year--;
        }
        
        return year;
    }
    returnObject["first_name"]=result.first_name;
    returnObject["last_name"]=result.last_name;
    returnObject["date_of_birth"]=result.date_of_birth;
    returnObject["age"]=age();
    return returnObject;
  
}

async function peopleMetrics(){
    const data = await getPeopleDate();
    let vowelList = "aeiou";
    let consonantLists = "bcdfghjklmnpqrstvwxyz";
    let totalVowels = 0;
    let totalConsonants = 0;
    let longestNameLength;
    let shortestNameLength;
    let cityArray = [];
    let cityObject = {};
    let city;
    let mostRepeatingCity;
    let mostRepeatingCityCount = 0;
    let dob;
    let today = new Date();
    let sumOfAges = 0;
    let ageOfPerson=0;
    let returnObject = {};
    let averageAge = 0;
    let fullName;
    let longestName;
    let shortestName;
    let counter=0;


    for(let arr of data){
        lengthOfName=0;
        fullName = arr.first_name + " " + arr.last_name;
        city = arr.address.city;
        dob = new Date(arr.date_of_birth);
        ageOfPerson = 0;

        for(let fstname of arr.first_name){
            
            if(vowelList.indexOf(fstname.toLowerCase()) !== -1) totalVowels++;
            if(consonantLists.indexOf(fstname.toLowerCase()) !== -1) totalConsonants++;
            if(fstname !== " ") lengthOfName++;
        }

        for(let lstname of arr.last_name){
            if(vowelList.indexOf(lstname.toLowerCase()) !== -1) totalVowels++;
            if(consonantLists.indexOf(lstname.toLowerCase()) !== -1) totalConsonants++;
            if(lstname !== " ") lengthOfName++;
        }

        if (counter===0)
        {
            longestNameLength=lengthOfName;
            shortestNameLength=lengthOfName;
            counter++;
        }


        if (lengthOfName > longestNameLength) {
            longestNameLength = lengthOfName;
            longestName = fullName;
        }
        if (lengthOfName < shortestNameLength) {
            shortestNameLength = lengthOfName;
            shortestName = fullName;
        }

        if (city in cityObject) cityObject[city] +=1;
        else cityObject[city]=1;

        function age(){ 
            let year = today.getFullYear() - dob.getFullYear();
            if(dob.getMonth() > today.getMonth()) year--;
            if(dob.getMonth() === today.getMonth()) {
                if(dob.getDate() > today.getDate()) year--;
            }
            
            return year;
        }
        ageOfPerson = age();
        sumOfAges = sumOfAges + ageOfPerson;
    }

    //console.log(cityObject);
    cityArray = Object.values(cityObject);
    mostRepeatingCityCount = cityArray.reduce(function(a, b) {
        return Math.max(a, b);
    });
    mostRepeatingCity = Object.keys(cityObject)[Object.values(cityObject).indexOf(mostRepeatingCityCount)];
    averageAge = parseFloat((sumOfAges/data.length).toFixed(2));

    returnObject["totalLetters"]=totalVowels + totalConsonants;
    returnObject["totalVowels"]=totalVowels;
    returnObject["totalConsonants"]=totalConsonants;
    returnObject["longestName"]=longestName;
    returnObject["shortestName"]=shortestName;
    returnObject["mostRepeatingCity"]=mostRepeatingCity;
    returnObject["averageAge"]=averageAge;

    return returnObject;
    
}

module.exports={
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics,
    getPeopleDate
};