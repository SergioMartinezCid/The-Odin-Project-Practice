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

test("Delete_empty_project", async () => {
  const page = await context.newPage();
  await page.goto("https://sergiomartinezcid.github.io/The-Odin-Project-Practice/todo-list/dist/index.html", { waitUntil: "domcontentloaded" });
  await page.click("#toggle-sidebar");
  await page.click('text="+ Project"');
  await page.click('text="🗑"');
});