const PORT = 8000
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY
const LLM_URL = `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${API_KEY}`

app.get('/prompt/:text', async(req,res) => {
    const text = req.params.text
    
    const payload = {
        prompt: {"messages": [{"content": text}]},
        temperature: 0.1,
        candidate_count: 1,
    }

    const response = await fetch(LLM_URL, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        method: "POST",
    })
    const data = await response.json();
    res.send(data)
})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})