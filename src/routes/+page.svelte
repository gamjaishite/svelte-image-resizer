<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import ImageResizer from '$lib/imageResizer.svelte';

	let active: boolean = true;
	let width: number = 0;
	let height: number = 0;

	const onActiveChange = (act: boolean) => {
		active = act;
	};
</script>

<div class="flex-1 flex flex-col items-center justify-center p-4 gap-4">
	<ImageResizer
		src="https://i.pinimg.com/564x/e8/f2/2d/e8f22d3f8e76c5e0725e5eaadd3119ff.jpg"
		className="w-[300px] bg-cover p-1"
		{active}
		onResize={(w, h) => {
			width = w;
			height = h;
		}}
	/>
	<div class="flex items-center space-x-2 py-4">
		<Switch id="airplane-mode" checked={active} onCheckedChange={onActiveChange} />
		<Label for="airplane-mode">Active</Label>
	</div>
	<div class="flex items-center gap-2">
		<p class="p-2 border rounded-md">Width: {width}</p>
		<p class="p-2 border rounded-md">Height: {height}</p>
	</div>
</div>
