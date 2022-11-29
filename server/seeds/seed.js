const db = require('../config/connection');
const { User, Campaign, Location, Character } = require('../models')

const userData = require('./userData.json')
const campaignData = require('./campaignData.json')
const locationData = require('./locationData.json')
const characterData = require('./characterData.json')
db.once('open', async () => {
    //we want to clear all data out before seeding new data(for testing purposes only)
    await User.deleteMany({})
    await Campaign.deleteMany({})
    await Location.deleteMany({})
    await Character.deleteMany({})

    //bulk create everything, must be create or else the passwords will not be encrypted
    const users = await User.create(userData)
    const campaigns = await Campaign.create(campaignData)
    const locations = await Location.create(locationData)
    const characters = await Character.create(characterData)

    for (newCampaign of campaigns) {
        const tempUser = users[Math.floor(Math.random() * users.length)];
        tempUser.campaigns.push(newCampaign._id)
        await tempUser.save()
    }
    for (newLocation of locations) {
        const tempCampaign = campaigns[Math.floor(Math.random() * campaigns.length)];
        tempCampaign.locations.push(newLocation._id)
        await tempCampaign.save()
    }

    for (newCharacter of characters) {
        const tempLocation = locations[Math.floor(Math.random() * locations.length)];
        tempLocation.characters.push(newCharacter._id)
        await tempLocation.save()
    }
    console.log('all done!');
    process.exit(0);
});
