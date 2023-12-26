<script>
  import App from "./App.svelte";
  import Notifications from "svelte-notifications";
  import "./styles.css";
</script>

<svelte:head>
  <title>Cammy</title>
  <meta name="description" content="Cammy demo app" />
</svelte:head>

<section>
  <Notifications>
    <App />
  </Notifications>
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
