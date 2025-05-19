const API_URL = 'http://localhost:3001';

export async function askQuestion(question) {
  if (!question) {
    throw new Error('Question is required');
  }

  try {
    const response = await fetch(`${API_URL}/api/rules/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Failed to process question');
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing question:', error);
    throw new Error(error.message || 'Failed to process question');
  }
} 