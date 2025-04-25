## 组合式`API`

选项式`API`是在`export default`对象中一个一个写选项功能，组合`API`是将这些功能组合在一起，方便我们的统一管理，不用进行写一堆的选项，同时，我们可以方便的将一些功能剥离成一个文件方便我们的复用，对于组合式`API`，我们统一写在`setup()函数中`

```vue
<script>
export default({
    setup() {
        ...
    }
})
</script>
```

在`setup()`中不能使用`this`，打印时结果是`undefined`，所以在`setup`中不要使用`data`，`methods`和`computed`，将选项组合到`setup()`函数中，直接在`setup()`函数中进行相关的声明即可实现，即可实现选项式`API`的效果

在`setup()`中进行声明数据和方法后，需要将其`return`返回出去才能提供给模板标签使用

***

### `ref`函数的使用

使用`ref`函数时，需要对其进行引入组合式`API`：`import { ref } from 'vue'`

通过`ref`进行包装的数据，就具备了响应式的特性，当`ref`里的值发生改变时，视图层会自动更新，不需要去刷新页面即可更新；`ref`可以操作基本数据类型，也可以操作复杂数据类型：对象和数组（返回一个响应式的`proxy`对象），将这些数据包装成一个响应式的数据，建议`ref`只用于操作一些基本类型的数据，如数字，字符串，`ref`只包含一个`.value`属性，数据都被包装成了对象类型，如果想要拿到数据要使用`.value`，但是在模板中使用是不需要进行`.value`的，因为`vue`帮我们进行自动处理了

返回值：一个`RefImpl`的实例对象，简称`ref`对象或`ref`，`ref`对象的`value`属性是响应式的，对于`let name = ref('jlc')`来说，`name`不是响应式的，`name.value`是响应式的

简单功能的使用：

```vue
<template>
    <div>
        <h1>姓名：{{name}}</h1>
        <h1>年龄：{{age}}</h1>
        <h1>公司：{{company}}</h1>
        <h1>产品：{{obj.a}}</h1>
        <h1 v-for="(item,index) in arr" :key="index">{{item.xiami}}</h1>

        <hr>
        <button @click="btn">点击更新视图层某个数据</button>
    </div>
</template>

<script>
import {ref} from 'vue'
export default({
    setup() {
        const name = ref('jlc')
        const age = ref(24)
        const company = 'zjgs'
        // 对象类型
        const obj = ref({a:'pyqt',b:'sql'})
        // 数组类型
        const arr = ref([{xiami:'虾米音乐'}])

        function btn() {
            name.value = 'jlc123'
            age.value = 80
            obj.value.a = 'pyqt5'
            arr.value[0].xiami = 'QQ音乐'
        }

        return {name,age,company,obj,arr,btn}
    },
})
</script>
```

```js
const list = ref<any[]>([])  //创建 ref 对象
list.value = [1, 2, 3]   // 对 ref 对象的 value 属性赋值
```

```js
// 使用defineExpose将组件中的数据交给外部
defineExpose({ name, age,title1 });
//其他文件在引入数据后就可以直接使用
import Preson from "./components/Preson/index.vue";
let ren = ref();
function test() {
  console.log(ren.value.name);
  console.log(ren.value.age);
  console.log(ren.value.title1);
}
```

***

### `reactive`函数的使用

使用`reactive`函数时，需要对其进行引入组合式`API`：`import { reactive } from 'vue'`

`reactive`函数和`ref`函数一样为我们的值创建了一个响应式应用，定义基本普通类型数据不能使用`reactive`函数，只能使用`ref`函数，`reactive`函数主要定义复杂的数据类型，如数组，对象；`reactive`函数可以做深层次的数据响应，如多维数组（数组嵌套）；`reactive`函数同样返回一个响应式的`proxy`对象

相比于`ref`函数进行读取/修改数据，不再需要`.value`

简单功能的使用：

