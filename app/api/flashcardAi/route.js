import { NextResponse } from 'next/server';

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 9 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
	"flashcards":[
		{
			"front": "Front of the card",
			"back": "Back of the card"
		}
	]
}
`

export async function POST(req) {
	try {
		const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // Ensure to use an environment variable for the API key
		const data = await req.text();

		const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
			method: 'POST',
			headers: {
				"Authorization": `Bearer ${OPENROUTER_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "meta-llama/llama-3.1-8b-instruct:free",
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: "user", content: data }
				]
			})
		});

		// Check the response status and parse the JSON response
		const responseJson = await response.json();
		const flashcards = JSON.parse(responseJson.choices[0].message.content).flashcards;

		// Return the content as a JSON response
		return NextResponse.json({ flashcards });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.error();
	}
}