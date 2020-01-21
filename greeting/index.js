const express = require('express')
const app = express()

const port = 80
const messages = [{
    message: "Hey! What is your name?"
}]

const errorMessage = []

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (request, response) => {
    
    response.render('index', { messages, errorMessage })
})

app.post('/greet', (request, response) => {
    const body = request.body
    const name = body.name

    if (!name) {
        const msg = "The name must be provided."
        errorMessage.push(msg)
    } else {
        const message = `Well, Hello, ${name}!`
        const checks = "Is this correct name? If not, Try again...)"
        messages.push({ message, checks })
    }

    response.redirect('/')
})

app.listen(port, () => console.log(`The Greeting is listening on port ${port}.`))
