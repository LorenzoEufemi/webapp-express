
const express = require("express");
const handlerErrors = require("./middlewares/handlerErrors");
const moviesRouter = require("./routers/movies");
const notFoundRoute = require("./middlewares/notFoundRoute");
const cors = require("cors");

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.static("public"));//rende accessibili images a tutti

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use("/movies", moviesRouter);//includo tutte le rotte dei movies con prefisso /movies



app.use(handlerErrors);//gestisce handler error

app.use(notFoundRoute);//gestisce rotte non valide

app.listen(port, () => { // per aprire il server
    console.log(`Il server è partito al ${port} port`)
});
