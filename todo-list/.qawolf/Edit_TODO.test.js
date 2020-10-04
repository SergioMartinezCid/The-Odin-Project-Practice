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

test("Edit_TODO", async () => {
  const page = await context.newPage();
  await page.goto("https://sergiomartinezcid.github.io/The-Odin-Project-Practice/todo-list/dist/index.html", { waitUntil: "domcontentloaded" });
  await page.click("#toggle-sidebar");
  await page.click('text="+ Project"');
  await page.click("#toggle-sidebar");
  await page.click("#create-todo");
  await page.click('[placeholder="Title"]');
  await page.fill('[placeholder="Title"]', "TEST");
  await page.press('[placeholder="Title"]', "Tab");
  await page.fill('[placeholder="Description"]', "test");
  await page.press('[placeholder="Description"]', "Tab");
  await page.click("input:nth-of-type(3)");
  await page.fill("input:nth-of-type(3)", "2020-10-01");
  await page.click("input:nth-of-type(4)");
  await page.fill("input:nth-of-type(4)", "1");
  await page.click('[placeholder="Project (blank for default)"]');
  await page.click("input:nth-of-type(5)");
  await page.click('[placeholder="Project (blank for default)"]');
  await page.fill('[placeholder="Project (blank for default)"]', "test");
  await page.click('text="Create TODO"');
  await page.click(".todo-item");
  await page.click('[placeholder="Title"]');
  await page.fill('[placeholder="Title"]', "TEST TITLE");
  await page.press('[placeholder="Title"]', "Tab");
  await page.fill('[placeholder="Description"]', "test description");
  await page.press('[placeholder="Description"]', "Tab");
  await page.click("input:nth-of-type(3)");
  await page.fill("input:nth-of-type(3)", "2020-10-02");
  await page.click("input:nth-of-type(5)");
  await page.click('[placeholder="Project (blank for default)"]');
  await page.click('[placeholder="Project (blank for default)"]');
  await page.fill('[placeholder="Project (blank for default)"]', "Default");
  await page.press('[placeholder="Project (blank for default)"]', "Tab");
  await page.press("#root button", "Enter");
  await page.click(".todo-item");
});