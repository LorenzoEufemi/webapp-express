
const express = require("express");
const handlerErrors = require("./middlewares/handlerErrors");
const moviesRouter = require("./routers/movies");
const notFoundRoute = require("./middlewares/notFoundRoute");

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.static("public"));//rende accessibili images a tutti

app.use("/movies", moviesRouter);//includo tutte le rotte dei movies con prefisso /movies

app.use(notFoundRoute);//gestisce rotte non valide

app.use(handlerErrors);//gestisce handler error


app.listen(port,() => { // per aprire il server
    console.log(`Il server è partito al ${port} port`)
});
