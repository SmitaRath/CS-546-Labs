const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
let { ObjectId, ObjectID } = require('mongodb');

function validate(argument,type){
    let today = new Date();
    if(!argument) throw `One of the Sent Parameter does not contain any value`;
    if(type==='S') {    
        if(typeof argument !== 'string') throw `Sent Pararmeter ${argument} is not of string type`;
        if(argument.trim().length === 0) throw `Sent Parameter ${argument} is empty string`;
    }
    if (type==='A'){
       if (!(Array.isArray(argument))) throw `Sent Parameter cast ${argument} is not of array type`;
       if (argument.length === 0) throw `Sent Parameter cast ${argument} does not contain any element`;
       for(let arr of argument){
           if(typeof arr !== 'string') throw `Sent Parameter cast ${arr} is not of string type`;
           if (arr.trim().length===0) throw `Sent Parameter cast ${arr} is empty string`;
        }
    }

    if (type==='O'){
        let directorCount;
        let yearReleasedCount;
       if(typeof argument !== 'object') throw `Sent Parameter info is not of object type`;
       if (argument.hasOwnProperty(undefined)) throw `Sent Parameter info contains undefined`;
       if (Object.keys(argument).length !==2) throw `Sent Parameter info ${argument} doesnot contain all the information`
       for(let obj in argument){
           if (obj==="director") directorCount=1;
           if (obj==="yearReleased") yearReleasedCount=1;
       }

       if(directorCount===1 && yearReleasedCount===1){
        if (!argument.director) `Director details is not provided`;
        if (typeof argument.director !== "string") throw `Sent Parameter director ${argument.director} is not of string type`
        if (argument.director.trim().length===0) throw `Sent Parameter director ${argument.director} is not valid string`
        if (!argument.yearReleased) `Sent Parameter yearReleased details is not provided`;
        if (typeof argument.yearReleased !== 'number') throw `Sent Parameter yearReleased ${argument.yearReleased} is not of number type`;
        if (!(Number.isInteger(argument.yearReleased))) throw `Sent Parameter yearReleased ${argument.yearReleased} is not an Integer`;
        if (argument.yearReleased<1930 || argument.yearReleased>(today.getFullYear() + 5)) throw `Sent Parameter yearReleased ${argument.yearReleased} is not in the valid date range`;
       }
       else throw `Sent Parameter Info ${argument} does not contain all the information`;
    }
}

async function get(id){
    validate(id,"S");

    let parsedId = ObjectId(id);

    const moviesCollection = await movies();
    const movie = await moviesCollection.findOne({ _id:parsedId });
    if (movie === null) throw `Sent Parameter Id does not exist`;
    
    movie._id = movie._id.toString();
    return movie;
}


async function create(title, plot, rating, runtime, genre, cast, info){
    validate(title,"S");
    validate(plot,"S");
    validate(rating,"S");
    validate(runtime,"S");
    validate(genre,"S");
    validate(cast,"A");
    validate(info,"O");

    const moviesCollection = await movies();

    let modifiedCast = cast.map((obj)=>{
        obj=obj.trim();
        return obj;
    })

    info["director"]=info["director"].trim();



    let newMovie={
        title : title.trim(),
        plot : plot.trim(),
        rating : rating.trim(),
        runtime : runtime.trim(),
        genre : genre.trim(),
        cast : modifiedCast,
        info : info
    }

    const insertInfo = await moviesCollection.insertOne(newMovie);
    if (insertInfo === 0) throw `Could not add new Movie`;

    const newId = insertInfo.insertedId;
    const movie = await get(newId.toString());
    return movie;
}

async function getAll(){
    const moviesCollection = await movies();
    const allMovies = await moviesCollection.find({}).toArray();

    let modifiedAllMovies = allMovies.map((arr)=> {
        arr._id=arr._id.toString();
        return arr;
    })

    return modifiedAllMovies;
}

async function remove(id){
    validate(id,"S");
    let parsedId = ObjectId(id);
    const moviesCollection = await movies();
    const movieInfo =  await get(id);
    const deletedInfo = await moviesCollection.deleteOne({_id:parsedId});
    if (deletedInfo.deletedCount === 0) throw `Could not delete movie with id ${id}`;
    
    return `${movieInfo.title} has been successfully deleted`;
}


async function rename(id, newTitle){
    validate(id,"S");
    validate(newTitle,"S");
    let parsedId = ObjectID(id);
    const moviesCollection = await movies();
    const movieInfo =  await get(id);

    if (movieInfo.title===newTitle.trim()) {
        movieInfo._id = movieInfo._id.toString();
        return movieInfo;
    }
    else{

        const updatedInfo = await moviesCollection.updateOne({_id:parsedId},{$set:{title:newTitle.trim()}});
        if (updatedInfo.modifiedCount===0) throw `Could not update the record for ID ${id}`;
        const updatedMovieInfo =  await get(id);
        updatedMovieInfo._id = updatedMovieInfo._id.toString();
        return updatedMovieInfo;
    }
    
    
}

module.exports={
    get,
    create,
    getAll,
    remove,
    rename
}