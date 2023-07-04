import { renderFile } from "../deps.js";
import * as listsService from "../services/listsService.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as itemsService from "../services/itemsService.js";

const responseDetails = requestUtils.setResponseDetails();

const showIndexPage = async (request) => {
    let numberOfLists = await listsService.countOfLists();
    let numberOfItems = await itemsService.itemsCount(); 

    const data = {
        statistics: [numberOfLists, numberOfItems], 
    };

    return new Response(await renderFile("index.eta", data), responseDetails);
};

export { showIndexPage };