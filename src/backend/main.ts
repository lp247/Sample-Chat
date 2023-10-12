import express from 'express';
import path from 'path';
import {answer} from './chat';

const app = express();

app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use(express.text());

app.post("/chat", (req, res) => {
    res.send(answer(req.body));
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

