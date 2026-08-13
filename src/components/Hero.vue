<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "../composables/useI18n";
import Corners from "./ui/Corners.vue";
import Frame from "./ui/Frame.vue";
import Icon from "./ui/Icon.vue";
import Reveal from "./ui/Reveal.vue";

const { locale, t } = useI18n();

const showScrollHint = ref(true);

function onScroll() {
  if (window.scrollY > 16) showScrollHint.value = false;
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));

const terminal = computed(() =>
  locale.value === "zh"
    ? [
        {
          cmd: "./hello",
          out: ["→ 你好！我是 Federico Prask。很高兴见到你", "→ 今天过得怎么样呢？"],
        },
        {
          cmd: "cat federico-prask.txt",
          out: ["→ 创造我所想做的东西，", "→ 让灵感的火花持续燃烧。"],
        },
        {
          cmd: "objective: code",
          out: ["→ 不断钻研开发，创造更好的应用。"],
        },
      ]
    : [
        {
          cmd: "./hello",
          out: ["→ Hi! I'm Federico Prask. Nice to meet you.", "→ How's your day going?"],
        },
        {
          cmd: "cat federico-prask.txt",
          out: [
            "→ Create what I want to make,",
            "→ keep the spark of inspiration burning.",
          ],
        },
        {
          cmd: "objective: code",
          out: ["→ Keep honing development, build better apps."],
        },
      ]
);
</script>

