<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "../composables/useI18n";
import { useTheme } from "../composables/useTheme";
import LogoMark from "./LogoMark.vue";
import LogoAnnotation from "./LogoAnnotation.vue";
import WorksSection from "./WorksSection.vue";

const { locale, setLocale } = useI18n();
const { pref, resolved, cycle } = useTheme();

type LogoStage = "reveal" | "crossfade" | "waiting";
type K2Phase =
  | "idle"
  | "recompose"
  | "settled"
  | "expand"
  | "titles"
  | "reverse-titles"
  | "reverse-expand"
  | "reverse-recompose";
type TransitionPlayback = "idle" | "forward" | "complete" | "reverse";
type ScrollEasing = "in-out-cubic" | "out-cubic" | "reverse-out-cubic";
type ActiveScrollAnimation = {
  progress: number;
  startY: number;
  startEased: number;
  easing: ScrollEasing;
  resolveTargetY: () => number;
};

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const logoStage = ref<LogoStage>(prefersReducedMotion ? "waiting" : "reveal");
const k2Started = ref(false);
const k2Phase = ref<K2Phase>("idle");
const titlePageRef = ref<HTMLElement | null>(null);
const markSpaceRef = ref<HTMLElement | null>(null);
const nameRef = ref<HTMLElement | null>(null);
const k3Started = ref(false);
const k3Progress = ref(0);
const k4Started = ref(false);
const k4Progress = ref(0);
const k5Started = ref(false);
const k5Progress = ref(0);
const introductionStarted = ref(false);
type WorksPlayback = "idle" | "docked" | "forward" | "complete" | "reverse";
const worksPlayback = ref<WorksPlayback>("idle");
const introductionContentRef = ref<HTMLElement | null>(null);
const worksSpacerHeight = ref(0);
const worksFrameworkDropDistance = ref(0);
const worksBoundaryRef = ref<HTMLElement | null>(null);
const worksOverlayRef = ref<HTMLElement | null>(null);
let worksOverlayAnimation: Animation | null = null;
let documentOverflowBeforeWorks: { root: string; body: string } | null = null;
let lockedDocumentScrollY = 0;
const transitionPlayback = ref<TransitionPlayback>("idle");
const k3Reversing = ref(false);
const heroNameInset = ref(0);

const annotationBounds = ref({ left: 0, top: 0, width: 0, height: 0 });
const viewport = ref({
  width: typeof window === "undefined" ? 0 : window.innerWidth,
  height: typeof window === "undefined" ? 0 : window.innerHeight,
});
const heroHeight = ref(viewport.value.height);

const lineDefinitions = [
  { id: "guide-plate-h-01", y: 0 },
  { id: "guide-mono-h-04", y: 72 },
  { id: "guide-mono-h-06", y: 131 },
  { id: "guide-mono-h-07", y: 199 },
  { id: "guide-plate-h-02", y: 256 },
] as const;

const frameworkParts = [
  "Part.01 Introduction",
  "Part.02 Works",
  "Part.03 Milestones",
  "Part.04 Beyond",
] as const;

const frameworkMaxTitleLength = Math.max(
  ...frameworkParts.map((part) => part.length),
);
const frameworkTitleRevealDuration =
  (frameworkMaxTitleLength - 1) * 36 + 420;
const frameworkCursorDelay = frameworkTitleRevealDuration + "ms";

type IntroductionCopy = {
  greeting: string;
  name: string;
  website: string;
  paragraphs: string[][];
  tagline: string;
};

const zhIntroductionCopy: IntroductionCopy = {
  "greeting": "你好，我是",
  "name": "丰朴 FedericoPrask",
  "website": "，这是我的个人网站",
  "paragraphs": [
    [
      "我对计算机技术、数字创作以及各种形式的表达怀有浓厚兴趣。",
      "我喜欢探索不同领域的工具与技术，也享受从理解原理、构思想法到亲手实践，",
      "将抽象概念逐步转化为具体作品的过程。"
    ],
    [
      "在计算机领域，我长期关注算法、数据结构与软件开发。",
      "从竞赛编程中的问题分析与算法推导，到独立软件项目的架构设计与实现，",
      "我喜欢探究技术背后的逻辑，也乐于尝试不同的技术方案。",
      "我掌握的语言与技术栈包括 C++（Console）、C++ Qt、Java，",
      "以及前端技术 Vue.js 与 TypeScript，并能够基于 Electron 结合 Vue.js 和 TypeScript 进行桌面应用开发。"
    ],
    [
      "同时，我对视觉设计与数字媒体创作也充满兴趣。",
      "我会留意界面设计中的排版、字体、色彩与交互细节，",
      "使用 InDesign 与 Figma 进行视觉设计，也会使用 Photoshop 和 Procreate 进行数字绘画，",
      "用 DaVinci Resolve 探索视频剪辑与后期制作，通过 After Effects 尝试动画创意，",
      "并通过 FL Studio 与 MuseScore 尝试音乐制作与乐谱编配。",
      "不同媒介为表达想法提供了不同可能，也让我能够从更多角度理解创作本身。"
    ],
    [
      "我也喜欢研究各类工具与工作流程，探索它们的能力与边界，",
      "并尝试把不同领域的知识联系起来。",
      "我习惯把工具看作可以拆解、组合和不断调整的系统，",
      "关注它们的输入输出、抽象层级、自动化方式以及协作流程，",
      "也比较不同工具在表达力、效率、学习成本与适用场景上的取舍。",
      "在具体实践中，我会尝试搭建从构思、原型、实现到迭代的完整工作流，",
      "让编程、设计、音视频制作中的方法相互迁移：",
      "用工程化的思路组织创作流程，也用创作的视角重新理解技术方案。",
      "对我而言，探索边界并不是单纯追求“会用”，",
      "而是理解工具为何存在、适合解决什么问题，以及何时应当换一种方式。",
      "技术不仅是解决问题的手段，也是创造与表达的工具。"
    ],
    [
      "这个网站是这些兴趣与探索的集合。",
      "在这里，你可以看到我的个人项目、技术研究、学习记录、设计实验，",
      "以及各种仍在进行中的尝试。",
      "它会随着我的学习与创作不断变化，记录那些值得分享的作品、想法与过程。"
    ]
  ],
  "tagline": "Explore. Experiment. Create."
};
const enIntroductionCopy: IntroductionCopy = {
  "greeting": "Hello, I am",
  "name": "丰朴 FedericoPrask",
  "website": ", and this is my personal website.",
  "paragraphs": [
    [
      "I have a strong interest in computing, digital creation, and many forms of expression.",
      "I enjoy exploring tools and technologies across different fields, and turning abstract ideas into concrete work —",
      "from understanding the principles and shaping an idea to putting it into practice."
    ],
    [
      "In computing, I have a long-standing interest in algorithms, data structures, and software development.",
      "From problem analysis and algorithm design in competitive programming to architecture and implementation in independent software projects,",
      "I enjoy exploring the logic behind technology and trying different technical approaches.",
      "My languages and technologies include C++ (Console), C++ with Qt, Java, Vue.js, and TypeScript.",
      "I can also build desktop applications with Electron, Vue.js, and TypeScript."
    ],
    [
      "I am equally interested in visual design and digital media.",
      "I pay close attention to typography, typefaces, color, and interaction details in interface design.",
      "I use InDesign and Figma for visual design, and Photoshop and Procreate for digital illustration;",
      "I explore video editing and post-production with DaVinci Resolve, and animation with After Effects.",
      "I also experiment with music production and score arrangement using FL Studio and MuseScore.",
      "Different media offer different ways to express an idea and help me understand the creative process from multiple perspectives."
    ],
    [
      "I also enjoy studying tools and workflows, exploring their capabilities and limits,",
      "and finding connections between different fields.",
      "I see tools as systems that can be taken apart, combined, and refined.",
      "I pay attention to their inputs and outputs, levels of abstraction, automation, and collaboration workflows,",
      "and compare their expressive power, efficiency, learning curves, and suitable use cases.",
      "In practice, I build workflows that span ideation, prototyping, implementation, and iteration.",
      "I look for ways to transfer methods between programming, design, and audio-visual creation:",
      "using engineering principles to organize creative work, and a creator perspective to reconsider technical solutions.",
      "For me, exploring boundaries is not simply about learning how to use a tool;",
      "it is about understanding why it exists, what problems it is suited to solve, and when another approach would be better.",
      "Technology is not only a means of solving problems, but also a tool for creation and expression."
    ],
    [
      "This website brings these interests and explorations together.",
      "Here, you can find my personal projects, technical research, learning notes, design experiments,",
      "and various attempts that are still in progress.",
      "The site will continue to evolve as I learn and create, documenting work, ideas, and processes worth sharing."
    ]
  ],
  "tagline": "Explore. Experiment. Create."
};

const introductionCopy = computed(() => locale.value === "zh" ? zhIntroductionCopy : enIntroductionCopy);

const introductionView = computed(() => {
  const copy = introductionCopy.value;
  let revealStep = 0;
  const nextDelay = () => `${revealStep++ * 58}ms`;
  const greetingDelay = nextDelay();
  const nameDelay = nextDelay();
  const websiteDelay = nextDelay();
  const paragraphs = copy.paragraphs.map((paragraph) =>
    paragraph.map((text) => ({ text, delay: nextDelay() })),
  );
  return {
    ...copy,
    greetingDelay,
    nameDelay,
    websiteDelay,
    paragraphs,
    taglineDelay: nextDelay(),
  };
});
const annotationStyle = computed(() => ({
  left: annotationBounds.value.left + "px",
  top: annotationBounds.value.top + "px",
  width: annotationBounds.value.width + "px",
  height: annotationBounds.value.height + "px",
}));

const verticalInset = computed(() =>
  Math.max(28, Math.min(72, viewport.value.height * 0.07)),
);

