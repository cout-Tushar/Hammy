# 🐹 Hammy

<p align="center">
  <b>AI-Powered API Development Assistant for the Terminal</b>
</p>

<p align="center">
  Generate, test, save, review, explain, and organize APIs without leaving your terminal.
</p>

<p align="center">

![npm](https://img.shields.io/npm/v/tushar_hammy)
![License](https://img.shields.io/npm/l/tushar_hammy)
![Downloads](https://img.shields.io/npm/dm/tushar_hammy)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)

</p>

---

## ✨ Features

### 🚀 Request Management

- Execute HTTP requests (GET, POST, PUT, PATCH, DELETE)
- Custom headers support
- JSON request body support
- Execute saved requests
- Works with both local and remote APIs

### 💾 Save Requests

- Save API requests
- List saved requests
- Edit saved requests
- Delete saved requests
- Reuse requests instantly

### 📦 Collections

Organize related APIs into reusable collections.

- Create collections
- List collections
- Add requests to collections
- Execute an entire collection with one command

### 🤖 AI-Powered Features

Generate API requests using natural language.

Review APIs for:

- 🔒 Security issues
- ⚡ Performance improvements
- 📘 REST best practices
- 📝 Documentation suggestions

Explain any API response in simple English.

---

# 📦 Installation

```bash
npm install -g tushar_hammy
```

Verify installation

```bash
hammy --help
```

---

# ⚙️ Environment Variables

Create a `.env` file.

```env
GROQ_API_KEY=your_groq_api_key
```

---

# 🚀 Usage

## Run an API

```bash
hammy run GET https://dummyjson.com/users
```

Run a saved request

```bash
hammy run 1
```

---

## Save a Request

```bash
hammy save GET https://dummyjson.com/users
```

List saved requests

```bash
hammy list
```

Edit a request

```bash
hammy edit 1
```

Delete a request

```bash
hammy delete 1
```

---

# 📦 Collections

Create a collection

```bash
hammy collection create "User APIs"
```

List collections

```bash
hammy collection list
```

Add a request

```bash
hammy collection add 1 2
```

Run an entire collection

```bash
hammy collection run 1
```

---

# 🤖 AI Commands

## Generate an API Request

```bash
hammy generate "Get all users"
```

Generate and execute

```bash
hammy generate "Create login API" --run
```

Generate and save

```bash
hammy generate "Create user endpoint" --save
```

Generate, save and execute

```bash
hammy generate "Create login API" --save --run
```

---

## Review an API

```bash
hammy review GET https://dummyjson.com/users
```

Hammy analyzes:

- Security
- REST Best Practices
- Performance
- Documentation

---

## Explain an API

```bash
hammy explain GET https://dummyjson.com/users
```

Hammy explains:

- What the endpoint does
- Request structure
- Response fields
- Possible use cases
- Suggestions for improvement

---

# 📖 Examples

### GET Request

```bash
hammy run GET https://dummyjson.com/users
```

### POST Request

```bash
hammy run POST https://dummyjson.com/users/add \
-H "Content-Type:application/json" \
-d '{ "name":"Tushar", "role":"Developer" }'
```

### AI Generate

```bash
hammy generate "Create Login API"
```

### Review

```bash
hammy review GET https://dummyjson.com/users
```

### Explain

```bash
hammy explain GET https://dummyjson.com/users
```

---

# 📁 Project Structure

```text
src
│
├── commands
│   ├── collection.ts
│   ├── delete.ts
│   ├── edit.ts
│   ├── explain.ts
│   ├── generate.ts
│   ├── help.ts
│   ├── list.ts
│   ├── review.ts
│   ├── run.ts
│   └── save.ts
│
├── config
│   └── env.ts
│
├── services
│   ├── aiService.ts
│   ├── collectionStore.ts
│   ├── requestBuilder.ts
│   ├── requestService.ts
│   └── storageService.ts
│
├── types
│
├── utils
│
└── index.ts
```

---

# 🛠️ Built With

- TypeScript
- Node.js
- Commander.js
- Axios
- Groq AI

---

# 🚀 Roadmap

## ✅ Completed

- HTTP Request Execution
- Save Requests
- Edit Requests
- Delete Requests
- Collections
- Collection Runner
- AI Request Generation
- AI API Review
- AI Response Explanation
- Global npm Package

## 🚧 Coming Soon

- AI Documentation Generator
- AI Security Audit
- Environment Profiles
- Request History
- Response Comparison
- Export Reports (Markdown/HTML)

---

# 💡 Why Hammy?

During backend development, developers constantly switch between:

- Postman
- Terminal
- Browser
- AI Chatbots

Hammy brings everything together into a single terminal experience, allowing developers to generate, test, review, understand, and organize APIs without leaving the command line.

---

# 🤝 Contributing

Contributions, issues, and feature requests are always welcome.

If you'd like to improve Hammy, feel free to fork the repository and submit a Pull Request.

---

# 📄 License

MIT License

---

# 👨‍💻 Author

**Tushar Mishra**

⭐ If you found Hammy useful, consider starring the repository!

GitHub: https://github.com/cout-Tushar/Hammy