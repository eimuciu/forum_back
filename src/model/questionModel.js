const { dbClient } = require('../config');
const { ObjectId } = require('mongodb');

const collection = dbClient.db('forum_db').collection('questions');

async function getAllQuestions() {
  try {
    await dbClient.connect();
    const questionsData = await collection.find().toArray();
    return { success: true, msg: 'Data retrieved', data: questionsData };
  } catch (err) {
    console.log('findGroups module error', err);
    throw new Error('findGroups module error');
  } finally {
    await dbClient.close();
  }
}

async function addQuestion(questionData) {
  questionData.uid = ObjectId(questionData.uid);
  try {
    await dbClient.connect();
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
    await dbClient.close();
  }
}

async function deleteQuestion(qId) {
  try {
    await dbClient.connect();
    const delres = await collection.deleteOne({ _id: ObjectId(qId) });
    if (delres.deletedCount === 1) {
      return { success: true, msg: 'Question deleted' };
    }
    return { success: false, msg: 'Deletion failed' };
  } catch (err) {
    console.log('deleteQuestion module error', err);
    throw new Error('deleteQuestion module error');
  } finally {
    await dbClient.close();
  }
}

async function updateQuestion(questionData, qId) {
  try {
    await dbClient.connect();
    const updateres = await collection.updateOne(
      { _id: ObjectId(qId) },
      {
        $set: {
          ...questionData,
        },
      },
    );
    if (updateres.modifiedCount === 1 && updateres.matchedCount === 1) {
      return { success: true, msg: 'Question updated' };
    }
    return { success: false, msg: 'Update failed' };
  } catch (err) {
    console.log('updateQuestion module error', err);
    throw new Error('updateQuestion module error');
  } finally {
    await dbClient.close();
  }
}

module.exports = {
  getAllQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
};
