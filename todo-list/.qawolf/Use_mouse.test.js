const qawolf = require("qawolf");

let browser;
let context;

beforeAll(async () => {
  browser = await qawolf.launch();
  context = await browser.newContext();
  await qawolf.register(context);
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("Use_mouse", async () => {
  const page = await context.newPage();
  await page.goto("https://sergiomartinezcid.github.io/The-Odin-Project-Practice/todo-list/dist/index.html", { waitUntil: "domcontentloaded" });
  await page.click("#create-todo");
  await page.click('[placeholder="Title"]');
  await page.fill('[placeholder="Title"]', "TEST");
  await page.press('[placeholder="Title"]', "Tab");
  await page.fill('[placeholder="Description"]', "test");
  await page.click("input:nth-of-type(3)");
  await page.click("input:nth-of-type(3)");
  await page.fill("input:nth-of-type(3)", "2020-10-05");
  await page.click("input:nth-of-type(4)");
  await page.click("input:nth-of-type(4)");
  await page.click("input:nth-of-type(4)");
  await page.fill("input:nth-of-type(4)", "2");
  await page.click("input:nth-of-type(4)");
  await page.fill("input:nth-of-type(4)", "1");
  await page.click('[placeholder="Project (blank for default)"]');
  await page.fill('[placeholder="Project (blank for default)"]', "Default");
  await page.click('text="Create TODO"');
  await page.click(".todo-item");
  await page.click('[placeholder="Description"]');
  await page.fill('[placeholder="Description"]', "test description");
  await page.click("input:nth-of-type(4)");
  await page.fill("input:nth-of-type(4)", "2");
  await page.click("input:nth-of-type(5)");
  await page.click('text="Edit TODO"');
  await page.click(".todo-item");
  await page.click('text="Delete TODO"');
});