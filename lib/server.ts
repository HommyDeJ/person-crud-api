import app from "./app";
import * as path from 'path';
import * as express from "express";

const PORT = 3000;

app.use(express.static(__dirname + '../front-end/dist/front-end'));

app.get('/*', function(req,res) {
 
res.sendFile(path.join(__dirname+'/dist/pokedex/index.html'));
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})