<template>
  <section id="top" class="relative flex min-h-[calc(100svh-4rem)] items-center">
    <div aria-hidden="true" class="grid-bg grid-fade absolute inset-0"></div>

    <div class="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24">
      <div class="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-7">
          <Reveal>
            <span
              class="inline-flex items-center gap-2 border border-dashed border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2 dark:border-line-d dark:text-ink-d2"
            >
              <span class="pulse-dot h-1.5 w-1.5 rounded-full bg-accent-2 dark:bg-accent-d2"></span>
              {{ t.meta.status }}
            </span>
          </Reveal>

          <Reveal :delay="60">
            <div class="mt-6 font-display font-bold leading-[0.95] tracking-tight">
              <!-- 第一行：Federico，左对齐 -->
              <h1 class="text-[clamp(2.5rem,6.6vw,5.4rem)] text-ink dark:text-ink-d">
                Federico
              </h1>

              <!-- 第二行Prask（左）+ 右下列（Coder / { Objective }）
                   底部对齐：{ Objective } 底部 = Prask 底部（右下列上移一个行距） -->
              <div
                class="mt-2 flex w-full items-end text-[clamp(2.5rem,6.6vw,5.4rem)]"
              >
                <h1 class="whitespace-nowrap text-ink dark:text-ink-d">Prask</h1>

                <!-- 右下角 Coder 与 Objective 右端对齐，整体底部贴 Prask 底部 -->
                <span
                  class="ml-auto flex -translate-x-[30px] flex-col items-end text-right"
                >
                  <span
                    class="-translate-x-[10px] whitespace-nowrap pr-[2px] text-[clamp(1.4rem,3.1vw,2.4rem)] font-bold text-accent-ink dark:text-accent-ink-d"
                  >
                    Coder&nbsp;
                  </span>
                  <span
                    class="mt-1.5 inline-block whitespace-nowrap text-[clamp(1.4rem,3.1vw,2.4rem)]"
                  >
                    <span class="text-line-strong dark:text-line-d-strong">{</span>
                    <span
                      class="relative mx-1 inline-block border border-dashed border-accent/70 px-2 py-0.5 text-accent dark:border-accent-d/70 dark:text-accent-d"
                    >
                      Objective
                      <Corners mark-class="text-accent/70 dark:text-accent-d/70" />
                    </span>
                    <span class="text-line-strong dark:text-line-d-strong">}</span>
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal :delay="120">
            <p
              v-if="locale === 'zh'"
              class="mt-7 max-w-xl text-base leading-relaxed text-ink-2 dark:text-ink-d2 md:text-lg"
            >
              我是 {{ t.meta.name }}，一个充满创意点子的高中生。会点开发，会点音乐，会点画画，会点设计。技术活一般能够做的不错。
            </p>
            <p
              v-else
              class="mt-7 max-w-xl text-base leading-relaxed text-ink-2 dark:text-ink-d2 md:text-lg"
            >
              I'm {{ t.meta.name }}, a high school student full of creative ideas. A bit of
              development, a bit of music, a bit of drawing, a bit of design. I can usually do
              technical work pretty well.
            </p>
          </Reveal>

          <Reveal :delay="180">
            <div class="mt-9 flex flex-wrap gap-3">
              <a
                href="#work"
                class="group inline-flex items-center gap-2.5 bg-ink px-5 py-3.5 font-mono text-sm text-paper transition-colors hover:bg-accent hover:text-ink dark:bg-accent-d dark:text-ink dark:hover:bg-accent-d2"
              >
                <span class="text-paper/70 dark:text-ink/70">01</span>
                <span>{{ locale === 'zh' ? '查看作品' : 'SEE THE WORK' }}</span>
                <Icon
                  name="arrow-down"
                  :size="14"
                  class="transition-transform group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                class="inline-flex items-center gap-2.5 border border-line-strong px-5 py-3.5 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent-ink dark:border-line-d-strong dark:text-ink-d dark:hover:border-accent-d dark:hover:text-accent-ink-d"
              >
                <span class="text-ink-3 dark:text-ink-d3">02</span>
                {{ locale === 'zh' ? '联系我' : 'GET IN TOUCH' }}
              </a>
            </div>
          </Reveal>

          <Reveal :delay="240">
            <dl
              class="mt-11 grid max-w-xl grid-cols-1 gap-x-6 gap-y-2 border-t border-dashed border-line-strong/50 pt-4 font-mono text-[11px] text-ink-3 dark:border-line-d-strong/50 dark:text-ink-d3 sm:grid-cols-3"
            >
              <div class="flex gap-1.5">
                <dt class="text-accent-ink dark:text-accent-ink-d">{{
                  locale === 'zh' ? '地点' : 'LOC'
                }}</dt>
                <dd>{{ t.meta.location }}</dd>
              </div>
              <div class="flex gap-1.5">
                <dt class="text-accent-ink dark:text-accent-ink-d">{{
                  locale === 'zh' ? '工作' : 'WORK'
                }}</dt>
                <dd>{{ locale === 'zh' ? '普通高中生' : 'High school student' }}</dd>
              </div>
              <div class="flex gap-1.5">
                <dt class="text-accent-ink dark:text-accent-ink-d">{{
                  locale === 'zh' ? '获奖' : 'AWARDS'
                }}</dt>
                <dd>{{ locale === 'zh' ? '20 余载' : '20+ yrs' }}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div class="lg:col-span-5">
          <Reveal :delay="160">
            <Frame corners class="bg-paper-2/70 dark:bg-paper-d2/70">
              <div
                class="flex items-center justify-between border-b border-line px-4 py-2.5 dark:border-line-d"
              >
                <div class="flex items-center gap-1.5">
                  <span class="h-2.5 w-2.5 border border-line dark:border-line-d"></span>
                  <span
                    class="h-2.5 w-2.5 border border-line bg-accent-2/60 dark:border-line-d dark:bg-accent-d2/60"
                  ></span>
                  <span class="h-2.5 w-2.5 border border-line dark:border-line-d"></span>
                </div>
                <span
                  class="font-mono text-[10px] tracking-[0.22em] text-ink-3 dark:text-ink-d3"
                  >MY TERMINAL</span
                >
              </div>

              <div class="space-y-1 px-4 py-5 font-mono text-[13px] leading-7 md:px-5">
                <template v-for="(line, i) in terminal" :key="i">
                  <p>
                    <span class="text-accent-ink dark:text-accent-ink-d">$</span>
                    <span class="ml-2 text-ink dark:text-ink-d">{{ line.cmd }}</span>
                  </p>
                  <p v-for="out in line.out" :key="out" class="pl-5 text-ink-2 dark:text-ink-d2">
                    {{ out }}
                  </p>
                  <p class="py-1"></p>
                </template>
                <p class="pt-2">
                  <span class="text-accent-ink dark:text-accent-ink-d">$</span>
                  <span
                    class="caret ml-1 inline-block h-3.5 w-[7px] translate-y-[2px] bg-accent dark:bg-accent-d"
                  ></span>
                </p>
              </div>
            </Frame>
            <p
              class="mt-3 text-center font-mono text-[10px] tracking-[0.25em] text-ink-3 dark:text-ink-d3"
            >
              {{ locale === 'zh' ? '// 热爱一切' : '// love everything' }}
            </p>
          </Reveal>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-700 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="showScrollHint"
        aria-hidden="true"
        class="pointer-events-none fixed bottom-8 left-1/2 z-40 hidden -translate-x-1/2 lg:block"
      >
        <div
          class="hint-float flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-paper/75 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2 backdrop-blur-md dark:border-line-d dark:bg-paper-d/75 dark:text-ink-d2"
        >
          <Icon name="arrow-down" :size="18" />
          <span>{{ locale === 'zh' ? '向下滚动以查看' : 'scroll to explore' }}</span>
        </div>
      </div>
    </Transition>
  </section>
</template>
