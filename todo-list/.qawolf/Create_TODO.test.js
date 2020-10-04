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

test("Create_TODO", async () => {
  const page = await context.newPage();
  await page.goto("https://sergiomartinezcid.github.io/The-Odin-Project-Practice/todo-list/dist/index.html", { waitUntil: "domcontentloaded" });
  await page.click("#create-todo");
  await page.click('[placeholder="Title"]');
  await page.fill('[placeholder="Title"]', "TEST");
  await page.press('[placeholder="Title"]', "Tab");
  await page.fill('[placeholder="Description"]', "test tod");
  await page.press('[placeholder="Description"]', "Tab");
  await page.fill('[placeholder="Description"]', "test todo");
  await page.press('[placeholder="Description"]', "Tab");
  await page.press("input:nth-of-type(3)", "Tab");
  await page.press("input:nth-of-type(3)", "Tab");
  await page.fill("input:nth-of-type(3)", "2020-11-03");
  await page.press("input:nth-of-type(3)", "Tab");
  await page.fill("input:nth-of-type(4)", "2");
  await page.press("input:nth-of-type(4)", "Tab");
  await page.click('[placeholder="Project (blank for default)"]');
  await page.click('text="Create TODO"');
});