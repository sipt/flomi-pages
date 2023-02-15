---
layout: docs
title: Runner
description: 
group: pipeline-tutorial
toc: true
---

Pipeline 中可以通过 Job 创建 Stage，Stage 中包含了 Job 以及运行时的信息。把 Stage 通过 Link 连接起来，就组成了一个 Pipeline。

## Stage
Stage 分为：Start-Stage 和 General-Stage。

* Start-Stage：Pipeline 运行入口，不具备任何具体功能。Pipeline 会从它开始顺序执行后续 Stage。
* General-Stage：中分为 Internal Job 创建和 External Job 创建。Internal Job 为列表中拖拽入的 "Custom Job"，它直接在 Pipeline 界面中进行编辑，只归属于这个 Pipeline。External Job 为 Job 列表中的 Job，它不只属于这个 Pipeline。

Pipeline 创建运行请参见 [快速开始](../../getting-started/quick-start/)

### Stage Enviromnets

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20221214-k0f.png" width="1000" alt="">

每个 Stage 可以对它的 Enviroments 进行修改，它的 Environments 的值会存在 Stage 中，不同的 Stage 相互隔离不会相互影响。

## Inputs Mapping（New）

当从社区中找到的 Job，往往输入和输出的定义都无法契合，这时修改其中一个 Job 的都会影响到另一个 Job，这样就会导致 Job 的复用性降低。为了解决这个问题，我们引入了 Inputs Mapping 的概念，它可以让用户在不修改 Job 的情况下，对 Job 的输入进行映射。

可以双击连接 Stage 的线，进入 Inputs Mapping 的编辑界面。左侧为前一个 Stage 的输出，右侧为下一个 Stage 的输入。编辑右侧的输入。

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20230210-pia.png" width="1000" alt="">
