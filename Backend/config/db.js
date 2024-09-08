const express = require('express')
const { router } = require('../server')
const Pool = require('pg').Pool

const pool = new Pool({
  user: "master",
  password: "forgetful,22GI",
  database: "paw_data0",
  host: "pawdata-1.cfpdutaeje6v.us-east-2.rds.amazonaws.com",
  port: "5432"
})

module.exports = pool