const { MongoClient, ServerApiVersion } = require("mongodb");

const { seedDatabase } = require("./seedDatabase.js");

require('dotenv').config();

async function createEpisodeExercise(client, newEpisode) {
  const result = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .insertOne(newEpisode);

  // Write code that will add this to the collection!

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client,
  S00E00,
  episodeTitle,
  episodeElement,
  secondEpisodeElement,) {
    const titleResult = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ episode: S00E00 });
      // Find the title of episode 2 in season 2 [Should be: WINTER SUN]

  console.log(`The title of episode 2 in season 2 is ${titleResult.title}`);
  
  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]
  const seasonAndEpisodeResult = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ title: episodeTitle });

   console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${seasonAndEpisodeResult.episode}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]
  const episodeTitlesResult = await client
  .db('databaseWeek3')
  .collection('bob_ross_episodes')
  .find({ elements: episodeElement });

const resultArray = await episodeTitlesResult.toArray();

  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${resultArray.map(
      (episode) => {
        return episode.title;
      },
    )}`,
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]
  const secondEpisodeTitlesResult = await client
  .db('databaseWeek3')
  .collection('bob_ross_episodes')
  .find({ elements: episodeElement, elements: secondEpisodeElement });

const secondResultArray = await secondEpisodeTitlesResult.toArray();

  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${secondResultArray.map(
      (episode) => episode.title,
    )}`,
  );
}

async function updateEpisodeExercises(client,
  episodeToUpdate,
  updatedTitle,
  elementToUpdate,
  updatedElement,) {
    const updateEpisodeTitle = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .updateOne({ episode: episodeToUpdate }, { $set: updatedTitle });
  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that

  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updateEpisodeTitle.modifiedCount} episodes`
  );

  const updateEpisodeElements = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .updateMany({ elements: elementToUpdate }, { $set: updatedElement });
  
  // It should update 120 episodes!

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateEpisodeElements.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(client, episodeToDelete) {
  const deleteEpisode = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .deleteOne({ episode: episodeToDelete });

  console.log(
    `Ran a command to delete episode and it deleted ${deleteEpisode.deletedCount} episodes`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    const newEpisode = {
      episode: 'S09E13',
      title: 'MOUNTAIN HIDE-AWAY',
      elements: [
        'CIRRUS',
        'CLOUDS',
        'CONIFER',
        'DECIDIOUS',
        'GRASS',
        'MOUNTAIN',
        'MOUNTAINS',
        'RIVER',
        'SNOWY_MOUNTAIN',
        'TREE',
        'TREES',
      ],
    };

    const S00E00 = 'S02E02';
    const episodeTitle = 'BLACK RIVER';
    const episodeElement = 'CLIFF';
    const secondEpisodeElement = 'LIGHTHOUSE';
    const episodeToUpdate = 'S30E13';
    const updatedTitle = { title: 'BLUE RIDGE FALLS' };
    const elementToUpdate = 'BUSHES';
    const updatedElement = { elements: 'BUSH' };
    const episodeToDelete = 'S31E14';


    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client,
      S00E00,
      episodeTitle,
      episodeElement,
      secondEpisodeElement,);

    // UPDATE
    await updateEpisodeExercises(client,
      episodeToUpdate,
      updatedTitle,
      elementToUpdate,
      updatedElement,);

    // DELETE
    await deleteEpisodeExercise(client, episodeToDelete);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
