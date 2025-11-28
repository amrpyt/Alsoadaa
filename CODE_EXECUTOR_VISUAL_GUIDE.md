# Code Executor MCP - Visual Guide

## 🎯 The Problem & Solution

### Before (Context Exhausted)
```
Your App
   ↓
MCP Server 1 (tokens: 10k)
MCP Server 2 (tokens: 15k)
MCP Server 3 (tokens: 20k)
...
MCP Server 47 (tokens: 96k)
───────────────────────────
TOTAL: 141k tokens used
❌ Context window exhausted!
```

### After (98% Token Savings)
```
Your App
   ↓
Code Executor MCP (tokens: 1.6k)
   ├─ Can call MCP 1 on-demand
   ├─ Can call MCP 2 on-demand
   ├─ Can call MCP 3 on-demand
   └─ Can call MCP 47 on-demand
───────────────────────────
TOTAL: 1.6k tokens used
✅ Plenty of context left!
```

## 🔄 How It Works

### Step 1: Send Code to Executor
```typescript
await executeTypescript(`
  const result = 2 + 2;
  return result;
`);
```

### Step 2: Code Runs in Sandbox
```
┌─────────────────────────────┐
│   Sandboxed Environment     │
│                             │
│  const result = 2 + 2;      │
│  return result;             │
│                             │
└─────────────────────────────┘
```

### Step 3: Get Result Back
```typescript
// Result: 4
```

## 🔗 Calling Other MCPs

### Simple MCP Call
```typescript
await executeTypescript(`
  const files = await callMCPTool('mcp__filesystem__list_files', {
    path: '/home/user'
  });
  return files;
`);
```

### Multi-Step Workflow
```typescript
await executeTypescript(`
  // Step 1: Read file
  const content = await callMCPTool('mcp__filesystem__read_file', {
    path: '/config.json'
  });
  
  // Step 2: Parse & transform
  const config = JSON.parse(content);
  config.updated = new Date();
  
  // Step 3: Write back
  await callMCPTool('mcp__filesystem__write_file', {
    path: '/config.json',
    content: JSON.stringify(config)
  });
  
  return { success: true };
`);
```

## 📊 Architecture

```
┌──────────────────────────────────────────────────────┐
│                    Your Application                  │
└──────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────┐
│          Code Executor MCP Server                    │
│  ┌────────────────────────────────────────────────┐  │
│  │  Tool 1: executeTypescript                     │  │
│  │  Tool 2: executePython                         │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
         ↙          ↙          ↙          ↙
    MCP 1      MCP 2      MCP 3  ...  MCP 47
```

## 🔐 Security Layers

```
Your Code
    ↓
┌─────────────────────────────┐
│  1. Validation              │ ← Check parameters
│  2. Allowlist Check         │ ← Verify MCP allowed
│  3. Rate Limiting           │ ← Prevent abuse
│  4. Sandboxed Execution     │ ← Isolated process
│  5. Audit Logging           │ ← Track everything
└─────────────────────────────┘
    ↓
Safe Execution
```

## 💾 State Persistence

### Without Code Executor
```
Call 1: Read file → Get content
Call 2: Parse content → Need to pass as parameter
Call 3: Transform → Need to pass as parameter
Call 4: Write file → Need to pass as parameter
❌ State lost between calls, lots of parameter passing
```

### With Code Executor
```
Single Call:
  Step 1: Read file → Store in variable
  Step 2: Parse → Use variable
  Step 3: Transform → Use variable
  Step 4: Write → Use variable
✅ State persists, clean code
```

## 📈 Performance Comparison

| Metric | Traditional MCPs | Code Executor |
|--------|-----------------|---------------|
| Tools Available | 2-3 (limited) | 47+ (unlimited) |
| Context Tokens | 141k | 1.6k |
| Token Savings | - | 98% |
| State Between Calls | Lost | Persisted |
| Error Handling | Limited | Full try/catch |
| Parallel Calls | Separate requests | Single execution |

## 🎓 Usage Examples

### Example 1: Simple Math
```typescript
await executeTypescript(`
  const numbers = [1, 2, 3, 4, 5];
  const sum = numbers.reduce((a, b) => a + b, 0);
  return { sum, average: sum / numbers.length };
`);
// Returns: { sum: 15, average: 3 }
```

### Example 2: File Operations
```typescript
await executeTypescript(`
  const content = await callMCPTool('mcp__filesystem__read_file', {
    path: '/data.json'
  });
  const data = JSON.parse(content);
  return { count: data.length };
`);
```

### Example 3: Error Handling
```typescript
await executeTypescript(`
  try {
    const result = await callMCPTool('mcp__git__status', {
      repo: '/project'
    });
    return { success: true, status: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
`);
```

### Example 4: Parallel Calls
```typescript
await executeTypescript(`
  const [file1, file2, file3] = await Promise.all([
    callMCPTool('mcp__filesystem__read_file', { path: '/f1.txt' }),
    callMCPTool('mcp__filesystem__read_file', { path: '/f2.txt' }),
    callMCPTool('mcp__filesystem__read_file', { path: '/f3.txt' })
  ]);
  return { file1, file2, file3 };
`);
```

## 🚀 Getting Started

```
1. Start Server
   cd code-executor-mcp
   npm start

2. Try Examples
   Read: code-executor-mcp/examples/simple-test.ts
   Read: code-executor-mcp/examples/mcp-integration.ts

3. Integrate
   Import MCP client
   Call executeTypescript or executePython

4. Scale
   Add more MCPs without token bloat
   Chain complex workflows
   Maintain clean code
```

## 📚 Key Files

| File | Purpose |
|------|---------|
| `CODE_EXECUTOR_QUICK_START.md` | Quick reference |
| `CODE_EXECUTOR_IMPLEMENTATION_SUMMARY.md` | Full details |
| `code-executor-mcp/SETUP_GUIDE.md` | Setup instructions |
| `code-executor-mcp/SECURITY.md` | Security best practices |
| `code-executor-mcp/examples/` | Working examples |

---

**Ready to start?** → `npm start` in the `code-executor-mcp/` folder!
