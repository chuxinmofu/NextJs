### **NextJs 初始篇**
#### 一. 安装
**注意: 要想使用NextJs，node版本不能太低，最低也要18以上，版本不够的，可以用nvm来管理**
###### NVM常用命令：

```
nvm install <version>：安装指定版本的 Node.js。
nvm use <version>：切换到指定版本的 Node.js。
nvm ls：列出已安装的所有 Node.js 版本。
nvm alias <name> <version>：给指定版本创建别名。
nvm run <version> <script>：在指定版本下运行脚本。
nvm current：显示当前正在使用的 Node.js 版本。
nvm uninstall <version>：卸载指定版本的 Node.js。
```
###### 脚手架创建NextJs

```
npm config set registry https://registry.npm.taobao.org 阿里的镜像
npm config set strict-ssl false 关闭SSL认证
npx create-next-app@latest 创建脚手架
```
步骤

```
MACONG@JESSIERAY-MC MINGW64 /c/Mac/m/NextJs
$ npx create-next-app@latest
Ok to proceed? (y) y  
√ What is your project named? ... my-nextjs
√ Would you like to use TypeScript? ... No / Yes 
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
? Would you like to customize the default import alias (@/*)? » No / Yes
```
**其中`√ Would you like to use App Router? (recommended) ... No / Yes`为重点，选择官方推荐的App Router**

**启动项目：`npm run dev`  ，访问：`http://localhost:3000/` 当前看到的是初始的项目效果;**

### 二.路由
##### NextJs 拥有两套路由（两者兼容）：

- Pages Router：在pages目录下创建对应的文件或者目录即是一个路由。
- App Router：NextJs从版本13.4起的默认路由模式

##### App的出现

- pages 下每个文件都会被当成路由，不符合开发习惯
- app 架构新增了布局（layout）、模版（template）、加载状态（loading）、错误处理（error）、404 等文件，为项目开发提供了一套规范。
##### 1. 路由的定义和页面的创建
###### NextJs约定：
- 使用 page 来代表一个页面，可以把page理解成index ;默认导出个组件即可。
- 文件的路径就是对应的路由。
- app/page.tsx 对应路由 /
- app/about/page.tsx 对应路由 /about
- app/address/page.tsx 对应路由 /address
- 后缀名可以使用：.js、.jsx、.tsx
##### 2. 布局的定义和使用
###### 布局组件的个特征：

- **定义一个布局，需要新建一个名称为：layout 的固定文件，该组件接收一个children，代表子页面或者子布局。**
- 布局可以嵌套，父布局中有一个子布局。
###### 显而易见的额外特征：

- 定义在app/layout.tsx文件中，会应用于所有的路由。并且此文件必须存在。
- **根布局文件中必须包含html和body标签。同时其他布局不能包含这些标签。**

**示例代码**
app/layout.js ++应用于全局++

```
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>Root Layout</div>
        {children}
      </body>
    </html>
  );
}
```
app/obout/layout.js ++只应用于obout路由下的页面++ （可嵌套：app/about/ThreeLevelPage/layout.js等）

```
const AboutLayout = ({ children }) => {
    return (
        <>
            <div>
                About Layout
            </nav>
            {children}
        </>
    )
}
export default AboutLayout
```
访问`http://localhost:3000/about` 直接查看
**切记：组件Name需大写，且不可重复**
##### 3. 模板的定义和使用
模板跟布局的用法是一样的，我们在about下定义一个固定名称的模板文件：template.js

```
const AboutTemplate = ({ children }) => {
    return (
        <>
            <nav>
                About Template
            </nav>
            {children}
        </>
    )
}
export default AboutTemplate
```
再次访问`http://localhost:3000/about` 会发现显示的层级为：

```
Root Layout
    About Layout
        About Template
                About Page
```
说明：layout 会包裹 template，template 再包裹 page 。
##### ①模板和布局的差异?

**状态的维持**
    
- 模板：路由切换的时候，模板的内容会随之变更。
- 布局：路由切换的时候，布局的内容不会更改。

每次在切换路由的时候，使用 template ，就可以重新触发渲染。
##### ② [什么是 use client](https://react.nodejs.cn/reference/react/use-client)
'use client' 是一个指令，放置在文件的顶部（通常是模块的第一行）。它告诉 Nextjs 该模块应该在客户端环境中执行，而不是在服务器端。

**注意：默认情况下，NextJs中的页面是由服务端渲染的，即SSR。**
##### 4. 路由跳转方式
NextJs中，一共支持3种路由跳转的方式
- Link 组件
```
    import Link from "next/link";
    <Link href='/Aobut'>Aobut</Link>
    //此种方式可更改默认的跳转行为：App Router 的默认行为是滚动到新路由的顶部。可以通过传参 scroll 为false改变。
    <Link href='/Aobut' scroll={false}>Aobut</Link>
```

- 钩子函数：useRouter

```
    //使用useRouter钩子函数，这种客户端触发的动作，就需要加上标识'use client'，代表它是需要客户端渲染。
    'use client'
    import { useRouter } from 'next/navigation'
    const router = useRouter();
    <button onClick={() => router.push('/Aobut')}>Aobut</button>
```

- redirect 函数

```
    redirect，用于服务端组件，
    import { redirect } from 'next/navigation'
    async function login(id) {
        const res = await login()
            if (!res.ok) {
            redirect('/error')
        }
        return res.json()
    }
```
##### 5. 动态路由的定义
实际场景中一般会遇到两种形式的路由,需要通过动态路由的方式来访问
- /product/details/131001
- /product/details?id=131001

① 第一种
NextJs中，需要将文件夹的名字用方括号[]扩住。创建一个路由：/product/details/[id]，代表id是一个动态路由，其中这个动态参数可以通过id字段来读取；

