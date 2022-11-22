<script lang="ts">
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import anime from 'animejs'

	type Section = 'exhibition' | 'album'
	let activeSection: Section = 'exhibition'

	let containerElement: HTMLElement

	let smallViewBoxWidth = 0
	let viewBoxHeight = 0
	let ellipseRotation = 0

	function setViewBox() {
		const { width, height } = containerElement.getBoundingClientRect()
		smallViewBoxWidth = width / 6
		viewBoxHeight = height

		// Tweak the rotation of the ellipse to not go over the sides
		const arbitraryMagicNumber = 32
		ellipseRotation = arbitraryMagicNumber * (smallViewBoxWidth / viewBoxHeight)
	}

	let ellipse: SVGEllipseElement
	let rect: SVGRectElement

	onMount(() => {
		setViewBox()
	})

	const animationDuration = 800
	const defaultOptions = {
		easing: 'easeInSine',
		duration: animationDuration,
	}

	$: {
		if (browser && activeSection === 'album') {
			anime({
				targets: rect,
				x: '50%',
				y: '0%',
				width: '15%',
				height: '100%',
				...defaultOptions,
			})
			anime({
				targets: ellipse,
				rx: '250%',
				ry: '25%',
				...defaultOptions,
			})
		} else if (browser) {
			anime({
				targets: rect,
				x: '-180%',
				y: '25%',
				width: '460%',
				height: '50%',
				...defaultOptions,
			})
			anime({
				targets: ellipse,
				rx: '40%',
				ry: '50%',
				...defaultOptions,
			})
		}
	}
</script>

<svelte:head>
	<title>Kotti Island</title>
	<link
		rel="preload"
		as="font"
		type="font/woff2"
		href="/fonts/ABCGravityVariable.woff2"
		crossorigin="true"
	/>
</svelte:head>

<svelte:window on:resize={setViewBox} />

<main
	class="container"
	class:hover-exhibition={activeSection === 'exhibition'}
	class:hover-album={activeSection === 'album'}
	bind:this={containerElement}
>
	<h1 class="title">
		<span class="kotti">Kotti</span>
		<span class="island">Island</span>
	</h1>
	<section
		class="section exhibition"
		on:mouseover={() => (activeSection = 'exhibition')}
		on:focus={() => (activeSection = 'exhibition')}
	>
		<div class="svg-container">
			<svg
				class="rectangle"
				width="100%"
				height="100%"
				viewBox="0 0 {smallViewBoxWidth} {viewBoxHeight}"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					bind:this={rect}
					x="-180%"
					y="25%"
					width="460%"
					height="50%"
					transform="rotate(12)"
					fill="#fff"
				/>
			</svg>
		</div>
		<h1 class="text exhibition">Eine Ausstellung</h1>
	</section>
	<section
		class="section album"
		on:mouseover={() => (activeSection = 'album')}
		on:focus={() => (activeSection = 'album')}
	>
		<div class="svg-container">
			<svg
				class="ellipse"
				width="100%"
				height="100%"
				viewBox="0 0 {smallViewBoxWidth} {viewBoxHeight}"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<ellipse
					bind:this={ellipse}
					fill="var(--green)"
					cx="50%"
					cy="50%"
					rx="40%"
					ry="50%"
					transform="rotate({ellipseRotation})"
				/>
			</svg>
		</div>
		<h1 class="text album">Ein Album</h1>
	</section>
</main>

<style lang="scss">
	:root {
		--stretched: 150%;
		--compressed: 50%;

		--large-width: calc(100% / 6 * 5);
		--small-width: calc(100% / 6);

		--transition-duration: 1s;
	}

	.title {
		position: absolute;
		width: 100%;
		top: 0%;
		z-index: 2;
		text-align: center;
		text-transform: uppercase;
		font-size: 40px;

		.kotti {
			font-stretch: 142%;
		}
		.island {
			font-stretch: 60%;
		}
	}

	.container {
		display: flex;
		height: 100vh;
	}

	.section {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		transition: all var(--transition-duration) ease-in-out;

		&.exhibition {
			background-color: var(--green);
			width: var(--large-width);

			.hover-album & {
				width: var(--small-width);

				.text {
					font-stretch: var(--compressed);
				}
			}
		}

		&.album {
			width: var(--small-width);

			.text {
				font-stretch: var(--compressed);
			}

			.hover-album & {
				width: var(--large-width);

				.text {
					font-stretch: var(--stretched);
				}
			}
		}
	}

	.text {
		width: 100%;
		font-size: 170px;
		text-transform: uppercase;
		line-height: 0.8;
		transition: all var(--transition-duration) ease-in-out;
		text-align: center;
		position: relative;
		z-index: 2;
	}

	.svg-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		rect,
		ellipse {
			transform-box: fill-box;
			transform-origin: center;
		}
	}
</style>
