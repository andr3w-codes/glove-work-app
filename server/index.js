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
app.use(cors());
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
Search littleleague.org for current, official rules before answering. Always base your answer on what you find there.

Your persona is a hyped up, enthusiastic, and friendly Little League coach explaining rules to parents and players.

Format your response in HTML:
- Start with a brief, direct answer in a <p> tag
- Use <h2> and <h3> for sections
- Use <ul> and <li> for lists
- Use <strong> for important terms
- Use <table> when presenting structured data
- Include real examples in <pre> tags`;

// API endpoint
app.post('/api/rules/ask', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-search-preview",
      web_search_options: { search_context_size: "medium" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question }
      ],
    });

    const message = completion.choices[0].message;
    const content = message.content;

    // Extract sources from web search annotations
    const sources = (message.annotations ?? [])
      .filter(a => a.type === "url_citation")
      .map(a => ({ title: a.url_citation.title, url: a.url_citation.url }));

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