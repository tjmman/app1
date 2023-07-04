const { test, expect } = require("@playwright/test");

test("Main page has expected title and link to lists.", async ({ page }) => {
  //await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Shared shopping lists");
  await expect(page.locator("a")).toHaveText("Lists");
});

test("Main pages link works and directs to /lists.", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link").click();
  await expect(page.url()).toBe("http://localhost:7777/lists");
});

test("Shopping lists page has expected header and link to main page.", async ({ page }) => {
  await page.goto("/lists");
  await expect(page.locator("h1")).toHaveText("Shopping lists:");
  await expect(page.locator(`a >> text='Main page'`)).toHaveText("Main page");
  await page.click('text=Main page');
  await expect(page.url()).toBe("http://localhost:7777/");
});

test("Can add new shopping lists.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("input[type=text]").type("My new cool list lasgdn13608gn12qi0831a");
  await page.locator("text=Add new shopping list").click();
});

test("New shopping list name is link to shopping list page", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("a >> text=My new cool list lasgdn13608gn12qi0831a").first().click();
  const currentUrl = page.url();
  const pattern = /^http:\/\/localhost:7777\/lists\/\d+$/; 
  await expect(currentUrl).toMatch(pattern);
});

test("Can add items to a shopping list.", async ({ page }) => {
  await page.goto("/lists/1");
  await page.locator("input[type=text]").type("first item");
  await page.locator("input[type=submit]").first().click();
});

test("Can mark items collected.", async ({ page }) => { 
  await page.goto("/lists/1");
  await page.locator("input[type=text]").type("second item");
  await page.locator("input[type=submit]").first().click();
  await page.locator("input[type=submit]").nth(2).click();
});


test("Can deactivate shopping lists.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("input[type=submit] >> text=Deactivate list!").first().click();
});

