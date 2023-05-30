const Joi = require('joi')
const BaseModel = require('../../utils/base-model')

module.exports = new BaseModel('Question', {
  intitule: Joi.string().required(),
  image: Joi.string(),
  reponses: Joi.array(),
  quizId: Joi.number().required(),
})
