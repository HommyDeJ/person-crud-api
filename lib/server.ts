import app from "./app";
import * as path from 'path';
import * as express from "express";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})