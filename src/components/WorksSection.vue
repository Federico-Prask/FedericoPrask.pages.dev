<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "../composables/useI18n";

const { locale } = useI18n();

const isZh = computed(() => locale.value === "zh");

const works = computed(() => isZh.value ? [
  {
    number: "01",
    category: "DEVELOPMENT",
    title: "把想法变成可以运行的东西。",
    description: "从算法与数据结构，到软件架构、交互界面和 Web 应用。我关注问题本身，也在意实现过程中的结构、细节与体验。",
    note: "SOFTWARE · WEB · EXPERIMENTS",
    layout: "development",
    mediaLabel: "开发作品预览占位区域",
  },
  {
    number: "02",
    category: "VISUAL DESIGN",
    title: "让信息拥有清晰的视觉秩序。",
    description: "通过版式、字体、色彩与图形组织内容，在界面设计和视觉实验中寻找功能与表达之间的平衡。",
    note: "LAYOUT · TYPOGRAPHY · GRAPHICS",
    layout: "design",
    mediaLabel: "视觉设计作品预览占位区域",
  },
  {
    number: "03",
    category: "MUSIC PRODUCTION",
    title: "用声音构建另一种表达。",
    description: "在 FL Studio 中尝试编曲、音色设计与音乐制作，探索节奏、层次和音色之间的关系。",
    note: "FL STUDIO · ARRANGEMENT · SOUND",
    layout: "music",
    mediaLabel: "音乐制作作品预览占位区域",
  },
  {
    number: "04",
    category: "VIDEO & MOTION",
    title: "让画面在时间中发生变化。",
    description: "从视频剪辑与后期处理，到动态视觉和封面设计，尝试把静态构图延伸为连续的视觉叙事。",
    note: "EDITING · MOTION · VISUAL STORY",
    layout: "motion",
    mediaLabel: "视频与动态设计作品预览占位区域",
  },
] : [
  {
    number: "01",
    category: "DEVELOPMENT",
    title: "Turning ideas into things that work.",
    description: "From algorithms and data structures to software architecture, interfaces, and web applications. I care about the problem itself, as well as the structure, details, and experience of its implementation.",
    note: "SOFTWARE · WEB · EXPERIMENTS",
    layout: "development",
    mediaLabel: "Development work preview placeholder",
  },
  {
    number: "02",
    category: "VISUAL DESIGN",
    title: "Giving information a visual order.",
    description: "Using layout, typography, color, and graphics to organize content, while exploring the balance between function and expression in interface design and visual experiments.",
    note: "LAYOUT · TYPOGRAPHY · GRAPHICS",
    layout: "design",
    mediaLabel: "Visual design work preview placeholder",
  },
  {
    number: "03",
    category: "MUSIC PRODUCTION",
    title: "Finding another way to express ideas through sound.",
    description: "Experimenting with arrangement, sound design, and music production in FL Studio, exploring the relationships between rhythm, layers, and timbre.",
    note: "FL STUDIO · ARRANGEMENT · SOUND",
    layout: "music",
    mediaLabel: "Music production preview placeholder",
  },
  {
    number: "04",
    category: "VIDEO & MOTION",
    title: "Letting images unfold through time.",
    description: "From video editing and post-production to motion graphics and cover design, extending static compositions into continuous visual narratives.",
    note: "EDITING · MOTION · VISUAL STORY",
    layout: "motion",
    mediaLabel: "Video and motion design preview placeholder",
  },
]);

const sectionLabel = computed(() => isZh.value ? "精选作品与创作实践" : "Selected work & creative practice");
const sectionIntro = computed(() => isZh.value
  ? "从软件开发到视觉与音视频创作。不同媒介，不同方法，都是探索与表达的一部分。"
  : "From software development to visual and audio-visual creation. Different media and methods, all part of the same process of exploration and expression.");
</script>

<template>
  <section class="works-section" aria-labelledby="works-heading">
    <header class="works-section__header">
      <div class="works-section__eyebrow">
        <span>02</span>
        <span aria-hidden="true">/</span>
        <span>WORKS</span>
      </div>
      <div class="works-section__heading-group">
        <h2 id="works-heading">{{ sectionLabel }}</h2>
        <p>{{ sectionIntro }}</p>
      </div>
    </header>

    <div class="works-section__list">
      <article
        v-for="work in works"
        :key="work.number"
        class="works-row"
        :class="`works-row--${work.layout}`"
      >
        <div class="works-row__media" role="img" :aria-label="work.mediaLabel">
          <div class="works-collage" :class="`works-collage--${work.layout}`" aria-hidden="true">
            <span class="works-collage__tile works-collage__tile--one"></span>
            <span class="works-collage__tile works-collage__tile--two"></span>
            <span class="works-collage__tile works-collage__tile--three"></span>
          </div>
        </div>

        <div class="works-row__copy">
          <div class="works-row__meta">
            <span>{{ work.number }}</span>
            <span>{{ work.category }}</span>
          </div>
          <h3>{{ work.title }}</h3>
          <p>{{ work.description }}</p>
          <span class="works-row__note">{{ work.note }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.works-section {
  width: min(100% - clamp(2.5rem, 8vw, 8rem), 76rem);
  margin-inline: auto;
  padding-block: clamp(5.5rem, 11vw, 10rem) clamp(6rem, 12vw, 11rem);
  color: var(--site-text-primary);
}

.works-section__header {
  display: grid;
  grid-template-columns: minmax(8rem, 0.38fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 5vw, 5rem);
  align-items: start;
  margin-block-end: clamp(4rem, 8vw, 7.5rem);
}

.works-section__eyebrow,
.works-row__meta,
.works-row__note {
  font-family: var(--font-technical);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  line-height: 1.5;
}

.works-section__eyebrow {
  display: flex;
  gap: 0.65rem;
  padding-block-start: 0.65rem;
  color: var(--site-text-secondary);
}

.works-section__heading-group h2 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.2vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1.12;
}

