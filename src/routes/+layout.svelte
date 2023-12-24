<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import '../app.pcss';
	import { IconBrandGithub } from '@tabler/icons-svelte';
</script>

<div class="min-h-screen flex flex-col w-full">
	<Button size="icon" variant="outline" class="absolute left-4 top-4">
		<a
			href="https://github.com/gamjaishite/svelte-image-resizer"
			class="w-full flex items-center justify-center"><IconBrandGithub size={30} /></a
		>
	</Button>
	<slot />
</div>
