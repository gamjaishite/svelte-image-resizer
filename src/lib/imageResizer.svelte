<script lang="ts">
	import { onMount } from 'svelte';
	import { Resizer, imageProps } from './resizer.js';
	import { cn } from './utils.js';

	export let src: string;
	export let alt: string | undefined = 'Image';
	export let className: string | undefined = '';
	export let active: boolean | undefined = true;
	export let precision: number | undefined = 5;
	export let onResize: ((width: number, height: number) => void) | undefined = undefined;

	let image: HTMLImageElement;
	let resizer: Resizer;

	let nHandle: HTMLSpanElement;
	let eHandle: HTMLSpanElement;
	let sHandle: HTMLSpanElement;
	let wHandle: HTMLSpanElement;
	let nwHandle: HTMLSpanElement;
	let neHandle: HTMLSpanElement;
	let seHandle: HTMLSpanElement;
	let swHandle: HTMLSpanElement;

	const handleResizer = (
		handler: HTMLSpanElement,
		resizer: (e: MouseEvent | TouchEvent) => void
	) => {
		handler.addEventListener('mousedown', resizer);
		handler.addEventListener('touchstart', resizer);
		return {
			destroy() {
				handler.removeEventListener('mousedown', resizer);
				handler.removeEventListener('touchstart', resizer);
			}
		};
	};

	onMount(() => {
		const imageStyles = window.getComputedStyle(image);
		const width = parseInt(imageStyles.width, 10);
		const height = parseInt(imageStyles.height, 10);

		if (onResize) onResize(width, height);

		let aspectRatio = width / height;

		image.style.width = `${width}px`;
		image.style.height = `${height}px`;

		let cursorX = 0;
		let cursorY = 0;

		resizer = new Resizer(
			aspectRatio,
			width,
			height,
			image,
			cursorX,
			cursorY,
			document,
			imageStyles
		);

		imageProps.subscribe((val) => {
			if (onResize)
				onResize(
					parseFloat(val.width.toFixed(precision)),
					parseFloat(val.height.toFixed(precision))
				);
		});

		nHandle.addEventListener('mousedown', resizer.boundedHandleMouseDownTopResize);
		nHandle.addEventListener('touchstart', resizer.boundedHandleMouseDownTopResize);
		eHandle.addEventListener('mousedown', resizer.boundedHandleMouseDownRightResize);
		eHandle.addEventListener('touchstart', resizer.boundedHandleMouseDownRightResize);
		sHandle.addEventListener('mousedown', resizer.boundedHandleMouseDownBottomResize);
		sHandle.addEventListener('touchstart', resizer.boundedHandleMouseDownBottomResize);
		wHandle.addEventListener('mousedown', resizer.boundedHandleMouseDownLeftResize);
		wHandle.addEventListener('touchstart', resizer.boundedHandleMouseDownLeftResize);
		nwHandle.addEventListener('mousedown', resizer.boundedHandleMouseDownTopCornerResize);
		nwHandle.addEventListener('touchstart', resizer.boundedHandleMouseDownTopCornerResize);
		neHandle.addEventListener('mousedown', resizer.boundedHandleMouseDownTopCornerResize);
		neHandle.addEventListener('touchstart', resizer.boundedHandleMouseDownTopCornerResize);
		seHandle.addEventListener('mousedown', resizer.boundedHandleMouseDownBottomCornerResize);
		seHandle.addEventListener('touchstart', resizer.boundedHandleMouseDownBottomCornerResize);
		swHandle.addEventListener('mousedown', resizer.boundedHandleMouseDownBottomCornerResize);
		swHandle.addEventListener('touchstart', resizer.boundedHandleMouseDownBottomCornerResize);
	});
</script>

<div class="relative">
	<img {src} {alt} class={cn('p-1.5', className)} id="image" bind:this={image} />

	{#if active}
		<span class="border-t border-dotted border-zinc-300 absolute border-2 top-0 w-full" />
		<span class="border-r border-dotted border-zinc-300 absolute right-0 h-full border-2 top-0" />
		<span class="border-b border-dotted border-zinc-300 absolute border-2 bottom-0 w-full" />
		<span class="border-l border-dotted border-zinc-300 absolute left-0 h-full border-2 top-0" />

		<!-- corner -->
		<span
			class="cursor-nw-resize w-4 h-4 bg-primary absolute -top-1.5 -left-1.5"
			bind:this={nwHandle}
			use:handleResizer={resizer && resizer.boundedHandleMouseDownTopCornerResize}
		/>
		<span
			class="cursor-ne-resize w-4 h-4 bg-primary absolute -top-1.5 -right-1.5"
			bind:this={neHandle}
			use:handleResizer={resizer && resizer.boundedHandleMouseDownTopCornerResize}
		/>
		<span
			class="cursor-se-resize w-4 h-4 bg-primary absolute -bottom-1.5 -right-1.5"
			bind:this={seHandle}
			use:handleResizer={resizer && resizer.boundedHandleMouseDownBottomCornerResize}
		/>
		<span
			class="cursor-sw-resize w-4 h-4 bg-primary absolute -bottom-1.5 -left-1.5"
			bind:this={swHandle}
			use:handleResizer={resizer && resizer.boundedHandleMouseDownBottomCornerResize}
		/>

		<!-- side -->
		<span
			class="cursor-n-resize w-4 h-4 rounded-full bg-primary absolute -top-1.5 left-1/2 -translate-x-1/2"
			bind:this={nHandle}
			use:handleResizer={resizer && resizer.boundedHandleMouseDownTopResize}
		/>
		<span
			class="cursor-e-resize w-4 h-4 rounded-full bg-primary absolute -right-1.5 top-1/2 -translate-y-1/2"
			bind:this={eHandle}
			use:handleResizer={resizer && resizer.boundedHandleMouseDownRightResize}
		/>
		<span
			class="cursor-s-resize w-4 h-4 rounded-full bg-primary absolute -bottom-1.5 left-1/2 -translate-x-1/2"
			bind:this={sHandle}
			use:handleResizer={resizer && resizer.boundedHandleMouseDownBottomResize}
		/>
		<span
			class="cursor-w-resize w-4 h-4 rounded-full bg-primary absolute -left-1.5 top-1/2 -translate-y-1/2"
			bind:this={wHandle}
			use:handleResizer={resizer && resizer.boundedHandleMouseDownLeftResize}
		/>
	{/if}
</div>
