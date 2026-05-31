import DefaultTheme from 'vitepress/theme'
import OnlineEditor from './components/OnlineEditor.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('OnlineEditor', OnlineEditor)
  }
}
