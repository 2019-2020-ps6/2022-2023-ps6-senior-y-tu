const Joi = require('joi')
const BaseModel = require('../../utils/base-model')

module.exports = new BaseModel('Theme', {
  nomTheme: Joi.string().required(),
  image: Joi.string(),
})
