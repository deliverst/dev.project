const mongoose = require('mongoose')
require('dotenv').config()

const { DB_DEV, DB_PROD, MODE } = process.env

const db = MODE === 'dev' ? DB_DEV : DB_PROD

mongoose.connect(db).then(async () => {
    console.log(`
    DB Name ${db}
    Mode: ${MODE}
    `)
})
