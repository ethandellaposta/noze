<script lang="ts">
  import { onMount } from 'svelte'

  export let api: any
  let container: any

  onMount(async () => {
    const map = new google.maps.Map(container, {
      zoom: 11,
      center: {
        lat: 40.742,
        lng: -73.9074
      },
      styles: [
        // black and white
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [
            {
              saturation: -100
            },
            {
              gamma: 0.2
            }
          ]
        },
        {
          featureType: 'all',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        }
      ]
    })

    map.data.loadGeoJson('../new-york-city-boroughs.geojson')

    map.data.setStyle(function (feature) {
      var borough = feature.getProperty('name')
      var color

      switch (borough) {
        case 'Manhattan':
          color = '#4b7bec'
          break
        case 'Brooklyn':
          color = '#fa8231'
          break
        case 'Queens':
          color = '#20bf6b'
          break
        case 'Bronx':
          color = '#eb3b5a'
          break
        case 'Staten Island':
          color = '#8854d0'
          break
      }

      return {
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 3.0,
        fillColor: color,
        fillOpacity: 0.5
      }
    })

    map.data.addListener('mouseover', function (event) {
      map.data.overrideStyle(event.feature, { cursor: 'pointer' })
    })

    map.data.addListener('mouseout', function (event) {
      map.data.revertStyle()
    })

    function getPolygonCentroid(geometry: google.maps.Data.MultiPolygon) {
      let centroid = { lat: 0, lng: 0 }
      let signedArea = 0
      let x0 = 0 // Current vertex X
      let y0 = 0 // Current vertex Y
      let x1 = 0 // Next vertex X
      let y1 = 0 // Next vertex Y
      let a = 0 // Partial signed area

      // For each polygon...
      geometry.getArray().forEach((polygon) => {
        // For each vertex...
        let points = polygon.getAt(0).getArray()
        for (let i = 0; i < points.length; i++) {
          x0 = points[i].lng()
          y0 = points[i].lat()
          x1 = points[(i + 1) % points.length].lng()
          y1 = points[(i + 1) % points.length].lat()
          a = x0 * y1 - x1 * y0
          signedArea += a
          centroid.lng += (x0 + x1) * a
          centroid.lat += (y0 + y1) * a
        }
      })

      signedArea *= 0.5
      centroid.lng /= 6.0 * signedArea
      centroid.lat /= 6.0 * signedArea

      return new google.maps.LatLng(centroid.lat, centroid.lng)
    }

    map.data.addListener('click', async function (event) {
      const featureCenter = getPolygonCentroid(event.feature.getGeometry())

      map.setCenter(featureCenter)
      const pins = await api.findPins()
      console.log({ pins })

      map.setZoom(12)
    })
  })
</script>

<div class="full-screen" bind:this={container} />

<style>
  .full-screen {
    width: 100vw;
    height: 100vh;
  }
</style>
