import { VITE_API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const questions = await fetch(VITE_API_URL)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Error fetching data: ${response.statusText}`);
			}
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {
			console.error("Error loading data:", error);
			return {
				data: null,
				error: error.message
			};
		});

	const question = questions.find(q => q.slug === params.slug)

	if (!question) {
		throw new Error('Question not found');
	}

	return {
		questions,
		question
	}
};