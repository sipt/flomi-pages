---
layout: docs
title: Runner
description: Job 实践运行命令以及输入输出定义。
group: job-tutorial
toc: true
---

Runner 为 Job 的核心部分，其中分为了四个部分：

* Environments: 环境变量，可以通过定义JSON，实现图形化展示，可供用户选择。
* Inputs：用于定义 Job 的输入格式，用于规范化输入（格式JSON）。
* Outputs：用户定义 Job 的输出格式，用户规范化输出（格式JSON）。
* Runner Command: 可执行的 Command，目前支持 bash。


## Runner Command

Command 目前会在 Job 的当前目录进行执行，会引入系统的环境变量， 以及上面 Environments 中的变量。以及读取前一个Job 的 Outputs，来决策程序的运行。

### 参数读取

输入的 bash 命令中，可以读取上一个 Job 的 output 或 Mock Input

例如，Outputs 或 Mock Input 值为以下 JSON：

```json
{"flomi": {"value": "Hello, World!"}}

{{.flomi.value}} 会被 "Hello, World!" 字串替换(不包含头尾引号)

{{.flomi}} 会被 "map[value:Hello, World!]" 字串替换(不包含头尾引号)
- 如果想要{{.flomi}} 得到是JSON，可以使用 {{asJson .flomi}}, 
- 此时会得到 "{\"value\": \"Hello, World!\"}" （这里输出时包含头尾引号）

{{.query}} 会被 "{\"flomi\":{\"value\": \"Hello, World!\"}}" 整个 JSON 字串替换
```

Flomi 对 Job 运行的输出结果必须是符合以下格式的 JSON：

```typescript
{
    "success": true,
    "message": "", // 当 success 为 false 时，这里返回错误信息
    "outputs": any, // 任何数据结构形式，建议输出结果包在一个 JSON Object 里
    "envs": {"key1": "value1", ...} // 对环境变量的修改，在 Pipeline 中，后续的 Job 可以读取，详见 Pipeline 中的说明。
}
```

### 运行示例

输出 Environments 中 `encode` 的值，命令如下：

```bash
echo '{"success":true,"outputs":"'$name' : {{.message}}"}'
```

在右下 Mock Input 中可以虚拟一个 Input 的 Object，来调试 Job：

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-job-runner.png" width="1000" alt="">

### 脚本程序编写

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20221214-kc2.png" width="1000" alt="">

可以在 右击 列表中已存在的 Job，选择 "Show in Folder..." 会在文件浏览器中打开。该目录也是 bash 命令的运行目录，可以在该目录下编写脚本，使用 bash 进行执行。