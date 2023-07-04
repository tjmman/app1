import { sql } from "../database/database.js";

const countOfLists = async () => {
    const rows =  await sql`SELECT count(*) as count FROM shopping_lists`;
    return rows[0].count;
};

const createList = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const getLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const getName = async ( list_id ) => {
    return await sql`SELECT name FROM shopping_lists WHERE id = ${ list_id }`;
};

const deactivate = async (list_id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${ list_id }`;
};

export { deactivate, countOfLists, createList, getLists, getName };