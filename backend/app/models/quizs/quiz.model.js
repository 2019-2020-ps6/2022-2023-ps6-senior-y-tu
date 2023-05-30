const Joi = require('joi')
const BaseModel = require('../../utils/base-model')

module.exports = new BaseModel('Quiz', {
  nom: Joi.string().required(),
  image: Joi.string(),
  themeId: Joi.number().required(),
})
