const movie = require("./data/movies");
const connection = require("./config/mongoConnection");
const { get } = require("./data/movies");

async function main(){
    let newMovie1={};
    try{
        console.log("Creating First movie");
        newMovie1 = await movie.create("Titanic","James Cameron's Titanic is an epic, action-packed romance set against the ill-fated maiden voyage of the R.M.S. Titanic; the pride and joy of the White Star Line and, at the time, the largest moving object ever built. She was the most luxurious liner of her era -- the ship of dreams -- which ultimately carried over 1,500 people to their death in the ice cold waters of the North Atlantic in the early hours of April 15, 1912.",
        "7.8","2:00","  Romantic  ",["Leonardo Dicaprio","kate Winslet"],
                                         {director: "James Cameron", yearReleased: 1997});
        console.log(`${newMovie1.title} successfully created`);
        const logMovie1 = await movie.get(newMovie1._id);
        console.log("Logging first movie");
        console.log(logMovie1);
    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    }

    let newMovie2;
    try{
        console.log("Creating second movie");
        newMovie2 = await movie.create("Gravity","Dr. Ryan Stone (Sandra Bullock) is a medical engineer on her first shuttle mission. Her commander is veteran astronaut Matt Kowalsky (George Clooney), helming his last flight before retirement. Then, during a routine space walk by the pair, disaster strikes: The shuttle is destroyed, leaving Ryan and Matt stranded in deep space with no link to Earth and no hope of rescue. As fear turns to panic, they realize that the only way home may be to venture further into space.",
        "7.7","2:00","Science Fiction  ",["George Clooney","Sandra Bullock"],
                                         {director: "Alfonso Cuaron", yearReleased: 2013});
        console.log(`${newMovie2.title} successfully created`);

    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    }

    try{
        console.log("Logging all movies");
        const allMovies = await movie.getAll();
        console.log(allMovies);
    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    }

    let newMovie3={};
    try{
        console.log("Creating third movie");
        newMovie3 = await movie.create("Constantine","As a suicide survivor, demon hunter John Constantine (Keanu Reeves) has literally been to hell and back -- and he knows that when he dies, he's got a one-way ticket to Satan's realm unless he can earn enough goodwill to climb God's stairway to heaven. While helping policewoman Angela Dodson (Rachel Weisz) investigate her identical twin's apparent suicide, Constantine becomes caught up in a supernatural plot involving both demonic and angelic forces. Based on the DC/Vertigo Hellblazer comics.",
        "7","2:00","  Dark Fantasy  ",["keeanu Reeves","Rachel Weisz"],
                                         {director: "Francis Lawrence", yearReleased: 2005});
        
        console.log(`${newMovie3.title} successfully created`);
        const logMovie3 = await movie.get(newMovie3._id);
        console.log("Logging third movie");
        console.log(logMovie3);
     
    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    }

    try{
        console.log("Updating title for first movie");
        const updateMovie = await movie.rename(newMovie1._id,"ill-fated maiden voyage");
        console.log("Title successfully updated for first movie");
        const logMovie4 = await movie.get(updateMovie._id);
        console.log("Logging updated details of first movie");
        console.log(logMovie4);
    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    } 


    try{
        const deleteMovie1 = await movie.remove(newMovie2._id);
        console.log(deleteMovie1);
    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    }

    try{
        console.log("Logging all movies");
        const allMovies1 = await movie.getAll();
        console.log(allMovies1);
    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    } 


    //case with invalid input for creating movie
    try{
        const newMovie4 = await movie.create("fhgfh","Magic ","7.8","2:00","  Romantic  ",["gh"],
                                         {director:5, yearReleased:1940.2});
        console.log(newMovie4);
        
    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    }

   //removing a movie that does not exist
    try{
        const deleteMovie2 = await movie.remove(newMovie2._id);
        console.log(deleteMovie2);
    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    }

    //renaming a movie that does not exist
    try{
        const updateMovie2 = await movie.rename(newMovie2._id,"New title");
        console.log(updateMovie2);
    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    }

    //renaming a movie by passing invalid parameters
    try{
        const updateMovie3 = await movie.rename(newMovie1._id,"");
        console.log(updateMovie3);
    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    }

    //getting a movie that does not exist
    try{
        const getMovie = await movie.get(newMovie2._id);
        console.log(getMovie);
    }
    catch(e){
        if(e.message != null) console.log(e.message);
        else console.log(e);
    }
    
 

    const db = await connection();
    await db.serverConfig.close();
    
}



main()