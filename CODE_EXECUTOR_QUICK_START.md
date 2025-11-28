# Code Executor MCP - Quick Start

## ✅ What's Installed

Your project now has **Code Executor MCP** - a tool that runs code in a sandbox and can call other MCP tools.

**Location:** `code-executor-mcp/`

## 🚀 How to Use

### Start the Server

```bash
cd code-executor-mcp
npm start
```

The server will start and be ready to accept code execution requests.

### Two Main Tools

#### 1. `executeTypescript`
Run TypeScript code:

```typescript
const result = await executeTypescript(`
  const sum = 2 + 2;
  console.log('Result:', sum);
  return sum;
`);
```

#### 2. `executePython`
Run Python code:

```python
result = 2 + 2
print(f'Result: {result}')
```

## 🔗 Call Other MCPs

From inside your code, call any MCP tool:

```typescript
await executeTypescript(`
  // Call another MCP
  const files = await callMCPTool('mcp__filesystem__list_files', {
    path: '/home/user'
  });
  
  console.log('Files:', files);
  return files;
`);
```

## 📚 Examples

Check out the examples folder:

- **`examples/simple-test.ts`** - Basic code execution
- **`examples/mcp-integration.ts`** - Calling other MCPs

## 🔒 Security

- **Sandboxed:** Code runs isolated
- **Allowlist:** Control which MCPs can be called
- **Rate Limiting:** Prevent abuse
- **Audit Logs:** Track all executions

## 📖 Full Docs

See `SETUP_GUIDE.md` in the `code-executor-mcp/` folder for:
- Configuration options
- Troubleshooting
- Security setup
- Advanced features

## 💡 Why This Matters

**Problem:** Too many MCP servers = context window exhausted

**Solution:** 47 tools → 2 tools = 98% token savings

You can now:
- Use unlimited MCPs without token bloat
- Chain multiple MCP calls in one execution
- Keep state between calls
- Handle errors gracefully

## 🎯 Next Steps

1. Start the server: `npm start`
2. Try the examples
3. Integrate into your app
4. Read `SECURITY.md` for production setup

---

**Questions?** Check the repo: https://github.com/aberemia24/code-executor-MCP/
