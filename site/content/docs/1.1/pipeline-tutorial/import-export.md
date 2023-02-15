---
layout: docs
title: Import & Export
description: 用户可以通过 Export 与别人共享自己的 Pipeline。用户也可以 Import 来导入一个 Pipeline。
group: pipeline-tutorial
toc: true
---

可以通过 右键 点击 Pipeline 列表，在弹出菜单中可以看到 "Export..." 和 "Import..."（Pipeline 导出后的扩展名为：`flomiext`），如图：

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20221213-r8a.png" width="1000" alt="">

右上是当前选中的 Stage 的 Environments，它的 Export 的复选框表示，在导出 Pipeline 时，是否把 Stage 对应预设值一起导出。

{{< callout >}}
1. 如果一起导出导入的用户将可以看到，涉及用户数据安全，请注意该选项。
2. 如果 Pipeline 中包含 Stage 为 External Job，在 Export 时会把 Job 同时导出。在导入时，会一同导入到 Job 列表中。
{{</ callout >}}
