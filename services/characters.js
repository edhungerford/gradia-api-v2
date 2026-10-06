const Database   = require('better-sqlite3');

// const config    = require('../config');

function getAll(database) {
    let db = new Database(database);
    const results = db.prepare("SELECT characters.id AS character_id, pronouns.id AS pronouns_id, affiliations.id AS affiliations_id, * FROM characters JOIN pronouns ON characters.pronounSet=pronouns.id JOIN affiliations on characters.affiliation = affiliations.id").all()
    results.forEach(row => {
        results[row.character_id - 1] = {
            id: row.character_id,
            name: row.name,
            pronouns: row.pronouns,
            affiliation: row.affiliation,
            description: row.description,
            appearances: [],
            url: row.url,
            permalink: `${process.env['FETCH_BASE']}/${database}/characters` + `/${row.character_id}`
        }
        const appearances = db.prepare(`SELECT recap.id AS session_id, appearances.id AS appearance_id, character AS character_id, title, died FROM appearances JOIN recap ON appearances.session=recap.id WHERE character=${row.character_id}`).all()
        if(appearances.length > 0){    
            appearances.forEach(row => {
                //session id appearance id title link
                results[row.character_id - 1].appearances.push({
                    session_id: row.session_id,
                    appearance_id: row.appearance_id,
                    died: row.died ?? undefined,
                    title: row.title,
                    link: `${process.env['FETCH_BASE']}/${database}/story/${row.session_id}`
                })
                
            })
        }
        
    })
    return results;
}

function getOne(id, database) {
    let db = new Database(database);
    let results = db.prepare(`SELECT characters.id AS character_id, pronouns.id AS pronouns_id, affiliations.id AS affiliations_id, * FROM characters JOIN pronouns ON characters.pronounSet=pronouns.id JOIN affiliations on characters.affiliation = affiliations.id WHERE character_id = ${id}`).get()
    results = {
            id: results.character_id,
            name: results.name,
            pronouns: results.pronouns,
            affiliation: results.affiliation,
            description: results.description,
            url: results.url,
            permalink: `${process.env['FETCH_BASE']}/${database}/characters` + `/${results.character_id}`
    }
    const appearances = db.prepare(`SELECT recap.id AS session_id, appearances.id AS appearance_id, title FROM appearances JOIN recap ON appearances.session=recap.id WHERE character=${id}`).all()
    results.appearances = appearances
    if(appearances.length > 0){
        appearances.forEach(row => {
           row.link = `${process.env['FETCH_BASE']}/${database}/story/${row.session_id}`
        })
    }
    return results;
}

module.exports = {
    getAll,
    getOne
}