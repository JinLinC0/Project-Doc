---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "JinLinC"
  # text: "在线文档库"
  tagline: 记录学习，分享知识，个人在线项目文档库
  image:
    src: /logo.svg
    alt: 图片的提示信息
  actions:
    - theme: brand
      text: 个人简介
      link: /introduceMe.md
    - theme: alt
      text: 笔记更新历程
      link: /笔记更新历程.md
      
features:
  - title: 不断更新
    details: 持续迭代，创新不息：不保持活力与创新，在变化中不断进步与完善！
  - title: 开源共享
    details: 开放代码，共享智慧：开源让世界自由创新，共同交流和进步！
  - title: 联系方式
    details: 邮箱：jlc2794810071@163.com 微信：j2794810071
---

<HomeComponent />

<style>
@media (max-width: 768px) {
  .VPImage.image-src {
    display: none;
  }
}
</style>