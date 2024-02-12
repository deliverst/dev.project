const express = require('express')
const app = express()
require('./db/db')
const bodyParse = require('body-parser')
const userModel = require('./models/users')
const cors = require('cors')

app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())
app.use(cors())
// const modelUser = require('./d')

app.get('/', (req, res) => {
    res.status(200).send({ message: "its alive 🐈" })
})


app.get('/user', async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (e) {
        console.log(e.message)
    }
})

app.get('/user/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    const user = await userModel.findById(id)
    console.log(user)
    res.send({ message: "holi" })
})

app.post('/user', async (req, res) => {
    const { email, password } = req.body

    const user = await new userModel({ email, password })
    await user.save()

    res.status(200).send(user)
})

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    await userModel.findByIdAndDelete(id)
    res.send({ message: 'user deleted' })

})

app.put('/user/:id', (req, res) => {

})


app.listen(3000, () => {
    console.log("server running in port 3000")
})