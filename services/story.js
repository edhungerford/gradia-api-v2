const Database  = require('better-sqlite3');
const db        = new Database('gradia');

function getAll(database) {
    let db = new Database(database);
    const results = db.prepare('SELECT recap.id, title, story, stinger, acts.act FROM recap JOIN acts ON recap.act=acts.id').all();
    results.forEach(row => {
        let features = db.prepare(`SELECT appearances.id AS appearance_id, characters.id AS character_id, * FROM appearances JOIN characters ON appearances.character=characters.id WHERE appearances.session=${row.id}`).all()
        results[row.id- 1].features = features.map(function(feature){
            return({
                id: feature.character_id,
                appearance_id: feature.appearance_id,
                name: feature.name,
                short_name: feature.shortName ?? undefined,
                link: `${process.env['FETCH_BASE']}/${database}/characters/${feature.character_id}`
            })
        })
    })
    return results;
}

function getOne(id, database) {
    let db = new Database(database);
    const results = db.prepare(`SELECT recap.id, title, story, stinger, acts.act FROM recap JOIN acts ON recap.act=acts.id WHERE recap.id='${id}'`).get();
    const features = db.prepare(`SELECT appearances.id AS appearance_id, characters.id AS character_id, * FROM appearances JOIN characters ON appearances.character=characters.id WHERE appearances.session=${id}`).all();
    results.features = features.map(function(feature){
        return({
        id: feature.character_id,
        appearance_id: feature.appearance_id,
        name: feature.name,
        short_name: feature.shortName ?? undefined,
        link: `${process.env['FETCH_BASE']}/${database}/characters/${feature.character_id}`
        })
    })
    return results;
}

module.exports = {
    getAll,
    getOne
}