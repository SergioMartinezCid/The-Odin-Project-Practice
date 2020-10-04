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

test("Delete_project_with_TODO", async () => {
  const page = await context.newPage();
  await page.goto("https://sergiomartinezcid.github.io/The-Odin-Project-Practice/todo-list/dist/index.html", { waitUntil: "domcontentloaded" });
  await page.click("#toggle-sidebar");
  await page.click('text="+ Project"');
  await page.click("text=test");
  await page.click("#toggle-sidebar");
  await page.click("#create-todo");
  await page.click('[placeholder="Title"]');
  await page.fill('[placeholder="Title"]', "TEST");
  await page.press('[placeholder="Title"]', "Tab");
  await page.fill('[placeholder="Description"]', "test");
  await page.press('[placeholder="Description"]', "Tab");
  await page.press("input:nth-of-type(3)", "Tab");
  await page.press("input:nth-of-type(3)", "Tab");
  await page.fill("input:nth-of-type(3)", "2020-12-31");
  await page.press("input:nth-of-type(3)", "Tab");
  await page.press("input:nth-of-type(4)", "Tab");
  await page.press("input:nth-of-type(5)", "Tab");
  await page.fill('[placeholder="Project (blank for default)"]', "test");
  await page.press('[placeholder="Project (blank for default)"]', "Tab");
  await page.press("#root button", "Enter");
  await page.click("#toggle-sidebar");
  await page.click('text="🗑"');
  await page.click(".project-item");
  await page.click("#toggle-sidebar");
});