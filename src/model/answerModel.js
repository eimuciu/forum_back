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

async function addAnswer(answerData) {
  answerData.uid = ObjectId(answerData.uid);
  answerData.qid = ObjectId(answerData.qid);
  try {
    await dbClient.connect();
    const dbres = await collection.insertOne(answerData);
    if (dbres.acknowledged) {
      const findAnswer = await collection.findOne({
        _id: dbres.insertedId,
      });
      if (findAnswer) {
        return { success: true, msg: 'Data inserted', data: findAnswer };
      }
    }
    return { success: false, msg: 'Insertion failed. Try again' };
  } catch (err) {
    console.log('addAnswer module error', err);
    throw new Error('addAnswer module error');
  } finally {
    await dbClient.close();
  }
}

module.exports = {
  getAnswersByQuestion,
  addAnswer,
};
