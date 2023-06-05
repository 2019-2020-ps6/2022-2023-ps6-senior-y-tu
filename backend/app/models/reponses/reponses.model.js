const Joi = require('joi')
const BaseModel = require('../../utils/base-model')

module.exports = new BaseModel('Reponse', {
  id: Joi.string().required(),
  valeur: Joi.string(),
  estCorrect: Joi.boolean(),
})
