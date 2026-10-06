require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const port = 3001 || process.env.PORT;
const charRouter    = require('./routes/characters/characters');
const storyRouter   = require('./routes/story/story');

app.use(cors());

app.get('/api', (req, res) => {
    res.json({
        gradia: `${process.env['FETCH_BASE']}/gradia`,
        bsbs: `${process.env['FETCH_BASE']}/bsbs`,
        snaplands: `${process.env['FETCH_BASE']}/snaplands`,
        scalesagas:`${process.env['FETCH_BASE']}/scalesagas`
    })
})

//TAILS OF GRADIA
app.get('/api/gradia', (req, res) => {
    res.json({
        characters: `${process.env['FETCH_BASE']}/gradia/characters`,
        story: `${process.env['FETCH_BASE']}/gradia/story`});
});

app.use('/api/gradia/characters', charRouter);
app.use('/api/gradia/story', storyRouter);

//BLUE SKIES, BLACK SMOKE
app.get('/api/bsbs', (req, res) => {
    res.json({
        characters: `${process.env['FETCH_BASE']}/bsbs/characters`,
        story: `${process.env['FETCH_BASE']}/bsbs/story`});
});

app.use('/api/bsbs/characters', charRouter);
app.use('/api/bsbs/story', storyRouter);

//SOUTH OF SNAPLANDS
app.get('/api/snaplands', (req, res) => {
    res.json({
        characters: `${process.env['FETCH_BASE']}/snaplands/characters`,
        story: `${process.env['FETCH_BASE']}/snaplands/story`});
});

app.use('/api/snaplands/characters', charRouter);
app.use('/api/snaplands/story', storyRouter);

//SCALESAGAS
app.get('/api/scalesagas', (req, res) => {
    res.json({
        characters: `${process.env['FETCH_BASE']}/scalesagas/characters`,
        story: `${process.env['FETCH_BASE']}/scalesagas/story`});
});

app.use('/api/scalesagas/characters', charRouter);
app.use('/api/scalesagas/story', storyRouter);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})