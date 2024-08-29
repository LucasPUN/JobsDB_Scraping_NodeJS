import express from 'express';
import logger from 'morgan';
import {jobDetailRouter} from "./routes/JobDetailsRouter.js"
import bodyParser from "body-parser";
import {jobCountRouter} from "./routes/JobCountRouter.js";

const app = express();

// const port = 3000;
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.use(logger('dev'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/v1", jobDetailRouter);
app.use("/v1", jobCountRouter);

function onServerStart() {
    console.log(`Server started on port ${port}`)
}

app.listen(3000);