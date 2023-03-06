const express = require("express")
const app = express()
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
/**
 * cors => Middleware enables cross origin resourse sharing by adding http header
 * express.json() => parses in incoming responses to json
 * helmet => heprotects your application from common vulnerabilities
 * morgan => enables you to get response from about a request like the usersInfo Location
 */
app.use(cors)
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))

const port = 5000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})