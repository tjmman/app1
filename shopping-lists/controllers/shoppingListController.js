import { renderFile } from "../deps.js";
import * as listsService from "../services/listsService.js";
import { redirectTo } from "../utils/requestUtils.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = requestUtils.setResponseDetails();

const createNewShoppingList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    if (name != "") {
        await listsService.createList(name);
    }
    return redirectTo("/lists");
};

const viewShoppingLists = async () => {
    const data = {
        lists: await listsService.getLists(),
    };

    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const deactivateList = async (url) => {
    const urlParts = url.pathname.split("/");
    const list_id = urlParts[2];
    await listsService.deactivate(list_id);
    return redirectTo("/lists");
};

export { deactivateList, createNewShoppingList, viewShoppingLists };