import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HomeComponent from '../home.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('HomeComponent', HomeComponent);
  },
}