const frameworkInset = computed(() =>
  Math.max(
    0,
    Math.min(
      heroNameInset.value,
      viewport.value.width / 2 - 1,
      viewport.value.height / 2 - 28,
    ),
  ),
);

const FRAMEWORK_RULE_STROKE_WIDTH = 0.35;
const K4_PART01_HEIGHT_RATIO = 0.6;

const k3Geometry = computed(() => {
  const { width, height } = viewport.value;
  const stageInset =
    verticalInset.value +
    (frameworkInset.value - verticalInset.value) * k3Progress.value;
  const stageHeight = height - stageInset * 2;
  const rowHeight = stageHeight / 4;
  const rootFontSize =
    typeof document === "undefined"
      ? 16
      : Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
  const titleFontSize =
    width <= 760
      ? Math.max(rootFontSize * 1.5, Math.min(width * 0.036, rootFontSize * 3.4))
      : rowHeight / 2.5;
  const compression = 1 - 0.28 * k3Progress.value;
  // Measure the clear gap from the title line box to the inner edge of a
  // horizontal rule, then reuse exactly that gap beside the vertical guide.
  const verticalGap = Math.max(
    0,
    ((rowHeight - titleFontSize) * compression - FRAMEWORK_RULE_STROKE_WIDTH) / 2,
  );
  const boundaryInset = frameworkInset.value * k3Progress.value;
  const titleInset = boundaryInset + FRAMEWORK_RULE_STROKE_WIDTH + verticalGap;

  return {
    compression,
    titleFontSize,
    stageHeight,
    stageInset,
    titleAreaHeight: stageHeight * compression,
    boundaryInset,
    titleInset,
  };
});

const k4Geometry = computed(() => {
  const compactRowHeight = k3Geometry.value.titleAreaHeight / 4;
  const targetRowHeight = viewport.value.height * K4_PART01_HEIGHT_RATIO;
  const expansion = Math.max(0, targetRowHeight - compactRowHeight) * k4Progress.value;

  return {
    compactRowHeight,
    firstRowHeight: compactRowHeight + expansion,
    extraHeight: expansion,
    totalHeight: k3Geometry.value.titleAreaHeight + expansion,
  };
});

const k5Geometry = computed(() => {
  const dropDistance = worksFrameworkDropDistance.value;

  return {
    dropDistance,
    dropOffset: prefersReducedMotion
      ? dropDistance
      : dropDistance * k5Progress.value,
  };
});

const compactLineGap = computed(() => {
  const { height } = viewport.value;
  const rowGap = (height - verticalInset.value * 2) / 4;
  return Math.max(22, Math.min(48, rowGap * 0.24));
});

function makeLineMatrix(
  sourceY: number,
  targetX: number,
  targetY: number,
  targetWidth: number,
): string {
  const bounds = annotationBounds.value;
  const unit = bounds.width / 256;
  if (!unit) return "";
  const scaleX = targetWidth / bounds.width;
  const translateX = (targetX - bounds.left) / unit;
  const translateY = (targetY - bounds.top) / unit - sourceY;
  return "matrix(" + [scaleX, 0, 0, 1, translateX, translateY].join(", ") + ")";
}

const k2LineTransforms = computed<Record<string, string>>(() => {
  const bounds = annotationBounds.value;
  const { width, height } = viewport.value;
  if (
    !bounds.width ||
    !width ||
    !height ||
    k2Phase.value === "idle" ||
    k2Phase.value === "reverse-recompose"
  ) return {};

  const initialScroll = heroHeight.value * K2_INITIAL_SCROLL_RATIO;
  const compactBottomY = initialScroll + heroHeight.value - verticalInset.value;
  const compactTopY =
    compactBottomY - (lineDefinitions.length - 1) * compactLineGap.value;

  // The lowest rule moves in document coordinates by the same distance as
  // the page scroll, keeping it visually anchored in the viewport.
  const stageInset = k3Geometry.value.stageInset;
  const finalBottomY = heroHeight.value + height - stageInset;
  const finalRowGap =
    (height - stageInset * 2) / (lineDefinitions.length - 1);
  const isExpanding =
    k2Phase.value === "expand" ||
    k2Phase.value === "titles" ||
    k2Phase.value === "reverse-titles";

  // Keep the expanded geometry while reverse-title exit runs. As soon as
  // reverse-expand begins, the targets become the compact five-line group;
  // LogoAnnotation supplies the inverse In Cubic transition for that move.

  return Object.fromEntries(
    lineDefinitions.map((line, index) => {
      const targetY = isExpanding
        ? finalBottomY - (lineDefinitions.length - 1 - index) * finalRowGap
        : compactTopY + index * compactLineGap.value;

      // The initial and reverse-recompose phases use the compact group.
      // Hold the expanded geometry through title entry/exit; reverse-expand
      // changes the targets back to compact positions using its inverse easing.
      // In expanded geometry, the first rule stays on the shared page inset
      // while the four row gaps compress below that fixed upper boundary.
      const compressedY = isExpanding
        ? heroHeight.value +
          stageInset +
          index * finalRowGap * k3Geometry.value.compression
        : targetY;
      const k4Offset = index === 0 ? 0 : k4Geometry.value.extraHeight;
      const k5Offset = index === 0 ? 0 : k5Geometry.value.dropOffset;
      return [
        line.id,
        makeLineMatrix(line.y, 0, compressedY + k4Offset + k5Offset, width),
      ];
    }),
  );
});

const k2LineDelays = computed<Record<string, string>>(() =>
  Object.fromEntries(
    lineDefinitions.map((line, index) => [
      line.id,
      k2Phase.value === "expand"
        ? (lineDefinitions.length - 1 - index) * K2_LINE_STAGGER + "ms"
        : k2Phase.value === "reverse-expand"
          ? index * K2_LINE_STAGGER + "ms"
          : "0ms",
    ]),
  ),
);

const k5DividerCopyTransform = computed(() => {
  const bounds = annotationBounds.value;
  const { width, height } = viewport.value;
  if (!bounds.width || !width || !height) return "";

  const divider = lineDefinitions[1];
  const stageInset = k3Geometry.value.stageInset;
  const finalRowGap = (height - stageInset * 2) / (lineDefinitions.length - 1);
  const dividerY =
    heroHeight.value +
    stageInset +
    finalRowGap * k3Geometry.value.compression;

  return makeLineMatrix(divider.y, 0, dividerY, width);
});

const frameworkTitlesStyle = computed(() => {
  const bounds = annotationBounds.value;
  const { width } = viewport.value;
  const geometry = k3Geometry.value;
  const stageTop = heroHeight.value + geometry.stageInset - bounds.top;
  return {
    left: geometry.titleInset - bounds.left + "px",
    top: stageTop + "px",
    width: width - geometry.titleInset * 2 + "px",
    height: k4Geometry.value.totalHeight + "px",
    "--framework-title-size": geometry.titleFontSize + "px",
    "--framework-title-scale": geometry.compression,
    "--framework-first-row-height": k4Geometry.value.firstRowHeight + "px",
    "--framework-compact-row-height": k4Geometry.value.compactRowHeight + "px",
    "--framework-first-title-offset":
      (k4Geometry.value.compactRowHeight - geometry.titleFontSize) / 2 + "px",
    "--framework-fall-offset": k5Geometry.value.dropOffset + "px",
  };
});

const frameworkScrollStageStyle = computed(() => ({
  minHeight: `calc(100svh + ${k4Geometry.value.extraHeight}px)`,
}));

const introductionStageStyle = computed(() => ({
  paddingBlockStart: `${k3Geometry.value.stageInset + k4Geometry.value.compactRowHeight + 24}px`,
  paddingInlineStart: `${k3Geometry.value.titleInset}px`,
  paddingInlineEnd: `${k3Geometry.value.titleInset}px`,
}));

const frameworkVerticalLeftStyle = computed(() => ({
  left: k3Geometry.value.boundaryInset + "px",
}));
const frameworkVerticalRightStyle = computed(() => ({
  left:
    viewport.value.width -
    k3Geometry.value.boundaryInset -
    FRAMEWORK_RULE_STROKE_WIDTH +
    "px",
}));

let k2RecomposeTimer: number | undefined;
let k2SettleTimer: number | undefined;
let k2ExpandTimer: number | undefined;
let k3StartTimer: number | undefined;
let k3Frame: number | undefined;
let k4Frame: number | undefined;
let scrollFrame: number | undefined;
let activeScrollAnimation: ActiveScrollAnimation | null = null;
let touchStartY: number | null = null;
let touchLastY: number | null = null;
let touchGestureActive = false;
let touchBlockedUntilEnd = false;
const pressedScrollKeys = new Set<string>();
const blockedScrollKeys = new Set<string>();
let pendingK2 = false;
let lastScrollY = 0;
let isUnmounting = false;
let reverseIntroductionAnimations: Animation[] = [];

const K2_RECOMPOSE_DURATION = 720;
const K2_ANNOTATION_FADE_DURATION = 420;
const K2_INITIAL_SCROLL_DURATION = 560;
const K2_INITIAL_SCROLL_RATIO = 0.22;
const K2_SETTLE_HOLD = 170;
const K2_OPEN_SCROLL_DURATION = 1100;
const K2_LINE_EXPAND_DURATION = 1100;
const K2_LINE_STAGGER = 65;
const K3_GEOMETRY_DURATION = 1500;
const K3_CURSOR_HOLD_CYCLES = 1;
const K4_K5_TRANSITION_DURATION = 1250;
const WORKS_PART02_GAP = 32;
const WORKS_TRANSITION_DURATION = 1150;

function easeInOutCubic(value: number): number {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}

function easeInCubic(value: number): number {
  return value * value * value;
}

function getWorksBoundaryY(): number | null {
  const marker = worksBoundaryRef.value;
  if (!marker) return null;
  return marker.getBoundingClientRect().top + window.scrollY;
}