```vue
<template>
    <div>
        <h1>姓名：{{obj.name}}</h1>
        <h1>年龄：{{obj.age}}</h1>
        <h1>产品：{{obj.A}}</h1>
        <h1>深层次数据响应：{{obj.pro.a.b[0]}}</h1>
        <button @click="btn">点击更新视图层某个数据</button>
    </div>
</template>

<script>
import { reactive } from 'vue'
export default({
    setup() {
        const name = 'jlc'
        const age = 24
        const A = 'pyqt5'
        const obj = reactive({
            name,
            age,
            A,
            pro:{
                a:{
                    b:['我是深层次的']
                }
            }
        })
        
        function btn() {
            obj.name = 'jlc123'
            obj.age = 80
            obj.a = 'sql'
            obj.pro.a.b[0] = '我已经被修改'
        }

        return {btn,obj}
    },
})
</script>
```

ref和reactive使用原则：

1. 若需要一个基本类型的响应式数据，必须使用`ref`
2. 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以
3. 若需要一个响应式对象，且层级较深，推荐使用`reactive`

***

### `toRef`函数的使用

使用`toRef`函数时，需要对其进行引入组合式`API`：`import { toRef } from 'vue'`

`toRef`函数也可以创建一个响应式数据；`ref`的本质是拷贝粘贴一份数据，脱离了与原数据的交互；`ref`函数将对象中的属性变成响应式数据，修改响应式数据不会影响到原数据，但是会更新视图层；`toRef`的本质是引用，与原始数据有交互，修改响应式数据会影响到原数据，但是不会更新视图层；

`toRef`接收两个参数，第一个参数是要操作的对象，第二个参数是参数对象的某个属性，只能操作一个参数，不能同时操作多个参数

`toRef`的主要作用是将一个响应式对象中的每一个属性，转换为`ref`对象

简单功能的使用：

```js
let person = reactive({
  name: "zhaotongtong",
  age: 18,
});
 
// 通过toRefs将person对象中的n个属性批量取出，且依然保持响应式的能力
let { name, age } = toRefs(person);
// 通过toRef将person对象中的age属性取出，且依然保持响应式的能力
let age_big = toRef(person, "age");

//后续调用
name.value   age.value    age_big.value
```

***

### `toRefs`函数的使用

使用`toRefs`函数时，需要对其进行引入组合式`API`：`import {toRefs} from 'vue'`

`toRefs`用于批量设置多个数据响应式数据，`toRefs`与原数据有交互，修改响应式数据会影响到原数据，但是不会更新视图层；`toRefs`还可以与其他响应式函数交互，更加方便处理视图层数据，通过拓展运算符`...`包装使用，去除第一层的引用

简单功能的使用：

```vue
<template>
    <div>
        <h1>姓名：{{name}}</h1>
        <h1>年龄：{{age}}</h1>
        <h1>d: {{d.a}}</h1>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default({
    setup() {
        const obj = {name:'jlc',age:24,d:{a:90}}
        const news = reactive(obj)
        return {...toRefs(news)}
    },
})
</script>
```

***

### `computed`计算属性

使用`computed`时，需要对其进行引入组合式`API`：`import { computed } from 'vue'`

`computed`计算属性是用来监听数据的变化的，最后返回一个`return`，应用在视图层上面，不用刷新页面，自动在视图层上变化；在一个页面中可以使用多个计算属性，独立的计算属性之间不受其他计算属性影响，计算属性是根据响应式数据发生动态变化的

简单功能的使用：

```vue
<template>
    <div>
        1年龄<input type="number" v-model="one">
        <br>
        2年龄<input type="number" v-model="two">
        <br>
        总年龄<input type="number" v-model="sum">
        <br>
        1文本<input type="text" v-model="one_1">
        <br>
        2文本<input type="text" v-model="two_1">
        <br>
        总文本<input type="text" v-model="sum_1">
    </div>
</template>

<script>
import {computed,reactive,toRefs} from 'vue'

export default ({
    setup() {
        const one = ''
        const two = ''
        const one_1 = ''
        const two_1 = ''
        const res = reactive({one,two,one_1,two_1})
        
        //计算年龄总和
        const sum = computed(()=>{
            return res.one + res.two
        })

        //两个文本拼接
        const sum_1 = computed(()=>{
            return res.one_1 + res.two_1
        })

        return{...toRefs(res),sum,sum_1}
    },
})
</script>
```

`setup`语法糖的形式：

```js
let firstName = ref("张");
let lastName = ref("三");
 
// 这么定义的fullNamed计算属性，且是只读的
let fullName = computed(() => {
   return firstName.value + lastName.value;
});
 
// 这么定义的fullName计算属性，且可读可写的
let fullName = computed({
  get() {
    return firstName.value + lastName.value;
  },
  set(val) {
    let [str1, str2] = val.split("-");
    firstName.value = str1;
    lastName.value = str2;
    console.log(val);
  },
});
```

