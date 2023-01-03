---
layout: docs
title: Environments
description: 为 Job 运行提供可视化的环境变量的输入，可以让 Job 完成更动态以及多样化的功能。
group: job-tutorial
toc: true
---

## 基本界面

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-envs-deatail.png" width="1000" alt="">


1. 是 Environments 的主要编辑区，采用JSON数据结构。
2. 是在 Environments 编辑完成后点击 Preview 可以在 \[3] 视图中预览。
3. 是 Environments 动态视图预览，在这个试图操作更改的数据可以回写入 \[1]。
4. 是控制是否在 Export Job 时，是否带上默认值。

{{< callout >}}
编辑完成后记得点击保存！！！
{{</ callout >}}

## 数据结构

通过配置 JSON ，来达到环境变量的动态定义。目前支持的控件有：Input，Checkbox，Select。整体数据结构定义如下：

```typescript
interface Envs { // 根对象
  viewBox?: ViewBox; // view 控件
  value: {[name: string]: string}; // value 存放处
}

interface ViewBox {
  widgets: RawWidget[]; // 控件列表
  labelWidth?: string; // 控件 label 的宽度，如：10px, 10%，0为不显示
}

interface RawWidget {
  label: string; // 控件label
  input?: { // 输入框
    name: string; // 值对应在 Envs.value 中存放的 name
    placeholder: string; 
    validation: string; // 正则表达式，不匹配时报错
  };
  checkbox?: { // 复选框
    name: string; // 值对应在 Envs.value 中存放的 name
    label: string; // 复选框右侧 label
    // 当扩展 view 有值时，checkbox 为 true 将会显示扩展view。
    extensionView?: ViewBox;
  };
  select?: { // 单选框
    name: string; // 值对应在 Envs.value 中存放的 name
    options: string[]; // 选项
    // 当扩展 view 有值时，选中对应的 option 时会显示扩展view。
    extensionViews?: {[name: string]: ViewBox}; 
  };
  fileInput?: { // 文件/文件夹选择器
    name: string; // 值对应在 Envs.value 中存放的 name
    placeholder?: string;
    validation?: string;
    kind: "file" | "dir"; // 文件或目录
    op: "select" | "save"; // select -> kind:[file, dir]; save -> kind:file
    exts?: string[]; // kind: file，文件扩展名
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
  },
  "value": { // 默认值，不需要输入，通过可视化编辑会自动生成
    "dateStr": "",
    "encode": "ISO 8601",
    "formatStr": "",
    "isNotNow": "false"
  }
}
```

Environments 视图如下：

<img class="mb-4 img-fluid rounded-3" src="/docs/{{< param docs_version >}}/assets/img/guides/flomi-envs-recording.gif" width="1000" alt="">