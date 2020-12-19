const dbConnection = require('./config/mongoConnection');

const main = async () =>   
{
    const db = await dbConnection();

    try {
      await db.collection('books').drop();
      await db.collection('reviews').drop();
    } catch (e) {

    }

    const bookCollection = await db.collection('books');
    const reviewCollection = await db.collection('reviews');

const addBook = function (title, author, genre, datePublished, summary) {
    console.log(author);
    return {
      title: title,
      author: author,
      genre: genre,
      datePublished: datePublished,
      summary: summary,
      reviews :[]
    };
  };

  const addReview = function (title, reviewer, bookBeingReviewed, rating, dateOfReview, review) {
    return {
      title: title,
      reviewer: reviewer,
      bookBeingReviewed: bookBeingReviewed,
      rating: rating,
      dateOfReview: dateOfReview,
      review: review
    }
};

const listOfbooks = [];
const listofReviews = [];

const book1 = addBook("To Kill a Mockingbird", {authorFirstName:"Harper", authorLastName:"Lee"},
["Bildungsroman", "Thriller", "Southern Gothic","Domestic Fiction","Legal Story"],
new Date(1960,07,11),
"To Kill a Mockingbird by Harper Lee centres on Atticus Finch's attempts to prove the innocence of Tom Robinson, a black man who has been wrongly accused of raping a white woman in 1930s Alabama."
);

const addedbook1 = await bookCollection.insertOne(book1);
console.log(addedbook1.insertedId);

const book2 = addBook("The Girl with the Dragon Tattoo",{authorFirstName:"Stieg",authorLastName:"Larsson"},
["Mystery","Crime Fiction","Suspense","Thriller", "Nordic noir"],
new Date(2005,08,08),
"This English-language adaptation of the Swedish novel by Stieg Larsson follows a disgraced journalist, Mikael Blomkvist (Daniel Craig), as he investigates the disappearance of a wealthy patriarch's niece from 40 years ago. He is aided by the pierced, tattooed, punk computer hacker named Lisbeth Salander (Rooney Mara)."
);

const addedbook2 = await bookCollection.insertOne(book2);

const reviewer1 = addReview("To Kill a Mockingbird","Tom",addedbook1.insertedId.toString(),4,new Date(2020,10,14),"Good");
const reviewer2 = addReview("To Kill a Mockingbird","Tim",addedbook1.insertedId.toString(),4,new Date(2020,10,14),"fair");
const reviewer3 = addReview("To Kill a Mockingbird","Bob",addedbook1.insertedId.toString(),4,new Date(2020,10,14),"Nice");

const reviewer4 = addReview("The Girl with the Dragon Tattoo","Tom",addedbook2.insertedId.toString(),4,new Date(2020,10,14),"Good");
const reviewer5 = addReview("The Girl with the Dragon Tattoo","Tim",addedbook2.insertedId.toString(),4,new Date(2020,10,14),"fair");
const reviewer6 = addReview("The Girl with the Dragon Tattoo","Bob",addedbook2.insertedId.toString(),4,new Date(2020,10,14),"Nice");

listofReviews.push(reviewer1,reviewer2,reviewer3,reviewer4,reviewer5,reviewer6);
await reviewCollection.insertMany(listofReviews);

const book1Reviewers = await reviewCollection.find({bookBeingReviewed : addedbook1.insertedId.toString()},{projection: {_id:1}}).toArray();

let book1ReviewersArray = [];
for(let rev of book1Reviewers){
    book1ReviewersArray.push(rev._id.toString());
}

const book2Reviewers = await reviewCollection.find({bookBeingReviewed : addedbook2.insertedId.toString()},{projection: {_id:1}}).toArray();

let book2ReviewersArray = [];
for(let rev of book2Reviewers){
    book2ReviewersArray.push(rev._id.toString());
}

await bookCollection.updateOne({_id : addedbook1.insertedId},{$set :{reviews : book1ReviewersArray}});
await bookCollection.updateOne({_id : addedbook2.insertedId},{$set :{reviews : book2ReviewersArray}});


await db.serverConfig.close();
}

main().catch(console.log);