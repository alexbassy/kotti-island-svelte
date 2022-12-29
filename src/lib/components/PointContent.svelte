<script lang="ts">
	import type { IPoint, Language } from '../types/Map'
	import { fly } from 'svelte/transition'

	export let content: IPoint

	let language: Language = 'de'
</script>

<div class="pointContent" transition:fly={{ y: 10, duration: 300 }}>
	<div class="pointContent__track">{content.type}</div>
	<div class="pointContent__head">
		<div class="pointContent__index">{content.index}</div>
		<div class="pointContent__headText">
			<div class="pointContent__person">{content.person}</div>
			<div class="pointContent__media">{content.media[language]}</div>
			{#if content.location}
				<div class="pointContent__location">{content.location}</div>
			{/if}
		</div>
	</div>
	<p class="pointContent__description" on:touchmove|nonpassive={(event) => event.stopPropagation()}>
		{content.description[language]}
	</p>
</div>

<style lang="scss">
	@import '../../lib/styles/support';

	.pointContent {
		--space: 0.75rem;

		position: absolute;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 1.75rem var(--space) var(--space);
		width: 100vw;
		font-family: var(--antarctica-font);

		@include large {
			bottom: 1rem;
			left: 1rem;
			max-width: clamp(550px, 100%, 40vw);
		}

		&__head {
			display: flex;
			align-items: flex-start;
			gap: 0.5rem;
		}

		&__headText {
			display: flex;
			flex-direction: column;
			flex: 1;
		}

		&__track {
			margin-left: auto;
			font-size: 0.85rem;
			font-weight: 900;
			font-stretch: 120%;
			position: absolute;
			text-transform: uppercase;
			top: 0.5rem;
			right: var(--space);
		}

		&__person {
			font-style: italic;
			font-weight: 671;
			font-size: 1.8125rem;
			line-height: 1.3103448276;
			font-stretch: 100%;
			font-variation-settings: 'CNTR' 100;
			text-transform: uppercase;
			font-size: 1.5rem;
		}

		&__media {
			font-style: italic;
			font-weight: 536;
			font-size: 14px;
			line-height: 18px;
			color: #000000;
			font-stretch: 150%;
			font-variation-settings: 'CNTR' 100;
			text-transform: uppercase;
		}

		&__index {
			font-size: 1.5rem;
			background: #000;
			border-radius: 50%;
			font-stretch: 200%;
			width: 3.5rem;
			line-height: 1.1;
			color: #fff;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-family: var(--gravity-font);
			padding-top: 3px;
		}

		&__location {
			font-weight: 200;
			font-size: 14px;
			line-height: 18px;
			margin: 0.15rem 0 0.5rem;
			font-stretch: 200%;
		}

		&__description {
			max-height: 12rem;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			font-weight: 400;
			font-size: 16px;
			line-height: 155%;
			font-stretch: 85%;
			font-variation-settings: 'CNTR' 100;

			&::-webkit-scrollbar {
				width: 3px;
			}

			&::-webkit-scrollbar:hover {
				width: 6px;
			}

			/* Track */
			&::-webkit-scrollbar-track {
				/* background: #f1f1f1; */
			}

			/* Handle */
			&::-webkit-scrollbar-thumb {
				background: #000;
			}

			/* Handle on hover */
			&::-webkit-scrollbar-thumb:hover {
				background: #000;
			}
		}
	}
</style>
