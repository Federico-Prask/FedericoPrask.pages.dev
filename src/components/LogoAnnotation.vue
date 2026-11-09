<script setup lang="ts">
import LogoMark from "./LogoMark.vue";

type K2Phase =
  | "idle"
  | "recompose"
  | "settled"
  | "expand"
  | "titles"
  | "reverse-titles"
  | "reverse-expand"
  | "reverse-recompose";

const props = withDefaults(
  defineProps<{
    k2Started?: boolean;
    k2Phase?: K2Phase;
    k2LineTransforms?: Record<string, string>;
    k2LineDelays?: Record<string, string>;
    k3Started?: boolean;
    k3Reversing?: boolean;
    k5Started?: boolean;
    k5DividerCopyTransform?: string;
    part02DividerCopyTransform?: string;
  }>(),
  {
    k2Started: false,
    k2Phase: "idle",
    k2LineTransforms: () => ({}),
    k2LineDelays: () => ({}),
    k3Started: false,
    k3Reversing: false,
    k5Started: false,
    k5DividerCopyTransform: "",
    part02DividerCopyTransform: "",
  },
);

function k2PathStyle(id: string) {
  const transform = props.k2LineTransforms[id];
  if (!transform) return undefined;
  return {
    transform,
    transitionDelay: props.k2LineDelays[id] ?? "0ms",
  };
}
</script>