***

### `watch`监听器

`watch`侦听器是用于监测一个数据的改变，当数据发生变化时，我们要做一系列的业务

使用`watch`时，需要对其进行引入组合式`API`：`import {watch} from 'vue'`

`watch`侦听器用于侦听数据的变化，可以在控制台中时时监听到数据的变化；监听多个数据，可以使用多个`watch`侦听器，也可以使用单个`watch`侦听器

`{ immediate:true }`表示立即监听，进入页面控制台，直接拿到监听的数据

`Vue3`中的`watch`只能监视以下四种数据：

1. `ref`定义的数据
2. `reactive`定义的数据
3. 函数返回一个值（`getter`函数）
4. 一个包含上述内容的数组

监听计数器点击，当数小于0时，就不能在减小，使其值一直为0：

```vue
<script>
import {ref, watch} from 'vue'

export default ({
    setup() {
        let num = ref(2)
        watch(num, (v) => {
            if(v < 0) num.value = 0
        })
        return { num }
    },
})
</script>
```

监听的其他例子：

```vue
<template>
    <div>
        <h1>{{p1}}</h1>
        <br>
        <button @click="p1++">点击p1++</button>
        <br>
        <h1>{{p2}}</h1>
        <br>
        <button @click="p2+=2">点击p2+=2</button>
        <br>
        <h1>监听一个对象的数据变化：{{p3.age.num}}</h1>
        <br>
        <button @click="p3.age.num++">点击年龄对象</button>
    </div>
</template>

<script>
import {ref,watch,reactive} from 'vue'

export default ({
    setup() {
        const p1 = ref(0)
        const p2 = ref(1)
        const p3 = reactive({
            name:'jlc',
            age:{
                num:1
            }
        })
        
        // 一：监听一个ref数据变化
        watch(p1, (newVal, oldVal)=>{
            // newVal表示最新的结果；oldVal表上一次的结果
            console.log(newVal, oldVal) 
        })

        // 二：监听多个ref数据变化
        watch([p1,p2],(newVal, oldVal)=>{
            // newVal表示最新的结果；oldVal表上一次的结果
            console.log(newVal, oldVal) 
        })

        // 三：监听整个reactive相应式数据变化，只能监听到最新的结果，上一次的数据是监听不到的
        watch(p3,(newVal, oldVal)=>{
            // newVal表示最新的结果；oldVal表上一次的结果
            console.log(newVal, oldVal)
        })

        // 四：监听reactive相应式数据中某一个值的变化，最新的结果和上一次的结果都可以得到,immediate表示进入页面直接在控件台中拿结果
        watch(()=>p3.age.num,(newVal, oldVal)=>{
            // newVal表示最新的结果；oldVal表上一次的结果
            console.log(newVal, oldVal) 
        },{immediate:true})

        return {p1,p2,p3}
    },
})
</script>
```

```js
//监视ref定义的【基本类型】数据：直接写数据名即可，监视的是其value值的改变
//数据
let sum = ref(0);
//方法
function changeSum() {
  sum.value += 1;
}
//监视
let stopWatch = watch(sum, (newVal, oldVal) => {
  console.log(newVal, oldVal);
  if (newVal >= 10) {
    //当前监视的newVal值大于等于10时，停止进行sum的监视
    stopWatch();
  }
});

//监视ref定义的【对象类型】数据：直接写数据名，监视的是对象的【地址值】，若想监视对象内部的数据，要手动开启深度监视
let preson = ref({
  name: "zhaotong",
  age: 18,
});
//watch的第一个参数是：被监视的数据
//watch的第二个参数是：监视的回调
// watch的第三个参数是：配置对象(deep、immediate等)
// deep:true  深度监听  immediate:true 初始立即监听
watch(
  preson,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  },
  { deep: true, immediate: true }
);
```

```js
//监视reactive定义的【对象类型】数据，且默认开启了深度监视（不可关闭深度监听）
//数据
//数据
let preson = reactive({
  name: "zhaotong",
  age: 18,
});
//监视
watch(preson, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});
```

