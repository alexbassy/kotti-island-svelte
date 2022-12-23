<script lang="ts">
	import KottiIslandLogo from '$components/KottiIslandLogo.svelte'
	import { onMount } from 'svelte'

	const headerHeight = 60

	let mapWidth = 0
	let mapHeight = 0

	function handleResize() {
		mapWidth = window.innerWidth
		mapHeight = window.innerHeight - headerHeight
	}

	onMount(() => {
		handleResize()
	})
</script>

<svelte:window on:resize={handleResize} />

<div class="page-container">
	<header class="header">
		<KottiIslandLogo />
	</header>
	<main class="content-container">
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 {mapWidth} {mapHeight}"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<image href="/map-background.svg" width="100%" height="100%" />
		</svg>
	</main>
</div>

<style lang="scss">
	:root {
		--header-height: 60px;
	}

	.page-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: var(--green);
	}
	.header {
		height: var(--header-height);
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
	}
	.content-container {
		display: flex;
	}
</style>
