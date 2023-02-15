---
layout: docs
title: 什么是 Flomi
description: 在 Flomi 中，可以用低代码或拖拽的方式快速的创建工作流，来帮助用户完成重复性的工作。（支持 Windows 和 MacOS 双平台）
group: getting-started
aliases:
  - "/docs/1.0/getting-started/"
  - "/docs/getting-started/"
  - "/getting-started/"
toc: true
---

## 概述

在 FLomi 上可以轻松创建一个工作流，执行它可以完成一些指定工作，提高生产力🎉。Flomi 中整体分为两大块：Job 和 Pipeline。Job 是最小可执行任务，多个 Job 可以组成一个 Pipeline，它可以完成一个相对复杂的任务。对于 Job 可以去社区或网络上寻找，也可以自己编写。

## 下载
<code>Flomi {{< param current_version >}}</code>
<div class="d-flex flex-column flex-lg-row align-items-md-stretch justify-content-start gap-3 mb-4">
<a href="{{< param "download.macDist" >}}" class="btn btn-lg bd-btn-lg btn-bd-primary d-flex align-items-center justify-content-center fw-semibold">
  <svg class="bi me-2"><use href="#apple"></use></svg>
  Universal
  <svg class="bi ms-2 me-2"><use href="#cloud-arrow-down-fill"></use></svg>
</a>

<a href="{{< param "download.winDist" >}}" class="btn btn-lg bd-btn-lg btn-bd-primary d-flex align-items-center justify-content-center fw-semibold">
  <svg class="bi me-2"><use href="#windows"></use></svg>
  X64
  <svg class="bi ms-2 me-2"><use href="#cloud-arrow-down-fill"></use></svg>
</a>
</div>

## App 界面介绍

### Job 界面

在此界面里，可以编辑和调试 Job 。

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20230209-w6t.png" width="2000" height="1000" alt="">

1. 为切换 Job 列表按钮。
2. 为切换 Pipeline 列表按钮。
3. 为运行按钮，当前有 Job 或 Pipeline 选中时，可以点击运行。
4. 为当前的工作空间，可以点击切换。
5. 为标题栏，显示当前列表选中项。
6. 为列表展示区，展示 Job 或 Pipeline。
7. 为 Job 的编辑区域。
8. 为 Job 可视化 环境变量编辑区。
9. 为 Events 展示区，展示成功或异常相关信息。
10. 为 Job 调试时的 Mock Input 数据。

### Pipeline 界面

在此界面里，可以编辑和运行 Pipeline 。

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-pipeline-workspace.png" width="2000" height="1000" alt="">

{{< callout >}}
Stage：当 Job 被拖拽进 Pipeline 中后，它将会被 Stage 包装，并带上 Pipeline 的附属信息，以及运行时。
{{< /callout >}}

1. 是Start Stage，Pipeline 运行的起点，并不具备任何功能性。
2. 是 Link 用来连接两个 Stage。
3. 是一个可运行的 Stage 。
4. 是 Stage Handle 拖拽到另一个 Stage ，可以建立起两者的 Link。
5. 是 Job 快速检索列表，可以直接拖拽进 Pipeline 主工作区，完成一个 Stage 的创建。

{{< callout >}}
“5. Job 快速检索列表” 中，置顶有个 “Custom Job” ，为空的 Job，可以直接拖拽进 Pipeline 工作区后，双击进行编辑。
{{< /callout >}}
