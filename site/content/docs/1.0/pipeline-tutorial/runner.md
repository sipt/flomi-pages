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

<figure><img src="../.gitbook/assets/SCR-20221214-k0f.png" alt=""><figcaption></figcaption></figure>

每个 Stage 可以对它的 Enviroments 进行修改，它的 Environments 的值会存在 Stage 中，不同的 Stage 相互隔离不会相互影响。
