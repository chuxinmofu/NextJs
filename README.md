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
**在 NextJs v12之前，都是通过 getServerSideProps 这个函数来实现服务端渲染，即SSR。**
##### 1. 水合（Hydration）
SSR 服务端渲染，会将整个组件渲染为HTML，但是HTML是没有交互性的。而客户端在渲染HTML之后，还需要等待JS下载完毕并且执行，由JS来赋予HTML交互性，那么这个阶段就叫做水合。水合过后，内容就会变为可交互性。
但也存在缺陷：
- SSR渲染，数据的获取必须在组件渲染之前。
- 组件的JS必须先加载到客户端，才能开始水合。
- 所有组件都必须水合完毕，组件之间才能够进行交互。

因此，一旦有部分组件渲染慢了，就会导致整体的渲染效率降低。SSR 只能适用于页面的初始化加载，对于后续的页面交互、数据修改等操作，SSR 就显得有些鸡肋了。
##### 2. Suspense 和 Streaming
>  **Suspense**
> 在编程和Web开发中，主要指的是一种机制或功能，用于处理异步数据加载和渲染时的等待状态。它旨在提升用户体验，通过在数据加载期间显示回退内容（如加载指示器或占位符），来避免界面出现空白或卡顿。Suspense的应用场景包括但不限于：
>  
>  - React中的Suspense：React 18引入了服务端渲染（SSR）中的Suspense支持，允许开发者将应用分割成多个独立的部分，每个部分可以独立地加载和渲染，从而实现渐进式的页面加载和交互。
>  - Vue 3中的Suspense：Vue 3也引入了Suspense组件，用于处理异步组件的加载。当异步组件还未准备好时，Suspense可以渲染一个备用内容（fallback），直到异步组件加载完成。
>  
>  Suspense的优势在于它能够使应用更加流畅地处理数据加载，减少用户的等待感，提高应用的响应性和用户体验。
>  
> **Streaming**
>  在技术和媒体领域中，主要指的是数据的连续传输和接收过程，通常用于实时数据处理和媒体播放。在Web开发和网络技术中，Streaming的应用非常广泛，包括但不限于：
> -  流媒体服务：如视频和音频的在线播放，这些媒体内容通过Streaming技术从服务器连续传输到客户端，实现实时播放。
> -  实时数据处理：Streaming技术也用于实时数据处理场景，如实时日志分析、交通流量监控等。通过Streaming，数据可以实时地从数据源传输到处理系统，实现低延迟的数据分析和响应。
> 
>  Streaming技术的优势在于它能够高效地处理大量数据，实现数据的实时传输和处理，从而满足对实时性要求较高的应用场景。
>**Suspense更侧重于提升用户界面的响应性和用户体验，通过处理异步数据加载来减少用户的等待时间；
>Streaming则更侧重于数据的实时传输和处理**

为了解决SSR缺陷这个问题，就有了 Suspense 组件，它允许你推迟渲染某些内容，直到满足某些条件（例如数据加载完毕）
不使用Suspense封装的情况下，需要等待所有组件都渲染完毕才能完整的展示页面。

> 使用Suspense案例：
> 
> ```
> import { Suspense } from 'react'
> 
> const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
> 
> async function Component1() {
>     await sleep(2000)
>     return <h1>Hello Component1</h1>
> }
> 
> async function Component2() {
>     await sleep(3000)
>     return <h1>Hello Component2</h1>
> }
> 
> async function Component3() {
>     await sleep(4000)
>     return <h1>Hello Component3</h1>
> }
> 
> export default function MySuspense() {
>     return (
>         <section style={{ padding: '20px' }}>
>             <Suspense fallback={<p>Loading Component1</p>}>
>                 <Component1 />
>             </Suspense>
>             <Suspense fallback={<p>Loading Component2</p>}>
>                 <Component2 />
>             </Suspense>
>             <Suspense fallback={<p>Loading Component3</p>}>
>                 <Component3 />
>             </Suspense>
>         </section>
>     )
> }
> ```
> 

而 Suspense 背后的实现技术就叫做Streaming。即将页面的HTML 拆分多个chunks，逐步从服务端发送给客户端。有这么几个好处：

提前发送到客户端的组件，就可以提前进行水合，那么用户就可以和提前水合完毕的组件进行交互。
从页面性能角度来考虑就是：减少 TTFB 和 FCP 以及 TTI的时长。
NextJs中有两种实现Streaming的方式：

针对组件级别：使用Suspense组件（就上面的案例）。
~~**针对页面级别：使用loading.tsx。**~~
##### 3. React Server Components 和 SSR
**RSC（React Server Components）和 SSR 的区别**

> - RSC：重点在Components，即组件。提供了更细粒度的组件渲染方式，可以在组件中直接获取数据。组件依赖的代码并不会打包到bundle中。并且只有在客户端请求相关组件的时候才会返回。
> - SSR：重点在Rendering，即渲染。在服务端将组件渲染成HTML发送给客户端，因此SSR需要将组件的所有依赖都打包到bundle中。