<template>
  <svg
    class="logo-annotation"
    :class="{
      'is-k2-started': props.k2Started,
      'is-k2-recompose': props.k2Phase === 'recompose',
      'is-k2-expand': props.k2Phase === 'expand',
      'is-k2-reverse-expand': props.k2Phase === 'reverse-expand',
      'is-k2-reverse-recompose': props.k2Phase === 'reverse-recompose',
      'is-k3': props.k3Started,
      'is-k3-reversing': props.k3Reversing,
    }"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    preserveAspectRatio="none"
    role="presentation"
    aria-hidden="true"
  >
    <!-- The exact supplied FP mark, including its rounded plate frame, is retained as a solid outline. -->
    <g id="annotation-persistent-guides" class="axis-guides" data-k2-disposition="preserve">
      <path id="guide-plate-h-01" data-source="plate" data-axis="h" data-start="56,0" d="M 0 0 L 256 0" data-k2-persistent="true" data-guide-y="0" :style="k2PathStyle('guide-plate-h-01')" />
      <path id="guide-plate-v-01" data-source="plate" data-axis="v" data-start="256,56" d="M 256 0 L 256 256" />
      <path id="guide-plate-h-02" data-source="plate" data-axis="h" data-start="200,256" d="M 0 256 L 256 256" data-k2-persistent="true" data-guide-y="256" :style="k2PathStyle('guide-plate-h-02')" />
      <path id="guide-plate-v-02" data-source="plate" data-axis="v" data-start="0,200" d="M 0 0 L 0 256" />
      <path id="guide-mono-h-01" data-source="monogram" data-axis="h" data-start="52,40" d="M 0 40 L 256 40" />
      <path id="guide-mono-v-01" data-source="monogram" data-axis="v" data-start="219,106" d="M 219 0 L 219 256" />
      <path id="guide-mono-v-02" data-source="monogram" data-axis="v" data-start="153,191" d="M 153 0 L 153 256" />
      <path id="guide-mono-h-02" data-source="monogram" data-axis="h" data-start="153,256" d="M 0 256 L 256 256" />
      <path id="guide-mono-v-03" data-source="monogram" data-axis="v" data-start="121,256" d="M 121 0 L 121 256" />
      <path id="guide-mono-h-03" data-source="monogram" data-axis="h" data-start="121,159" d="M 0 159 L 256 159" />
      <path id="guide-mono-v-04" data-source="monogram" data-axis="v" data-start="187,125" d="M 187 0 L 187 256" />
      <path id="guide-mono-h-04" data-source="monogram" data-axis="h" data-start="153,72" d="M 0 72 L 256 72" data-k2-persistent="true" data-guide-y="72" :style="k2PathStyle('guide-mono-h-04')" />
      <path id="guide-mono-v-05" data-source="monogram" data-axis="v" data-start="86,72" d="M 86 0 L 86 256" />
      <path id="guide-mono-h-05" data-source="monogram" data-axis="h" data-start="86,102" d="M 0 102 L 256 102" />
      <path id="guide-mono-v-06" data-source="monogram" data-axis="v" data-start="148,102" d="M 148 0 L 148 256" />
      <path id="guide-mono-h-06" data-source="monogram" data-axis="h" data-start="148,131" d="M 0 131 L 256 131" data-k2-persistent="true" data-guide-y="131" :style="k2PathStyle('guide-mono-h-06')" />
      <path id="guide-mono-v-07" data-source="monogram" data-axis="v" data-start="86,131" d="M 86 0 L 86 256" />
      <path id="guide-mono-h-07" data-source="monogram" data-axis="h" data-start="86,199" d="M 0 199 L 256 199" data-k2-persistent="true" data-guide-y="199" :style="k2PathStyle('guide-mono-h-07')" />
      <path id="guide-mono-v-08" data-source="monogram" data-axis="v" data-start="52,199" d="M 52 0 L 52 256" />
      <path
        v-if="props.k5Started && props.k5DividerCopyTransform"
        id="guide-k5-part01-bottom-copy"
        class="framework-rule-copy"
        data-k2-persistent="true"
        d="M 0 72 L 256 72"
        :style="{ transform: props.k5DividerCopyTransform }"
      />
      <path
        v-if="props.part02DividerCopyTransform"
        id="guide-part02-title-divider-copy"
        class="framework-rule-copy"
        data-k2-persistent="true"
        d="M 0 131 L 256 131"
        :style="{ transform: props.part02DividerCopyTransform }"
      />
    </g>

    <g id="annotation-original-logo" data-k2-disposition="remove">
      <LogoMark mode="outline" />
    </g>

    <!-- Coordinates identify each guide start. Vertical labels use five centered rows and geometric horizontal bracket paths. -->
    <g id="annotation-coordinate-labels" class="coordinates" data-k2-disposition="remove">
      <text class="coordinate-label" data-guide-ref="guide-plate-h-01" x="56" y="-10.5" text-anchor="start">[ 56 , 0 ]</text>
            <g class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-plate-v-01">
        <path class="coordinate-bracket coordinate-bracket--open" d="M 242 45 V 41 H 250 V 45" />
        <text x="246" y="49.5" text-anchor="middle" dominant-baseline="middle">256</text>
        <text x="246" y="56" text-anchor="middle" dominant-baseline="middle">,</text>
        <text x="246" y="62.5" text-anchor="middle" dominant-baseline="middle">56</text>
        <path class="coordinate-bracket coordinate-bracket--close" d="M 242 67 V 71 H 250 V 67" />
      </g>
      <text class="coordinate-label" data-guide-ref="guide-plate-h-02" x="200" y="272" text-anchor="end">[ 200 , 256 ]</text>
            <g class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-plate-v-02">
        <path class="coordinate-bracket coordinate-bracket--open" d="M 6 189 V 185 H 14 V 189" />
        <text x="10" y="193.5" text-anchor="middle" dominant-baseline="middle">0</text>
        <text x="10" y="200" text-anchor="middle" dominant-baseline="middle">,</text>
        <text x="10" y="206.5" text-anchor="middle" dominant-baseline="middle">200</text>
        <path class="coordinate-bracket coordinate-bracket--close" d="M 6 211 V 215 H 14 V 211" />
      </g>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-01" x="52" y="29.5" text-anchor="start">[ 52 , 40 ]</text>
            <g class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-01">
        <path class="coordinate-bracket coordinate-bracket--open" d="M 241 99 V 95 H 249 V 99" />
        <text x="245" y="103.5" text-anchor="middle" dominant-baseline="middle">219</text>
        <text x="245" y="110" text-anchor="middle" dominant-baseline="middle">,</text>
        <text x="245" y="116.5" text-anchor="middle" dominant-baseline="middle">106</text>
        <path class="coordinate-bracket coordinate-bracket--close" d="M 241 121 V 125 H 249 V 121" />
      </g>
            <g class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-02">
        <path class="coordinate-bracket coordinate-bracket--open" d="M 154 180 V 176 H 162 V 180" />
        <text x="158" y="184.5" text-anchor="middle" dominant-baseline="middle">153</text>
        <text x="158" y="191" text-anchor="middle" dominant-baseline="middle">,</text>
        <text x="158" y="197.5" text-anchor="middle" dominant-baseline="middle">191</text>
        <path class="coordinate-bracket coordinate-bracket--close" d="M 154 202 V 206 H 162 V 202" />
      </g>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-02" x="153" y="285" text-anchor="end">[ 153 , 256 ]</text>
            <g class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-03">
        <path class="coordinate-bracket coordinate-bracket--open" d="M 122 219 V 215 H 130 V 219" />
        <text x="126" y="223.5" text-anchor="middle" dominant-baseline="middle">121</text>
        <text x="126" y="230" text-anchor="middle" dominant-baseline="middle">,</text>
        <text x="126" y="236.5" text-anchor="middle" dominant-baseline="middle">256</text>
        <path class="coordinate-bracket coordinate-bracket--close" d="M 122 241 V 245 H 130 V 241" />
      </g>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-03" x="121" y="167" text-anchor="start">[ 121 , 159 ]</text>
            <g class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-04">
        <path class="coordinate-bracket coordinate-bracket--open" d="M 186 114 V 110 H 194 V 114" />
        <text x="190" y="118.5" text-anchor="middle" dominant-baseline="middle">187</text>
        <text x="190" y="125" text-anchor="middle" dominant-baseline="middle">,</text>
        <text x="190" y="131.5" text-anchor="middle" dominant-baseline="middle">125</text>
        <path class="coordinate-bracket coordinate-bracket--close" d="M 186 136 V 140 H 194 V 136" />
      </g>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-04" x="153" y="55.5" text-anchor="end">[ 153 , 72 ]</text>
            <g class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-05">
        <path class="coordinate-bracket coordinate-bracket--open" d="M 88 63 V 59 H 96 V 63" />
        <text x="92" y="67.5" text-anchor="middle" dominant-baseline="middle">86</text>
        <text x="92" y="74" text-anchor="middle" dominant-baseline="middle">,</text>
        <text x="92" y="80.5" text-anchor="middle" dominant-baseline="middle">72</text>
        <path class="coordinate-bracket coordinate-bracket--close" d="M 88 85 V 89 H 96 V 85" />
      </g>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-05" x="86" y="98" text-anchor="start">[ 86 , 102 ]</text>
            <g class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-06">
        <path class="coordinate-bracket coordinate-bracket--open" d="M 149 91 V 87 H 157 V 91" />
        <text x="153" y="95.5" text-anchor="middle" dominant-baseline="middle">148</text>
        <text x="153" y="102" text-anchor="middle" dominant-baseline="middle">,</text>
        <text x="153" y="108.5" text-anchor="middle" dominant-baseline="middle">102</text>
        <path class="coordinate-bracket coordinate-bracket--close" d="M 149 113 V 117 H 157 V 113" />
      </g>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-06" x="152" y="147" text-anchor="end">[ 148 , 131 ]</text>
            <g class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-07">
        <path class="coordinate-bracket coordinate-bracket--open" d="M 88 120 V 116 H 96 V 120" />
        <text x="92" y="124.5" text-anchor="middle" dominant-baseline="middle">86</text>
        <text x="92" y="131" text-anchor="middle" dominant-baseline="middle">,</text>
        <text x="92" y="137.5" text-anchor="middle" dominant-baseline="middle">131</text>
        <path class="coordinate-bracket coordinate-bracket--close" d="M 88 142 V 146 H 96 V 142" />
      </g>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-07" x="86" y="215" text-anchor="end">[ 86 , 199 ]</text>
      <g class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-08">
        <path class="coordinate-bracket coordinate-bracket--open" d="M 31 169 V 165 H 39 V 169" />
        <text x="35" y="173.5" text-anchor="middle" dominant-baseline="middle">52</text>
        <text x="35" y="180" text-anchor="middle" dominant-baseline="middle">,</text>
        <text x="35" y="186.5" text-anchor="middle" dominant-baseline="middle">199</text>
        <path class="coordinate-bracket coordinate-bracket--close" d="M 31 193 V 197 H 39 V 193" />
      </g>
    </g>

    <!-- Solid tangent/control handles mark all four rounded plate corners and all four FP curves. -->
    <g id="annotation-force-handles" class="force-handles" data-k2-disposition="remove">
      <path class="force-connectors" d="M 200 0 L 230.928 0 M 256 56 L 256 25.072 M 256 200 L 256 230.928 M 200 256 L 230.928 256 M 56 256 L 25.072 256 M 0 200 L 0 230.928 M 0 56 L 0 25.072 M 56 0 L 25.072 0 M 153 40 L 189.451 40 M 219 106 L 219 69.549 M 219 125 L 219 161.451 M 153 191 L 189.451 191 M 153 159 L 171.778 159 M 187 125 L 187 143.778 M 187 106 L 187 87.222 M 153 72 L 171.778 72" />
      <circle class="force-node" data-corner="plate-corner-tr" cx="200" cy="0" r="2" />
      <circle class="force-node" data-corner="plate-corner-tr" cx="256" cy="56" r="2" />
      <circle class="force-node" data-corner="plate-corner-br" cx="256" cy="200" r="2" />
      <circle class="force-node" data-corner="plate-corner-br" cx="200" cy="256" r="2" />
      <circle class="force-node" data-corner="plate-corner-bl" cx="56" cy="256" r="2" />
      <circle class="force-node" data-corner="plate-corner-bl" cx="0" cy="200" r="2" />
      <circle class="force-node" data-corner="plate-corner-tl" cx="0" cy="56" r="2" />
      <circle class="force-node" data-corner="plate-corner-tl" cx="56" cy="0" r="2" />
      <circle class="force-node" data-corner="monogram-outer-tr" cx="153" cy="40" r="2" />
      <circle class="force-node" data-corner="monogram-outer-tr" cx="219" cy="106" r="2" />
      <circle class="force-node" data-corner="monogram-outer-br" cx="219" cy="125" r="2" />
      <circle class="force-node" data-corner="monogram-outer-br" cx="153" cy="191" r="2" />
      <circle class="force-node" data-corner="monogram-inner-br" cx="153" cy="159" r="2" />
      <circle class="force-node" data-corner="monogram-inner-br" cx="187" cy="125" r="2" />
      <circle class="force-node" data-corner="monogram-inner-tr" cx="187" cy="106" r="2" />
      <circle class="force-node" data-corner="monogram-inner-tr" cx="153" cy="72" r="2" />
      <circle class="force-control" data-corner="plate-corner-tr" cx="230.928" cy="0" r="1.55" />
      <circle class="force-control" data-corner="plate-corner-tr" cx="256" cy="25.072" r="1.55" />
      <circle class="force-control" data-corner="plate-corner-br" cx="256" cy="230.928" r="1.55" />
      <circle class="force-control" data-corner="plate-corner-br" cx="230.928" cy="256" r="1.55" />
      <circle class="force-control" data-corner="plate-corner-bl" cx="25.072" cy="256" r="1.55" />
      <circle class="force-control" data-corner="plate-corner-bl" cx="0" cy="230.928" r="1.55" />
      <circle class="force-control" data-corner="plate-corner-tl" cx="0" cy="25.072" r="1.55" />
      <circle class="force-control" data-corner="plate-corner-tl" cx="25.072" cy="0" r="1.55" />
      <circle class="force-control" data-corner="monogram-outer-tr" cx="189.451" cy="40" r="1.55" />
      <circle class="force-control" data-corner="monogram-outer-tr" cx="219" cy="69.549" r="1.55" />
      <circle class="force-control" data-corner="monogram-outer-br" cx="219" cy="161.451" r="1.55" />
      <circle class="force-control" data-corner="monogram-outer-br" cx="189.451" cy="191" r="1.55" />
      <circle class="force-control" data-corner="monogram-inner-br" cx="171.778" cy="159" r="1.55" />
      <circle class="force-control" data-corner="monogram-inner-br" cx="187" cy="143.778" r="1.55" />
      <circle class="force-control" data-corner="monogram-inner-tr" cx="187" cy="87.222" r="1.55" />
      <circle class="force-control" data-corner="monogram-inner-tr" cx="171.778" cy="72" r="1.55" />
    </g>
  </svg>
