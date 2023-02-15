---
layout: docs
title: Pipeline 基本信息
description: Pipeline 是 Flomi 中基本可执行单元。它用来完成具体的某一个任务。
group: pipeline-tutorial
aliases:
  - "/docs/1.0/pipeline-tutorial/"
  - "/docs/pipeline-tutorial/"
  - "/pipeline-tutorial/"
toc: true
---

Pipeline 是由多个 Stage 组成，通过 Link 把多个 Stage 连接起来组成 Pipeline，它可以完成项个具体的任务。一个 Stage 中包含一个 Job 以有它当前在 Pipeline 中的附属信息以及运行时信息。

Pipeline 包含的基础信息主要有：Profile 和 Author。

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20221213-r4n.png" width="1000" alt="">

## Profile

主要包含了 Job 的基础信息，字段说明如下：


{{< bs-table "table table-options" >}}
| Name        | Type   | Required | Note                         |
| ----------- | ------ | -------- | ---------------------------- |
| Bundle ID   | string | Y        | Job 包名，需要保持工作空间内唯一。          |
| Name        | string | Y        | Job 名称                       |
| Description | string | N        | Job 描述                       |
| Website     | string | N        | Job 网页链接（尽可能是Github）         |
| Version     | string | Y        | Job 版本号，如：“1.0.0” 或 “v1.0.0” |
{{</ bs-table >}}

## Author

主要包含了作者的基础信息，字段说明如下：


{{< bs-table "table table-options" >}}
| Name    | Type   | Required | Note |
| ------- | ------ | -------- | ---- |
| Name    | string | N        | 作者名称 |
| Email   | string | N        | 作者邮箱 |
| Website | string | N        | 作者主页 |
{{</ bs-table >}}
