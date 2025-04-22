## `FastCrud`表格相关

### 在`FastCrud`配置本地数据时出现的数据无法导入到表格中

一定要加上`total`参数，否则无法实现数据传递到表格中，两种格式的输入都可以

```ts
const pageRequest = async (query: UserPageQuery) => {
    return {total:2,
            data:[
                {"classification":'腐蚀减弱', "damageMode":'大气腐蚀（有隔热层）'},
                {"classification":'腐蚀减弱', "damageMode":'盐酸腐蚀'},
                {classification:'腐蚀减弱', damageMode:'大气腐蚀（有隔热层）'},
                {classification:'腐蚀减弱', damageMode:'二氧化碳腐蚀'},
            ],
            page:1,
            limit:20}
    // return await getFaultMechanismList(query);
};
```

***

### 表格页面触发一次刷新

在`.tsx`文件中如果按钮点击事件需要触发一次表格数据刷新，可以通过以下的代码进行触发：`rudExpose.doRefresh();`

该方法暴露在其`.vue`父文件中，在触发页面时自动刷新

```ts
onMounted(() => {
    crudExpose.doRefresh();
})
```

***

### 自定义一个按钮事件

```ts
alarmAcknowledgement: {
    icon: 'Select',  //按钮的图标
    text: '告警确认',  //按钮的名字
    order:1,  //按钮的先后顺序
    style: { backgroundColor: '#409eff', color: 'white' },  //按钮的样式设置
    click: compute(({row}) => {   //按钮的自定义点击事件
        return async () => {
            await postFeedbackAlarm({ alarmId: row.id, feedback: '告警确认' });
            crudExpose.doRefresh();  //触发一次界面刷新
        };
    }),
    disabled: compute(({ row }) => {  //按钮禁用触发事件
        return row.feedback !== null;
    }),
},
```

***

### 多行标签展示（防止显示不正常）

```tsx
'activities.ids': { //数据支持多级结构 row={key:xx,activities:{ids:xxx}}
    title: '维护活动',
    type: 'dict-select',
    search: { show: false },
    column: { show: true, sortable: false, minWidth: 150},
    addForm: { show: true },
    editForm: { show: true },
    form: {
        component: {
            props: {
                multiple: true  //设置支持列表内容多选
            }
        }
    },
    dict: dict({  //获取列表数据，最好用以下的方法
        value: 'id',
        label: 'active',
        cache: true,
        getData: async () => {
            return await getRepairMaintenanceWorkList({ limit: 0 }).then((res: any) => {
                return res.data;
            });
        },
    }),
},
```

***

### 对于创建时间的条目创建和时间筛选

字段创建：

```tsx
create_datetime: {
    title: '创建时间',
    type: 'datetime',
    search: { show: true, col: { span: 6 }, component: { type: 'datetimerange', shortcuts: shortcuts } },
    column: { show: true, sortable: true, minWidth: 150 },
    addForm: { show: false },
    editForm: { show: false },
},
```

筛选时间代码：在`export const createCrudOptions`中添加

```tsx
if (query.create_datetime) {
    newQuery.create_datetime__gt = query.create_datetime[0]
    newQuery.create_datetime__lt = query.create_datetime[1]
    delete query.create_datetime
}
```

***

### 表单操作界面插槽设计

在`.tsx`对应的`.vue`文件中进行进行插槽的添加

```vue
<fs-crud ref="crudRef" v-bind="crudBinding" customClass="crud-com-box crud-com-table">
    <template #form-body-bottom>
		想要插入的内容
    </template>
</fs-crud>
```

上式为在表单操作界面的底部进行插槽的插入

其他组件插槽的添加：去`element-Plus`组件库中找对应的组件所提供的插槽样式，再进行插槽的添加

如`input`输入框的插槽`API`：

```vue
<el-input>
    <template #prepend>
		{{ "维护人" }}
    </template>
</el-input>
```

***

### 表单操作界面获取表格内的数值

通过表单事件`wrapper`方法获取表单数据，如点击详情操作触发数据获取：对话框打开完成事件处理方法

```ts
viewForm: {
    wrapper: {
        onOpened: ({form}) => {
            context.maintenanceInfo.value = form.personnel_times
        },
    }
},
```

通过`context`将获取到表单的数据传递给外部`.vue`文件使用

***

### 重新加载某字段的字典

调用其`reloadDict`方法重新加载字典

```ts
editForm: {
    wrapper: {
        onOpened: ({form}) => {
            crudExpose.getFormComponentRef('fault').reloadDict();
        },
    }
},
```

上述为重新加载`fault`字段的字典

***

### 去除操作对话框的底部按钮

```ts
viewForm: {
    wrapper: {
        buttons: {
            cancel: {show: false}, // 取消按钮
            reset: {show: false},  // 重置按钮
            ok: {show: false},     // 确认按钮
        }
    }
},
```

***

### 表单某些字段内容提交默认的数据

```ts
const addRequest = async ({ form }: AddReq) => {
    form.status = 'maintenance_handle_status_2'
    return await postMaintenance(form);
};
```

上述为将`status`字段进行默认数据的提交

***

### 表单某字段显示默认值

点击添加表单数据时，使其中的设备字段默认显示内容：

```ts
addForm: {
    labelPosition: 'top',
    wrapper: {
        onOpened: async ({ form }) => {
            form.device = context.props?.deviceId; // 将外界的设备id传入进行设备name的选择
        },
    },
},
    
// 设备字段是根据其id选择对应的设备name
device: {
    title: '设备',
    type: 'dict-select',
    search: { show: false },
    column: {
    show: false,
    sortable: false,
    minWidth: 150,
    formatter({ value, row, index }: { value: any; row: any; index: any }) {
        return value?.name || null;
    },
},
    addForm: { show: true, rules: [{ required: true, message: '设备字段不能为空', trigger: 'blur' }] },
    editForm: { show: true },
    dict: dict({
        label: 'name',
        value: 'id',
        getData: async () => {
            let res = await getDeviceList({
                limit: 1,
                id: context.props?.deviceId,
            });
            return res.data;
        },
    }),
    form: {
        valueChange({ form, value, getComponentRef }: { form: any; value: any; getComponentRef: any }) {
            form.mode = '';
            getComponentRef('fault').reloadDict();
        },
},
},
```

***

### 函数延迟运行

```ts
addForm: {
    labelPosition: 'top',
    wrapper: {
        onOpened: async ({ form }) => {
            context.maintenanceInfo.value = [];
            form.device = context.props?.deviceId;  // 运行速度比getFormComponentRef慢
            // 先有设备在去匹配其故障记录
            setTimeout(()=>{
                crudExpose.getFormComponentRef('fault').reloadDict();  // 运行速度快，需要延时
            })
        },
    },
},
```

***

### 点击操作按钮后改变按钮的样式

提醒用户哪个按钮被点击了

```ts
const selectItem = ref('');

export const createCrudOptions = function ({ crudExpose, context }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const pageRequest = async (query: UserPageQuery) => {
    return await getDamageModeList(query).then((res: any) => {
      // console.log(res);
      context.modeInfo(res.data[0]);
      selectItem.value = res.data[0].id;
      return res;
    });
  };
}

view: {
    icon: 'Search',
    order: 1,
    // style: { color: '#409eff' },
    type: compute(({ row }) => {
        return row.id === selectItem.value ? 'primary' : 'default';
    }),
    click: async ({ row }) => {
        context.modeInfo(row);
        selectItem.value = row.id;
    },
},
```

