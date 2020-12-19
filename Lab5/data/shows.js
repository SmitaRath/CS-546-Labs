const { default: Axios } = require("axios");

async function validate(argument){
    //try{
    if (!argument) throw `Sent Parameter ${argument} is empty`;
    if (typeof argument ==="string")
    {
        if (!(argument.match(/$\d$/))) 
        {
            throw `Sent Parameter ${argument} is not of number type`;
        }
    }
    else{
        if (typeof argument !== "number") throw `Sent Parameter ${argument} is not of number type`;
        if (!(Number.isInteger(argument))) throw `Sent parameter ${argument} is not an Integer`;
    }
/*}
catch(error){
    throw error;
}*/
}

async function getShows(){
    const { data } = await Axios.get("http://api.tvmaze.com/shows");
    return data;
}

async function getShowById(id){
   // try{
    validate(id);
    const { data } = await Axios.get("http://api.tvmaze.com/shows/"+id);

    if(data != null) return data;
    else throw `${id} is not available`;
    }
   /* catch{
        throw `Search operation is not successful`;
    } */
    


function aboutMe(){
    let aboutMeText = {
        "name": "Smita Rath",
        "cwid": "10458082",
        "biography": "I am a Computer Science Master's Student at Stevens Institute Of Technology. I have done my undergraduate in Information Technology and previously worked in Oracle and TCS. My favourite programming language is Java and I like to solve challenging problems.\n Apart from this I love to do crafting, exploring new places and dancing. In the beginning of 2020, I visited some beautiful cities in Spain including Barcelona where I visited La Sagrada Familia designed by Antoni Gaudi which is one of the greatest architecural marvel I have seen in my entire life.",
        "favoriteShows": ["Breaking Bad", "Narcos","Friends","Jack Ryan"]
    }

    return aboutMeText;
}

module.exports={
    getShows,
    getShowById,
    aboutMe
}