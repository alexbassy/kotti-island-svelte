<script lang="ts">
	import type { IPoint, Language } from '../types/Map'

	export let content: IPoint

	let language: Language = 'de'
</script>

<div class="pointContent">
	<div class="pointContent__head">
		<div class="pointContent__index">{content.index}</div>
		<div class="pointContent__name">{content.name}</div>
	</div>
	<div class="pointContent__media">{content.media[language]}</div>
	<p class="pointContent__description">{content.description[language]}</p>
</div>

<style lang="scss">
	.pointContent {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		background-color: #fff;
		padding: 0.5rem;
		max-width: 450px;

		&__head {
			display: flex;
			align-items: baseline;
			gap: 0.5rem;
		}

		&__name {
			font-variation-settings: 'slnt' -16;
			text-transform: uppercase;
			font-size: 1.5rem;
		}

		&__index {
			font-size: 1.5rem;
			background: #000;
			border-radius: 50%;
			width: 4rem;
			color: #fff;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		&__description {
			font-size: 0.75rem;
		}
	}
</style>
