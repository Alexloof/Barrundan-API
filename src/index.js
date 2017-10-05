import app from './app'

// Default to port 8080 if not defined in .env
const { PORT = 8080 } = process.env
app.listen(PORT, () => console.log(`Serving Beer on port ${PORT}`))


