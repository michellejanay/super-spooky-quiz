<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	export let data: PageData;
	let { question } = data;
	let { questions } = data;
	let nextPage;
	let answer = '';
	let result = '';

	// dont let user go back to previous page
	// change nextpage functionality?
	// randomise questions
	// spookify

	$: {
		const slug = $page.params.slug;
		question = questions.find((q) => q.slug === slug);
	}

	const checkAnswer = (answer) => {
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
				result = '';
			}, 2000);
		}
	};
</script>

<main>
	{#if question}
		<h1>{question.question}</h1>
		<ul>
			{#each question.options as option}
				<li>
					<input type="radio" bind:group={answer} value={option} />
					{option}
				</li>
			{/each}
		</ul>

		<button on:click={nextQuestion} disabled={!answer}>Next Question</button>
		<section>
			{result}
		</section>
	{:else}
		<h2>Game Over</h2>
	{/if}
</main>
