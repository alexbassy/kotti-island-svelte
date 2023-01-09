<script lang="ts">
	import type { IPoint, Language } from '../types/Map'
	import { activeLanguage } from '../stores/language'

	export let count: number

	export let content: IPoint

	export let onExit: () => void

	let touchstartY = 0

	const isScrollingDescription = (elem: HTMLElement): boolean => {
		const description = elem.closest('.pointContent__description')
		if (!description) return false
		return description.scrollHeight > description.clientHeight
	}

	function onTouchStart(event: TouchEvent) {
		if (isScrollingDescription(event.target)) return
		touchstartY = event.changedTouches[0].screenY
	}

	function onTouchEnd(event: TouchEvent) {
		if (isScrollingDescription(event.target)) return
		const touchendY = event.changedTouches[0].screenY
		if (touchendY - touchstartY > 50) {
			if (onExit) onExit()
		}
	}
</script>

<svelte:body on:touchstart={onTouchStart} on:touchend={onTouchEnd} />

<section id="pointDescriptor" class="pointContent" role="region" aria-live="polite">
	{#if content.type.en}
		<div class="pointContent__track">{content.type[$activeLanguage]}</div>
	{:else if content.type}
		<div class="pointContent__track">{content.type}</div>
	{/if}
	<div class="pointContent__head">
		<div class="pointContent__index">{content.index}</div>
		<div class="pointContent__headText">
			<div class="pointContent__person">{content.person}</div>
			<div class="pointContent__media">{content.media[$activeLanguage]}</div>
			{#if content.location.en}
				<div class="pointContent__location">{content.location[$activeLanguage]}</div>
			{:else if content.location}
				<div class="pointContent__location">{content.location}</div>
			{/if}
		</div>
	</div>
	<p class="pointContent__description" on:touchmove|nonpassive={(event) => event.stopPropagation()}>
		{content.description[$activeLanguage]}
	</p>
</section>

<style lang="scss">
	@import '../../lib/styles/support';

	.pointContent {
		--space: 0.75rem;

		position: relative;
		background-color: #fff;
		padding: 1.75rem var(--space) var(--space);
		font-family: var(--antarctica-LightItaContrast);
		margin-top: 1rem;

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
			font-family: var(--gravity-font);
		}

		&__person {
			font-style: italic;
			font-weight: 671;
			font-size: 1.8125rem;
			line-height: 1.3103448276;
			font-family: var(--antarctica-ExtBdItaContrast);
			text-transform: uppercase;
			font-size: 1.5rem;
		}

		&__media {
			font-style: italic;
			font-weight: 536;
			font-size: 14px;
			line-height: 18px;
			color: #000000;
			font-family: var(--antarctica-ExpMedItaContrast);
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
			font-family: var(--antarctica-UExXLtContrast);
		}

		&__description {
			max-height: 12rem;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			font-weight: 400;
			font-size: 16px;
			line-height: 155%;
			font-family: var(--antarctica-LightContrast);
			white-space: break-spaces;

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