```js
//监视ref或reactive定义的【对象类型】数据中的某个属性，推荐全部写成函数式
//数据
//数据
let person = reactive({
  name: "zhaotong",
  age: 18,
  car: {
    c1: "帕萨特",
    c2: "途岳",
  },
});
//监视
watch(
  () => person.car,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  },
  {
    deep: true,
  }
);
```

```js
//监视上述的多个数据
//数据
//数据
let person = reactive({
  name: "zhaotong",
  age: 18,
  car: {
    c1: "帕萨特",
    c2: "途岳",
  },
});
//监视
watch(
  [() => person.name, () => person.car],
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  },
  {
    deep: true,
  }
);
```

***

### `watchEffect`监听器

使用`watchEffect`时，需要对其进行引入组合式`API`：`import {watchEffect} from 'vue'`

`watchEffect`如果存在的话，在组件初始化时就会执行一次用以收集依赖（即进入页面后就会自动去执行一次其内部的函数方法）

`watch`可以获取新值和旧值，但是`watchEffect`拿不到；`watchEffect`不需要指定监听器的属性，他会自动的收集依赖，只要我们回调中引用到了响应式的属性（如果函数体中使用了响应式数据，`watchEffect`监听器才会进行自动执行）,相比于watch监听器，不用明确指出监视的数据（函数中用到哪些属性, 那就监视哪些属性）

监听计数器点击，当数小于0时，就不能在减小，使其值一直为0：

```vue
<script>
import {ref, watchEffect} from 'vue'

export default ({
    setup() {
        let num = ref(2)
        watchEffect(() => {
            if(num.value < 0) num.value = 0
        })
        return { num }
    },
})
</script>
```

`watchEffect`方法有返回值，我们可以使用这个返回值来使监听失效：

```vue
<script>
import {ref, watchEffect} from 'vue'

export default ({
    setup() {
        let num = ref(2)
        const stop = watchEffect(() => {
            if(num.value < 0) num.value = 0
        })
        
        stop()  // 调用返回值即可使监听失效
        
        return { num }
    },
})
</script>
```

其他例子：

```js
//数据
let temp = ref(10);
let height = ref(0);
 
//方法
function changeTemp() {
  temp.value += 10;
}
function changeHeiht() {
  height.value += 10;
}
 
//监视
// watch监视该需求  当水温达到60度，或水位达到80cm时，给服务器发请求
watch([temp, height], (value) => {
   let [newTemp, newHeight] = value;
   if (newTemp >= 60 || newHeight >= 80) {
     console.log("给服务器发送请求");
   }
});
 
// watchEffect监视该需求  当水温达到60度，或水位达到80cm时，给服务器发请求
watchEffect(() => {
  if (temp.value >= 60 || height.value >= 80) {
    console.log("给服务器发送请求");
  }
});
```

***

### `shallowRef`和`shallowReactive`

使用时，需要对其进行引入组合式API：`import {shallowRef,shallowReactive} from 'vue'`

shallowRef只处理基本类型的数据；shallowReactive只处理第一层的数据(对象中的第一层数据)

```vue
<template>
    <div>
        <h1>姓名：{{name}}</h1>
        <br>
        <h1>年龄：{{age.num}}</h1>
        <br>
        <button @click="name+='1'">点击shallowReactive能否处理第一层数据</button> //点击有效
        <button @click="age.num++">点击shallowReactive能否处理第二层数据</button> //点击无效
        <br>
        <h1>数字加加：{{p2}}</h1>
        <br>
        <button @click="p2++">点击shallowRef处理基本类型的数据</button>  //点击有效
        <br>
        <h1>数字加加：{{p3.num}}</h1>
        <br>
        <button @click="p3.num++">点击shallowRef处理非基本类型的数据</button>  /点击无效
    </div>
</template>

<script>
import {shallowRef,shallowReactive,toRefs} from 'vue'
export default ({
    setup() {
        //shallowReactive只能处理第一层数据
        const p1 = shallowReactive({
            name:'jlc',  //第一层数据
            age:{
                num:0  //第二层数据
            }
        })

        //shallowRef只能处理基本类型的数据
        const p2 = shallowRef(0)
        const p3 = shallowRef({
            num:0
        })


        return {...toRefs(p1),p2,p3}
    },
})
</script>
```

