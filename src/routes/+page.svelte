<script lang="ts">
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import anime from 'animejs'
	import KottiIslandLogo from '$components/KottiIslandLogo.svelte'
	import { page } from '$app/stores'

	$: {
		// @ts-ignore
		if (typeof gtag !== 'undefined') {
			// @ts-ignore
			gtag('config', 'G-HBS26GGYX2', {
				page_title: document.title,
				page_path: $page.url.pathname,
			})
		}
	}

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
	let activeSection: Section = 'album'

	let containerElement: HTMLElement

	let smallViewBoxWidth = 0
	let viewBoxHeight = 0
	let ellipseRotation = 0

	function setActiveSection(s: Section) {
		return () => {
			// Hacky way avoid `selected` animation being started immediately on mobile due to event propagation
			setTimeout(() => {
				activeSection = s
			}, 100)
		}
	}

	function setViewBox() {
		const { width, height } = containerElement.getBoundingClientRect()
		smallViewBoxWidth = width / 6
		viewBoxHeight = height

		// Tweak the rotation of the ellipse to not go over the sides
		const arbitraryMagicNumber = isMobile ? 92 : 32
		ellipseRotation = arbitraryMagicNumber * (smallViewBoxWidth / viewBoxHeight)
	}

	function onPageShow(event: Event) {
		const historyTraversal =
			event.persisted ||
			(typeof window.performance != 'undefined' && window.performance.navigation.type === 2)
		if (historyTraversal) {
			window.location.reload()
		}
	}

	// Refs
	let ellipse: SVGEllipseElement
	let rect: SVGRectElement

	onMount(() => {
		setViewBox()
	})

	$: animationDuration = isMobile ? 900 : 1000

	$: animationDefaults = {
		easing: 'easeInOutSine',
		duration: animationDuration,
	}

	$: shapeStates = {
		albumActive: {
			rect: {
				x: isMobile ? '-1700%' : '50%',
				y: isMobile ? '40%' : '0%',
				width: isMobile ? '3500%' : '15%',
				height: isMobile ? '15%' : '100%',
				...animationDefaults,
			},
			ellipse: {
				rx: '250%',
				ry: isMobile ? '50%' : '25%',
				...animationDefaults,
			},
		},
		exhibitionActive: {
			rect: {
				x: isMobile ? '-140%' : '-180%',
				y: isMobile ? '5%' : '25%',
				width: isMobile ? '380%' : '460%',
				height: isMobile ? '90%' : '50%',
				...animationDefaults,
			},
			ellipse: {
				rx: isMobile ? '1600%' : '40%',
				ry: isMobile ? '40%' : '50%',
				...animationDefaults,
			},
		},
	}

	$: {
		// Big ellipse, smaller rectangle
		if (browser && activeSection === 'album') {
			anime({ targets: rect, ...shapeStates.albumActive.rect })
			anime({ targets: ellipse, ...shapeStates.albumActive.ellipse })
		} else if (browser) {
			// Big rectangle, smaller ellipse
			anime({ targets: rect, ...shapeStates.exhibitionActive.rect })
			anime({ targets: ellipse, ...shapeStates.exhibitionActive.ellipse })
		}
	}

	let selected: Section | null = null

	function navigateToExhibition() {
		window.location.href = 'https://info.kottiisland.com/'
	}

	function navigateToAlbum() {
		window.location.href = 'https://info.kottiisland.com/album/homealbumde'
	}

	$: {
		if (selected === 'exhibition') {
			anime({
				targets: rect.parentElement,
				...animationDefaults,
				scale: 3,
				complete: navigateToExhibition,
			})
		} else if (selected === 'album') {
			anime({
				targets: ellipse.parentElement,
				...animationDefaults,
				scale: 3,
				complete: navigateToAlbum,
			})
		}
	}
</script>