</template>

<style scoped>
.logo-annotation {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  color: inherit;
}

.axis-guides {
  fill: none;
  stroke: var(--site-guide);
  stroke-width: 0.65;
  stroke-dasharray: 2.6 4.2;
  stroke-linecap: butt;
  vector-effect: non-scaling-stroke;
}

.axis-guides path {
  opacity: 1;
  transition:
    opacity 420ms cubic-bezier(0.22, 0.7, 0.24, 1),
    stroke 420ms ease,
    stroke-width 420ms ease;
}

.axis-guides path[data-k2-persistent="true"] {
  transform-box: view-box;
  transform-origin: 0 0;
}

.logo-annotation.is-k2-started .axis-guides path[data-k2-persistent="true"] {
  stroke: var(--site-hero-rule);
  stroke-width: 0.35;
  stroke-dasharray: none;
}

.logo-annotation.is-k2-started .axis-guides path:not([data-k2-persistent="true"]) {
  opacity: 0;
}

.logo-annotation.is-k2-recompose .axis-guides path[data-k2-persistent="true"] {
  transition:
    transform 720ms cubic-bezier(0.333333, 1, 0.666667, 1),
    stroke 420ms ease,
    stroke-width 420ms ease;
}

.logo-annotation.is-k2-expand .axis-guides path[data-k2-persistent="true"] {
  transition:
    transform 1100ms cubic-bezier(0.333333, 1, 0.666667, 1),
    stroke 420ms ease,
    stroke-width 420ms ease;
}

