# gradia-api-v2
A REST API built on a database of characters and events from my (and my friends') TTRPG games. If you want to see it in action, you can access the GET endpoint [here](https://tails.gradia.wiki/api).

## What is this?
This is one part of a project I started in February of 2022. (Please refer to [gradia-lib-v2](https://github.com/edhungerford/gradia-lib-v2) and [gradiangourd-v2](https://github.com/edhungerford/gradiangourd-v2) for more context.) Initially, the data that powered the frontend was just a static JSON file, which worked great until it got too big and annoying. As a result, I built a SQLite database and decided while I was at it I'd hook up a REST API so that anyone else (for whatever peculiar reason) could play with the data whenever they wanted to. Now this API also powers the Gradian Gourd.

Up until 2026, this project was in its own private repository. Since it represents the bulk of my work with React.js, REST APIs, and SQLite databases, I wanted to make that repository public so I could demonstrate the years of work I put into this. Unfortunately, the commit history for that repository contains some private information I can't readily share, so I moved the files to a new repository that will be their home going forward. If you should desire proof that this has indeed been a project years in the making, consider that [gradia-lib-v2](https://github.com/edhungerford/gradia-lib-v2) was built with `create-react-app` before it was sunset, or that the character portraits on [the Gradia wiki](https://tails.gradia.wiki) are colored with colored pencil and crudely scanned from my phone, which hasn't been my preferred artistic process for years. (This is really convincing evidence if you know me.)

## How do I use it?
If you find yourself really wanting to clone or fork this, it's a straightforward Express project that relies on SQLite databases. I wrote a quick guide on how to format the database for my friend about a year ago.

This project also requires a .env file with one environment variable, `FETCH_BASE`. This is the path to the highest level of your REST API. (In my case, it's `https://tails.gradia.wiki/api`, of course.)

### Really important stuff
* **Primary keys are 1-indexed,** meaning they start at 1, **not 0.**

### Tables

#### Acts
Acts have an `id` field (primary key) and an `act` field (string, name of the act). I use the act convention to chunk up my story, but if you don't consider your story in acts, just create one row and group all your recaps under that act.

#### Affiliations
Affiliations have an `id` field (primary key) and an `affiliation` field (string, name of the affiliation). An affiliation is a group that character belongs to. Characters only have one affiliation (sorry), so pick the one that most represents them. I typically have at least one Party affiliation for my PCs. If you have more than one party, you could definitely group them under multiple affiliations.

#### Appearances
Appearances have an `id` field (primary key), a `character` field (matches a primary key in the `characters` table), a `session` field (matches a primary key in the `recaps` table), and a `died` field (string). Functionality for `died` was added late (sorry): leave the field `NULL` if the character did not die this session; enter any non-null string if they did.

An appearance is a record of when a character appeared in a session.

#### Characters
Characters have an `id` field (primary key), a `name` field (string, their name), a `pronounSet` field (matches a primary key in the `pronouns` table), a `description` field (string, a brief description of the character), an `affiliation` field (matches a primary key in the `affiliations` table), and a `url` (full URL).

#### Pronouns
Pronoun sets have an `id` field (primary key) and a `pronouns` field (string, a set of pronouns). Please add pronoun sets as you see fit. Characters can only have one set of pronouns, but because the `pronouns` field is a string, you can create as many unique sets of pronouns as you want. For instance, if a character used she/they/it, when you add them to the `characters` table, you wouldn't input the primary keys for she/her, they/them, and it/its into the `pronounSet` field, but would instead create a new row in the `pronouns` table where the `pronouns` field is she/they/it, and use the primary key of that row.

#### Recap
Recaps have an `id` field (primary key), a `title` field (string, title of the session), an `act` field (matches a primary key in the `acts` table), a `story` field (string, the entire recap of the session), and a `stinger` field (anything you want to add at the end of the recap. May or may not be related to the story. I use this for dramatic hints at next session. Check [here](https://tails.gradia.wiki) for examples).

## Where can I see it in action?
`gradia-api-v2` powers these campaigns:
- [Tails of Gradia](https://tails.gradia.wiki)
- [Blue Skies, Black Smoke](https://bsbs.gradia.wiki)
- [South of Snaplands](https://snaplands.gradia.wiki)
- [The Scalesagas](https://scalesagas.gradia.wiki)