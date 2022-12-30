<script lang="ts">
	import { get } from 'svelte/store'
	import { activeLanguage } from '../stores/language'
	import { LANGUAGES } from '../types/Map'

	let isOpen = false
</script>

<div class="languageDropdown">
	<button
		class="languageDropdown__button"
		on:click={() => (isOpen = !isOpen)}
		aria-haspopup="true"
		aria-expanded={isOpen}
		aria-controls="languageDropdown__list"
	>
		{$activeLanguage.toUpperCase()}
	</button>
	<ul
		class="languageDropdown__list"
		class:-open={isOpen}
		id="languageDropdown__list"
		role="menu"
		aria-labelledby="languageDropdown__button"
	>
		{#each LANGUAGES as lang}
			<li class="languageDropdown__item">
				<button
					class="languageDropdown__button"
					on:click={() => {
						activeLanguage.set(lang)
						isOpen = false
					}}
					role="menuitem"
					aria-label={lang}
				>
					{lang.toUpperCase()}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.languageDropdown {
		&__button {
			all: unset;
			appearance: none;
			cursor: pointer;
			text-align: center;
			width: var(--header-height);
			height: var(--header-height);

			&:focus-visible {
				text-decoration: underline;
				// make the underline bigger
				text-underline-offset: 2px;
			}
		}

		&__list {
			position: absolute;
			top: 100%;
			right: 0;
			z-index: 1;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			padding: 0;
			margin: 0;
			list-style: none;
			background-color: #fff;
			transform: scaleY(0);
			transform-origin: top;
			pointer-events: none;
			transition: transform 0.1s ease-in-out;

			&.-open {
				transform: scaleY(1);
				pointer-events: all;
			}
		}
		&__item {
		}
	}
</style>