.logo-annotation.is-k2-reverse-expand .axis-guides path[data-k2-persistent="true"] {
  transition:
    transform 1100ms cubic-bezier(0.333333, 0, 0.666667, 0),
    stroke 420ms ease,
    stroke-width 420ms ease;
}

.logo-annotation.is-k2-reverse-recompose .axis-guides path[data-k2-persistent="true"] {
  transition:
    transform 720ms cubic-bezier(0.333333, 0, 0.666667, 0),
    stroke 420ms ease,
    stroke-width 420ms ease;
}

.logo-annotation.is-k3 .axis-guides path[data-k2-persistent="true"] {
  stroke: var(--site-framework-rule);
  transition:
    stroke 1500ms cubic-bezier(0.333333, 1, 0.666667, 1),
    stroke-width 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.logo-annotation.is-k3-reversing .axis-guides path[data-k2-persistent="true"] {
  stroke: var(--site-hero-rule);
  transition:
    stroke 1500ms cubic-bezier(0.333333, 0, 0.666667, 0),
    stroke-width 1500ms cubic-bezier(0.333333, 0, 0.666667, 0);
}

.coordinates {
  fill: none;
  opacity: 0.9;
  pointer-events: none;
}

#annotation-original-logo,
#annotation-coordinate-labels,
#annotation-force-handles {
  opacity: 1;
  visibility: visible;
  transition:
    opacity 420ms cubic-bezier(0.22, 0.7, 0.24, 1),
    visibility 0s linear;
}

