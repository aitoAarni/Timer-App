import app from "./app"


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
    console.log('http://localhost:3000/')
})
