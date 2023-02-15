---
layout: docs
title: Environments
description: 为 Job 运行提供可视化的环境变量的输入，可以让 Job 完成更动态以及多样化的功能。
group: job-tutorial
toc: true
---

## 基本界面

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20230210-k2h.png" width="1000" alt="">


1. 是 Environments 的主要编辑区，采用JSON数据结构。
2. 是 Environments 动态视图预览，在这个试图操作更改的数据可以回写入 \[1]。
3. 是控制是否在 Export Job 时，是否带上默认值。

## 数据结构

通过配置 JSON ，来达到环境变量的动态定义。目前支持的控件有：Input，Checkbox，Select，FileInput。整体数据结构定义如下：

```json
{
  "viewBox": {
    "labelWidth": "20%", // label 宽度定义，20% ｜ 20px
    "widgets": [
      // 控件列表
    ]
  }
}
```

Input 控件JSON example：

```json
{
    "label": "label",
    "input": {
        "name": "value name",
        "placeholder": "input placeholder",
        "validation": "validation" // validation RegExp 正则
    }
}
```

CheckBox 控件JSON example：

```json
{
    "label": "label",
    "checkbox": {
        "name": "value name",
        "label": "label",
        "extensionView": {
            "widgets": [...],
            "labelWidth": "30%"
        }
    }
}
```

Select 控件JSON example：

```json
{
    "label": "label",
    "select": {
        "name": "value name",
        "options": ["option1", "option2"],
        "extensionView": { // extentionView 会根据选中的option 展示 view。
            "option1": {
                "widgets": [...],
                "labelWidth": "30%"
            },
            "option2": {
                "widgets": [...],
                "labelWidth": "30%"
            }
        }
    }
}
```

Fileinput 控件JSON example:

```json
{
    "fileInput": {
      "exts": [
          "icns"
        ],
      "kind": "file",
      "name": "outputFile",
      "op": "save",
      "placeholder": "*.icns"
    },
    "label": "Save to"
}
```

## 自动提示（New）

在编辑 JSON 时，可以使用自动提示方便输入，支持关键词：`viewbox`,`input`,`select`,`checkbox`,`fileinput`。

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20230210-k8q.png" width="1000" alt="">
<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/SCR-20230210-k8z.png" width="1000" alt="">

## 应用示例

实现一个 Job，完成时间格式化。需要有些环境变量的输入，包括：

1. 是否使用当前时间
2. 自定义的时间字串
3. 格式化标准格式：ISO 8601, RFC 1123, 以及 Custom(自定义)
4. \[3] 为自定义时，输入时间格式字符串

基于以上，定义的 JSON 如下：

```json
{
  "viewBox": {
    "labelWidth": "20%",
    "widgets": [
      {
        "checkbox": {
          "extensionView": {
            "labelWidth": "0",
            "widgets": [
              {
                "input": {
                  "name": "dateStr",
                  "placeholder": "2022-12-13T04:19:44+00:00",
                  "validation": "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\+\\d{2}:\\d{2}$"
                }
              }
            ]
          },
          "label": "Not Now",
          "name": "isNotNow"
        },
        "label": "Date:"
      },
      {
        "label": "Format:",
        "select": {
          "extensionViews": {
            "Custom": {
              "labelWidth": "0",
              "widgets": [
                {
                  "input": {
                    "name": "formatStr",
                    "placeholder": "dd/MM/yyyy HH:mm:ss"
                  }
                }
              ]
            }
          },
          "name": "encode",
          "options": [
            "ISO 8601",
            "RFC 1123",
            "Custom"
          ]
        }
      }
    ]
  }
}
```

Environments 视图如下：

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-envs-recording.gif" width="1000" alt="">