.logo-annotation.is-k2-started #annotation-original-logo,
.logo-annotation.is-k2-started #annotation-coordinate-labels,
.logo-annotation.is-k2-started #annotation-force-handles {
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 420ms cubic-bezier(0.22, 0.7, 0.24, 1),
    visibility 0s linear 420ms;
}

.logo-annotation.is-k2-reverse-recompose #annotation-original-logo,
.logo-annotation.is-k2-reverse-recompose #annotation-coordinate-labels,
.logo-annotation.is-k2-reverse-recompose #annotation-force-handles {
  transition:
    opacity 420ms cubic-bezier(0.333333, 0, 0.666667, 0),
    visibility 0s linear;
}

.coordinate-label {
  fill: currentColor;
  font-family: var(--font-technical);
  font-size: 6.2px;
  font-weight: 500;
  letter-spacing: 0;
}

.coordinate-bracket {
  fill: none;
  stroke: currentColor;
  stroke-width: 0.85;
  stroke-linecap: square;
  stroke-linejoin: miter;
}

.force-handles {
  fill: none;
  stroke: currentColor;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.92;
  vector-effect: non-scaling-stroke;
}

.force-connectors {
  stroke-dasharray: none;
}

.force-node {
  fill: var(--site-hero-background);
  stroke: currentColor;
  stroke-width: 1.15;
}

.force-control {
  fill: currentColor;
  stroke: none;
}
@media (prefers-reduced-motion: reduce) {
  .axis-guides path {
    transition: none;
  }

  #annotation-original-logo,
  #annotation-coordinate-labels,
  #annotation-force-handles {
    transition: none;
  }
}
</style>
