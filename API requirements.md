# llm-eval-backend API文档.md

## 仪表盘数据接口 `/api/dashboard`

### 1. 获取概览数据
**端点**  
`GET /api/dashboard/summary`

**请求参数**  
无

**响应示例**  
```json
{
  "totalUsers": 12847,
  "activePrompts": 2341,
  "completedEvaluations": 8934,
  "totalAnnotations": 45692,
  "monthlyGrowth": 12.5,
  "weeklyGrowth": 8.2,
  "qualityScore": 94.2
}
```

### 2. 获取贡献者排行
**端点**  
`GET /api/dashboard/top-contributors`

**请求参数**  
| 参数 | 类型 | 说明 |
|------|------|------|
| limit | number | 返回条目数（默认5）|

**响应示例**  
```json
[
  {
    "rank": 1,
    "name": "陈志明",
    "role": "家庭心理教练",
    "points": 2847,
    "avatar": "/placeholder-user.jpg"
  },
  {
    "rank": 2,
    "name": "金莎拉",
    "role": "行为分析专家", 
    "points": 2156,
    "avatar": "/placeholder-user.jpg"
  }
]
```

### 3. 获取标注分类数据
**端点**  
`GET /api/dashboard/annotation-stats`

**请求参数**  
无

**响应示例**  
```json
{
  "categories": [
    {
      "name": "情感分析",
      "count": 18456,
      "progress": 75
    },
    {
      "name": "行为模式",
      "count": 15234,
      "progress": 62
    }
  ]
}
```

### 4. 获取最近活动
**端点**  
`GET /api/dashboard/recent-activities`

**请求参数**  
| 参数 | 类型 | 说明 |
|------|------|------|
| type | string | 过滤类型（prompt/evaluation/annotation）|

**响应示例**  
```json
[
  {
    "id": "act001",
    "type": "prompt",
    "title": "新提示词'家庭冲突解决'获得最高评分",
    "timestamp": "2小时前"
  },
  {
    "id": "act002",
    "type": "evaluation",
    "title": "心理评估批次 #247 已完成",
    "timestamp": "4小时前"
  }
]
```


## 徽章接口 `/api/badge`

### 1. 获取所有徽章列表（支持分类筛选）
**端点**  
`GET /api/badge/list`

**认证要求**  
`Authorization: Bearer <token>`

**请求参数**  
| 参数 | 类型 | 说明 |
|------|------|------|
| category | string | 徽章分类（可选值：design/development/prompt-engineer/psychologist） |

**响应示例**  
```json
[
  {
    "id": "badge_001",
    "category": "psychologist", // 新增分类字段
    "name": "初出茅庐",
    "description": "完成首次心理评估",
    "unlockCondition": "完成至少1次评估",
    "icon": "/badges/rookie.svg",
    "locked": false,
    "unlockTime": "2024-03-15T08:30:00Z"
  },
  {
    "id": "badge_002",
    "category": "design", 
    "name": "界面达人",
    "description": "设计10个评估界面原型",
    "unlockCondition": "原型设计数量 ≥ 10",
    "icon": "/badges/designer.svg",
    "locked": true,
    "unlockTime": null
  }
]
```

### 新增接口：获取用户已获得徽章
**端点**  
`GET /api/badge/current-user`

**认证要求**  
`Authorization: Bearer <token>`

**请求参数**  
无

**响应示例**  
```json
{
  "userId": "user_123",
  "acquiredBadges": [
    {
      "badgeId": "badge_001",
      "acquiredAt": "2024-03-15T08:30:00Z"
    },
    {
      "badgeId": "badge_003", 
      "acquiredAt": "2024-04-01T14:22:18Z"
    }
  ]
}
```


## 排行榜接口 `/api/leaderboard`

### 1. 获取提示词工程师统计指标
**端点**  
`GET /api/leaderboard/prompt-engineer/stats`

**请求参数**  
无

**响应示例**  
```json
{
  "totalParticipants": 1247,
  "weeklyActive": 892,
  "topScore": 98.7,
  "averageScore": 82.4,
}
```

### 2. 获取提示词工程师排名
**端点**  
`GET /api/leaderboard/prompt-engineer/list`

