const express = require("express")
const path = require("path")
const chalk = require("chalk")
const bodyParser = require("body-parser")
const helmet = require("helmet")

const app = express()

console.log("Starting Server")

// Middlewares
app.use(helmet())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// Webpack
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackConfig = require("../webpack.config.js")(true)
const compiler = webpack(webpackConfig)
const devMiddleWareInstance = webpackDevMiddleware(
  compiler,
  Object.assign({
    noInfo: false,
    stats: {
      colors: true
    },
    lazy: false,
    serverSideRender: false,
    publicPath: webpackConfig.output.publicPath
  })
)
app.use(devMiddleWareInstance)
app.use(
  require("webpack-hot-middleware")(compiler, {
    log: console.log,
    reload: true
  })
)

// Static Files
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "../dist")))

app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

// Routes
app.use("/", (req, res) => {
  res.render("index")
})

// Start Server
app.listen(2771, () => {
  console.log(chalk.cyan(`+++ Web server up at http://localhost:${2771}`))
})
