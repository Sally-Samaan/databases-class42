const {MongoClient} = require('mongodb');

async function main(){

////connect to mongodb

    const uri = "mongodb+srv://sallySamaan:Ph*********@clustersally.n10bcxh.mongodb.net/?retryWrites=true&w=majority";
    /// mongosh "mongodb+srv://clustersally.n10bcxh.mongodb.net/myFirstDatabase" --apiVersion 1 --username sallySamaan
    const client = new MongoClient(uri);
    try{
        await client.connect();


////create documents

        // await listDatabases(client);

        // await createListing(client,{
        //     name: "Loft",
        //     summary:"A charming loft in Groningen",
        //     bedrooms:2,
        //     bathrooms:1
        // })


        // await createMultipleListings(client,[{
        //     name: "Loft",
        //     summary:"A charming loft in Groningen",
        //     bedrooms:2,
        //     bathrooms:1
        // },
        // {
        //     name: "Apartment",
        //     summary:"A charming apartment building in Paris",
        //     bedrooms:1,
        //     bathrooms:1
        // },
        // {
        //     name: "Country House",
        //     summary:"A House in the county side in Germany",
        //     bedrooms:6,
        //     bathrooms:3,
        //     beds:10
        // },
        // {
        //     name: "boat",
        //     summary:"A boat house in the center of Amsterdam",
        //     bedrooms:1,
        //     bathrooms:1,
        //     moveable:"No"
        // }]);

////read documents
        // await findOneListingByName(client, "boat");

        // await findListingsWithMinBedroomsBathrooms(client,{
        //     minimumNumberOfBedrooms: 4,
        //     minimumNumberOfBathrooms:2,
        //     maximumNumberOfResults: 5
        // });

////update one
// await updateListingByName(client, "boat", {
//     bedrooms: 3,
//     beds: 6});


////upsert one
// await upsertListingByName(client, "Cozy Cottage", {
//     name: "Cozy Cottage",
//     bedrooms: 2,
//     bathrooms:2
// });


/////update many
await updateAllListingsToHavePropertyType(client);

    } catch(e){
        console.error(e);
//////close connection
    } finally{
        await client.close();
    }

};

main().catch(console.error);

////update many
async function updateAllListingsToHavePropertyType(client) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany(
    {property_type: {$exists: false}},
     {$set: { property_type: "Unknown"}});
     console.log(`${result.matchedCount} document(s) matched the query criteria`);
     console.log(`${result.modifiedCount} document(s) was/were updated`);
};


/////upsert find and insert (even if not found it will be inserted)
async function upsertListingByName(client, nameOfListing, updatedListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({
        name: nameOfListing}, {$set: updatedListing}, {upsert: true}); 
        console.log(`${result.matchedCount} document(s) matched the query criteria`);
       if(result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId}`);
       }else{
        console.log(`${result.modifiedCount} document(s) was/were updated`);
       }
};




////update one
async function updateListingByName(client, nameOfListing, updatedListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({
        name: nameOfListing}, {$set: updatedListing}); 

        console.log(`${result.matchedCount} document(s) matched the query criteria`);
        console.log(`${result.modifiedCount} document(s) was/were updated`);
}


//////find multiple
async function findListingsWithMinBedroomsBathrooms(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({
        bedrooms: {$gte:minimumNumberOfBedrooms},
        bathrooms: {$gte: minimumNumberOfBathrooms}
    }).sort({last_review: -1}).limit(maximumNumberOfResults);

    const results = await cursor.toArray();
    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms}bathrooms:`);
        results.forEach((result, i) => {
            date = new Date(result.last_review).toDateString();
            console.log();
            console.log(`${i + 1}.name: ${result.name}`);
            console.log(` _id: ${result._id}`);
            console.log(`bedrooms: ${result.bedrooms}`);
            console.log(`bathrooms: ${result.bathrooms}`);
            console.log(`most recent review date: ${new Date(result.last_review).toDateString()}`);
        });
    }else{
        console.log(`No listings found`);
    }
};

/////find one
async function findOneListingByName(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
    .findOne({name:nameOfListing});
    if(result) {
        console.log(`Found a listing in the collection with the name ${nameOfListing}`);
        console.log(result);
    }else{
        console.log(`No listing found with the name ${nameOfListing}`);
    }
};

////create multiple
async function createMultipleListings(client, newListings){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

    console.log(`${result.insertedCount} new listings created with the following id(s):`);
    console.log(result.insertedIds);

};

////create one
async function createListing(client, newListing) {
   const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

   console.log(`New listing created with the following id: ${result.insertedId}`);

};


/////list of data
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
console.log("Databases:");
databasesList.databases.forEach(db => {
    console.log(`-${db.name}`);
});
};



