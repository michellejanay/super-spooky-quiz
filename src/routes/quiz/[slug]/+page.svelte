<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	export let data: PageData;
	let { question } = data;
	let { questions } = data;
	let nextPage: string;
	let answer = '';
	let result = '';

	// dont let user go back to previous page?
	// change nextpage functionality?
	// randomise questions, dynamic slug index `question-${index of question + 1}`
	// spookify

	$: {
		const slug = $page.params.slug;
		question = questions.find((q) => q.slug === slug);
	}

	const checkAnswer = (answer: string) => {
		if (question.correctAnswer === answer) {
			result = 'Correct! 🎃';
		} else {
			result = 'Incorrect 🫥';
		}
	};
	const nextQuestion = () => {
		// change this
		if ($page.params.slug === questions[questions.length - 1].slug) {
			checkAnswer(answer);
			setTimeout(() => {
				question = '';
			}, 2000);
		} else {
			const currentIndex = questions.findIndex((q) => q.slug === question.slug);
			const nextIndex = currentIndex + 1;
			nextPage = questions[nextIndex].slug;
			checkAnswer(answer);
			setTimeout(() => {
				goto(nextPage);
				answer = ''
				result = '';
			}, 2000);
		}
	};
</script>

<main>
	{#if question}
		<h2>{question.question}</h2>
		<ul>
			{#each question.options as option}
				<li>
					<input type="radio" bind:group={answer} value={option} id={option} />
					<label for={option}>{option}</label>
				</li>
			{/each}
		</ul>

		<button on:click={nextQuestion} disabled={!answer}>Next Question</button>
		<section>
			<p>{result}</p>
		</section>
	{:else}
		<h2>Game Over</h2>
	{/if}
</main>
