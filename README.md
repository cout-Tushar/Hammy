
🐹 Hammy CLI — AI-Powered API Development Assistant
==================================================

Usage:
  hammy <command> [options]

------------------------------------------------
🚀 API Commands
------------------------------------------------
  run <method> <url>            Run an API request
  run <id>                      Run a saved request

  save <method> <url>           Save an API request
  list                          List saved requests
  edit <id>                     Edit a saved request
  delete <id>                   Delete a saved request

------------------------------------------------
📦 Collection Commands
------------------------------------------------
  collection create <name>                  Create a collection
  collection list                           List all collections
  collection add <collectionId> <requestId> Add request to collection
  collection run <collectionId>             Run all requests in a collection

------------------------------------------------
🤖 AI Commands
------------------------------------------------
  generate "<prompt>"          Generate an API request
  generate --save              Generate and save request
  generate --run               Generate and execute request
  generate --save --run        Generate, save, and execute

  review <method> <url>        AI review of an API
  explain <method> <url>       AI explanation of an API response

------------------------------------------------
⚙️ Options
------------------------------------------------
  -H, --header <key:value>     Add request headers
  -d, --data <data>            Add request body (JSON or key=value)

------------------------------------------------
📘 Examples
------------------------------------------------

1️⃣ Run a GET request
  hammy run GET https://dummyjson.com/users

2️⃣ POST request with JSON body
  hammy run POST https://jsonplaceholder.typicode.com/users \\
      -H "Content-Type:application/json" \\
      -d '{ "name": "Tushar" }'

3️⃣ Save a request
  hammy save GET https://dummyjson.com/users

4️⃣ Execute a saved request
  hammy run 1

5️⃣ Generate an API request
  hammy generate "Get all users"

6️⃣ Generate and execute
  hammy generate "Create login API" --run

7️⃣ Review an API
  hammy review GET https://dummyjson.com/users

8️⃣ Explain an API
  hammy explain GET https://dummyjson.com/users

9️⃣ Create a collection
  hammy collection create "User APIs"

🔟 Add a request to a collection
  hammy collection add 1 2

1️⃣1️⃣ Run a collection
  hammy collection run 1

------------------------------------------------
💡 Tips
------------------------------------------------
• Save frequently used APIs and organize them into collections.
• AI-generated requests may require small adjustments.
• Use JSON for complex request bodies.
• Use local APIs (localhost) during development.
• Run 'hammy <command> --help' for command-specific help.

------------------------------------------------
`);
  });

export default helpCommand;