**请求参数**  
| 参数 | 类型 | 说明 |
|------|------|------|
| offset | number | 分页偏移量（默认0） |
| limit | number | 每页数量（默认20，最大100） |
| model | string | 筛选模型类型（可选） |
| specialty | string | 筛选专长领域（可选） |

**响应示例**  
```json
{
  "rankings": [
    {
      "userId": "user_9487",
      "name": "陈晓明",
      "score": 98.7,
      "model": "deepseek-v3",
    },
    {
      "userId": "user_6723",
      "name": "王思睿",
      "score": 97.9, 
      "model": "qianwen-plus",
    }
  ]
}
```
## 志愿者网络接口 `/api/network`

### 1. 获取志愿者列表
**端点**  
`GET /api/network/list`

**认证要求**  
`Authorization: Bearer <token>` (需具备view_volunteers权限)

**请求参数**  
| 参数 | 类型 | 说明 |
|------|------|------|
| page | number | 页码（默认1） |
| pageSize | number | 每页数量（默认20，最大100） |

**响应示例**  
```json
{
  "success": true,
  "data": {
    "total": 245,
    "page": 1,
    "volunteers": [
      {
        "userId": "user_1001",
        "name": "张晓雯",
        "avatar": "/avatars/user_1001.jpg",
        "intro": "专业心理咨询师，专注家庭关系改善”,
        "registrationDate": "2023-05-12T08:30:00Z",
        "badges":["badge_001","badge_002","badge_003"],
      },
      {
        "userId": "user_1002",
        "name": "李国华",
        "avatar": "/avatars/user_1002.jpg",
        "intro": "专注于行为模式分析和干预策略研究”,
        "registrationDate": "2022-11-03T14:22:18Z",
        "badges":["badge_003","badge_009","badge_010"],
      }
    ]
  }
}
```

### 2. 获取志愿者详情
**端点**  
`GET /api/network/detail/{userId}`

**认证要求**  
`Authorization: Bearer <token>` (需具备view_volunteer_detail权限)

**路径参数**  
| 参数 | 类型 | 说明 |
|------|------|------|
| userId | string | 志愿者唯一ID |

**响应示例**  
```json
{
  "success": true,
  "data": {
    "userId": "vol_1001",
    "name": "张晓雯",
    "avatar": "/avatars/vol_1001.jpg",
    "contact": {
      "email": "zhangxw@westlake.org",
      "wechat": "zxw_psy"
    },
    "availability": {
      "schedule": "每周二、四 14:00-18:00",
      "emergencySupport": true
    }
  }
}
```



## 用户Profile接口 `/api/profile`

### 1. 获取用户Profile
**端点**  
`GET /api/profile`

**认证要求**  
`Authorization: Bearer <token>`

**请求参数**  
无

**响应示例**  
```json
{
  "success": true,
  "data": {
    name: "Ethan",
    gender: "保密",
    uniqueId: "Ethanovum",
    email: "ethan@example.com", // 改为邮箱示例
    address: "",
    phone:"",
    showAddress: true, // 改为默认打钩
    showContact: true, // 新增联系方式公开显示选项
    showAdditionalInfo: true, // 新增电子邮箱或微信公开显示选项，默认打钩
    intro: "未填写",
    professionalBackground: "未填写",
    contributions: "未填写",
    skills:"未填写",
    coreValues: "未填写",
    participationMotivation: "未填写",
    connectionExpectations: "未填写",
    learningGoals: "未填写",
  }
}
```

### 2. 更新用户Profile
**端点**  
`PATCH /api/profile`

**认证要求**  
`Authorization: Bearer <token>`

**请求头**  
`Content-Type: application/json-patch+json`

**请求示例**  
```json
[
  { 
    "op": "replace",
    "path": "/name",
    "value": "王小明"
  },
  {
    "op": "replace",
    "path": "/intro",
    "value": "专注青少年心理健康领域8年，擅长网络成瘾干预"
  },
  {
    "op": "add",
    "path": "/skills",
    "value": "夫妻沟通，代际矛盾"
  }
]
```

**响应示例**  
```json
{
  "success": true,
  "updatedFields": [
    "name",
    "intro",
    "skills"
  ],
  "validationErrors": []
}
```

/prompt-engineering # 提示词工程师工作台

这两部分暂不展开，等待业务梳理完成

/psychologist-evaluation # 心理学家评估工作台

这两部分暂不展开，等待业务梳理完成