<script lang="ts">
	import type { IPoint, Language } from '../types/Map'
	import { fly } from 'svelte/transition'

	export let content: IPoint

	let language: Language = 'de'
</script>

<div class="pointContent" transition:fly={{ y: 10, duration: 300 }}>
	<div class="pointContent__head">
		<div class="pointContent__index">{content.index}</div>
		<div class="pointContent__headText">
			<div class="pointContent__track">{content.type}</div>
			<div class="pointContent__name">{content.name}</div>
		</div>
	</div>
	<div class="pointContent__media">{content.media[language]}</div>
	<p class="pointContent__description" on:touchmove|nonpassive={(event) => event.stopPropagation()}>
		{content.description[language]}
	</p>
</div>

<style lang="scss">
	@import '../../lib/styles/support';

	.pointContent {
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0.75rem;
		width: 100vw;
		font-family: var(--system-font);

		@include large {
			bottom: 1rem;
			left: 1rem;
			max-width: 450px;
		}

		&__head {
			display: flex;
			align-items: flex-start;
			gap: 0.5rem;
			font-family: var(--gravity-font);
		}

		&__headText {
			display: flex;
			flex-direction: column;
			flex: 1;
		}

		&__track {
			margin-left: auto;
			font-size: 0.85rem;
		}

		&__name {
			font-variation-settings: 'slnt' -16;
			text-transform: uppercase;
			font-size: 1.5rem;
		}

		&__index {
			font-size: 2rem;
			background: #000;
			border-radius: 50%;
			width: 6rem;
			color: #fff;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-family: var(--gravity-font);
			padding-top: 3px;
		}

		&__media {
			font-style: oblique;
			font-weight: 300;
			margin: 0.15rem 0;
		}

		&__description {
			max-height: 12rem;
			overflow: auto;
			-webkit-overflow-scrolling: touch;

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
