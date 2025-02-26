export default {
    /**
     * 前端部分
     * 包括HTML和Vitepress
     */
    '/F_HTML/': [
        {
            text: 'HTML',
            items: [
                { text: '基础概念', link: '/F_HTML/基础概念' },
                { text: '文档结构', link: '/F_HTML/文档结构' },
                { text: '标签', link: '/F_HTML/标签' },
                { text: '图片和链接', link: '/F_HTML/图片和链接'},
                { text: '表单', link: '/F_HTML/表单'},
                { text: '表格与音频', link: '/F_HTML/表格与音频'},
            ]
        }
    ],
    '/F_VitePress/': [
        {
            text: 'VitePress',
            items: [
                { text: '基本概念', link: '/F_VitePress/基本概念' },
                { text: '快速搭建', link: '/F_VitePress/快速搭建' },
                { text: '基本配置', link: '/F_VitePress/基本配置' },
                { text: '自定义首页', link: '/F_VitePress/自定义首页' },
                { text: '问题记录', link: '/F_VitePress/问题记录'},
            ]
        }
    ],
    /**
     * 数据库部分
     * 包括MySQL和PostgreSQL
     */
    '/D_MySQL/': [
        {
            text: 'MySQL',
            items: [
                { text: '基本概念', link: '/D_MySQL/基本概念' },
                { text: '连接数据库服务器', link: '/D_MySQL/连接数据库服务器' },
                { text: '导入外部SQL文件', link: '/D_MySQL/导入外部SQL文件' },
                { text: '数据库管理操作', link: '/D_MySQL/数据库管理操作' },
                { text: '数据类型', link: '/D_MySQL/数据类型'},
                { text: '时间日期', link: '/D_MySQL/时间日期'},
                { text: '排序和统计', link: '/D_MySQL/排序和统计'},
                { text: '多表操作', link: '/D_MySQL/多表操作'},
                { text: '正则表达式在MySQL中的使用', link: '/D_MySQL/正则表达式在MySQL中的使用' },
                { text: '事务处理', link: '/D_MySQL/事务处理'},
                { text: '锁机制', link: '/D_MySQL/锁机制'},
                { text: '外键约束', link: '/D_MySQL/外键约束'},
                { text: '索引优化', link: '/D_MySQL/索引优化'},
                { text: '问题记录', link: '/D_MySQL/问题记录' },
            ]
        }
    ],
    '/D_PostgreSQL/': [
        {
            text: 'PostgreSQL',
            items: [
                { text: '基本概念', link: '/D_PostgreSQL/基本概念' },
                { text: '基础语法', link: '/D_PostgreSQL/基础语法' },
                { text: '远程访问', link: '/D_PostgreSQL/远程访问' },
                { text: 'psycopg2库的增删改查操作', link: '/D_PostgreSQL/psycopg2库的增删改查操作' },
            ]
        }
    ],
    /**
     * 后端部分
     * 包括NestJs
     */
    '/B_NestJs/': [
        {
            text: 'NestJs',
            items: [
                { text: '基本概念', link: '/B_NestJs/基本概念' },
                { text: '环境安装', link: '/B_NestJs/环境安装' },
                { text: '概念介绍和文件结构', link: '/B_NestJs/概念介绍和文件结构' },
                { text: '依赖注入', link: '/B_NestJs/依赖注入' },
                { text: '服务提供者', link: '/B_NestJs/服务提供者' },
                { text: '模块', link: '/B_NestJs/模块' },
                { text: '配置管理', link: '/B_NestJs/配置管理' },
                { text: '数据库相关', link: '/B_NestJs/数据库相关' },
            ]
        }
    ],
    /**
     * 开发工具部分
     * 包括Markdown、Git、VSCode、Docker
     */
    '/T_Markdown/': [
        {
            text: 'Markdown',
            items: [
                { text: '基本概念', link: '/T_Markdown/基本概念' },
                { text: 'Typora快捷键', link: '/T_Markdown/Typora快捷键' },
                { text: '软换行和硬换行', link: '/T_Markdown/软换行和硬换行' },
                { text: '文本编辑模式', link: '/T_Markdown/文本编辑模式' },
            ]
        }
    ],
    '/T_Git/': [
        {
            text: 'Git',
            items: [
                { text: '基本概念', link: '/T_Git/基本概念' },
                { text: '常用指令', link: '/T_Git/常用指令' },
                { text: '配置用户信息', link: '/T_Git/配置用户信息' },
                { text: '创建本地仓库', link: '/T_Git/创建本地仓库' },
                { text: '克隆远程项目', link: '/T_Git/克隆远程项目'},
                { text: '本地仓库相关操作', link: '/T_Git/本地仓库相关操作'},
                { text: '分支管理', link: '/T_Git/分支管理' },
                { text: 'Tag标签', link: '/T_Git/Tag标签' },
                { text: '发布软件包', link: '/T_Git/发布软件包' },
                { text: '项目托管平台', link: '/T_Git/项目托管平台' },
                { text: '自动部署', link: '/T_Git/自动部署'},
                { text: '常见问题', link: '/T_Git/常见问题'},
            ]
        }
    ],
    '/T_VSCode/': [
        {
            text: 'VSCode',
            items: [
                { text: '基本概念', link: '/T_VSCode/基本概念' },
                { text: '界面介绍', link: '/T_VSCode/界面介绍' },
                { text: '主题', link: '/T_VSCode/主题' },
                { text: '插件拓展', link: '/T_VSCode/插件拓展' },
                { text: '快捷键', link: '/T_VSCode/快捷键'},
                { text: '使用积累', link: '/T_VSCode/使用积累'},
            ]
        }
    ],
    '/T_Docker/': [
        {
            text: 'Docker',
            items: [
                { text: '基本概念', link: '/T_Docker/基本概念' },
                { text: '基本使用', link: '/T_Docker/基本使用' },
                { text: '自己开发Docker镜像', link: '/T_Docker/自己开发Docker镜像' },
            ]
        }
    ],
    // '/P_communicate/': [
    //     {
    //         text: 'communicate',
    //         items: [
    //             { text: '2024/10/31', link: '/P_communicate/20241031' },
    //             { text: '2024/11/09', link: '/P_communicate/20241109' },
    //             { text: '2024/11/22', link: '/P_communicate/20241122' },
    //             { text: '2024/11/30', link: '/P_communicate/20241130' },
    //             { text: '章节合并', link: '/P_communicate/交流记录' },
    //         ]
    //     }
    // ]
}