> -  Suspense以及Streaming的实现确实能优化我们的页面渲染，将原本只能先获取数据、再渲染水合的传统 SSR 改为渐进式渲染水合 。但是对于用户需要下载的JS代码量依旧是没有减少。
> -  使用RSC，服务端组件，就能将不必要的代码隐藏到服务器当中。

##### 4. 服务端组件 VS 客户端组件
- 服务端-在 NextJs 中，组件默认就是服务端组件。这类组件，请求会在服务端执行，最后会将组件渲染成HTML返回给客户端
- 客户端-使用 'use client' 声明。 配合 useEffect 钩子函数

**服务端和客户端对比:**
> - 服务端组件
>     - 优势：
>         1. 数据获取更快。 
>         1. 安全（服务端逻辑不会暴露给前端） 
>         1. 缓存（服务端渲染的结果可缓存） 
>         1. 服务端组件的代码不会打包到bundle中 
>         1. FCP时长更短 
>         1. 可以使用Streaming，将渲染工作拆分为chunks，通过流式传输到客户端，用户可以更早的看到部分页面，而无需等待整个页面渲染完毕。 
>     - 劣势：不可使用useEffect、useState等钩子函数，也就无法管理状态
>     - 运行时机：服务端组件运行在构建时和服务端
> - 客服端组件
>     - 优势：
>         1. 交互性更好，可以使用useEffect、useState等钩子函数。 
>         1. 可以使用浏览器的API
>     - 劣势：网络很差的情况下，由客户端完成渲染会导致FCP特别长
>     - 运行时机：运行在构建时、服务端（生成初始HTML）和客户端（管理DOM）

**注意：**
> - 服务端组件可以直接导入客户端组件，但客户端组件并不能导入服务端组件。
> - 服务端组件当导入到客户端组件中，就会被认为是客户端组件。

**番外**：
> **React Server Components（RSC）是React框架中的一个重要特性，它允许开发者在服务端渲染React组件，从而优化应用的性能和用户体验。以下是对React Server Components的详细解释：**
> 
> 1、基本概念
> React Server Components（RSC）是一种将应用的客户端渲染和服务器端渲染之间界限模糊化的技术。它允许React组件在服务器上加载数据并仅将必要的HTML和JavaScript发送到客户端。这种方式能够显著减少首次加载时传输到客户端的JavaScript代码量，提高首屏加载速度，同时保持页面的交互性。
> 
> 1. 主要特性
>     - 服务端渲染：RSC允许开发者在服务端渲染React组件，而不仅仅是传统的客户端渲染。这意味着组件的渲染逻辑和数据获取都在服务器上执行，减少了客户端的负担。
>     - 代码分割：RSC支持代码分割，这意味着只有用户实际需要的组件代码才会被发送到客户端，进一步减少了传输的数据量。
>     - 异步数据获取：在RSC中，数据获取可以在服务端异步进行，减少了客户端的等待时间，提高了应用的响应性。
>     - 可复用性：RSC是可复用的组件，开发者可以将复杂的渲染逻辑封装在RSC中，并在多个地方重复使用。
>     - 与现有React应用集成：RSC设计为与现有React应用兼容，开发者可以逐步引入RSC，而无需重写整个应用。
> 1. 优势
>     - 性能优化：通过减少客户端的JavaScript代码量和数据获取时间，RSC能够显著提高应用的加载速度和响应性。
>     - 减少客户端负担：由于大部分渲染逻辑和数据获取都在服务器上执行，客户端的负担大大减轻，有助于提升用户体验。
>     - 更灵活的数据处理：服务端渲染允许开发者更灵活地处理数据，例如进行数据的预处理和格式化，减少客户端的工作量。
>     - 更好的SEO：由于RSC生成的HTML是完整的、可索引的，因此有利于搜索引擎优化（SEO）。
> 1. 使用场景
>     - 首屏加载优化：对于需要快速展现内容的应用，如新闻网站、博客等，RSC能够显著提高首屏加载速度。
>     - 数据密集型应用：对于后台管理系统、数据分析平台等数据密集型应用，RSC可以在服务器端完成数据处理和渲染，减轻客户端负担。
>     - 与现有React应用集成：对于已经存在的React应用，开发者可以逐步引入RSC，以优化应用的性能和用户体验。
> 1. 注意事项
>     - 服务器成本：由于RSC需要在服务器上执行渲染逻辑和数据获取，因此可能会增加服务器的负担和成本。
>     - 可序列化属性：由于RSC的渲染结果需要传输到客户端，因此只有可序列化的数据才能被传输。这可能需要开发者对组件的数据流进行一定的调整。
>     - 非交互性：RSC本身不支持客户端的交互操作，如使用useState和useEffect等Hooks。如果需要交互性，可以在RSC中嵌入客户端组件。
> 
> 综上所述，React Server Components为React开发者提供了一种新的、更高效的方式来构建Web应用。通过服务端渲染和代码分割等特性，RSC能够显著提高应用的性能和用户体验。然而，开发者在使用RSC时也需要注意服务器成本、可序列化属性和非交互性等问题。
