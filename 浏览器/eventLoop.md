# eventLoop

##

### 宏任务和微任务

宏任务：macrotask,包括 setTimeout、setInerVal、setImmediate(node 独有)、requestAnimationFrame(浏览器独有)、I/O、UI rendering(浏览器独有)  
微任务：microtask,包括 process.nextTick(Node 独有)、Promise.then()、Object.observe、MutationObserver  
Promise 构造函数中的代码是同步执行的，new Promise()构造函数中的代码是同步代码，并不是微任务  
Node.js 中的 EventLoop 执行宏队列的回调任务有 6 个阶段

- 1.timers 阶段：这个阶段执行 setTimeout 和 setInterval 预定的 callback
- 2.I/O callback 阶段：执行除了 close 事件的 callbacks、被 timers 设定的 callbacks、setImmediate()设定的 callbacks 这些之外的 callbacks
- 3.idle, prepare 阶段：仅 node 内部使用
- 4.poll 阶段：获取新的 I/O 事件，适当的条件下 node 将阻塞在这里
- 5.check 阶段：执行 setImmediate()设定的 callbacks
- 6.close callbacks 阶段：执行 socket.on('close', ....)这些 callbacks

NodeJs 中宏队列主要有 4 个

- 1.Timers Queue
- 2.IO Callbacks Queue
- 3.Check Queue
- 4.Close Callbacks Queue

这 4 个都属于宏队列，但是在浏览器中，可以认为只有一个宏队列，所有的 macrotask 都会被加到这一个宏队列中，但是在 NodeJS 中，不同的 macrotask 会被放置在不同的宏队列中。
NodeJS 中微队列主要有 2 个
1.Next Tick Queue：是放置 process.nextTick(callback)的回调任务的
2.Other Micro Queue：放置其他 microtask，比如 Promise 等
在浏览器中，也可以认为只有一个微队列，所有的 microtask 都会被加到这一个微队列中，但是在 NodeJS 中，不同的 microtask 会被放置在不同的微队列中。
Node.js 中的 EventLoop 过程

- 1.执行全局 Script 的同步代码
- 2.执行 microtask 微任务，先执行所有 Next Tick Queue 中的所有任务，再执行 Other Microtask Queue 中的所有任务
- 3.开始执行 macrotask 宏任务，共 6 个阶段，从第 1 个阶段开始执行相应每一个阶段 macrotask 中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的 Event Loop 中是只取宏队列的第一个任务出来执行，每一个阶段的 macrotask 任务执行完毕后，开始执行微任务，也就是步骤 2
- 4.Timers Queue -> 步骤 2 -> I/O Queue -> 步骤 2 -> Check Queue -> 步骤 2 -> Close Callback Queue -> 步骤 2 -> Timers Queue ...... 5.这就是 Node 的 Event Loop

Node 11.x 新变化
现在 node11 在 timer 阶段的 setTimeout,setInterval...和在 check 阶段的 immediate 都在 node11 里面都修改为一旦执行一个阶段里的一个任务就立刻执行微任务队列。为了和浏览器更加趋同.

## 相关

<https://github.com/lgwebdream/FE-Interview/issues/37>
<https://github.com/dwqs/blog/issues/61>
