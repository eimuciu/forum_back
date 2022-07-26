const { dbClient } = require('../config');
const { ObjectId } = require('mongodb');

const collection = dbClient.db('forum_db').collection('answers');

async function getAnswersByQuestion(qId) {
  try {
    await dbClient.connect();
    const answersData = await collection.find({ qid: ObjectId(qId) }).toArray();
    return { success: true, msg: 'Data retrieved', data: answersData };
  } catch (err) {
    console.log('getAnswersByQuestion module error', err);
    throw new Error('getAnswersByQuestion module error');
  } finally {
    await dbClient.close();
  }
}

module.exports = {
  getAnswersByQuestion,
};
