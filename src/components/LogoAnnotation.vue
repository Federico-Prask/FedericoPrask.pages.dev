<script setup lang="ts">
import LogoMark from "./LogoMark.vue";
</script>

<template>
  <svg
    class="logo-annotation"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    preserveAspectRatio="xMidYMid meet"
    role="presentation"
    aria-hidden="true"
  >
    <!-- The exact supplied FP mark, including its rounded plate frame, is retained as a solid outline. -->
    <g id="annotation-original-logo" data-k2-disposition="remove">
      <LogoMark mode="outline" />
    </g>

    <!-- Only source-derived horizontal and vertical segments become persistent dashed guides. -->
    <g id="annotation-persistent-guides" class="axis-guides" data-k2-disposition="preserve">
      <path id="guide-plate-h-01" data-source="plate" data-axis="h" data-start="56,0" d="M 56 -7 L 200 -7" />
      <path id="guide-plate-v-01" data-source="plate" data-axis="v" data-start="256,56" d="M 263 56 L 263 200" />
      <path id="guide-plate-h-02" data-source="plate" data-axis="h" data-start="200,256" d="M 200 263 L 56 263" />
      <path id="guide-plate-v-02" data-source="plate" data-axis="v" data-start="0,200" d="M -7 200 L -7 56" />
      <path id="guide-mono-h-01" data-source="monogram" data-axis="h" data-start="52,40" d="M 52 33 L 153 33" />
      <path id="guide-mono-v-01" data-source="monogram" data-axis="v" data-start="219,106" d="M 226 106 L 226 125" />
      <path id="guide-mono-v-02" data-source="monogram" data-axis="v" data-start="153,191" d="M 160 191 L 160 256" />
      <path id="guide-mono-h-02" data-source="monogram" data-axis="h" data-start="153,256" d="M 153 263 L 121 263" />
      <path id="guide-mono-v-03" data-source="monogram" data-axis="v" data-start="121,256" d="M 114 256 L 114 159" />
      <path id="guide-mono-h-03" data-source="monogram" data-axis="h" data-start="121,159" d="M 121 152 L 153 152" />
      <path id="guide-mono-v-04" data-source="monogram" data-axis="v" data-start="187,125" d="M 180 125 L 180 106" />
      <path id="guide-mono-h-04" data-source="monogram" data-axis="h" data-start="153,72" d="M 153 79 L 86 79" />
      <path id="guide-mono-v-05" data-source="monogram" data-axis="v" data-start="86,72" d="M 93 72 L 93 102" />
      <path id="guide-mono-h-05" data-source="monogram" data-axis="h" data-start="86,102" d="M 86 95 L 148 95" />
      <path id="guide-mono-v-06" data-source="monogram" data-axis="v" data-start="148,102" d="M 155 102 L 155 131" />
      <path id="guide-mono-h-06" data-source="monogram" data-axis="h" data-start="148,131" d="M 148 138 L 86 138" />
      <path id="guide-mono-v-07" data-source="monogram" data-axis="v" data-start="86,131" d="M 93 131 L 93 199" />
      <path id="guide-mono-h-07" data-source="monogram" data-axis="h" data-start="86,199" d="M 86 206 L 52 206" />
    </g>

    <!-- Coordinates identify the original start point of each guide. Vertical labels rotate as a whole. -->
    <g id="annotation-coordinate-labels" class="coordinates" data-k2-disposition="remove">
      <text class="coordinate-label" data-guide-ref="guide-plate-h-01" x="56" y="-10.5" text-anchor="start">[ 56 , 0 ]</text>
      <text class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-plate-v-01" x="258.5" y="56" text-anchor="middle" transform="rotate(-90 258.5 56)">[ 256 , 56 ]</text>
      <text class="coordinate-label" data-guide-ref="guide-plate-h-02" x="200" y="272" text-anchor="end">[ 200 , 256 ]</text>
      <text class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-plate-v-02" x="-2.5" y="200" text-anchor="middle" transform="rotate(-90 -2.5 200)">[ 0 , 200 ]</text>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-01" x="52" y="29.5" text-anchor="start">[ 52 , 40 ]</text>
      <text class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-01" x="221.5" y="106" text-anchor="middle" transform="rotate(-90 221.5 106)">[ 219 , 106 ]</text>
      <text class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-02" x="155.5" y="191" text-anchor="middle" transform="rotate(-90 155.5 191)">[ 153 , 191 ]</text>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-02" x="153" y="272" text-anchor="end">[ 153 , 256 ]</text>
      <text class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-03" x="118.5" y="256" text-anchor="middle" transform="rotate(-90 118.5 256)">[ 121 , 256 ]</text>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-03" x="121" y="148.5" text-anchor="start">[ 121 , 159 ]</text>
      <text class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-04" x="184.5" y="125" text-anchor="middle" transform="rotate(-90 184.5 125)">[ 187 , 125 ]</text>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-04" x="153" y="88" text-anchor="end">[ 153 , 72 ]</text>
      <text class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-05" x="88.5" y="72" text-anchor="middle" transform="rotate(-90 88.5 72)">[ 86 , 72 ]</text>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-05" x="86" y="91.5" text-anchor="start">[ 86 , 102 ]</text>
      <text class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-06" x="150.5" y="102" text-anchor="middle" transform="rotate(-90 150.5 102)">[ 148 , 102 ]</text>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-06" x="148" y="147" text-anchor="end">[ 148 , 131 ]</text>
      <text class="coordinate-label coordinate-label--vertical" data-guide-ref="guide-mono-v-07" x="88.5" y="131" text-anchor="middle" transform="rotate(-90 88.5 131)">[ 86 , 131 ]</text>
      <text class="coordinate-label" data-guide-ref="guide-mono-h-07" x="86" y="215" text-anchor="end">[ 86 , 199 ]</text>
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
  stroke: currentColor;
  stroke-width: 0.85;
  stroke-dasharray: 2.6 4.2;
  stroke-linecap: round;
  opacity: 0.68;
  vector-effect: non-scaling-stroke;
}

.coordinates {
  fill: none;
  opacity: 0.9;
  pointer-events: none;
}

.coordinate-label {
  fill: currentColor;
  stroke: var(--site-hero-background);
  stroke-width: 2.4px;
  stroke-linejoin: round;
  paint-order: stroke;
  font-family: var(--font-technical);
  font-size: 6.2px;
  font-weight: 500;
  letter-spacing: 0;
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
</style>
