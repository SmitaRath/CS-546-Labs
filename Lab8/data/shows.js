const axios = require("axios");

async function getShows(searchTerm){
    const {data} = await axios.get("http://api.tvmaze.com/search/shows?q="+searchTerm);
    const returnList = data.slice(0,20);
    return returnList;

}

async function getShowById(id){
    const {data} = await axios.get(" http://api.tvmaze.com/shows/"+id);
    return data;

}

module.exports={
    getShows,
    getShowById
}