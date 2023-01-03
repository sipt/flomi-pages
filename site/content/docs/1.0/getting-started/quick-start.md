---
layout: docs
title: 快速开始
description: 
group: getting-started
toc: true
---

### 初始化 Workspace

点击 “New or Open...” ，在弹出的文件选择框中选择一个目录，会在这个目录下创建一个 `default.flomispace`的目录；如果这个 workspace 想自定义命名，可以直接在文件浏览框中创建一个\`\*.flomispace\`（“\*” 是自定义名称）；如果要打开一个已经存在的 workspace，可以直接选中打开。

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-init-workspace.png" width="500" alt="">

### 创建一个 Pipeline

1. 点击 “Add a Pipeline...”

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-add-pipeline.png" width="1000" alt="">

2\. 在弹出框内填写相关信息，其中 Profile 中的 `Bundle Id`, `Name`, `Version` 为必填项，点击 "Save"。

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-pipeline-profile.png" width="1000" alt="">

3\. 创建成功后，会在列表中可以看到。这时我们可以把右下Job列表的 "Custom Job" 拖拽到主工作区，并连接 “Start Job” 与 新创建的 “Custom Job”，基于 Job 创建的我们称为是一个 Stage。

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-pipeline-add-stage.gif" width="1000" alt="">

4\. 自定义 Stage 运行命令，双击这个新拖拽进来的 Stage，这里我们只是简单的在 "～/Donwloads/flomi.txt" 文件中输出 "Hello, World!"。命令：`echo 'Hello, world!' > ~/Downloads/flomi.txt && echo '{"success":true}'`，点击保存。

{{< callout >}}
在 “&&” 之后的要输出 \```{"success":true}` 是因为，Flomi 的 Job 运行输出要求，详见后面的 Job 相关文档。``
{{</ callout >}}

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-stage-editor.png" width="1000" alt="">

图中 `Wait for all preceding stages` 的 Checkbox 表示 当这个 Stage 为其它多个 Stage 的后续步聚时，会等待它们全部完成后再执行此 Stage，此时会把前置多个 Stage 的 Output 合并成一个数组做为当前 Stage 的输入。

#### 运行 Pipeline

点击左上角的运行按钮，或者同时按下 `⌘ + R`，在下面的 Events 里可以看到运行结果。

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-run-pipeline.png" width="1000" alt="">