<svelte:head>
	<title>Kotti Island</title>
	<meta name="description" content="Eine audiovisuelle Erkundung des Kottbusser Tors" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://kottiisland.com" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Kotti Island" />
	<meta property="og:description" content="Eine audiovisuelle Erkundung des Kottbusser Tors" />
	<meta property="og:image" content="/og-image.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="kottiisland.com" />
	<meta property="twitter:url" content="https://kottiisland.com" />
	<meta name="twitter:title" content="Kotti Island" />
	<meta name="twitter:description" content="Eine audiovisuelle Erkundung des Kottbusser Tors" />
	<meta name="twitter:image" content="/og-image.png" />

	<link
		rel="preload"
		as="font"
		type="font/woff2"
		href="/fonts/ABCGravityVariable.woff2"
		crossorigin="true"
	/>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-HBS26GGYX2">
	</script>
	<script>
		window.dataLayer = window.dataLayer || []
		function gtag() {
			dataLayer.push(arguments)
		}
		gtag('js', new Date())
		gtag('config', 'G-HBS26GGYX2')
	</script>
</svelte:head>

<svelte:window on:resize={setViewBox} on:pageshow={onPageShow} />

<svelte:body on:touchmove|preventDefault|nonpassive={() => void 0} />

<main
	class="container"
	class:hover-exhibition={activeSection === 'exhibition'}
	class:hover-album={activeSection === 'album'}
	bind:this={containerElement}
>
	<div class="title-container" class:disappear={!!selected}>
		<KottiIslandLogo />
	</div>
	<section
		class="section exhibition"
		on:mouseover={setActiveSection('exhibition')}
		on:focus={setActiveSection('exhibition')}
		class:selected={selected === 'exhibition'}
		class:disappear={selected === 'album'}
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
					x={shapeStates.albumActive.rect.x}
					y={shapeStates.albumActive.rect.y}
					width={shapeStates.albumActive.rect.width}
					height={shapeStates.albumActive.rect.height}
					transform="rotate(12 {smallViewBoxWidth / 10} 0)"
					fill="#fff"
				/>
			</svg>
		</div>
		<h1
			class="text exhibition"
			on:click={() => {
				if (isMobile) return
				selected = 'exhibition'
			}}
			on:touchend={() => {
				if (activeSection === 'exhibition') {
					selected = 'exhibition'
				}
			}}
		>
			Eine <br />Ausstel<br />lung
		</h1>
	</section>
	<section
		class="section album"
		on:mouseover={setActiveSection('album')}
		on:focus={setActiveSection('album')}
		class:selected={selected === 'album'}
		class:disappear={selected === 'exhibition'}
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
					rx={shapeStates.albumActive.ellipse.rx}
					ry={shapeStates.albumActive.ellipse.ry}
					transform="rotate({ellipseRotation})"
				/>
			</svg>
		</div>
		<h1
			class="text album"
			on:click={(event) => {
				if (isMobile) return
				selected = 'album'
			}}
			on:touchend={(event) => {
				if (activeSection === 'album') {
					selected = 'album'
				}
			}}
		>
			Ein<br />Album
		</h1>
	</section>
</main>

<style lang="scss">
	@import '../lib/styles/support';

	@keyframes fade-out {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes puff-out {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(1.2);
			opacity: 0;
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

		// Clicked styles
		&.exhibition {
			&.selected {
				flex-basis: 100%;
				.text {
					animation: puff-out 0.75s ease-in-out forwards;
				}
			}
			&.disappear {
				animation: fade-out 0.75s ease-in-out forwards;
				flex-basis: 0;
			}
		}
		&.album {
			&.selected {
				flex-basis: 100%;
				.text {
					animation: puff-out 0.75s ease-in-out forwards;
				}
			}
			&.disappear {
				animation: fade-out 0.75s ease-in-out forwards;
				flex-basis: 0;
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
		cursor: pointer;
	}

	.title-container {
		display: flex;
		position: absolute;
		width: 100%;
		top: 0%;
		z-index: 2;
		justify-content: center;

		@include small {
			font-size: 2rem;
			width: unset;
			top: 50%;
			left: 0;
			writing-mode: tb;
			transform: translateY(-50%) rotate(180deg);
		}

		&.disappear {
			animation: fade-out 0.75s ease-in-out forwards;
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
