const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const PORT = 3000

const routes = require('./routes')

const usePassport = require('./config/passport')

const passport = require('passport')
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))



usePassport(app)




app.use(routes)

app.listen(PORT, (req, res) => {
  console.log(`running on http://localhost:${PORT}`)
})