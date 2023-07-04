import { sql } from "../database/database.js";

const createItem = async (list_id, name) => {
    if (name != ""){
        await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ( ${ list_id }, ${ name })`;
    }
};

const getItems = async (list_id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${ list_id } ORDER BY collected, name`;
};

const itemsCount = async () => {
    const rows = await sql`SELECT count(*) as count FROM shopping_list_items`;
    return rows[0].count;
};

const markCollected = async (item_id) => {
    await sql`UPDATE shopping_list_items SET collected = TRUE WHERE id = ${ item_id }`;
};

export { createItem, getItems, itemsCount, markCollected };