export default {
    /**
     * 前端部分
     * 包括FastCrud、GoJs、HTML、Vitepress（按照首字母排序）
     */
    '/F_FastCrud/': [
        {
            text: 'FastCrud',
            items: [
                { text: '基本概念', link: '/F_FastCrud/基本概念' },
                { text: '表格与配置对应关系', link: '/F_FastCrud/表格与配置对应关系' },
                { text: '页面配置', link: '/F_FastCrud/页面配置' },
                { text: 'index.vue和crud.tsx之间的传值', link: '/F_FastCrud/index.vue和crud.tsx之间的传值' },
                { text: 'columns的配置', link: '/F_FastCrud/columns的配置' },
                { text: 'component组件配置项', link: '/F_FastCrud/component组件配置项' },
                { text: '字段类型', link: '/F_FastCrud/字段类型' },
                { text: '动态计算', link: '/F_FastCrud/动态计算' },
                { text: '案例解决方案积累', link: '/F_FastCrud/案例解决方案积累' },
            ]
        }
    ],
    '/F_GoJs': [
        {
            text: 'GoJs',
            items: [
                { text: '基本概念', link: '/F_GoJs/基本概念' },
                { text: '图表(Diagram)', link: '/F_GoJs/图表(Diagram)' },
                { text: '数据模型(Model)', link: '/F_GoJs/数据模型(Model)' },
                { text: '节点(Node)', link: '/F_GoJs/节点(Node)' },
                { text: '端口(Port)', link: '/F_GoJs/端口(Port)' },
                { text: '常用的API', link: '/F_GoJs/常用的API' },
                { text: '拓展', link: '/F_GoJs/拓展' },
                { text: 'SVG节点', link: '/F_GoJs/SVG节点' },
                { text: 'RBM项目中的Gojs', link: '/F_GoJs/RBM项目中的Gojs' },
            ]
        }
    ],
    '/F_HTML/': [
        {
            text: 'HTML',
            items: [
                { text: '基础概念', link: '/F_HTML/基础概念' },
                { text: '文档结构', link: '/F_HTML/文档结构' },
                { text: '标签', link: '/F_HTML/标签' },
                { text: '图片和链接', link: '/F_HTML/图片和链接' },
                { text: '表单', link: '/F_HTML/表单' },
                { text: '表格与音频', link: '/F_HTML/表格与音频' },
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
                { text: '问题记录', link: '/F_VitePress/问题记录' },
            ]
        }
    ],

    /**
     * 数据库部分
     * 包括MySQL、PostgreSQL（按照首字母排序）
     */
    '/D_MySQL/': [
        {
            text: 'MySQL',
            items: [
                { text: '基本概念', link: '/D_MySQL/基本概念' },
                { text: '连接数据库服务器', link: '/D_MySQL/连接数据库服务器' },
                { text: '导入外部SQL文件', link: '/D_MySQL/导入外部SQL文件' },
                { text: '数据库管理操作', link: '/D_MySQL/数据库管理操作' },
                { text: '数据类型', link: '/D_MySQL/数据类型' },
                { text: '时间日期', link: '/D_MySQL/时间日期' },
                { text: '排序和统计', link: '/D_MySQL/排序和统计' },
                { text: '多表操作', link: '/D_MySQL/多表操作' },
                { text: '正则表达式在MySQL中的使用', link: '/D_MySQL/正则表达式在MySQL中的使用' },
                { text: '事务处理', link: '/D_MySQL/事务处理' },
                { text: '锁机制', link: '/D_MySQL/锁机制' },
                { text: '外键约束', link: '/D_MySQL/外键约束' },
                { text: '索引优化', link: '/D_MySQL/索引优化' },
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
     * 包括Java、NestJs（按照首字母排序）
     */
    '/B_Java/': [
        {
            text: 'Java',
            items: [
                { text: '基本概念', link: '/B_Java/基本概念' },
                { text: '转义字符', link: '/B_Java/转义字符' },
                { text: '变量', link: '/B_Java/变量' },
                { text: 'API', link: '/B_Java/API' },
            ]
        }
    ],
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
                { text: '管道与验证', link: '/B_NestJs/管道与验证' },
                { text: '注册和登录', link: '/B_NestJs/注册和登录' },
                { text: 'JWT认证', link: '/B_NestJs/JWT认证' },
                { text: '文件上传', link: '/B_NestJs/文件上传' },
                { text: 'CRUD增删改查', link: '/B_NestJs/CRUD增删改查' },
                { text: '角色验证', link: '/B_NestJs/角色验证' },
            ]
        }
    ],

    /**
     * 开发工具部分
     * 包括Blender、Docker、Git、Markdown、Ubuntu、Vim、VSCode（按照首字母排序）
     */
    '/T_Blender/': [
        {
            text: 'Blender',
            items: [
                { text: '基本概念', link: '/T_Blender/基本概念' },
                { text: '场景的操作', link: '/T_Blender/场景的操作' },
                { text: '对象的操作', link: '/T_Blender/对象的操作' },
                { text: '加入node插件', link: '/T_Blender/加入node插件' },
                { text: '技巧积累', link: '/T_Blender/技巧积累' },
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
    '/T_Git/': [
        {
            text: 'Git',
            items: [
                { text: '基本概念', link: '/T_Git/基本概念' },
                { text: '常用指令', link: '/T_Git/常用指令' },
                { text: '配置用户信息', link: '/T_Git/配置用户信息' },
                { text: '创建本地仓库', link: '/T_Git/创建本地仓库' },
                { text: '克隆远程项目', link: '/T_Git/克隆远程项目' },
                { text: '本地仓库相关操作', link: '/T_Git/本地仓库相关操作' },
                { text: '分支管理', link: '/T_Git/分支管理' },
                { text: 'Tag标签', link: '/T_Git/Tag标签' },
                { text: '发布软件包', link: '/T_Git/发布软件包' },
                { text: '项目托管平台', link: '/T_Git/项目托管平台' },
                { text: '自动部署', link: '/T_Git/自动部署' },
                { text: '常见问题', link: '/T_Git/常见问题' },
            ]
        }
    ],
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
    '/T_Ubuntu/': [
        {
            text: 'Ubuntu',
            items: [
                { text: '基本概念', link: '/T_Ubuntu/基本概念' },
                { text: '安装系统', link: '/T_Ubuntu/安装系统' },
                { text: '更换软件源', link: '/T_Ubuntu/更换软件源' },
                { text: '软件安装', link: '/T_Ubuntu/软件安装' },
                { text: '重要目录', link: '/T_Ubuntu/重要目录' },
                { text: '常用命令', link: '/T_Ubuntu/常用命令' },
                { text: '进阶知识', link: '/T_Ubuntu/进阶知识' },
                { text: '安装Git和配置ssh', link: '/T_Ubuntu/安装Git和配置ssh' },
                { text: '常见技巧', link: '/T_Ubuntu/常见技巧' },
                { text: '问题记录', link: '/T_Ubuntu/问题记录' },
            ]
        }
    ],
    '/T_Vim/': [
        {
            text: 'Vim',
            items: [
                { text: '基本概念', link: '/T_Vim/基本概念' },
                { text: '三大模式', link: '/T_Vim/三大模式' },
                { text: '正常模式的常用操作', link: '/T_Vim/正常模式的常用操作' },
                { text: '编辑模式的常用操作', link: '/T_Vim/编辑模式的常用操作' },
                { text: '行底模式的常用操作', link: '/T_Vim/行底模式的常用操作' },
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
                { text: '快捷键', link: '/T_VSCode/快捷键' },
                { text: '使用积累', link: '/T_VSCode/使用积累' },
            ]
        }
    ],

    /**
     * 经验积累部分
     * 包括Web开发环境搭建、面试问题积累（按照首编写时间排序）
     */
    '/E_Web开发环境搭建/': [
        {
            text: 'Web开发环境搭建',
            items: [
                { text: '基本概念', link: '/E_Web开发环境搭建/基本概念' },
                { text: '前端部分', link: '/E_Web开发环境搭建/前端部分' },
                { text: '后端部分', link: '/E_Web开发环境搭建/后端部分' },
                { text: 'GitHub托管代码', link: '/E_Web开发环境搭建/GitHub托管代码' },
            ]
        }
    ],
    '/E_面试问题积累/': [
        {
            text: '面试问题积累',
            items: [
                { text: '基本概念', link: '/E_面试问题积累/基本概念' },
                { text: '基础性问题', link: '/E_面试问题积累/基础性问题' },
            ]
        }
    ],
    '/E_开发积累/': [
        {
            text: '开发积累',
            items: [
                { text: '基本概念', link: '/E_开发积累/基本概念' },
                { text: '前端', link: '/E_开发积累/前端' },
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