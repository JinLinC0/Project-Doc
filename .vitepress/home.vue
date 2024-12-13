<template>
    <div class="ui-home">
        <h2 class="ui-title">个人开源项目</h2>
        <div class="ui-project">
            <div class="item" v-for="data in siteData" :key="data.name">
                <a class="link" :href="data.link" target="_blank">
                    <h3 :class="['title', data.className]">{{ data.name }}</h3>
                    <p class="desc">{{ data.desc }}</p>
                </a>
            </div>
        </div>
    </div>
</template>
<script setup>
import { siteData } from './siteData'
</script>
<style lang="scss">
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

.ui-home {
    width: 100%;
    height: 100%;
    margin: 10px auto;

    .ui-title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        font-size: 26px;
    }
}

.ui-project {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
    justify-content: space-between;

    .link {
        height: 100%;
    }

    .item {
        .link {
            text-decoration: none;
            display: block;
            color: #333;
            background: #252323;
            border-radius: 6px;
            transition: transform 0.3s ease;
        }

        .link:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .title {
            height: 80px;
            padding-top: 25px;
            font-size: 24px;
            color: #fff;
            text-align: center;
            border-radius: 6px 6px 0 0;
        }

        .desc {
            line-height: 2;
            padding: 0 12px;
            margin-top: 14px;
            font-size: 13px;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
        }
    }
}
</style>