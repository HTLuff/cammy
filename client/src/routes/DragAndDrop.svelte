<script lang="ts">
	let files: FileList | null = null;

	function handleFiles(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			files = input.files;
		}
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer && event.dataTransfer.files) {
			files = event.dataTransfer.files;
		}
	}

	function clearFiles() {
		files = null;
	}
</script>

<div id="drop-area" on:dragover={(e) => e.preventDefault()} on:drop={handleDrop}>
	{#if !files}
		Drag and drop files here, or click to select files
		<input type="file" id="fileInput" style="display: none;" multiple on:change={handleFiles} />
	{:else}
		<ul>
			{#each Array.from(files) as file (file.name)}
				<li>{file.name}</li>
			{/each}
		</ul>
		<button on:click={clearFiles}>Clear Files</button>
	{/if}
</div>

<style>
	#drop-area {
		border: 2px dashed #ccc;
		padding: 20px;
		text-align: center;
		font-size: 18px;
		cursor: pointer;
	}
</style>
