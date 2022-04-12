'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  // 1st arg: first arg is the table name
  // 2nd arg: options object
  return db.createTable('brands', {
    'id': {
      'type':'int',
      'autoIncrement':true,
      'primaryKey': true,
      'unsigned':true
    },
    'name': {
      'type':'string',
      'length': 200,
      'notNull': true,
    },
    'description': {
      'type':'text',
      'notNull':true
    }

  })
};

exports.down = function(db) {
  return db.dropTable('brands');
};

exports._meta = {
  "version": 1
};
