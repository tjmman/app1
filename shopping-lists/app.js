import { serve } from "./deps.js";
import { renderFile, configure  } from "./deps.js";
import * as shoppingListController from "./controllers/shoppingListController.js"
import * as itemController from "./controllers/itemController.js";
import * as indexPageController from "./controllers/indexPageController.js";
import { redirectTo } from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await indexPageController.showIndexPage(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await shoppingListController.viewShoppingLists();
  } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return await itemController.viewItems(url);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await shoppingListController.createNewShoppingList(request);
  } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collected") && request.method ==="POST") {
    return await itemController.markItemCollected(url);
  } else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
    return await shoppingListController.deactivateList(url);
  } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await itemController.addItem(url, request);

  } else {
    return redirectTo("/");
  }
};

serve(handleRequest, { port: 7777 });
