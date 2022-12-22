<h1 class="title">
	<span class="kotti">Kotti</span>
	<span class="island">Island</span>
</h1>

<style lang="scss">
	@import '../../lib/styles/support';

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
</style>
