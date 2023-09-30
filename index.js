const { Client } = require("@notionhq/client");

require("dotenv").config();

// Exit if no query is provided
const query = process.argv[2];
if (!query) {
  console.log("Query not found! Please provide another query...");
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

getDatabaseID();