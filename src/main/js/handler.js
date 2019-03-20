'use strict';

const pg = require('pg');
const Entry = require('./models/Entry');

/**
 * @return All top level entries.
 */
module.exports.entries = async (event, context, callback) => {
  const results = await Entry.findAll({
    where: {
      parent_id: null
    }
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify({
      results: results,
    }),
  };
};

/**
 * @return All responses for a particular entry.
 */
module.exports.responses = async (event, context, callback) => {
  const id = event.pathParameters.id;
  const results = await Entry.findAll({
    where: {
      parent_id: id
    }
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify({
      results: results,
    }),
  };
};

/**
 * Adds a top level entry. Or, a response if responding to an entry.
 */
module.exports.addEntry = async (event, context, callback) => {
  const parentId = event.pathParameters && event.pathParameters.id ? event.pathParameters.id : null;
  const data = JSON.parse(event.body);

  const result = await Entry.build({
    username: data.username || "Anonymous",
    city: data.city,
    text: data.text,
    parent_id: parentId
  }).save();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify({
      status: 'success',
      result: result,
    }),
  };
};

