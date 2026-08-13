// ─────────────────────────────────────────────────────────────
//  SITE CONTENT — 站点内容（中文，默认语言）
//  英文内容见 data-en.ts。
//  TODO: 把下面的占位值替换成你自己的信息。
// ─────────────────────────────────────────────────────────────

export interface Meta {
  title: string;
  name: string;
  handle: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  status: string;
  since: number;
  github: string;
  bilibili: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface Focus {
  label: string;
  pct: number;
}

export interface StackCell {
  id: string;
  title: string;
  tags: string[];
}

export interface Project {
  title: string;
  year: string;
  desc: string;
  tags: string[];
  demo: string;
  source: string;
  future?: boolean;
}

export interface Job {
  period: string;
  role: string;
  company: string;
  type: string;
  points: string[];
}

export interface Content {
  meta: Meta;
  nav: NavItem[];
  ticker: string[];
  principle: string;
  profile: [string, string][];
  focus: Focus[];
  stack: StackCell[];
  projects: Project[];
  experience: Job[];
}

export const zh: Content = {
  meta: {
    title: "Federico Prask",
    name: "Federico Prask",
    handle: "@yourname", // TODO: 你的昵称
    role: "学生",
    tagline: "学生 · 创意 · 技术",
    email: "federico.workspace@gmail.com", 
    location: "长沙，中国",
    status: "Working", // TODO: 当前状态
    since: 2016, // TODO: 开始写代码的年份
    github: "https://github.com/Federico-Prask",
    bilibili: "https://space.bilibili.com/1821911503",
  },
  nav: [
    { id: "about", label: "关于" },
    { id: "stack", label: "荣誉" },
    { id: "work", label: "作品" },
    { id: "journey", label: "经历" },
    { id: "contact", label: "联系" },
  ],
  ticker: [
    "绘画",
    "灵感",
    "编曲",
    "热爱",
    "开发",
    "表演",
    "生活",
    "策划",
    "竞赛",
    "创意",
    "游戏",
    "管理",
    "动画",
  ],
  principle: "从学习到运用，再到热爱，技术贯穿我的生活。",
  profile: [
    ["名字", "Federico Prask"],
    ["职业", "学生"],
    ["坐标", "长沙，中国"],
    ["目标", "做热爱的工作"],
    ["梦想", "成为一名教师"],
  ],
  focus: [
    { label: "艺术", pct: 13 },
    { label: "OI", pct: 56 },
    { label: "组织", pct: 37 },
    { label: "CTF", pct: 19 },
    { label: "开发", pct: 29 },
  ],
  stack: [
    { id: "A1", title: "初中校课本剧/历史剧表演团体特等奖", tags: ["导演 & 演员"] },
    { id: "A2", title: "高中英语配音大赛团体特等奖", tags: ["策划 & 配音"] },
    { id: "A3", title: "全国青少年信息奥林匹克联赛三等奖", tags: ["OIer"] },
    { id: "A4", title: "宋庆龄少年儿童发明奖一等奖", tags: ["代码 & 设计"] },
    // { id: "A2", title: "前端", tags: ["React", "Vue", "Next.js", "Vite", "Tailwind CSS", "Framer Motion"] },
    // { id: "A3", title: "工具链", tags: ["Vitest", "ESLint", "Docker", "GitHub Actions", "Postgres", "Redis"] },
    // { id: "A4", title: "设计", tags: ["Figma", "设计系统", "字阶", "动效", "无障碍"] },
    // { id: "A5", title: "探索中", tags: ["WebGL", "Tauri", "Edge AI", "Deno"] },
    // { id: "A6", title: "理念", tags: ["对齐", "清晰", "性能预算", "YAGNI"] },
  ],
  projects: [
    {
      title: "LSOI",
      year: "2025",
      desc: "LSGJOI 的官方站",
      tags: ["Vue", "WebSocket", "Vite", "Tailwind CSS"],
      demo: "#",
      source: "https://github.com/yourname",
    },
    {
      title: "G2501",
      year: "2025",
      desc: "G2501班的班级网站",
      tags: ["React", "Vite+"],
      demo: "#",
      source: "https://github.com/yourname",
    },
    {
      title: "Word Memorizer (Ver3.0)",
      year: "2026",
      desc: "一个理论上适用于绝大多数 Linux 发行版的单词背记软件",
      tags: ["C++", "Learn", "GTK", "Vocabulary"],
      demo: "#",
      source: "https://github.com/yourname",
    },
    {
      title: "未来项目",
      year: "Future",
      desc: "未来项目仍在路上，敬请期待",
      tags: ["UNKNOWN"],
      demo: "#",
      source: "",
      future: true,
    },
  ],
  experience: [
    {
      period: "2020",
      role: "自学开发",
      company: "个人兴趣",
      type: "探索",
      points: [
        "从小学开始接触编程，一直自学至今。",
        "凭借自己在程序设计上的造诣，取得了一些奖项 & 认证。",
      ],
    },
    {
      period: "2023",
      role: "导演 & 编剧 & 出演",
      company: "初中班级剧组",
      type: "表演",
      points: [
        "带领班级团队参演校课本剧/历史剧，斩获校级特等奖。",
        "同时担任导演与演员，兼顾动作编排与台词撰写。",
      ],
    },
    {
      period: "2023 — 至今",
      role: "OIer · CTFer",
      company: "信息学 & 网络安全",
      type: "竞赛",
      points: [
        "获得全国青少年信息学奥林匹克联赛三等奖。",
        "在 CTF 竞赛中持续磨炼与成长。",
      ],
    },
    {
      period: "2025 — 今",
      role: "个人开发",
      company: "校园项目",
      type: "应用",
      points: [
        "为 LSGJ 信息奥赛组打造网站 LSOI、为自己所在的班级搭建网站 G2501。",
        "为了组内的同学在竞赛教室背单词，开发了适用于 Linux 的单词背记软件 Word Memorizer。",
      ],
    },
  ],
};