function getFinalPart02RowBottomY(): number {
  const compactRowHeight = k3Geometry.value.titleAreaHeight / 4;
  // The Part.02 lower rule follows the expanded Part.01 row and one
  // compact Part.02 row. The next compact row belongs to Part.03.
  return (
    heroHeight.value +
    k3Geometry.value.stageInset +
    viewport.value.height * K4_PART01_HEIGHT_RATIO +
    compactRowHeight
  );
}

async function updateWorksSpacer() {
  await nextTick();
  const article = introductionContentRef.value;
  if (!article) return;

  const articleBottom = article.getBoundingClientRect().bottom + window.scrollY;
  const targetPart02Bottom = articleBottom + WORKS_PART02_GAP;

  // Place the falling Part.02 row immediately after the actual Introduction
  // end. A fixed viewport-sized offset lets its absolute title overlay Works.
  worksFrameworkDropDistance.value =
    targetPart02Bottom - getFinalPart02RowBottomY();
  worksSpacerHeight.value = WORKS_PART02_GAP;
  await nextTick();
}

function getWorksDockScrollY(): number | null {
  if (
    !introductionStarted.value ||
    transitionPlayback.value !== "complete" ||
    (!prefersReducedMotion && k5Progress.value < 1)
  ) return null;

  const boundary = getWorksBoundaryY();
  if (boundary === null) return null;
  return Math.max(0, boundary - viewport.value.height);
}

function beginWorksEntrance() {
  if (
    !introductionStarted.value ||
    transitionPlayback.value !== "complete" ||
    worksPlayback.value !== "docked"
  ) return;

  const overlay = worksOverlayRef.value;
  if (!overlay) return;

  worksPlayback.value = "forward";
  blockCurrentInputGestures();
  overlay.scrollTop = 0;

  if (prefersReducedMotion) {
    activateWorksOverlay();
    worksPlayback.value = "complete";
    return;
  }

  worksOverlayAnimation?.cancel();
  worksOverlayAnimation = overlay.animate(
    [
      { transform: "translate3d(0, calc(100% - var(--works-overlay-peek)), 0)" },
      { transform: "translate3d(0, 0, 0)" },
    ],
    { duration: WORKS_TRANSITION_DURATION, easing: "cubic-bezier(0.645, 0.045, 0.355, 1)", fill: "forwards" },
  );
  worksOverlayAnimation.onfinish = () => {
    worksOverlayAnimation = null;
    overlay.style.transform = "translate3d(0, 0, 0)";
    activateWorksOverlay();
    worksPlayback.value = "complete";
  };
}

function getWorksScrollContainer(): HTMLElement | null {
  return worksOverlayRef.value?.querySelector<HTMLElement>(".works-overlay__scroll") ?? null;
}

function activateWorksOverlay() {
  const overlay = worksOverlayRef.value;
  if (!overlay) return;

  documentOverflowBeforeWorks = {
    root: document.documentElement.style.overflow,
    body: document.body.style.overflow,
  };
  lockedDocumentScrollY = window.scrollY;
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  overlay.classList.add("is-active");
  const scroller = getWorksScrollContainer();
  if (scroller) scroller.scrollTop = 0;
}

function deactivateWorksOverlay() {
  const overlay = worksOverlayRef.value;
  overlay?.classList.remove("is-active");
  if (documentOverflowBeforeWorks) {
    document.documentElement.style.overflow = documentOverflowBeforeWorks.root;
    document.body.style.overflow = documentOverflowBeforeWorks.body;
  }
  documentOverflowBeforeWorks = null;
}

function beginWorksReverse() {
  if (worksPlayback.value !== "complete") return;
  const overlay = worksOverlayRef.value;
  const scroller = getWorksScrollContainer();
  if (!overlay || !scroller || scroller.scrollTop > 1) return;

  worksPlayback.value = "reverse";
  blockCurrentInputGestures();

  const finishReverse = () => {
    deactivateWorksOverlay();
    overlay.style.transform = "";
    worksPlayback.value = "docked";
    lastScrollY = window.scrollY;
  };

  if (prefersReducedMotion) {
    finishReverse();
    return;
  }

  worksOverlayAnimation?.cancel();
  worksOverlayAnimation = overlay.animate(
    [
      { transform: "translate3d(0, 0, 0)" },
      { transform: "translate3d(0, calc(100% - var(--works-overlay-peek)), 0)" },
    ],
    { duration: WORKS_TRANSITION_DURATION, easing: "cubic-bezier(0.645, 0.045, 0.355, 1)", fill: "forwards" },
  );
  worksOverlayAnimation.onfinish = () => {
    worksOverlayAnimation = null;
    finishReverse();
  };
}


function resolveScrollEasing(
  easing: ScrollEasing,
  progress: number,
): number {
  if (easing === "out-cubic") return easeOutCubic(progress);
  if (easing === "reverse-out-cubic") return easeInCubic(progress);
  return easeInOutCubic(progress);
}

function blockCurrentInputGestures() {
  for (const key of pressedScrollKeys) {
    blockedScrollKeys.add(key);
  }
  if (touchGestureActive) touchBlockedUntilEnd = true;
}

function getScrollKeyId(event: KeyboardEvent): string {
  return event.code || event.key;
}

function handleKeyup(event: KeyboardEvent) {
  const key = getScrollKeyId(event);
  pressedScrollKeys.delete(key);
  blockedScrollKeys.delete(key);
}

function handleWindowBlur() {
  pressedScrollKeys.clear();
  blockedScrollKeys.clear();
  touchStartY = null;
  touchLastY = null;
  touchGestureActive = false;
  touchBlockedUntilEnd = false;
}

let scrollBehaviorBeforeAnimation: string | null = null;

function restoreDocumentScrollBehavior() {
  if (scrollBehaviorBeforeAnimation === null) return;
  document.documentElement.style.scrollBehavior = scrollBehaviorBeforeAnimation;
  scrollBehaviorBeforeAnimation = null;
}

function scrollToImmediately(targetY: number) {
  // The global stylesheet enables smooth scrolling; boundary locks must snap
  // to the exact document position before the reverse sequence begins.
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, targetY);
  root.style.scrollBehavior = previousBehavior;
}

function animateDocumentScroll(
  targetY: number | (() => number),
  duration: number,
  easing: ScrollEasing = "in-out-cubic",
  onComplete?: () => void,
) {
  worksOverlayAnimation?.cancel();
  worksOverlayAnimation = null;
  if (scrollFrame !== undefined) {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = undefined;
    activeScrollAnimation = null;
    restoreDocumentScrollBehavior();
  }

  const resolveTargetY =
    typeof targetY === "function" ? targetY : () => targetY;
  const animation: ActiveScrollAnimation = {
    progress: 0,
    startY: window.scrollY,
    startEased: 0,
    easing,
    resolveTargetY,
  };
  const startTime = performance.now();
  activeScrollAnimation = animation;
  scrollBehaviorBeforeAnimation = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";

  const frame = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    animation.progress = progress;
    const eased = resolveScrollEasing(easing, progress);
    const easedRange = 1 - animation.startEased;
    const segmentProgress = easedRange <= Number.EPSILON
      ? 1
      : Math.min(1, Math.max(0, (eased - animation.startEased) / easedRange));
    const currentTargetY = animation.resolveTargetY();
    lastScrollY =
      animation.startY + (currentTargetY - animation.startY) * segmentProgress;
    window.scrollTo(0, lastScrollY);

    if (progress < 1) {
      scrollFrame = window.requestAnimationFrame(frame);
    } else {
      scrollFrame = undefined;
      activeScrollAnimation = null;
      const finalTargetY = animation.resolveTargetY();
      window.scrollTo(0, finalTargetY);
      restoreDocumentScrollBehavior();
      lastScrollY = finalTargetY;
      onComplete?.();
    }
  };

  scrollFrame = window.requestAnimationFrame(frame);
}

function scrollImmediatelyToFramework() {
  scrollToImmediately(heroHeight.value);
  lastScrollY = window.scrollY;
}

async function beginK4() {
  if (k4Started.value) return;
  k4Started.value = true;

  // The divider copy is recomputed from the live viewport geometry.
  k5Started.value = true;
  introductionStarted.value = true;
  await updateWorksSpacer();

  if (prefersReducedMotion) {
    k4Progress.value = 1;
    transitionPlayback.value = "complete";
    lastScrollY = window.scrollY;
    return;
  }

  const startTime = performance.now();
  const frame = (now: number) => {
    const progress = Math.min(1, (now - startTime) / K4_K5_TRANSITION_DURATION);
    const eased = easeInCubic(progress);

    // Part.01 opens while Parts 02–04 shrink and fall on this same timeline.
    k4Progress.value = eased;
    k5Progress.value = eased;

    if (progress < 1) {
      k4Frame = window.requestAnimationFrame(frame);
    } else {
      k4Frame = undefined;
      k4Progress.value = 1;
      k5Progress.value = 1;
      transitionPlayback.value = "complete";
      lastScrollY = window.scrollY;
      void updateWorksSpacer();
    }
  };

  k4Frame = window.requestAnimationFrame(frame);
}

function animateK3Geometry() {
  if (prefersReducedMotion) {
    k3Progress.value = 1;
    beginK4();
    return;
  }

  const startTime = performance.now();
  const frame = (now: number) => {
    const progress = Math.min(1, (now - startTime) / K3_GEOMETRY_DURATION);
    k3Progress.value = easeOutCubic(progress);

    if (progress < 1) {
      k3Frame = window.requestAnimationFrame(frame);
    } else {
      k3Frame = undefined;
      k3Progress.value = 1;
      beginK4();
    }
  };

  k3Frame = window.requestAnimationFrame(frame);
}

function beginK3() {
  if (k3Started.value) return;
  k3Started.value = true;
  document.documentElement.classList.remove("k3-content-theme-reversing");
  document.documentElement.classList.add("k3-content-theme");
  animateK3Geometry();
}

