const joi = require('joi');
const { reformatError } = require('../utils/errorFormatter');

const questionsschema = joi
  .object({
    title: joi.string().trim().required(),
    body: joi.string().trim().required(),
    isRead: joi.boolean().required(),
    isEdited: joi.boolean().required(),
    uid: joi.string().trim().required(),
  })
  .options({ abortEarly: false });

// const groupsschema = joi
//   .object({
//     name: joi.string().trim().required(),
//   })
//   .options({ abortEarly: false });

async function validateData(req, res, next) {
  const { baseUrl } = req;
  try {
    let data = req.body;
    if (baseUrl === '/questions') {
      data = await questionsschema.validateAsync(data);
    }
    // if (baseUrl === '/groups') {
    //   data = await groupsschema.validateAsync(data);
    // }
    req.body = data;
    next();
  } catch (err) {
    res.status(400).json(reformatError(err));
  }
}

module.exports = { validateData };
