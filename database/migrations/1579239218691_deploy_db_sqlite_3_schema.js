'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeployDbSqlite3Schema extends Schema {
  up () {
    this.create('deploy_db_sqlite_3_s', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('deploy_db_sqlite_3_s')
  }
}

module.exports = DeployDbSqlite3Schema