function beginK2() {
  if (k2Started.value || transitionPlayback.value !== "idle") return;
  if (logoStage.value !== "waiting") {
    pendingK2 = true;
    blockCurrentInputGestures();
    return;
  }

  transitionPlayback.value = "forward";
  blockCurrentInputGestures();
  k2Started.value = true;
  pendingK2 = false;

  if (prefersReducedMotion) {
    k2Phase.value = "titles";
    scrollImmediatelyToFramework();
    beginK3();
    return;
  }

  k2Phase.value = "recompose";

  // Move the document only a short distance during the first line regrouping.
  // The Hero remains mostly visible while the five paths settle into a
  // moderately spaced group near its lower edge.
  animateDocumentScroll(
    () => heroHeight.value * K2_INITIAL_SCROLL_RATIO,
    K2_INITIAL_SCROLL_DURATION,
  );

  k2RecomposeTimer = window.setTimeout(() => {
    k2Phase.value = "settled";

    // Hold the intermediate composition briefly, then let the rules open
    // the framework while the document completes its upward-moving scroll.
    k2SettleTimer = window.setTimeout(() => {
      k2Phase.value = "expand";
      animateDocumentScroll(
        () => heroHeight.value,
        K2_OPEN_SCROLL_DURATION,
        "out-cubic",
      );

      const totalExpandTime =
        K2_LINE_EXPAND_DURATION + (lineDefinitions.length - 1) * K2_LINE_STAGGER;
      k2ExpandTimer = window.setTimeout(() => {
        k2Phase.value = "titles";
        k3StartTimer = window.setTimeout(
          beginK3,
          frameworkTitleRevealDuration + K3_CURSOR_HOLD_CYCLES * 900,
        );
      }, Math.max(totalExpandTime, K2_OPEN_SCROLL_DURATION) + 80);
    }, K2_SETTLE_HOLD);
  }, K2_RECOMPOSE_DURATION);
}

function reverseIntroductionContent(): Promise<void> {
  const chunks = Array.from(
    document.querySelectorAll<HTMLElement>(".introduction-content__chunk"),
  );

  if (chunks.length === 0) {
    introductionStarted.value = false;
    return Promise.resolve();
  }

  // Read the rendered state before creating the reverse effects. This keeps
  // chunks whose delayed entrance has not started from flashing into view.
  reverseIntroductionAnimations = chunks.map((chunk, index) => {
    const computed = window.getComputedStyle(chunk);
    const opacity = Number.parseFloat(computed.opacity) || 0;
    const transform = computed.transform === "none"
      ? "translateY(0)"
      : computed.transform;

    return chunk.animate(
      [
        { opacity, transform },
        { opacity: 0, transform: "translateY(0.42em)" },
      ],
      {
        duration: 420,
        delay: (chunks.length - index - 1) * 58,
        easing: "cubic-bezier(0.333333, 0, 0.666667, 0)",
        fill: "forwards",
      },
    );
  });

  return Promise.all(
    reverseIntroductionAnimations.map((animation) =>
      animation.finished.catch(() => undefined),
    ),
  ).then(() => {
    if (isUnmounting) return;

    // Unmount the complete article only after its text has left. Opacity alone
    // would leave paragraph margins and the full article height in normal flow.
    introductionStarted.value = false;
    reverseIntroductionAnimations = [];
  });
}

function beginReverseInitialTransition() {
  if (transitionPlayback.value !== "complete") return;
  transitionPlayback.value = "reverse";
  blockCurrentInputGestures();

  if (prefersReducedMotion) {
    introductionStarted.value = false;
    k4Progress.value = 0;
    k5Progress.value = 0;
    k3Progress.value = 0;
    k2Phase.value = "idle";
    k2Started.value = false;
    k3Started.value = false;
    k4Started.value = false;
    k5Started.value = false;
    k3Reversing.value = false;
    document.documentElement.classList.remove("k3-content-theme");
    document.documentElement.classList.remove("k3-content-theme-reversing");
    scrollToImmediately(0);
    lastScrollY = 0;
    transitionPlayback.value = "idle";
    return;
  }

  // Remove the entire Introduction from normal flow before contracting
  // Part.01, so no invisible blank content block remains behind.
  void reverseIntroductionContent().then(() => {
    if (isUnmounting) return;

    const startTime = performance.now();
    const frame = (now: number) => {
      const progress = Math.min(1, (now - startTime) / K4_K5_TRANSITION_DURATION);
      const reversed = 1 - easeOutCubic(progress);
      k4Progress.value = reversed;
      k5Progress.value = reversed;

      if (progress < 1) {
        k4Frame = window.requestAnimationFrame(frame);
      } else {
        k4Frame = undefined;
        k4Progress.value = 0;
        k5Progress.value = 0;
        k5Started.value = false;
        k4Started.value = false;
        reverseK3();
      }
    };

    k4Frame = window.requestAnimationFrame(frame);
  });
}

function reverseK3() {
  k3Reversing.value = true;
  k3Started.value = false;
  document.documentElement.classList.remove("k3-content-theme");
  document.documentElement.classList.add("k3-content-theme-reversing");

  const startTime = performance.now();
  const frame = (now: number) => {
    const progress = Math.min(1, (now - startTime) / K3_GEOMETRY_DURATION);
    k3Progress.value = 1 - easeInCubic(progress);

    if (progress < 1) {
      k3Frame = window.requestAnimationFrame(frame);
    } else {
      k3Frame = undefined;
      k3Progress.value = 0;
      k3Reversing.value = false;
      document.documentElement.classList.remove("k3-content-theme-reversing");
      k2Phase.value = "reverse-titles";
      k3StartTimer = window.setTimeout(
        reverseK2StageC,
        frameworkTitleRevealDuration,
      );
    }
  };

  k3Frame = window.requestAnimationFrame(frame);
}

function reverseK2StageC() {
  k2Phase.value = "reverse-expand";
  animateDocumentScroll(
    () => heroHeight.value * K2_INITIAL_SCROLL_RATIO,
    K2_OPEN_SCROLL_DURATION,
    "reverse-out-cubic",
  );

  const totalExpandTime =
    K2_LINE_EXPAND_DURATION + (lineDefinitions.length - 1) * K2_LINE_STAGGER;
  k2ExpandTimer = window.setTimeout(() => {
    k2Phase.value = "settled";
    k2SettleTimer = window.setTimeout(reverseK2StageA, K2_SETTLE_HOLD);
  }, Math.max(totalExpandTime, K2_OPEN_SCROLL_DURATION) + 80);
}

function reverseK2StageA() {
  k2Phase.value = "reverse-recompose";
  animateDocumentScroll(0, K2_INITIAL_SCROLL_DURATION, "in-out-cubic");

  // The forward annotation fade-out occupies the first 420ms of the
  // 720ms recomposition. Its reverse therefore begins in the final 420ms.
  k2RecomposeTimer = window.setTimeout(() => {
    k2Started.value = false;
    k3Started.value = false;
    k3Progress.value = 0;
    k4Started.value = false;
    k4Progress.value = 0;
    k5Started.value = false;
    k5Progress.value = 0;
    k3Reversing.value = false;
    lastScrollY = window.scrollY;
  }, K2_RECOMPOSE_DURATION - K2_ANNOTATION_FADE_DURATION);

  k2SettleTimer = window.setTimeout(() => {
    k2Phase.value = "idle";
    transitionPlayback.value = "idle";
    lastScrollY = window.scrollY;
  }, K2_RECOMPOSE_DURATION);
}

function handleWheel(event: WheelEvent) {
  if (event.ctrlKey) return;

  if (worksPlayback.value === "forward" || worksPlayback.value === "reverse") {
    event.preventDefault();
    return;
  }

  if (worksPlayback.value === "complete") {
    const scroller = getWorksScrollContainer();
    if (!scroller || event.deltaY === 0) return;

    event.preventDefault();
    const maxScroll = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const nextScroll = Math.max(0, Math.min(maxScroll, scroller.scrollTop + event.deltaY));

    // A gesture that merely reaches the top finishes scrolling the Works
    // content. A subsequent upward gesture at the top reverses the cover.
    if (event.deltaY < 0 && scroller.scrollTop <= 1) {
      beginWorksReverse();
      return;
    }

    scroller.scrollTop = nextScroll;
    return;
  }

  const worksDockY = getWorksDockScrollY();

  if (worksPlayback.value === "docked") {
    if (event.deltaY > 0) {
      event.preventDefault();
      beginWorksEntrance();
    } else if (event.deltaY < 0) {
      worksPlayback.value = "idle";
    }
    return;
  }

  if (
    !prefersReducedMotion &&
    worksPlayback.value === "idle" &&
    transitionPlayback.value === "complete" &&
    worksDockY !== null &&
    event.deltaY > 0 &&
    (window.scrollY >= worksDockY - 1 ||
      window.scrollY + event.deltaY >= worksDockY)
  ) {
    event.preventDefault();
    scrollToImmediately(worksDockY);
    worksPlayback.value = "docked";
    lastScrollY = window.scrollY;
    return;
  }

  if (transitionPlayback.value === "forward" || transitionPlayback.value === "reverse") {
    event.preventDefault();
    return;
  }
  if (
    transitionPlayback.value === "complete" &&
    event.deltaY < 0 &&
    (window.scrollY <= heroHeight.value + 1 ||
      window.scrollY + event.deltaY <= heroHeight.value)
  ) {
    event.preventDefault();
    scrollToImmediately(heroHeight.value);
    lastScrollY = heroHeight.value;
    beginReverseInitialTransition();
    return;
  }
  if (transitionPlayback.value === "idle" && !k2Started.value && event.deltaY > 0) {
    event.preventDefault();
    beginK2();
  } else if (pendingK2 && event.deltaY > 0) {
    event.preventDefault();
  }
}

