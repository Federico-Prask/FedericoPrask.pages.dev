<script setup lang="ts">
import { useI18n } from "../composables/useI18n";
import Reveal from "./ui/Reveal.vue";
import SectionHeader from "./ui/SectionHeader.vue";
import TaggedFrame from "./ui/TaggedFrame.vue";

const { locale, t } = useI18n();
</script>

<template>
  <section id="about" class="scroll-mt-20">
    <div class="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeader
        :index="'01'"
        :title="locale === 'zh' ? '关于' : 'About'"
        note="Who Am I"
      />

      <div class="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div
          class="space-y-5 text-[15px] leading-relaxed text-ink-2 dark:text-ink-d2 md:text-base lg:col-span-6"
        >
          <Reveal>
            <p v-if="locale === 'zh'">
              我是 {{ t.meta.name }}，一个坐标 HNCS 的高中生。我涉猎广泛，也是一个 OIer，是一个
              CTFer，是一只 Furry。我算是啥都会一点，但是绝对没有精通的方向（所以我 OI、绘画、
              音乐的造诣不高）。不过我的技术在生活中帮助了许多身边的朋友。
            </p>
            <p v-else>
              I'm {{ t.meta.name }}, a high school student based in HNCS. I dabble in many things —
              an OIer, a CTFer, a furry. I know a little of everything but definitely master nothing
              (so my OI, art and music are far from outstanding). Still, my skills have helped many
              friends around me in daily life.
            </p>
          </Reveal>
          <Reveal :delay="80">
            <p v-if="locale === 'zh'">
              在小学、初中、高中，我通过我的技术协助，总是帮助了我所在的团队拿到了极好的名次。我不断学习新的技艺，持续提升自己的能力，让自己变得更提供更加全面的帮助。
            </p>
            <p v-else>
              Throughout elementary, middle and high school, my technical assistance has always
              helped my teams achieve excellent results. I keep learning new skills and improving
              myself so I can provide more comprehensive help.
            </p>
          </Reveal>
          <Reveal :delay="160">
            <blockquote
              class="border-l-2 border-accent py-1 pl-5 font-mono text-sm text-ink dark:border-accent-d dark:text-ink-d"
            >
              "{{ t.principle }}"
            </blockquote>
          </Reveal>
        </div>

        <div class="lg:col-span-6">
          <Reveal :delay="120">
            <TaggedFrame tag="profile.ts" class="p-6 md:p-7">
              <!-- 左右两栏：左 = 基本信息，右 = 专注度分布 -->
              <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <!-- 左栏：基本信息 -->
                <div>
                  <p
                    class="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-3 dark:text-ink-d3"
                  >
                    {{ locale === 'zh' ? '基本信息' : 'Basic info' }}
                  </p>
                  <dl class="space-y-3">
                    <div
                      v-for="[k, v] in t.profile"
                      :key="k"
                      class="flex items-baseline justify-between gap-3 border-b border-dashed border-line/70 pb-2.5 font-mono text-xs last:border-0 dark:border-line-d/70"
                    >
                      <dt class="whitespace-nowrap uppercase tracking-[0.18em] text-ink-3 dark:text-ink-d3">{{
                        k
                      }}</dt>
                      <dd class="text-right text-ink dark:text-ink-d">{{ v }}</dd>
                    </div>
                  </dl>
                </div>

                <!-- 右栏：专注度分布 -->
                <div>
                  <p
                    class="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-3 dark:text-ink-d3"
                  >
                    {{ locale === 'zh' ? '专业度' : 'Expertise' }}
                  </p>
                  <div class="space-y-3">
                    <div v-for="f in t.focus" :key="f.label">
                      <div class="mb-1 flex items-center justify-between font-mono text-[11px]">
                        <span class="text-ink-2 dark:text-ink-d2">{{ f.label }}</span>
                        <span class="text-ink-3 dark:text-ink-d3">{{ f.pct }}%</span>
                      </div>
                      <div class="h-2 border border-line dark:border-line-d">
                        <div
                          class="h-full bg-accent dark:bg-accent-d"
                          :style="{ width: f.pct + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TaggedFrame>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
</template>
