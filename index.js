const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

// Exit if no query is provided
const query = process.argv[2];
if (!query) {
  console.log("Please input query prompt...");
  process.exit(1);
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getDatabaseID() {
  const response = await notion.search({
    query,
    filter: { property: "object", value: "database" }
  });
  response.results.map((result) => {
    console.log(`${result.title[0].plain_text} -> ${result.id}`);
  });
}

// getDatabaseID();

async function importPages() {
  // Retrieve pages from the database
  let { results: pages } = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  // TODO -> Attach blocks to pages

  // Write the results to file
  const outputFile = path.join(__dirname, "notion-export.json");
  fs.writeFileSync(outputFile, JSON.stringify(pages, null, 2));
  console.log(`wrote ${pages.length} pages to ${outputFile}`);

}

importPages();