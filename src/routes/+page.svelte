<script lang="ts">
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import anime from 'animejs'

	const breakpoint = 768
	let isMobile: boolean

	if (browser) {
		const query = window.matchMedia(`(min-width: ${breakpoint}px)`)
		query.addEventListener('change', (event) => {
			isMobile = !event.matches
		})
		isMobile = !query.matches
	}

	type Section = 'exhibition' | 'album'
	let activeSection: Section = 'exhibition'

	let containerElement: HTMLElement

	let smallViewBoxWidth = 0
	let viewBoxHeight = 0
	let ellipseRotation = 0

	function setActiveSection(s: Section) {
		return () => (activeSection = s)
	}

	function setViewBox() {
		const { width, height } = containerElement.getBoundingClientRect()
		smallViewBoxWidth = width / 6
		viewBoxHeight = height

		// Tweak the rotation of the ellipse to not go over the sides
		const arbitraryMagicNumber = isMobile ? 92 : 32
		ellipseRotation = arbitraryMagicNumber * (smallViewBoxWidth / viewBoxHeight)
	}

	let ellipse: SVGEllipseElement
	let rect: SVGRectElement

	onMount(() => {
		setViewBox()
	})

	const animationDuration = 800

	$: {
		// Big ellipse, smaller rectangle
		if (browser && activeSection === 'album') {
			anime({
				targets: rect,
				x: isMobile ? '-1700%' : '50%',
				y: isMobile ? '40%' : '0%',
				width: isMobile ? '3500%' : '15%',
				height: isMobile ? '15%' : '100%',
				easing: 'easeInSine',
				duration: animationDuration,
			})
			anime({
				targets: ellipse,
				rx: '250%',
				ry: isMobile ? '50%' : '25%',
				easing: 'easeOutSine',
				duration: animationDuration,
			})
		} else if (browser) {
			// Big rectangle, smaller ellipse
			anime({
				targets: rect,
				x: isMobile ? '-140%' : '-180%',
				y: isMobile ? '5%' : '25%',
				width: isMobile ? '380%' : '460%',
				height: isMobile ? '90%' : '50%',
				easing: 'easeOutSine',
				duration: animationDuration,
			})
			anime({
				targets: ellipse,
				rx: isMobile ? '1600%' : '40%',
				ry: isMobile ? '40%' : '50%',
				easing: 'easeInSine',
				duration: animationDuration,
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
		on:mouseover={setActiveSection('exhibition')}
		on:focus={setActiveSection('exhibition')}
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
					transform="rotate(12 {smallViewBoxWidth / 10} 0)"
					fill="#fff"
				/>
			</svg>
		</div>
		<h1 class="text exhibition">Eine <br />Ausstel<wbr />lung</h1>
	</section>
	<section
		class="section album"
		on:mouseover={setActiveSection('album')}
		on:focus={setActiveSection('album')}
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
	@mixin small {
		@media (max-width: 769px) {
			@content;
		}
	}
	@mixin large {
		@media (min-width: 768px) {
			@content;
		}
	}

	:root {
		--transition-duration: 1s;
		--stretched: 150%;
		--compressed: 50%;
		--large-width: calc(100% / 6 * 5);
		--small-width: calc(100% / 6);
		--principle-text-size: calc(6vw + 10vh);
		--hover-text-size: var(--principle-text-size);

		@include small {
			--compressed: 150%;
			--stretched: 50%;
			--principle-text-size: calc(20vw + 10vh);
			--hover-text-size: calc(20vw + 10vh);
		}
	}

	.title {
		display: flex;
		position: absolute;
		width: 100%;
		top: 0%;
		z-index: 2;
		justify-content: center;
		text-transform: uppercase;
		font-size: 2.5rem;
		transition: opacity 0.25s ease;

		@include small {
			font-size: 2rem;
			width: unset;
			top: 50%;
			left: 0;
			writing-mode: tb;
			transform: translateY(-50%) rotate(180deg);
		}

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
		height: 100dvh;
		flex-direction: column;

		@include large {
			flex-direction: row;
		}
	}

	.section {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		transition: all var(--transition-duration) ease-in-out;

		&.exhibition {
			background-color: var(--green);
			flex-basis: var(--large-width);

			.text {
				@include small {
					font-stretch: var(--stretched);
				}
			}

			.hover-album & {
				flex-basis: var(--small-width);

				.text {
					font-stretch: var(--compressed);

					@include small {
						font-size: 25px;
					}
				}
			}
		}

		&.album {
			flex-basis: var(--small-width);

			.text {
				font-stretch: var(--compressed);

				@include small {
					font-size: 25px;
				}
			}

			.hover-album & {
				flex-basis: var(--large-width);

				.text {
					font-stretch: var(--stretched);

					@include small {
						font-size: 120px;
					}
				}
			}
		}
	}

	.text {
		width: 100%;
		font-size: var(--principle-text-size);
		text-transform: uppercase;
		line-height: 0.8;
		transition: var(--transition-duration) ease-in-out;
		transition-property: font-stretch, font-size;
		text-align: center;
		position: relative;
		z-index: 2;

		[class='^hover'] & {
			font-size: var(--principle-text-size);
		}
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