function handleTouchStart(event: TouchEvent) {
  touchGestureActive = event.touches.length > 0;
  // Do not treat a multi-touch gesture (for example, pinch zoom) as page
  // navigation. A fresh single-finger gesture can begin after it ends.
  if (event.touches.length !== 1) {
    touchStartY = null;
    touchLastY = null;
    touchBlockedUntilEnd =
      transitionPlayback.value === "forward" ||
      transitionPlayback.value === "reverse" ||
      worksPlayback.value === "forward" ||
      worksPlayback.value === "reverse" ||
      pendingK2;
    return;
  }
  touchStartY = event.touches[0].clientY;
  touchLastY = touchStartY;
  touchBlockedUntilEnd =
    transitionPlayback.value === "forward" ||
    transitionPlayback.value === "reverse" ||
    worksPlayback.value === "forward" ||
    worksPlayback.value === "reverse" ||
    pendingK2;
}

function handleTouchMove(event: TouchEvent) {
  touchGestureActive = event.touches.length > 0;
  if (event.touches.length !== 1) {
    touchStartY = null;
    touchLastY = null;
    if (
      transitionPlayback.value === "forward" ||
      transitionPlayback.value === "reverse" ||
      worksPlayback.value === "forward" ||
      worksPlayback.value === "reverse" ||
      pendingK2
    ) touchBlockedUntilEnd = true;
    return;
  }
  if (touchBlockedUntilEnd) {
    event.preventDefault();
    return;
  }

  const currentY = event.touches[0]?.clientY;
  if (currentY === undefined || touchStartY === null || touchLastY === null) return;
  const delta = touchStartY - currentY;
  const stepDelta = touchLastY - currentY;
  touchLastY = currentY;

  if (worksPlayback.value === "forward" || worksPlayback.value === "reverse") {
    touchBlockedUntilEnd = true;
    event.preventDefault();
    return;
  }

  const worksDockY = getWorksDockScrollY();

  if (worksPlayback.value === "docked") {
    if (stepDelta > 8) {
      event.preventDefault();
      beginWorksEntrance();
      touchBlockedUntilEnd = true;
    } else if (stepDelta < -8) {
      worksPlayback.value = "idle";
    }
    return;
  }

  if (worksPlayback.value === "complete") {
    const scroller = getWorksScrollContainer();
    if (!scroller) return;

    event.preventDefault();
    if (stepDelta < -8 && scroller.scrollTop <= 1) {
      beginWorksReverse();
      touchBlockedUntilEnd = true;
      return;
    }

    const maxScroll = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const previousTop = scroller.scrollTop;
    scroller.scrollTop = Math.max(0, Math.min(maxScroll, previousTop + stepDelta));

    // Do not turn the same swipe that reaches scrollTop=0 into a page reversal.
    if (stepDelta < -8 && previousTop > 1 && scroller.scrollTop <= 1) {
      touchBlockedUntilEnd = true;
    }
    return;
  }

  if (
    !prefersReducedMotion &&
    worksPlayback.value === "idle" &&
    transitionPlayback.value === "complete" &&
    worksDockY !== null &&
    stepDelta > 8 &&
    window.scrollY + stepDelta >= worksDockY
  ) {
    event.preventDefault();
    scrollToImmediately(worksDockY);
    worksPlayback.value = "docked";
    lastScrollY = window.scrollY;
    touchBlockedUntilEnd = true;
    return;
  }

  if (transitionPlayback.value === "forward" || transitionPlayback.value === "reverse") {
    touchBlockedUntilEnd = true;
    event.preventDefault();
    return;
  }
  if (transitionPlayback.value === "idle" && !k2Started.value && delta > 8) {
    event.preventDefault();
    beginK2();
    touchBlockedUntilEnd = true;
    return;
  }
  if (
    transitionPlayback.value === "complete" &&
    delta < -8 &&
    stepDelta < 0 &&
    (window.scrollY <= heroHeight.value + 1 ||
      window.scrollY + stepDelta <= heroHeight.value)
  ) {
    event.preventDefault();
    scrollToImmediately(heroHeight.value);
    lastScrollY = heroHeight.value;
    beginReverseInitialTransition();
    touchBlockedUntilEnd = true;
  }
}


function handleTouchEnd(event: TouchEvent) {
  touchGestureActive = event.touches.length > 0;
  touchStartY = null;
  touchLastY = null;

  if (event.touches.length > 0) {
    if (
      transitionPlayback.value === "forward" ||
      transitionPlayback.value === "reverse" ||
      worksPlayback.value === "forward" ||
      worksPlayback.value === "reverse" ||
      pendingK2
    ) {
      touchBlockedUntilEnd = true;
    }
    return;
  }

  touchBlockedUntilEnd = false;
}

function handleDocumentScroll() {
  const currentY = window.scrollY;
  if (
    transitionPlayback.value === "forward" ||
    transitionPlayback.value === "reverse" ||
    worksPlayback.value === "forward" ||
    worksPlayback.value === "reverse"
  ) {
    if (Math.abs(currentY - lastScrollY) > 1) scrollToImmediately(lastScrollY);
    return;
  }

  const movedUp = currentY < lastScrollY - 1;
  const movedDown = currentY > lastScrollY;
  const worksDockY = getWorksDockScrollY();

  if (worksPlayback.value === "docked") {
    if (movedDown) {
      const dockY = getWorksDockScrollY();
      if (dockY !== null) scrollToImmediately(dockY);
      lastScrollY = window.scrollY;
      beginWorksEntrance();
      return;
    }
    if (movedUp) worksPlayback.value = "idle";
  }

  if (worksPlayback.value === "complete") {
    if (Math.abs(currentY - lockedDocumentScrollY) > 1) {
      scrollToImmediately(lockedDocumentScrollY);
    }
    lastScrollY = lockedDocumentScrollY;
    return;
  }

  if (
    !prefersReducedMotion &&
    worksPlayback.value === "idle" &&
    transitionPlayback.value === "complete" &&
    movedDown &&
    worksDockY !== null &&
    currentY >= worksDockY - 1
  ) {
    scrollToImmediately(worksDockY);
    worksPlayback.value = "docked";
    lastScrollY = window.scrollY;
    return;
  }

  if (transitionPlayback.value === "complete" && movedUp && currentY < heroHeight.value - 1) {
    scrollToImmediately(heroHeight.value);
    lastScrollY = heroHeight.value;
    beginReverseInitialTransition();
    return;
  }
  lastScrollY = currentY;
  if (movedDown && !k2Started.value) {
    scrollToImmediately(0);
    lastScrollY = 0;
    beginK2();
  }
}


function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("button, a, input, textarea, select, [contenteditable='true']"));
}

function handleKeydown(event: KeyboardEvent) {
  if (
    event.defaultPrevented ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    isInteractiveTarget(event.target)
  ) return;
  const scrollDown =
    !event.shiftKey &&
    (event.key === "ArrowDown" || event.key === "PageDown" ||
      event.key === " " || event.key === "End");
  const scrollUp =
    event.key === "ArrowUp" || event.key === "PageUp" ||
    event.key === "Home" || (event.key === " " && event.shiftKey);
  if (!scrollDown && !scrollUp) return;

  const key = getScrollKeyId(event);
  pressedScrollKeys.add(key);
  if (blockedScrollKeys.has(key)) {
    event.preventDefault();
    return;
  }
  if (
    transitionPlayback.value === "forward" ||
    transitionPlayback.value === "reverse" ||
    worksPlayback.value === "forward" ||
    worksPlayback.value === "reverse"
  ) {
    event.preventDefault();
    blockedScrollKeys.add(key);
    return;
  }

  const worksDockY = getWorksDockScrollY();
  if (worksPlayback.value === "docked") {
    if (scrollDown) {
      event.preventDefault();
      beginWorksEntrance();
      blockedScrollKeys.add(key);
    } else if (scrollUp) {
      worksPlayback.value = "idle";
    }
    return;
  }

  if (worksPlayback.value === "complete") {
    const scroller = getWorksScrollContainer();
    if (scrollUp && scroller?.scrollTop === 0) {
      event.preventDefault();
      beginWorksReverse();
      blockedScrollKeys.add(key);
      return;
    }
    if (scroller) {
      event.preventDefault();
      const amount =
        event.key === "Home" ? -scroller.scrollTop :
        event.key === "End" ? scroller.scrollHeight :
        event.key === "PageDown" || event.key === "PageUp" || event.key === " " ?
          Math.sign(scrollDown ? 1 : -1) * scroller.clientHeight * 0.85 :
          Math.sign(scrollDown ? 1 : -1) * 64;
      scroller.scrollBy({ top: amount, behavior: "auto" });
      blockedScrollKeys.add(key);
    }
    return;
  }

  if (
    !prefersReducedMotion &&
    worksPlayback.value === "idle" &&
    transitionPlayback.value === "complete" &&
    scrollDown &&
    worksDockY !== null
  ) {
    const estimatedDelta =
      event.key === "End" ? Number.POSITIVE_INFINITY :
      event.key === "PageDown" || event.key === " " ? viewport.value.height : 64;
    if (window.scrollY + estimatedDelta >= worksDockY) {
      event.preventDefault();
      scrollToImmediately(worksDockY);
      worksPlayback.value = "docked";
      lastScrollY = window.scrollY;
      blockedScrollKeys.add(key);
      return;
    }
  }

  if (transitionPlayback.value === "idle" && !k2Started.value && scrollDown) {
    event.preventDefault();
    beginK2();
    blockedScrollKeys.add(key);
    return;
  }
  if (
    transitionPlayback.value === "complete" &&
    scrollUp &&
    (event.key === "Home" ||
      window.scrollY <= heroHeight.value + 1 ||
      (event.key === "PageUp" && window.scrollY - viewport.value.height <= heroHeight.value))
  ) {
    event.preventDefault();
    scrollToImmediately(heroHeight.value);
    lastScrollY = heroHeight.value;
    beginReverseInitialTransition();
    blockedScrollKeys.add(key);
  }
}


