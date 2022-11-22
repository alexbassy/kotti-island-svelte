<script lang="ts">
	import { onMount } from 'svelte'

	let active: 'exhibition' | 'album' = 'exhibition'

	function setViewBox() {
		const ellipseContainer = document.querySelector('.ellipse')!
		// Update the containing viewport to the element size
		const { width, height } = ellipseContainer.getBoundingClientRect()
		ellipseContainer.setAttribute('viewBox', `0 0 ${width} ${height}`)

		// Tweak the rotation of the ellipse to not go over the sides
		const arbitraryMagicNumber = 32
		const shape = ellipseContainer.querySelector('ellipse')!
		shape.setAttribute('transform', `rotate(${arbitraryMagicNumber * (width / height)})`)
	}

	onMount(() => {
		window.addEventListener('resize', setViewBox)
		setViewBox()
	})

	onMount(() => {
		const container = document.querySelector('main.container')
		const exhibitionSection = document.querySelector('.section.exhibition')
		const albumSection = document.querySelector('.section.album')

		exhibitionSection.addEventListener('mouseover', () => {
			container.classList.remove('hover-album')
			container.classList.add('hover-exhibition')
		})
		albumSection.addEventListener('mouseover', () => {
			container.classList.remove('hover-exhibition')
			container.classList.add('hover-album')
		})
	})
</script>

<main class="container">
	<h1 class="title">
		<span class="kotti">Kotti</span>
		<span class="island">Island</span>
	</h1>
	<section
		class="section exhibition"
		on:mouseover={() => (active = 'exhibition')}
		on:focus={() => (active = 'exhibition')}
	>
		<h1 class="text exhibition">Eine Ausstellung</h1>
	</section>
	<section
		class="section album"
		on:mouseover={() => (active = 'album')}
		on:focus={() => (active = 'album')}
	>
		<h1 class="text album">Ein Album</h1>
		<div class="svg-container">
			<svg
				class="ellipse"
				version="1.1"
				width="100%"
				height="100%"
				viewBox="0 0 500 500"
				preserveAspectRatio="xMinYMin meet"
			>
				<ellipse fill="var(--green)" cx="50%" cy="50%" rx="40%" ry="50%" transform="rotate(5)" />
			</svg>
		</div>
	</section>
</main>

<style lang="scss">
	:root {
		--stretched: 150%;
		--compressed: 50%;

		--large-width: calc(100% / 6 * 5);
		--small-width: calc(100% / 6);
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
		transition: all 0.5s ease;

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
		font-size: 170px;
		text-transform: uppercase;
		line-height: 0.8;
		transition: all 0.5s ease;
	}

	.svg-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		ellipse {
			transform-box: fill-box;
			transform-origin: center;
		}
	}
</style>
