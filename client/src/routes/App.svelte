<script>
  import logo from "$lib/images/logo.png";
  import { getNotificationsContext } from "svelte-notifications";

  const { addNotification } = getNotificationsContext();
  //   const websocketUrl = writable(null);

  let videoFile = null;
  let compressionInProgress = false;
  let progressMessages = [];
  async function uploadAndCompress() {
    addNotification({
      text: "Compression is currently offline.",
      position: "top-right",
      type: "error",
      removeAfter: 4000,
    });
    // if (!videoFile || compressionInProgress) {
    // 	return;
    // }

    // try {
    // 	compressionInProgress = true;

    // 	const formData = new FormData();
    // 	formData.append('video', videoFile);

    // 	// Simulate an API call to the backend to start the compression
    // 	// Replace this with your actual API endpoint
    // 	const response = await fetch('https://your-backend-url/compress', {
    // 		method: 'POST',
    // 		body: formData
    // 	});

    // 	if (response.ok) {
    // 		const { websocketUrl: newWebSocketUrl } = await response.json();
    // 		websocketUrl.set(newWebSocketUrl);
    // 		startWebSocket(newWebSocketUrl);
    // 	} else {
    // 		throw new Error('Compression request failed.');
    // 	}
    // } catch (error) {
    // 	console.error(error);
    // 	compressionInProgress = false;
    // }
  }
</script>

<div class="app">
  <header id="header">
    <div class="corner">
      <img src={logo} alt="cammy-logo" style="width: 3em; height: 3em" />
    </div>
  </header>
  <div id="upload-area" tabindex="-1" aria-label="Click to select a video">
    <div class="wrapper">
      <div class="file-upload">
        <input type="file" id="file-input" on:change={uploadAndCompress} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="512"
          height="512"
          viewBox="0 0 512 512"
          ><path
            fill="currentColor"
            d="M256 464a208 208 0 1 1 0-416a208 208 0 1 1 0 416m0-464a256 256 0 1 0 0 512a256 256 0 1 0 0-512m120.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304v-96c0-17.7-14.3-32-32-32h-32c-17.7 0-32 14.3-32 32v96h-57.7c-12.3 0-22.3 10-22.3 22.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5z"
          /></svg
        >
      </div>
    </div>
  </div>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    box-sizing: border-box;
    margin: 0 auto;
    width: 100%;
  }
  #file-input {
    cursor: pointer;
  }
  #upload-area {
    border: 2px dashed #ccc;
    display: flex;
    padding: 20px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    height: 75vh;
    background-color: white;
    margin: 1em;
  }
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 5px;
  }
  .wrapper .file-upload {
    border-radius: 50%;
    background-color: #00a9e5;
    cursor: pointer;
    height: 200px;
    width: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px solid #ffffff;
    overflow: hidden;
    background-image: linear-gradient(to bottom, #00a9e5 50%, #ffffff 50%);
    background-size: 100% 200%;
    transition: all 1s;
    color: #ffffff;
    font-size: 100px;
  }
  .wrapper .file-upload input[type="file"] {
    height: 200px;
    width: 200px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
  .wrapper .file-upload:hover {
    background-position: 0 -100%;
    color: #00a9e5;
    cursor: pointer;
  }
</style>
