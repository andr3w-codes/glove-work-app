import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: join(__dirname, '..', '.env') });

// Verify API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in environment variables');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3001;

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors({
  origin: ['https://andr3w-codes.github.io', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Glove Work Backend API',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    port: port,
    env: process.env.NODE_ENV
  });
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful assistant that answers questions about Little League baseball rules. 
Your responses should be:
1. Accurate and based on official Little League rules
2. Clear and easy to understand
3. Include relevant context and examples
4. Cite official sources when possible

Format your response in markdown with the following structure:
- Start with a brief, direct answer
- Use headers (##) for main sections
- Use bullet points for lists
- Use bold text for important terms
- Use tables when presenting structured data
- Include relevant examples in code blocks
- End with a "For more information" section with official sources

Example format:
## Direct Answer
Brief, clear answer to the question.

## Details
- Key point 1
- Key point 2
- Key point 3

## Examples
\`\`\`
Example situation:
What happens: ...
\`\`\`

## For More Information
[Official Rule Source](https://www.littleleague.org/playing-rules/)`;

// API endpoint
app.post('/api/rules/ask', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const answer = completion.choices[0].message.content;

    // Parse the answer to extract sources
    const sources = [];
    const sourceRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    while ((match = sourceRegex.exec(answer)) !== null) {
      sources.push({
        title: match[1],
        url: match[2]
      });
    }

    // Remove markdown links from the content
    const content = answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');

    res.json({
      content,
      sources
    });
  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({ 
      error: 'Failed to process question',
      details: error.message 
    });
  }
});

const server = app.listen(port, '0.0.0.0', () => {
  const host = server.address();
  console.log(`Server running at http://${host.address}:${host.port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`OpenAI API Key present: ${!!process.env.OPENAI_API_KEY}`);
}); 