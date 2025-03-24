const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const colors = require('./UI/colors/colors');

const configPath = path.join(__dirname, 'config.json');

let config = {};
try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    console.log("Config file contents:", config);
} catch (err) {
    console.error("Failed to read config.json:", err);
}

const uri = config.mongodbUri || process.env.MONGODB_URI;
console.log("MongoDB URI:", uri);

if (!uri) {
    throw new Error("MongoDB URI is not defined. Please set it in config.json or as an environment variable.");
}

const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('\n' + '─'.repeat(40));
        console.log(`${colors.magenta}${colors.bright}🕸️  DATABASE CONNECTION${colors.reset}`);
        console.log('─'.repeat(40));
        console.log('\x1b[36m[ DATABASE ]\x1b[0m', '\x1b[32mConnected to MongoDB ✅\x1b[0m');
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
}

const db = client.db("discord-bot");

const ticketsCollection = db.collection("tickets");
const voiceChannelCollection = db.collection("voiceChannels");
const centralizedControlCollection = db.collection("centralizedControl"); 
const nqnCollection = db.collection("nqn");
const welcomeCollection = db.collection("welcomeChannels");
const autoroleCollection = db.collection("autorolesetups");
const hentaiCommandCollection = db.collection("hentailove");
const serverConfigCollection = db.collection("serverconfig");
const reactionRolesCollection = db.collection("reactionRoles");
const antisetupCollection = db.collection("antisetup");
const anticonfigcollection = db.collection("anticonfiglist");
const afkCollection = db.collection('afk');
const giveawayCollection = db.collection("giveaways");
const notificationsCollection = db.collection("notifications");
const logsCollection = db.collection("logs");
const nicknameConfigs = db.collection("nicknameConfig");
const economyCollection = db.collection("economy");
const usersCollection = db.collection('users');
const epicDataCollection = db.collection('epicData');
const customCommandsCollection = db.collection('customCommands');
const birthdayCollection = db.collection('birthday');
const applicationCollection = db.collection('applications');
const serverLevelingLogsCollection = db.collection('serverLevelingLogs');
const commandLogsCollection = db.collection('commandLogs');
const reportsCollection = db.collection('reports');
const stickyMessageCollection = db.collection('stickymessages');
const serverStatsCollection = db.collection('serverStats');
const autoResponderCollection = db.collection('autoResponder');
const playlistCollection = db.collection('lavalinkplaylist');
const autoplayCollection = db.collection('autoplaylavalink');
const embedCollection = db.collection('aioembeds');
const countingCollection = db.collection('countingame');

async function saveGiveaway(giveaway) {
    try {
        await giveawayCollection.updateOne(
            { messageId: giveaway.messageId },
            { $set: giveaway },
            { upsert: true }
        );
        console.log("Giveaway saved successfully");
    } catch (err) {
        console.error("Error saving giveaway:", err);
    }
}

async function getGiveaways() {
    try {
        return await giveawayCollection.find().toArray();
    } catch (err) {
        console.error("Error fetching giveaways:", err);
        return [];
    }
}

async function deleteGiveaway(messageId) {
    try {
        await giveawayCollection.deleteOne({ messageId });
        console.log("Giveaway deleted successfully");
    } catch (err) {
        console.error("Error deleting giveaway:", err);
    }
}

module.exports = {
    connectToDatabase,
    ticketsCollection,
    voiceChannelCollection,
    centralizedControlCollection,
    nqnCollection,
    welcomeCollection,
    giveawayCollection,
    saveGiveaway,
    getGiveaways,
    deleteGiveaway,
    autoroleCollection,
    hentaiCommandCollection,
    serverConfigCollection,
    reactionRolesCollection,
    antisetupCollection,
    notificationsCollection,
    anticonfigcollection,
    afkCollection,
    logsCollection,
    nicknameConfigs,
    usersCollection,
    epicDataCollection,
    customCommandsCollection,
    economyCollection,
    birthdayCollection,
    applicationCollection,
    serverLevelingLogsCollection,
    commandLogsCollection,
    reportsCollection,
    stickyMessageCollection,
    serverStatsCollection,
    autoResponderCollection,
    playlistCollection,
    autoplayCollection,
    embedCollection,
    countingCollection,
};
