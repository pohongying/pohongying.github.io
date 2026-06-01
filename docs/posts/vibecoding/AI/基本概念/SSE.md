---
title: 'SSE'
date: 2024-06-06
updated: '2024-06-06 05:43:56'
category: 'vibecoding'
tags:
  - 'Vibecoding'
  - 'AI'
  - '基本概念'
lastUpdated: false
summary: '一句话技术定义:'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/eb7oqlih5n5y9zxp'
---

# SSE

***

### **剖析对象：SSE (Server-Sent Events)**

#### **模块一：核心定义 (What It Is)**

* **一句话技术定义:**
  Server-Sent Events (SSE) 是一种基于标准HTTP/HTTPS协议的服务端单向推送技术，它允许服务器在一个持久化的HTTP连接上，以 `text/event-stream` 格式，持续、异步地向客户端发送事件流数据。
* **一个形象类比:**
  想象一下，传统的网页交互（HTTP请求/响应）就像是你每次需要新闻时，都得亲自去报刊亭买一份报纸。而SSE则像是你**订阅了一份报纸**，邮递员（服务器）每天都会准时把最新的报纸（数据）投递到你的信箱（客户端），你无需出门，只需等待即可。这个投递服务是单向的，邮递员只负责送报，不负责接收你的回信。

#### **模块二：战略价值 (Why It Matters)**

* **核心解决的问题:**
  在SSE出现之前，要实现“服务器主动通知客户端”这类实时更新功能，普遍存在以下痛点：

**SSE的解决方案**是：建立一个**单一、持久的HTTP连接**，服务器可以随时通过这个已经建立好的“管道”主动将数据推送给客户端，彻底解决了无效轮旬的资源浪费和延迟问题，提供了一种轻量级、标准化的服务端推送方案。

```
1. **客户端轮询 (Polling):** 客户端以固定时间间隔（如每3秒）重复向服务器发送HTTP请求，询问“有新数据吗？”。这种方式的**痛点**是：
    * **高延迟:** 数据更新不及时，最坏情况下延迟等于轮询间隔。
    * **资源浪费:** 大部分请求都是空返回（“没有新数据”），浪费了大量的客户端、网络和服务器资源。
    * **实时性差:** 无法真正做到“即时”通讯。
2. **长轮询 (Long-Polling):** 客户端发送一个请求，服务器“hold住”这个连接，直到有新数据时才返回响应。客户端收到响应后，立即再次发起新的长轮询请求。这**缓解了**轮询的无效请求问题，但**新的痛点**是：
    * **连接管理复杂:** 对服务器连接资源的消耗依然较大。
    * **实现复杂:** 需要在服务器端和客户端都做额外的逻辑来管理连接的生命周期。
    * **消息风暴效应:** 在高频更新的场景下，其表现会退化为短轮询，并可能因短时间内大量连接的同时建立和断开而对服务器造成冲击。
```

* **设计权衡与替代方案:**
  * **关键取舍 (Trade-offs):**
    SSE做出的最核心的设计取舍是 **“简单性换取单向通信”**。
    * **获得A (简单性):** 它完全构建在现有的HTTP协议之上，无需新的协议或端口。浏览器内置了`EventSource` API，支持自动重连、事件ID跟踪等功能，前端实现极其简单。后端实现也只是维护一个长连接并遵循特定文本格式，非常轻量。
    * **牺牲B (双向通信):** SSE是严格的**服务器 -****>**** 客户端**的单向通道。客户端无法通过这个连接向服务器发送数据（除了初次建连时可以通过URL参数传递信息）。如果需要客户端向服务器发送消息，必须另起一个新的HTTP请求。
  * **与替代方案的比较:**
    主要替代方案是 **WebSockets**。

| 特性 | Server-Sent Events (SSE) | WebSockets |
| :--- | :--- | :--- |
| **通信方向** | **单向** (服务器 -> 客户端) | **双向** (全双工) |
| **底层协议** | 标准 HTTP/HTTPS | 自定义的 `ws://` 或 `wss://` 协议 |
| **连接建立** | 标准HTTP请求，无需握手升级 | 需要通过HTTP进行一次 "Upgrade" 协议升级握手 |
| **实现复杂度** | **极低**。浏览器原生`EventSource` API，后端易实现。 | **较高**。需要专门的客户端库和服务器端库。 |
| **错误处理** | **内置自动重连机制**，可断点续传。 | 需手动实现心跳和重连逻辑。 |
| **数据格式** | 纯文本 (`text/event-stream`) | 支持文本和二进制数据。 |
| **资源占用** | 非常轻量。 | 相比SSE略重，但依然高效。 |

```plain
* **场景选择建议:**
    * **优先选择 SSE 的场景:**
        * **状态更新/消息推送:** 股票行情、体育比分、新闻Feed、订单状态更新、系统监控仪表盘等，这些场景的核心是“服务器通知客户端”。
        * **AI大模型流式输出:** 例如，当调用ChatGPT这类LLM时，它逐字或逐句生成回答，使用SSE可以完美地实现这种流式文本的实时展示。
        * **对简单性和快速开发要求高的项目:** 当你只需要单向推送，SSE无疑是成本最低、最可靠的选择。

    * **必须选择 WebSockets 的场景:**
        * **实时互动应用:** 在线聊天室、多人协作编辑、实时在线游戏等，需要客户端和服务器之间进行高频、低延迟的双向数据交换。
        * **需要传输二进制数据的场景:** 例如，在线音视频通信。
```

#### **模块三：技术拆解 (How It Works)**

