## `GitHub`托管代码

在`GitHub`中的个人仓库中创建一个新的项目仓库

1. 进入项目文件，打开`git`终端
2. 初始化仓库：`git init`
3. 添加一个`README.md`文件：`git add README.md`
4. 添加所有文件到暂存区：`git add .`
5. 添加一条说明：`git commit -m "feat : 2024/5/11创建项目"`
6. 切换分支：`git branch -M main`
7. 指定push的源：`git remote add origin https://github.com/jinlinchao123/vue3-crud.git`
8. `push`提交：`git push -u origin main`
9. 修改后的代码提交：
   1. `git add .`
   2. `git commit -m "修改描述"`
   3. `git push -u origin main`