function updateAnnotationBounds() {
  if (!markSpaceRef.value) return;
  if (titlePageRef.value) {
    const pageRect = titlePageRef.value.getBoundingClientRect();
    heroHeight.value = pageRect.height;
    viewport.value = { width: pageRect.width, height: pageRect.height };
  }
  const nameRect = nameRef.value?.getBoundingClientRect();
  if (nameRect) heroNameInset.value = nameRect.left;
  const rect = markSpaceRef.value.getBoundingClientRect();
  annotationBounds.value = {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
}

async function handleResize() {
  const previousHeroHeight = heroHeight.value;
  const previousWorksBoundary = getWorksBoundaryY();
  const previousWorksDockY = getWorksDockScrollY();
  const currentScrollY = window.scrollY;
  const hasActiveTransition =
    transitionPlayback.value === "forward" ||
    transitionPlayback.value === "reverse";
  const previousScrollY = hasActiveTransition ? lastScrollY : currentScrollY;

  if (worksPlayback.value === "complete") {
    updateAnnotationBounds();
    return;
  }

  updateAnnotationBounds();
  await updateWorksSpacer();

  const nextWorksBoundary = getWorksBoundaryY();
  const nextWorksDockY = getWorksDockScrollY();
  if (
    (worksPlayback.value === "forward" || worksPlayback.value === "reverse") &&
    activeScrollAnimation
  ) {
    activeScrollAnimation.startY = window.scrollY;
    activeScrollAnimation.startEased = resolveScrollEasing(
      activeScrollAnimation.easing,
      activeScrollAnimation.progress,
    );
    lastScrollY = window.scrollY;
    return;
  }
  if (
    worksPlayback.value === "complete" &&
    previousWorksBoundary !== null &&
    nextWorksBoundary !== null
  ) {
    const worksOffset = Math.max(0, previousScrollY - previousWorksBoundary);
    scrollToImmediately(nextWorksBoundary + worksOffset);
    lastScrollY = window.scrollY;
    return;
  }
  if (
    worksPlayback.value === "docked" &&
    previousWorksDockY !== null &&
    nextWorksDockY !== null
  ) {
    scrollToImmediately(nextWorksDockY);
    lastScrollY = window.scrollY;
    return;
  }

  if (
    transitionPlayback.value === "forward" ||
    transitionPlayback.value === "reverse"
  ) {
    // Keep the in-flight choreography at the same normalized document
    // position when the Hero height changes. Rebase an active scroll segment
    // at its current progress so its easing continues without a restart.
    const scale = previousHeroHeight > 0
      ? heroHeight.value / previousHeroHeight
      : 1;
    const resizedScrollY = previousScrollY * scale;
    scrollToImmediately(resizedScrollY);
    const adjustedScrollY = window.scrollY;

    if (activeScrollAnimation) {
      activeScrollAnimation.startY = adjustedScrollY;
      activeScrollAnimation.startEased = resolveScrollEasing(
        activeScrollAnimation.easing,
        activeScrollAnimation.progress,
      );
    }

    lastScrollY = adjustedScrollY;
    return;
  }

  // Preserve the reader's offset inside Part.01 when a viewport resize changes
  // the Hero height. Otherwise a taller Hero could make a normal resize look
  // like an upward gesture across the reverse boundary.
  if (
    transitionPlayback.value === "complete" &&
    previousScrollY >= previousHeroHeight - 1
  ) {
    const contentOffset = Math.max(0, previousScrollY - previousHeroHeight);
    scrollToImmediately(heroHeight.value + contentOffset);
  }

  // Ignore layout-induced scroll changes from resize before native scrolling
  // resumes or a new K1 downward gesture is detected.
  lastScrollY = window.scrollY;
}

function handleLogoRevealEnd() {
  if (logoStage.value === "reveal") {
    logoStage.value = "crossfade";
  }
}

function handleAnnotationFadeEnd(event: TransitionEvent) {
  if (event.propertyName === "opacity" && logoStage.value === "crossfade") {
    logoStage.value = "waiting";
    if (pendingK2) beginK2();
  }
}

onMounted(() => {
  updateAnnotationBounds();
  lastScrollY = window.scrollY;

  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
  window.addEventListener("touchstart", handleTouchStart, { passive: true, capture: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
  window.addEventListener("touchend", handleTouchEnd, { passive: true, capture: true });
  window.addEventListener("touchcancel", handleTouchEnd, { passive: true, capture: true });
  window.addEventListener("keydown", handleKeydown, true);
  window.addEventListener("keyup", handleKeyup, true);
  window.addEventListener("blur", handleWindowBlur);
  window.addEventListener("scroll", handleDocumentScroll, { passive: true });
});

onBeforeUnmount(() => {
  isUnmounting = true;
  reverseIntroductionAnimations.forEach((animation) => animation.cancel());
  if (k2RecomposeTimer !== undefined) window.clearTimeout(k2RecomposeTimer);
  if (k2SettleTimer !== undefined) window.clearTimeout(k2SettleTimer);
  if (k2ExpandTimer !== undefined) window.clearTimeout(k2ExpandTimer);
  if (k3StartTimer !== undefined) window.clearTimeout(k3StartTimer);
  if (k3Frame !== undefined) window.cancelAnimationFrame(k3Frame);
  if (k4Frame !== undefined) window.cancelAnimationFrame(k4Frame);
  if (scrollFrame !== undefined) {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = undefined;
  }
  activeScrollAnimation = null;
  restoreDocumentScrollBehavior();
  deactivateWorksOverlay();
  document.documentElement.classList.remove("k3-content-theme");
  document.documentElement.classList.remove("k3-content-theme-reversing");

  window.removeEventListener("resize", handleResize);
  window.removeEventListener("wheel", handleWheel, true);
  window.removeEventListener("touchstart", handleTouchStart, true);
  window.removeEventListener("touchmove", handleTouchMove, true);
  window.removeEventListener("touchend", handleTouchEnd, true);
  window.removeEventListener("touchcancel", handleTouchEnd, true);
  window.removeEventListener("keydown", handleKeydown, true);
  window.removeEventListener("keyup", handleKeyup, true);
  window.removeEventListener("blur", handleWindowBlur);
  window.removeEventListener("scroll", handleDocumentScroll);
});
</script>

<template>
  <section
    id="title-page"
    ref="titlePageRef"
    class="title-page"
    :class="{ 'has-started-k2': k2Started }"
    aria-labelledby="page-title"
  >
    <div class="title-page__controls" role="group" :aria-label="locale === 'zh' ? '页面设置' : 'Page settings'">
      <div class="title-page__language" role="group" :aria-label="locale === 'zh' ? '语言' : 'Language'">
        <button
          type="button"
          class="title-page__control"
          :class="{ 'is-active': locale === 'zh' }"
          :aria-pressed="locale === 'zh'"
          @click="setLocale('zh')"
        >
          中
        </button>
        <span class="title-page__control-divider" aria-hidden="true"></span>
        <button
          type="button"
          class="title-page__control"
          :class="{ 'is-active': locale === 'en' }"
          :aria-pressed="locale === 'en'"
          @click="setLocale('en')"
        >
          EN
        </button>
      </div>

      <span class="title-page__settings-divider" aria-hidden="true"></span>

      <button
        type="button"
        class="title-page__control title-page__theme"
        :aria-label="locale === 'zh' ? '切换明暗主题' : 'Change color theme'"
        :title="locale === 'zh' ? '切换明暗主题' : 'Change color theme'"
        @click="cycle"
      >
        <span class="title-page__theme-indicator" :class="{ 'is-dark': resolved === 'dark' }" aria-hidden="true"></span>
        <span>{{ pref === 'system' ? (locale === 'zh' ? '自动' : 'AUTO') : resolved.toUpperCase() }}</span>
      </button>
    </div>

    <div class="title-page__layout">
      <div class="title-page__identity">
        <h1 id="page-title" ref="nameRef" class="title-page__name">
          <span>Federico</span>
          <span>Prask</span>
        </h1>
        <p class="title-page__subtitle">
          {{ locale === 'zh' ? '个人网站' : 'Personal Website' }}
        </p>
      </div>

      <div ref="markSpaceRef" class="title-page__mark-space">
        <div
          class="title-page__logo-sequence"
          :class="`is-${logoStage}`"
          role="img"
          :aria-label="locale === 'zh' ? 'FP 标志' : 'FP monogram'"
        >
          <div
            v-if="logoStage !== 'waiting'"
            class="title-page__logo-normal"
            :class="{ 'is-inverted': resolved === 'light' }"
            aria-hidden="true"
          >
            <LogoMark @reveal-end="handleLogoRevealEnd" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <div
    class="title-page__framework-scroll-stage"
    :class="{ 'is-k3': k3Started, 'is-k3-reversing': k3Reversing }"
    :style="[frameworkScrollStageStyle, introductionStarted ? introductionStageStyle : undefined]"
  >
    <article
      v-if="introductionStarted"
      ref="introductionContentRef"
      class="introduction-content"
      aria-labelledby="introduction-greeting"
    >
      <h2 id="introduction-greeting" class="introduction-content__greeting">
        <span
          class="introduction-content__chunk"
          :style="{ '--intro-delay': introductionView.greetingDelay }"
        >{{ introductionView.greeting }}</span>
        <span
          class="introduction-content__chunk"
          :style="{ '--intro-delay': introductionView.nameDelay }"
        ><span class="introduction-content__name-mark">{{ introductionView.name }}</span></span>
        <span
          class="introduction-content__chunk"
          :style="{ '--intro-delay': introductionView.websiteDelay }"
        >{{ introductionView.website }}</span>
      </h2>

      <p v-for="(paragraph, paragraphIndex) in introductionView.paragraphs" :key="paragraphIndex">
        <span
          v-for="chunk in paragraph"
          :key="chunk.delay"
          class="introduction-content__chunk"
          :style="{ '--intro-delay': chunk.delay }"
        >{{ chunk.text }}</span>
      </p>

      <p
        class="introduction-content__tagline introduction-content__chunk"
        :style="{ '--intro-delay': introductionView.taglineDelay }"
      >{{ introductionView.tagline }}</p>
    </article>
    <div
      v-if="introductionStarted"
      class="works-dock-spacer"
      :style="{ height: worksSpacerHeight + 'px' }"
      aria-hidden="true"
    ></div>
    <div
      v-if="introductionStarted"
      ref="worksBoundaryRef"
      class="works-section-boundary"
      aria-hidden="true"
    ></div>

    <div
      v-if="prefersReducedMotion && introductionStarted"
      class="works-section-stage"
    >
      <WorksSection />
      <section id="milestones-section" class="document-part-section" aria-labelledby="milestones-heading">
        <h2 id="milestones-heading" class="document-part-heading">Part.03 Milestones</h2>
      </section>
      <section id="beyond-section" class="document-part-section" aria-labelledby="beyond-heading">
        <h2 id="beyond-heading" class="document-part-heading">Part.04 Beyond</h2>
      </section>
    </div>
  </div>

  <div
    v-if="introductionStarted && !prefersReducedMotion"
    ref="worksOverlayRef"
    class="works-overlay"
    :class="{ 'is-docked': worksPlayback === 'docked' || worksPlayback === 'forward' || worksPlayback === 'reverse', 'is-active': worksPlayback === 'complete' }"
    :aria-hidden="worksPlayback !== 'complete' && worksPlayback !== 'docked' && worksPlayback !== 'forward' && worksPlayback !== 'reverse'"
  >
    <span
      class="works-overlay__vertical-rule works-overlay__vertical-rule--left"
      :style="frameworkVerticalLeftStyle"
      aria-hidden="true"
    ></span>
    <span
      class="works-overlay__vertical-rule works-overlay__vertical-rule--right"
      :style="{ right: k3Geometry.boundaryInset + 'px' }"
      aria-hidden="true"
    ></span>
    <header class="works-overlay__heading">
      <span>Part.02 Works</span>
      <span class="works-overlay__rule" aria-hidden="true"></span>
    </header>
    <div class="works-overlay__scroll">
      <WorksSection />
      <section id="milestones-section" class="document-part-section" aria-labelledby="milestones-heading">
        <h2 id="milestones-heading" class="document-part-heading">Part.03 Milestones</h2>
      </section>
      <section id="beyond-section" class="document-part-section" aria-labelledby="beyond-heading">
        <h2 id="beyond-heading" class="document-part-heading">Part.04 Beyond</h2>
      </section>
    </div>
  </div>

  <div
    v-if="annotationBounds.width"
    class="title-page__logo-annotation"
    :class="{
      'is-visible': logoStage === 'crossfade' || logoStage === 'waiting',
      'is-k3': k3Started,
      'is-k3-reversing': k3Reversing,
    }"
    :style="annotationStyle"
    @transitionend.self="handleAnnotationFadeEnd"
  >
    <LogoAnnotation
      :k2-started="k2Started"
      :k2-phase="k2Phase"
      :k2-line-transforms="k2LineTransforms"
      :k2-line-delays="k2LineDelays"
      :k3-started="k3Started"
      :k3-reversing="k3Reversing"
      :k5-started="k5Started"
      :k5-divider-copy-transform="k5DividerCopyTransform"
    />
    <div
      v-if="k2Phase === 'titles' || k2Phase === 'reverse-titles'"
      class="framework-vertical-line"
      :class="{ 'is-k3': k3Started, 'is-k3-reversing': k3Reversing }"
      :style="frameworkVerticalLeftStyle"
      aria-hidden="true"
    ></div>
    <div
      v-if="k2Phase === 'titles' || k2Phase === 'reverse-titles'"
      class="framework-vertical-line"
      :class="{ 'is-k3': k3Started, 'is-k3-reversing': k3Reversing }"
      :style="frameworkVerticalRightStyle"
      aria-hidden="true"
    ></div>
    <div
      v-if="k2Phase === 'titles' || k2Phase === 'reverse-titles'"
      class="framework-titles"
      :class="{
        'is-k3': k3Started,
        'is-k3-reversing': k3Reversing,
        'is-k5': k5Started,
        'is-k5-complete': transitionPlayback === 'complete',
        'is-reversing': k2Phase === 'reverse-titles',
      }"
      :style="frameworkTitlesStyle"
      aria-hidden="true"
    >
      <div
        v-for="(part, partIndex) in frameworkParts"
        :key="part"
        class="framework-title"
        :class="{ 'is-flow-replaced': partIndex >= 2 }"
      >
        <span class="framework-title__text">
          <span
            v-for="(character, index) in part.split('')"
            :key="`${part}-${index}`"
            class="framework-title__character"
            :style="{
              '--character-delay': `${index * 36}ms`,
              '--character-reverse-delay': `${(frameworkMaxTitleLength - index - 1) * 36}ms`,
            }"
          >{{ character === " " ? "\u00A0" : character }}</span>
        </span>
        <span
          class="framework-title__cursor"
          :style="{ '--cursor-delay': frameworkCursorDelay }"
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-page {
  position: relative;
  display: grid;
  width: 100%;
  height: 100svh;
  min-height: 100svh;
  overflow: clip;
  padding: clamp(1.5rem, 4.2vw, 4.5rem);
  background: var(--site-hero-background);
  color: var(--site-hero-foreground);
}

