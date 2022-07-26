const { dbClient } = require('../config');
const { ObjectId } = require('mongodb');

const collection = dbClient.db('forum_db').collection('questions');

async function getAllQuestions() {
  try {
    dbClient.connect();
    const questionsData = await collection.find().toArray();
    return { success: true, msg: 'Data retrieved', data: questionsData };
  } catch (err) {
    console.log('findGroups module error', err);
    throw new Error('findGroups module error');
  } finally {
    dbClient.close();
  }
}

async function addQuestion(questionData) {
  questionData.uid = ObjectId(questionData.uid);
  try {
    dbClient.connect();
    const dbres = await collection.insertOne(questionData);
    if (dbres.acknowledged) {
      const findQuestion = await collection.findOne({
        _id: dbres.insertedId,
      });
      if (findQuestion) {
        return { success: true, msg: 'Data inserted', data: findQuestion };
      }
    }
    return { success: false, msg: 'Insertion failed. Try again' };
  } catch (err) {
    console.log('addQuestion module error', err);
    throw new Error('addQuestion module error');
  } finally {
    dbClient.close();
  }
}

module.exports = { getAllQuestions, addQuestion };
