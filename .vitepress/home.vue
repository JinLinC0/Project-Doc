<template>
    <div class="ui-home">
        <h2 class="ui-title">个人开源项目</h2>
        <div style="display: flex; justify-content: center; align-items: center">
            纯前端的静态项目都已经部署在GitHub Pages上，可以点击在线体验查看效果
        </div>
        <div class="ui-project">
            <div class="item" v-for="data in siteData" :key="data.name">
                <div class="link" :href="data.link" target="_blank">
                    <h3 :class="['title', data.className]">{{ data.name }}</h3>
                    <p class="desc">{{ data.desc }}</p>
                    <div class="footer">
                        <button class="btn" v-if="data.online" @click="goTo(data.online)">在线体验</button>
                        <div class="git">
                            <span>开源代码仓库:</span>
                            <a :href="data.github" target="_blank">
                                <img :src="github"
                                    style="width: 20px; height: 20px; margin-left: 5px; cursor: pointer;">
                            </a>
                            <a :href="data.gitee" target="_blank">
                                <img :src="gitee" style="width: 20px; height: 20px; margin-left: 5px; cursor: pointer;">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { siteData } from './siteData'
import github from '../images/github.svg'
import gitee from '../images/gitee.svg'

function goTo(url) {
    window.open(url)
}
</script>

<style>
/* 颜色类 */
.color-pink {
    background: #90f;
}

.color-red {
    background: #b91d47;
}

.color-blue-deep {
    background: #3360a3;
}

.color-blue {
    background: #2db7f5;
}

/* 主容器 */
.ui-home {
    width: 100%;
    height: 100%;
    margin: 10px auto;
    background-color: var(--vp-c-bg);
    color: var(--vp-c-text);
    font-family: var(--vp-font-family-base);
}

.ui-home .ui-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    font-size: 30px;
    color: var(--vp-c-text);
    font-family: var(--vp-font-family-base);
}

/* 项目列表 */
.ui-project {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
    justify-content: space-between;
    font-family: var(--vp-font-family-base);
}

.ui-project .item {
    display: flex;
}

.ui-project .link {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    text-decoration: none;
    color: var(--vp-c-text);
    background: var(--vp-c-bg-soft);
    border-radius: 6px;
    transition: transform 0.3s ease;
}

.ui-project .item .link:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.ui-project .item .title {
    height: 80px;
    padding-top: 25px;
    font-size: 24px;
    color: var(--vp-c-text-light);
    text-align: center;
    border-radius: 6px 6px 0 0;
    cursor: default;
}

.ui-project .item .desc {
    line-height: 2;
    padding: 0 12px;
    margin-top: 14px;
    font-size: 13px;
    color: var(--vp-c-text-light);
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    cursor: default;
}

.footer {
    margin-top: auto;
    text-align: center;
    border-top: 1px solid #282c31;
    cursor: default;
}

.btn {
    color: antiquewhite;
    background-color: cadetblue;
    border-radius: 5px;
    padding: 3px;
    margin: 5px;
    font-size: 15px;
}

.git {
    background-color: rgb(105, 95, 160);
    color: azure;
    border-radius: 5px;
    padding: 3px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
}
</style>