<script lang="ts">
	import { writable } from 'svelte/store';

	const websocketUrl = writable<string | null>(null);

	let videoFile: File | null = null;
	let compressionInProgress = false;
	let progressMessages: string[] = [];

	function handleFiles(event: Event) {
		console.log(event);
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			videoFile = input.files[0]; // Get the first selected file (assuming only one is allowed)
		}
	}

	async function uploadAndCompress() {
		if (!videoFile || compressionInProgress) {
			return;
		}

		try {
			compressionInProgress = true;

			const formData = new FormData();
			formData.append('video', videoFile);

			// Simulate an API call to the backend to start the compression
			// Replace this with your actual API endpoint
			const response = await fetch('https://your-backend-url/compress', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const { websocketUrl: newWebSocketUrl } = await response.json();
				websocketUrl.set(newWebSocketUrl);
				startWebSocket(newWebSocketUrl);
			} else {
				throw new Error('Compression request failed.');
			}
		} catch (error) {
			console.error(error);
			compressionInProgress = false;
		}
	}

	async function startWebSocket(url: string) {
		const ws = new WebSocket(url);

		ws.onmessage = (event) => {
			progressMessages = [...progressMessages, event.data];
		};

		ws.onopen = () => {
			// WebSocket is open, you can send a message or perform other actions here.
		};

		ws.onclose = () => {
			// WebSocket is closed, you can handle it here.
		};

		ws.onerror = (error) => {
			// Handle WebSocket errors here.
		};
	}

	function clearVideo() {
		videoFile = null;
		compressionInProgress = false;
		progressMessages = [];
		websocketUrl.set(null);
	}
</script>

<div id="upload-area" tabindex="-1" aria-label="Click to select a video">
	{#if videoFile}
		<p>Selected video: {videoFile.name}</p>
	{:else}
		<p>Click to select a video</p>
	{/if}
	<input
		type="file"
		id="videoInput"
		accept="video/*"
		on:change={handleFiles}
		style="display: block"
	/>

	<button on:click={uploadAndCompress} disabled={!videoFile || compressionInProgress} tabindex="-1">
		Upload and Compress
	</button>
	<button on:click={clearVideo} disabled={compressionInProgress} tabindex="-1">Clear Video</button>
</div>

<div class="progress-messages">
	<h2>Compression Progress Messages:</h2>
	<ul>
		{#each progressMessages as message (message)}
			<li>{message}</li>
		{/each}
	</ul>
</div>

<style>
	#upload-area {
		border: 2px dashed #ccc;
		padding: 20px;
		text-align: center;
		font-size: 18px;
		cursor: pointer;
	}

	.progress-messages {
		margin-top: 20px;
	}
</style>
