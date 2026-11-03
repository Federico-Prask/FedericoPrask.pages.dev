<template>
  <svg
    class="logo-annotation"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    preserveAspectRatio="xMidYMid meet"
    role="presentation"
    aria-hidden="true"
  >
    <!-- Persistent paths: K2 keeps these exact SVG elements and their geometry. -->
    <g id="annotation-persistent-guides" data-k2-disposition="preserve">
      <g id="annotation-horizontal-guides" class="guide-lines">
        <path id="guide-h-01" d="M12 26 H244" />
        <path id="guide-h-02" d="M12 77 H244" />
        <path id="guide-h-03" d="M12 128 H244" />
        <path id="guide-h-04" d="M12 179 H244" />
        <path id="guide-h-05" d="M12 230 H244" />
      </g>
      <g id="annotation-vertical-guides" class="guide-lines">
        <path id="guide-v-01" d="M26 12 V244" />
        <path id="guide-v-02" d="M94 12 V244" />
        <path id="guide-v-03" d="M162 12 V244" />
        <path id="guide-v-04" d="M230 12 V244" />
      </g>
    </g>

    <!-- Temporary annotation paths: K2 removes these groups. -->
    <g id="annotation-f-outline" data-k2-disposition="remove">
      <path
        id="annotation-f-path"
        class="f-outline"
        d="M92 42 H188 V76 H105 V111 H169 V144 H105 V214 H70 V64 C70 51.8497 79.8497 42 92 42 Z"
      />
    </g>

    <g id="annotation-coordinate-system" class="coordinates" data-k2-disposition="remove">
      <path d="M70 20 V32 M188 20 V32 M70 20 H188" />
      <path d="M54 64 H66 M54 214 H66 M54 64 V214" />
      <text x="195" y="23">x</text>
      <text x="48" y="226">y</text>
    </g>

    <g id="annotation-force-handles" class="force-handles" data-k2-disposition="remove">
      <!-- Cubic corner: P0=(70,64), P1=(70,51.8497), P2=(79.8497,42), P3=(92,42). -->
      <path
        id="force-handle-connectors"
        d="M70 64 L70 51.8497 M92 42 L79.8497 42"
      />
      <circle id="force-node-start" class="force-node" cx="70" cy="64" r="2.8" />
      <circle id="force-control-start" class="force-control" cx="70" cy="51.8497" r="2.1" />
      <circle id="force-node-end" class="force-node" cx="92" cy="42" r="2.8" />
      <circle id="force-control-end" class="force-control" cx="79.8497" cy="42" r="2.1" />
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

.guide-lines {
  fill: none;
  stroke: currentColor;
  stroke-width: 0.8;
  stroke-dasharray: 2.4 5.2;
  stroke-linecap: round;
  opacity: 0.34;
  vector-effect: non-scaling-stroke;
}

.f-outline {
  fill: none;
  stroke: currentColor;
  stroke-width: 3.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.94;
  vector-effect: non-scaling-stroke;
}

.coordinates {
  fill: none;
  stroke: currentColor;
  stroke-width: 0.9;
  stroke-linecap: round;
  opacity: 0.78;
  vector-effect: non-scaling-stroke;
}

.coordinates text {
  fill: currentColor;
  stroke: none;
  font-family: var(--font-technical);
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.force-handles {
  fill: none;
  stroke: currentColor;
  stroke-width: 1;
  stroke-dasharray: 2.6 3.4;
  stroke-linecap: round;
  opacity: 0.84;
  vector-effect: non-scaling-stroke;
}

.force-node {
  fill: var(--site-hero-background);
  stroke: currentColor;
  stroke-width: 1.2;
}

.force-control {
  fill: currentColor;
  stroke: none;
}
</style>