.title-page__controls {
  position: absolute;
  z-index: 1;
  inset-block-start: clamp(1.5rem, 3.4vw, 3rem);
  inset-inline-end: clamp(1.5rem, 4.2vw, 4.5rem);
  display: flex;
  align-items: center;
  gap: 0.9rem;
  color: var(--site-hero-foreground);
  font-family: var(--font-technical);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
}

.title-page__language {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
}

.title-page__control {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2rem;
  padding: 0.25rem 0;
  border: 0;
  background: transparent;
  color: currentColor;
  opacity: 0.48;
  transition: opacity 180ms ease, color 180ms ease;
}

.title-page__control:hover,
.title-page__control:focus-visible,
.title-page__control.is-active {
  opacity: 1;
}

.title-page__control:focus-visible {
  outline: 1px solid var(--site-brand);
  outline-offset: 4px;
}

.title-page__control-divider,
.title-page__settings-divider {
  width: 1px;
  height: 0.8rem;
  background: var(--site-hero-rule-strong);
}

.title-page__theme-indicator {
  width: 0.55rem;
  height: 0.55rem;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: transparent;
}

.title-page__theme-indicator.is-dark {
  background: currentColor;
}

.title-page__layout {
  display: grid;
  width: min(100%, 82rem);
  grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.82fr);
  align-items: center;
  gap: clamp(1.7rem, 4.2vw, 4.2rem);
  margin: auto;
}

.title-page__identity {
  min-width: 0;
}