.works-section__heading-group p {
  max-width: 42rem;
  margin: 1.15rem 0 0;
  color: var(--site-text-secondary);
  font-size: clamp(0.9rem, 1vw, 1.025rem);
  line-height: 1.85;
  text-wrap: pretty;
}

.works-section__list {
  display: grid;
  gap: clamp(4.5rem, 9vw, 8.5rem);
}

.works-row {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(16rem, 0.82fr);
  gap: clamp(2rem, 6vw, 6.5rem);
  align-items: center;
}

.works-row:nth-child(even) {
  grid-template-columns: minmax(16rem, 0.82fr) minmax(0, 1.08fr);
}

.works-row:nth-child(even) .works-row__media {
  order: 2;
}

.works-row__media {
  position: relative;
  min-width: 0;
  aspect-ratio: 1.28;
  isolation: isolate;
}

.works-collage {
  position: absolute;
  inset: 0;
}

.works-collage__tile {
  position: absolute;
  display: block;
  border: 1px solid color-mix(in srgb, var(--site-text-primary) 9%, transparent);
  box-shadow: 0 16px 42px color-mix(in srgb, #14243a 9%, transparent);
}

.works-collage__tile--one {
  inset: 4% 22% 18% 2%;
  background: linear-gradient(135deg, #a9bdd1, #d5dce2);
}

.works-collage__tile--two {
  inset: 18% 2% 4% 40%;
  background: linear-gradient(145deg, #c3cbd4, #879fb7);
}

.works-collage__tile--three {
  inset: 0 5% 48% 56%;
  background: linear-gradient(145deg, #d8d0c5, #b5a99d);
}

.works-collage--design .works-collage__tile--one {
  inset: 2% 28% 22% 0;
  background: linear-gradient(145deg, #d9c9c0, #b99c94);
}

.works-collage--design .works-collage__tile--two {
  inset: 27% 0 0 43%;
  background: linear-gradient(135deg, #c8c2d1, #918aa8);
}

.works-collage--design .works-collage__tile--three {
  inset: 0 4% 55% 58%;
  background: linear-gradient(135deg, #e3d9c8, #b9a88c);
}

.works-collage--music .works-collage__tile--one {
  inset: 8% 20% 10% 0;
  background: linear-gradient(135deg, #9eb5bb, #5f7f89);
}

.works-collage--music .works-collage__tile--two {
  inset: 20% 0 0 42%;
  background: linear-gradient(145deg, #b9c4cb, #748c9d);
}

.works-collage--music .works-collage__tile--three {
  inset: 0 8% 56% 58%;
  background: linear-gradient(145deg, #d0c8b8, #a99c87);
}

.works-collage--motion .works-collage__tile--one {
  inset: 0 25% 22% 4%;
  background: linear-gradient(135deg, #b8c2d0, #7e91ac);
}

.works-collage--motion .works-collage__tile--two {
  inset: 26% 0 0 38%;
  background: linear-gradient(145deg, #d5c6b7, #b18f7c);
}

.works-collage--motion .works-collage__tile--three {
  inset: 0 0 57% 62%;
  background: linear-gradient(145deg, #c5c1d2, #8e8aa9);
}

.works-row__copy {
  min-width: 0;
  padding-block: 1.25rem;
}

.works-row__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: var(--site-text-secondary);
}

.works-row__meta span:first-child {
  color: var(--site-brand-text);
}

.works-row__copy h3 {
  max-width: 34rem;
  margin: 1.6rem 0 1rem;
  font-family: var(--font-heading);
  font-size: clamp(1.55rem, 2.35vw, 2.3rem);
  font-weight: 550;
  letter-spacing: -0.04em;
  line-height: 1.2;
  text-wrap: balance;
}

.works-row__copy p {
  max-width: 34rem;
  margin: 0;
  color: var(--site-text-secondary);
  font-size: clamp(0.9rem, 0.98vw, 1rem);
  line-height: 1.95;
  text-wrap: pretty;
}

.works-row__note {
  display: inline-block;
  margin-block-start: 1.75rem;
  color: var(--site-text-secondary);
  opacity: 0.72;
}

@media (max-width: 760px) {
  .works-section {
    width: calc(100% - 2.5rem);
    padding-block: 4.5rem 6rem;
  }

  .works-section__header {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-block-end: 3.5rem;
  }

  .works-section__eyebrow {
    padding-block-start: 0;
  }

  .works-section__list {
    gap: 4.5rem;
  }

  .works-row,
  .works-row:nth-child(even) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
  }

  .works-row:nth-child(even) .works-row__media {
    order: 0;
  }

  .works-row__media {
    aspect-ratio: 1.18;
  }

  .works-row__copy {
    padding-block: 0;
  }

  .works-row__copy h3 {
    margin-block-start: 1rem;
    font-size: clamp(1.45rem, 6vw, 1.9rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .works-section *,
  .works-section *::before,
  .works-section *::after {
    scroll-behavior: auto;
  }
}
</style>