* **关键架构组件:**
  1. **客户端 (Client):** 通常是Web浏览器，其核心是 `EventSource` 对象。这个JavaScript API负责发起连接、接收事件、处理错误并根据服务器指令自动重连。
  2. **服务器 (Server):** 任何能够处理HTTP长连接的后端应用（如Node.js, Python Flask/Django, Java Spring等）。服务器需要：
     * 接收客户端的HTTP GET请求。
     * 在响应头中设置 `Content-Type: text/event-stream` 和 `Cache-Control: no-cache`。
     * 保持该HTTP连接不关闭。
     * 当有新数据时，按照特定格式将数据写入响应体。
* **核心工作流程 (数据流):**
  1. **\[Client] -****>**** \[Server] | 步骤1: 建立连接**
     * 客户端通过JavaScript创建一个`EventSource`实例，并指向服务器的一个特定URL。
     * `const evtSource = new EventSource("/stream-updates");`
     * 浏览器向 `/stream-updates` 发起一个标准的HTTP **GET** 请求。请求头中会包含 `Accept: text/event-stream`。
  2. **\[Server] -****>**** \[Client] | 步骤2: 服务器响应**
     * 服务器收到请求后，不立即关闭连接。
     * 它首先发送HTTP响应头，状态码为 `200 OK`，并必须包含：
       * `Content-Type: text/event-stream; charset=utf-8`
       * `Connection: keep-alive`
       * `Cache-Control: no-cache`
     * 至此，一个持久化的单向数据通道建立完成。
  3. **\[Server] -****>**** \[Client] | 步骤3: 推送事件**
     * 服务器在任何时候，只要有新数据，就可以向这个打开的连接中写入符合格式的文本数据。
     * 数据以**事件块**的形式发送，每个块由一个或多个 `字段: 值` 的行组成，并以\*\*两个换行符 \*\*`\n\n` 作为块的结束标志。
  4. **\[Client] | 步骤4: 客户端接收与解析**
     * 客户端的 `EventSource` 对象会监听这个数据流。
     * 每当接收到一个完整的事件块（以`\n\n`结尾），它就会触发一个事件。
     * 开发者可以通过 `evtSource.onmessage` 或 `evtSource.addEventListener()` 来捕获并处理这些事件。
  5. **\[Client] ****<****-****>**** \[Server] | 步骤5: 连接维护与重连**
     * 如果网络中断导致连接断开，`EventSource` API 会**自动**在一段时间后（默认约3秒）尝试重新连接到同一个URL。
     * 服务器可以通过发送 `retry:` 字段来建议客户端的重连间隔时间。
     * 服务器可以通过发送 `id:` 字段为每条消息附加一个唯一ID。在重连时，浏览器会自动将最后接收到的 `id` 值通过 `Last-Event-ID` 请求头发送给服务器，便于服务器进行断点续传。
* **关键技术点举例:**
  * **关键点1: **`text/event-stream`** 数据格式**
    这不是一个复杂的数据格式，而是由几个简单字段组成的纯文本协议。

**伪代码/示例:**

```latex
// 服务器发送的原始文本流

: this is a comment, will be ignored

// 第一个事件: 这是一个简单的消息
data: Some new data just arrived
\n\n

// 第二个事件: 这是一个带ID和自定义事件类型的消息
event: user-update
data: {"username": "Alice", "status": "online"}
id: event-001
\n\n

// 第三个事件: 一个多行data的消息，并建议重连时间
data: First line of data.
data: Second line of data.
retry: 10000
\n\n
```

**客户端JavaScript如何处理:**

```javascript
const evtSource = new EventSource("/stream-updates");

// 监听默认的 'message' 事件 (对应服务器未指定 event 的情况)
evtSource.onmessage = function(event) {
  console.log("Default message received:", event.data); 
  // 输出: "Some new data just arrived"
  // 输出: "First line of data.\nSecond line of data."
};

// 监听自定义的 'user-update' 事件
evtSource.addEventListener("user-update", function(event) {
  const userData = JSON.parse(event.data);
  console.log("User update:", userData.username, userData.status); 
  // 输出: "User update: Alice online"
  console.log("Last event ID:", event.lastEventId); // 输出 "event-001"
});

evtSource.onerror = function(err) {
  console.error("EventSource failed:", err);
  // 在这里可以处理无法重连的最终错误
};
```

```
    * `data:`: 必须。定义了消息的数据内容。可以出现多次，最终数据会拼接在一起。
    * `event:`: 可选。为事件指定一个类型名称。如果未提供，客户端会触发默认的 `message` 事件。
    * `id:`: 可选。设置事件的唯一标识符。用于断线重连时的断点续传。
    * `retry:`: 可选。指定客户端在连接断开后，应等待多少毫秒再尝试重连。
    * `:`** (冒号开头的行)**: 注释行，客户端会直接忽略。
- **关键点2: 自动重连与 **`Last-Event-ID`  
```

这是SSE相较于WebSocket在可靠性方面的一大优势。**工作流程:**
1\. 服务器发送一条带 `id` 的消息：`id: 12345\ndata: ...\n\n`
2\. 客户端成功接收，并将其 `lastEventId` 属性更新为 `12345`。
3\. 此时，网络突然中断，连接关闭。
4\. `EventSource` 的 `onerror` 被触发，进入重连状态。
5\. 等待 `retry` 指定的毫秒数后，`EventSource` **自动**向服务器发起一个新的HTTP GET请求。
6\. 这个新的请求头中会包含一个关键字段: `Last-Event-ID: 12345`。
7\. 服务器端可以读取这个头，得知客户端断线前最后收到的消息是 `12345`。
8\. 服务器可以据此逻辑，从数据库或缓存中找出 `12345` 之后所有错过的消息，并一次性补发给客户端，然后再继续发送实时消息。这就实现了**消息的断点续传和最终一致性**。

这个机制的设计，极大简化了构建可靠实时应用的复杂度。

---

> 更新: 2022-10-03 04:41:56  
> 来源: 语雀导出
