---
layout: docs
title: 生成 MacOS icns
description: 
group: practice
aliases:
  - "/docs/1.0/practice/"
  - "/docs/practice/"
  - "/practice/"
toc: true
---
## 概述

本篇 Pipeline 导出源文件：
<a href="/docs/{{< param docs_version >}}/assets/resources/generateIcons.flomiext" target="_blank">flomi extention</a>

在 MacOS 中，一个 APP 的图标格式为 icns，其中包含了多张不同分辨率的图标，系统会根据当前设备分辨率自动选择。生成步骤：

1. 准备一张 `1024 x 1024` 的图标图片。
2. 通过 `sips` 命令生成多张分辨率不同的图片。
3. 通过 `iconutil` 命令生成 icns。

接下来我会用比较复杂的方式展示 Flomi 尽可能多的功能。

## 实践
### 创建 Job
#### 创建 SIPS Job

sips 生成图片命令：

```bash
# 把 input.png 转成 250x250 分辨率，并输出到 output.png
sips -z 250 250 input.png --out output.png
```

其中 分辨率/输入/输出 做为变量传入。

1. 先创建一个空 Job，填写基本信息：
<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-add-job.png" width="1000" alt="">

2. 创建一个动态 Environments 视图，用来输入 分辨率/输入文件/输出文件：
* `double`: 是否为双倍图 @2x，这里用一个checkbox 来输入
* `width`: 图片宽度，这里用一个input来输入，并校验为纯数字
* `inputFile`: 输入的 1024x1024 的 icon 图片，这里用 fileInput 来输入


以下为 Enviroments JSON 代码

```json
{
  "viewBox": {
    "labelWidth": "20%",
    "widgets": [
      {
        "input": {
          "name": "width",
          "placeholder": "png size (px)",
          "validation": "^\\d+$"
        },
        "label": "Size"
      },
      {
        "checkbox": {
          "label": "2x",
          "name": "double"
        }
      },
      {
        "fileInput": {
          "exts": [
            "png"
          ],
          "kind": "file",
          "name": "inputFile",
          "op": "select",
          "placeholder": "1024x1024 PNG"
        },
        "label": "Src File"
      }
    ]
  },
  "value": {
    "double": "true",
    "inputFile": "/Users/xinyanwu/Downloads/icon.png",
    "width": "512"
  }
}
```

点击 Preview 预览

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-icns-envs.png" width="1000" alt="">



1. 填写命令，基中 分辨率/输入文件/输出文件 来源于环境变量： 这里先判断了一下是否是双倍图，是的话 size 翻倍，并在文件名上拼上 `@2x`，文件因为是临时文件，我这里选择保存到TMP目录中，最后输出图片路径所在目录。


```bash
 [ $double ] && w=$((width*2));s="@2x" || 2=width && rm -rf ${TMPDIR}flomi.iconset && mkdir -p ${TMPDIR}flomi.iconset && sips -z ${w} ${w} ${inputFile} --out ${TMPDIR}flomi.iconset/icon_${width}x${width}${s}.png >/dev/null  && echo '{"success": true, "output": "'${TMPDIR}flomi.iconset'"}'
```

记得点击 Save 保存!!!

#### 创建 iconutil Job

iconutil -c icns {input path} -o {output path}
这里 input path 可以用参数传入，output path 可以 Environments 输入

1. 直接从 `Sips PNG` 上 `Duplicate` 出来，简单编辑一下
<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20221220-s6w.png" width="1000" alt="">
<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20221220-s7n.png" width="1000" alt="">

2. 编辑 Environmnents 如下：
```json
{
  "viewBox": {
    "labelWidth": "20%",
    "widgets": [
      {
        "fileInput": {
          "exts": [
            "icns" // 扩展名
          ],
          "kind": "file", 
          "name": "outputFile",
          "op": "save", // 保存文件
          "placeholder": "*.icns"
        },
        "label": "Save to"
      }
    ]
  },
  "value": {
    "outputFile": ""
  }
}
```

3. 编辑命令
```bash
# ${outputFile} 为环境变量， {{.}} 为前一个 JOB 输入参数
iconutil -c icns {{.}} -o ${outputFile} && echo '{"success": true}'
```

### 创建 Pipeline

创建一个新的 Pipeline
<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20221220-she.png" width="1000" alt="">

首先，拖入一个 `Custom Job` ，用于清理并创建导出的文件目录，Command: 
```bash
rm -rf $TMPDIRflomi.iconset && mkdir -p $TMPDIRflomi.iconset && echo '{"success": true}'
```

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20221221-kaw.png" width="1000" alt="">

创建多个 `Sips PNG` 转不同规格的：`16x16`, `16x16@2x`, `32x32`, `32x32@2x`, `64x64`, `64x64@2x`, `128x128`, `128x128@2x`, `256x256`, `256x256@2x`, `512x512`, `512x512@2x` 分别创建对应的 Stage。

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20221221-kca.png" width="1000" alt="">

如图，把 `Sips PNG` 拖拽入工作区，选中后把 Environments 中的值进行修改。然后可以直接选中 `CMD + C` 复制 再 `CMD + V` 粘贴 略作修改，把所有分辨率都设置完成后得到上图内容。

这里采用的是从 `Make TmpDir` 开始分别 link 所有 `Sips PNG` 的 Stage，所以这里是并发执行，也可以每个 `Sips PNG` 相 Link 串成一个串这会串行执行。

当并发执行时，涉及到完成有先后，所以需要等待所有的前置 Stage 完成后再执行后续操作，可能勾选 `Wait for all preceding stages` 来达到这个效果，但注意的是，如果勾选了以后，前置所有的结果中的 `outputs` 会被提取出来，并合为一个 数组 传到 Wait Stage 的输入，这里加入一个 `Custom Job` 来处理一下输出。

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20221221-kha.png" width="1000" alt="">

其中 `{{index . 0}}`， 对 `.` 这个前置数组参数，使用 `index` 方法来取出 `0` 位置的数据。

最后创建 `Iconutil icns` 的 Stage，点击浏览按钮选择保存路径:

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20221221-kjm.png" width="1000" alt="">

