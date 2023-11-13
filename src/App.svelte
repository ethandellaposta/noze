<script lang="ts">
  import Map from './Map.svelte'
  import { Api } from './api'
  import type { Database } from './database.types'

  export let ready: boolean

  import { createClient } from '@supabase/supabase-js'
  const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY
  const supabase = createClient<Database>('https://xyzcompany.supabase.co', supabaseKey)
  const api = Api.getInstance(supabase)
  const googleMapsKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
  console.log({ googleMapsKey, supabaseKey })
  const mapApi = { findPins: api.findPins }
</script>

<svelte:head>
  <script
    defer
    async
    src="https://maps.googleapis.com/maps/api/js?key={googleMapsKey}&callback=initMap&libraries=places&format=geojson"
  >
  </script>
</svelte:head>

{#if ready}
  <Map api={mapApi} />
{/if}

<style>
  :global(body) {
    padding: 0;
  }
</style>
