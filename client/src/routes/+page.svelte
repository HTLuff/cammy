<script>
	import DragAndDrop from './DragAndDrop.svelte';
</script>

<svelte:head>
	<title>Cammy</title>
	<meta name="description" content="Cammy demo app" />
</svelte:head>

<section>
	<DragAndDrop />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