**其中组件接收一个参数：params**

```
import React from 'react'
const About = ({ params }) => {
    return <>
        <h1>产品详情页面</h1>
        <span>{params.id}</span>
    </>
}
export default About
```
注意：
如果路由为`/product/details/131001/info`形式，我们可以改为`/product/details/[[...id]]`
动态参数`[id]`只会接收第一个路由片段,而`[[...id]]`可以捕获后面所有的路由片段
##### 6. 客户端和服务端之间的API交互
NextJs中，对于客户端和服务端之间的API交互，叫做路由处理程序
未完...
三. 中间件
未完...

---
### **NextJs 渲染**
**回顾， NextJs 初级篇 NextJs的安装、路由、~~中间件~~等内容**
#### 一. 什么是CSR、SSR、SSG、ISR
- `CSR（Client-side Rendering）`：客户端渲染。
- `SSR（Server-side Rendering）`：服务端渲染。
- `SSG（Static Site Generation）`：静态站点生成。
- `ISR（Incremental Static Regeneration）`：增量静态再生
##### 1. CSR 客户端渲染
**CSR 常规的实现就是我们常规的React开发，就是一种客户端渲染：**

1. 一般浏览器会下载一个非常小的HTML文件以及必要的JS文件。
2. 我们在JS中发送请求，更新DOM和渲染页面。比如useEffect钩子函数中初始化页面数据。

**NextJs 中，在AppRouter模式下，使用CSR，在组件中使用 'use client'标明，用useEffect请求初始化数据渲染即可**
##### 2. SSR 服务端渲染
假如客户端网速非常差，那么在CSR的情况下，由客户端发起请求加载数据就会非常慢，倘若我们把加载数据的工作丢给服务端，而服务器的网络情况非常良好，那么最终的首屏加载时长FCP(首次内容绘制)也就更短。

但是同样的，由于SSR情况下，它的响应时长还算上了数据的请求，因此响应时间更长，最终的TTFB(从发出页面请求到接收到应答数据第一个字节所花费的时间)指标也就更长。

**NextJs中要想实现SSR，我们可以在pages目录下创建个ssr.tsx文件**

借助getServerSideProps函数来获取数据并通过props返回给前端组件，
` pages/ssr.js`

```
export async function getServerSideProps() {
    const data = [{ 'id': 1, 'name': 'ljj' }]
    return { props: {data} }
}
// getServerSideProps 传入的是什么，这里就接收什么名称的参数
const SSR = ({ data }: any) =>{
    return <span id='test'>{JSON.stringify(data)}</span>
}
export default SSR;
```
##### 3. SSG 静态站点生成
SSR ，会在构建阶段，就将页面编译成一个静态的HTML文件。

例如，当我们的站点，上面的Layout总是一样的时候，或者是面对所有的用户，展示的都是一个内容，那么这块部分就没必要在用户请求页面的时候来渲染。干脆提前编译为HTML文件，在用户访问的时候，直接返回一个HTML则会更快。

**SSG的几种常见情况：**
1. 没有数据请求的页面
静态页面
1. 页面内容需要请求数据[(getStaticProps)](https://note.youdao.com/)
2. HTML文件的某些内容，需要通过接口获取，结合 getStaticProps 函数来使用。getStaticProps，会在构建的时候被调用，然后通过props属性传递给组件。
1. 页面路径需要获取数据[(getStaticProps结合getStaticPaths )](https://note.youdao.com/)
NextJs 中的动态路由是将动态部分用[]括起来;使其实现SSG。在 getStaticProps 的基础上，追加一个函数的实现 getStaticPaths
    1. getStaticProps 用来定义获取的数据传递给HTML
    1. getStaticPaths 则用来定义哪些路径将会实现SSG。
    1. fallback 返回false代表当访问这些静态路径以外的，则返回404.

##### 4. ISR 增量静态再生
主体内容不变，局部会发生改变的场景，再使用SSG的情况下需要使局部实现动态刷新，也就是有了ISR；
1. 在访问某个SSG页面的时候，可能依旧是老的HTML内容。
2. 但是与此同时，NextJs 会静态编译一个新的HTML文件。
3. 第二次访问的时候，就会变成新的HTML文件内容了。

解决办法：[(getStaticProps多暴露一个revalidate)](https://note.youdao.com/)
在 getStaticProps 函数中，多暴露了一个属性：revalidate：x。代表发生请求的时候，需要间隔x秒才会更新页面，构建新的HTML。
##### 5. 总结
###### 实现方式
- **CSR** 参考React的useEffect
- **SSR** 借助getServerSideProps函数，在服务端请求数据并通过props属性传递给组件
- **SSG** 
    - 没有数据请求的页面自动生成HTML 
    - 文件内容则借助 getStaticProps 函数获取数据，再生成静态文件 ③ 动态路由则借助getStaticPaths来指定生成HTML的路径
- **ISR** 在SSG的基础上getStaticProps函数追加暴露revalidate属性，代表刷新HTML的时长
###### 优缺点
- **CSR** 只有少量的静态文件先加载，由客户端发起请求触发渲染， TTFB 短。但是在网络特别差的情况下，会大大增加FCP（首屏加载时长）
- **SSR** 可以让初始化请求交给服务端完成，由服务端完成渲染，解决客户端网络不一的情况，FCP缩短，但是会增加响应时长，TTFB时长高。每次请求都会触发SSG渲染。
- **SSG** 可以让页面生成静态HTML，在编译时机就可以完成构建，只会触发一次。
- **ISR** 可以控制HTML的刷新时长，在指定的时间范围内使用同一个HTML，时间过后自动重新构建

#### 二. 服务端组件和客户端组件