import * as itemsService from "../services/itemsService.js";
import { renderFile } from "../deps.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as listsService from "../services/listsService.js"
import { redirectTo } from "../utils/requestUtils.js";

const responseDetails = requestUtils.setResponseDetails();

const getListId = (url) => {
    const urlParts = url.pathname.split("/");
    const list_id = urlParts[2];
    return list_id;
};

const viewItems = async (url) => {
    const list_id = getListId(url);
    const data = {
        list_id: list_id,
        name: await listsService.getName(list_id),
        items: await itemsService.getItems(list_id),
    };
    return new Response(await renderFile("list.eta", data), responseDetails);
};

const addItem = async (url, request) => {
    const list_id = getListId(url);
    const formData = await request.formData();
    const name = formData.get("name");
    
    await itemsService.createItem(list_id, name);
    return redirectTo(`/lists/${ list_id }`);
};

const markItemCollected = async (url) => {
    const urlParts = url.pathname.split("/");
    const list_id = urlParts[2];
    const item_id = urlParts[4];
    await itemsService.markCollected(item_id);
    return redirectTo(`/lists/${ list_id }`);
};

export { viewItems, addItem, getListId, markItemCollected };