.title-page__name {
  display: flex;
  flex-direction: column;
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(3.55rem, 8.7vw, 8rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 0.84;
}

.title-page__name span + span {
  margin-block-start: 0.12em;
}

.title-page__subtitle {
  margin: clamp(1.7rem, 3.2vw, 3rem) 0 0 0.12em;
  color: var(--site-hero-foreground);
  font-family: var(--font-heading);
  font-size: clamp(0.95rem, 1.45vw, 1.25rem);
  font-weight: 400;
  letter-spacing: -0.015em;
  opacity: 0.62;
}

.title-page__mark-space {
  display: grid;
  width: clamp(15rem, 23.5vw, 21rem);
  max-width: 100%;
  min-width: 0;
  aspect-ratio: 1;
  place-items: center;
  justify-self: end;
}

.title-page__logo-sequence {
  position: relative;
  width: 100%;
  height: 100%;
}

.title-page__logo-normal {
  position: absolute;
  inset: 0;
  opacity: 1;
  filter: none;
  transition: opacity 700ms cubic-bezier(0.22, 0.7, 0.24, 1), filter 100ms ease;
}

.title-page__logo-normal.is-inverted {
  filter: invert(1);
}

.title-page__logo-sequence.is-crossfade .title-page__logo-normal {
  opacity: 0;
}

.title-page__framework-scroll-stage {
  position: relative;
  display: flow-root;
  min-height: 100svh;
  background: var(--site-hero-background);
  transition: background-color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.works-dock-spacer {
  display: block;
  width: 100%;
  pointer-events: none;
}

.works-section-boundary {
  display: block;
  width: 100%;
  height: 0;
  pointer-events: none;
}

.works-section-stage {
  position: relative;
  width: 100%;
}

.works-overlay {
  --works-overlay-peek: clamp(4.5rem, 9vw, 8rem);
  position: fixed;
  z-index: 30;
  inset: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--site-page-background);
  color: var(--site-text-primary);
  transform: translate3d(0, calc(100% - var(--works-overlay-peek)), 0);
  visibility: hidden;
  pointer-events: none;
  will-change: transform;
}

.works-overlay.is-docked {
  visibility: visible;
  pointer-events: auto;
}

.works-overlay.is-active {
  visibility: visible;
  pointer-events: auto;
}

.works-overlay__heading {
  display: flex;
  flex: 0 0 var(--works-overlay-peek);
  align-items: center;
  gap: 1.5rem;
  padding-inline: clamp(1.5rem, 4.2vw, 4.5rem);
  border-block: 0.35px solid var(--site-framework-rule);
  color: var(--site-text-primary);
  font-family: "SF Pro Display", var(--font-heading);
  font-size: clamp(1.7rem, 3.4vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1;
}

.works-overlay__rule {
  flex: 1;
  height: 0.35px;
  background: var(--site-framework-rule);
}

.works-overlay__vertical-rule {
  position: absolute;
  z-index: 4;
  inset-block: 0;
  width: 0;
  border-inline-start: 0.35px solid var(--site-framework-rule);
  pointer-events: none;
}

.works-overlay__scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
}

.works-overlay.is-docked .works-overlay__scroll,
.works-overlay.is-docked .works-overlay__heading {
  pointer-events: none;
}

.document-part-section {
  position: relative;
  width: 100%;
}

.document-part-heading {
  display: flex;
  min-height: clamp(4.5rem, 9vw, 8rem);
  align-items: center;
  margin: 0;
  padding-inline: clamp(1.5rem, 4.2vw, 4.5rem);
  border-block: 0.35px solid var(--site-framework-rule);
  color: var(--site-text-primary);
  font-family: "SF Pro Display", var(--font-heading);
  font-size: clamp(1.7rem, 3.4vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1;
}

.document-part-content {
  min-height: 0;
}

.introduction-content {
  width: min(100%, 76rem);
  padding-block-end: 0;
  color: var(--site-text-secondary);
  font-family: var(--font-body);
  font-size: clamp(0.94rem, 1vw, 1.075rem);
  font-weight: 400;
  line-height: 1.95;
  text-wrap: pretty;
}

.introduction-content__greeting {
  margin: 0 0 clamp(1.25rem, 2.7vw, 2.1rem);
  color: var(--site-text-primary);
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  font-weight: 500;
  line-height: 1.55;
  letter-spacing: -0.025em;
}

.introduction-content__name-mark {
  color: var(--site-text-primary);
  font-family: "LXGW WenKai Lite", cursive;
  font-size: 1.22em;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  background-image: linear-gradient(
    177deg,
    transparent 0 54%,
    color-mix(in srgb, var(--site-brand) 76%, transparent) 54% 90%,
    transparent 90%
  );
  background-repeat: no-repeat;
  background-position: 0 -0.04em;
  background-size: 100% 100%;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.introduction-content p {
  margin: 0 0 1.15em;
}

.introduction-content__chunk {
  display: inline-block;
  max-width: 100%;
  opacity: 0;
  transform: translateY(0.42em);
  animation: introduction-chunk-reveal 420ms cubic-bezier(0.333333, 1, 0.666667, 1) both;
  animation-delay: var(--intro-delay, 0ms);
}

.introduction-content__tagline {
  display: block;
  margin-block-start: clamp(2rem, 4vw, 3.25rem) !important;
  margin-block-end: 0 !important;
  color: var(--site-text-primary);
  font-family: "SF Pro Display", var(--font-heading);
  font-size: clamp(1.25rem, 2.2vw, 1.85rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.15;
}

@keyframes introduction-chunk-reveal {
  from {
    opacity: 0;
    transform: translateY(0.42em);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title-page__framework-scroll-stage.is-k3 {
  background: var(--site-page-background);
}

.title-page__framework-scroll-stage.is-k3-reversing {
  background: var(--site-hero-background);
  transition: background-color 1500ms cubic-bezier(0.333333, 0, 0.666667, 0);
}

.title-page__logo-annotation {
  position: absolute;
  z-index: 20;
  display: block;
  overflow: visible;
  color: var(--site-hero-foreground);
  pointer-events: none;
  opacity: 0;
  transition: opacity 700ms cubic-bezier(0.22, 0.7, 0.24, 1);
}

.title-page__logo-annotation.is-visible {
  opacity: 1;
}

.title-page__logo-annotation.is-k3 {
  color: var(--site-text-primary);
  transition:
    opacity 700ms cubic-bezier(0.22, 0.7, 0.24, 1),
    color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.title-page__logo-annotation.is-k3-reversing {
  color: var(--site-hero-foreground);
  transition:
    opacity 700ms cubic-bezier(0.22, 0.7, 0.24, 1),
    color 1500ms cubic-bezier(0.333333, 0, 0.666667, 0);
}

.title-page__logo-annotation > .logo-annotation {
  position: relative;
  z-index: 3;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.framework-titles {
  position: absolute;
  z-index: 2;
  display: grid;
  grid-template-rows:
    minmax(0, var(--framework-first-row-height, 1fr))
    repeat(3, minmax(0, var(--framework-compact-row-height, 1fr)));
  color: var(--site-hero-foreground);
  pointer-events: none;
  transition: color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.framework-titles.is-k3 {
  color: var(--site-text-primary);
}

.framework-titles.is-k3-reversing {
  color: var(--site-hero-foreground);
  transition: color 1500ms cubic-bezier(0.333333, 0, 0.666667, 0);
}

/* Parts 03 and 04 leave the opening overlay after K5. Their document-flow
   headings are placed after the complete preceding sections. */
.framework-titles.is-k5-complete .framework-title:not(:first-child) {
  visibility: hidden;
}

.framework-vertical-line {
  position: fixed;
  z-index: 4;
  inset-block: 0;
  width: 0;
  border-left: 0.35px solid var(--site-hero-rule);
  pointer-events: none;
  transition: border-color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.framework-vertical-line.is-k3 {
  border-color: var(--site-framework-rule);
}

.framework-vertical-line.is-k3-reversing {
  border-color: var(--site-hero-rule);
  transition: border-color 1500ms cubic-bezier(0.333333, 0, 0.666667, 0);
}

.framework-title {
  display: flex;
  align-items: baseline;
  align-self: center;
  width: max-content;
  max-width: 100%;
  min-width: 0;
  font-family: "SF Pro Display", var(--font-heading);
  font-size: var(--framework-title-size);
  font-weight: 800;
  font-optical-sizing: auto;
  font-synthesis: none;
  letter-spacing: -0.035em;
  line-height: 1;
  white-space: nowrap;
  position: relative;
  z-index: 1;
  transform: scale(var(--framework-title-scale, 1));
  transform-origin: left center;
}

.framework-title:first-child {
  align-self: start;
  margin-block-start: var(--framework-first-title-offset, 0px);
}

.framework-titles.is-k5 .framework-title:not(:first-child) {
  transform:
    translateY(var(--framework-fall-offset, 0px))
    scale(var(--framework-title-scale, 1));
}

.framework-title__text {
  display: inline-flex;
  align-items: baseline;
  white-space: pre;
  line-height: 1;
}

.framework-title__character {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.42em) scale(0.94);
  transform-origin: center bottom;
  animation: framework-character-pop 420ms cubic-bezier(0.333333, 1, 0.666667, 1) both;
  animation-delay: var(--character-delay);
}

.framework-title__cursor {
  display: inline-block;
  flex: 0 0 0.9em;
  width: 0.9em;
  height: 0;
  margin-inline-start: 0.13em;
  border-bottom: 0.06em solid currentColor;
  transform: translateY(0.12em);
  opacity: 0;
  animation: framework-cursor-blink 900ms steps(1, end) var(--cursor-delay) infinite;
  transition: border-color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.framework-titles.is-k3-reversing .framework-title__cursor {
  opacity: 1;
  animation: none;
  transition: border-color 1500ms cubic-bezier(0.333333, 0, 0.666667, 0);
}

.framework-titles.is-reversing .framework-title__cursor {
  opacity: 0;
  animation: none;
  transition: opacity 420ms cubic-bezier(0.333333, 0, 0.666667, 0);
}

.framework-titles.is-reversing .framework-title__character {
  animation: framework-character-exit 420ms cubic-bezier(0.333333, 0, 0.666667, 0) both;
  animation-delay: var(--character-reverse-delay, 0ms);
}

.framework-titles.is-k3 .framework-title__cursor {
  border-color: var(--site-brand-text);
  animation: framework-cursor-decelerate 3200ms steps(1, end) forwards;
}

@keyframes framework-cursor-decelerate {
  0%, 9.99% { opacity: 1; }
  10%, 19.99% { opacity: 0; }
  20%, 34.99% { opacity: 1; }
  35%, 49.99% { opacity: 0; }
  50%, 69.99% { opacity: 1; }
  70%, 84.99% { opacity: 0; }
  85%, 100% { opacity: 1; }
}

@keyframes framework-character-pop {
  from {
    opacity: 0;
    transform: translateY(0.42em) scale(0.94);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes framework-character-exit {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  to {
    opacity: 0;
    transform: translateY(0.42em) scale(0.94);
  }
}

@keyframes framework-cursor-blink {
  0%, 49.999% {
    opacity: 1;
  }

  50%, 100% {
    opacity: 0;
  }
}

@media (max-width: 760px) {
  .title-page {
    padding-block-start: 5.5rem;
    padding-inline: clamp(1.25rem, 6vw, 2rem);
  }

  .title-page__controls {
    inset-block-start: 1.5rem;
    inset-inline-end: clamp(1.25rem, 6vw, 2rem);
  }

  .title-page__layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }

  .title-page__name {
    font-size: clamp(3.35rem, 14.3vw, 6.1rem);
  }

  .title-page__mark-space {
    width: clamp(10rem, 35.3vw, 13.4rem);
    justify-self: center;
  }

  .framework-title {
    letter-spacing: -0.025em;
  }

  .document-part-heading {
    min-height: 4.5rem;
    padding-inline: 1.25rem;
    font-size: clamp(1.5rem, 7vw, 2.1rem);
  }

  .introduction-content {
    font-size: 0.94rem;
    line-height: 1.85;
  }

  .introduction-content__greeting {
    font-size: 1.18rem;
  }

  .introduction-content__tagline {
    font-size: 1.4rem;
  }
}

@media (max-width: 360px) {
  .title-page__name {
    font-size: clamp(2.95rem, 13.4vw, 3.35rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .title-page__control,
  .title-page__logo-normal,
  .title-page__logo-annotation,
  .title-page__logo-annotation.is-k3,
  .title-page__framework-scroll-stage,
  .framework-titles,
  .framework-title,
  .framework-vertical-line {
    transition: none;
  }

  .framework-title__character {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .introduction-content__chunk {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .framework-title__cursor,
  .framework-titles.is-k3 .framework-title__cursor {
    opacity: 1;
    animation: none;
  }

  .framework-vertical-line {
    border-color: var(--site-framework-rule);
    transition: none;
  }
}
</style>
