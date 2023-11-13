import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app') as HTMLElement,
})

window.initMap = function ready() {
  app.$set({ ready: true });
}


export default app
