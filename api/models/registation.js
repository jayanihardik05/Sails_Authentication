/**
 * Registation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string'
    },
    Email: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    city: {
      type: 'string'
    }
  },
  datastore: 'mongodb',
};

