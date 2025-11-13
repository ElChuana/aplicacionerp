import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Volvemos a hacer que ESLint bloquee el build si hay errores
    ignoreDuringBuilds: false,
  },
  transpilePackages: [
    // Transpilar paquetes ESM de rc-* y @rc-component/* para resolver imports internos sin extensión en Node
    'rc-util',
    'rc-picker',
    'rc-pagination',
    'rc-field-form',
    'rc-input-number',
    'rc-input',
    'rc-dialog',
    'rc-menu',
    'rc-overflow',
    'rc-select',
    'rc-cascader',
    'rc-slider',
    'rc-tree',
    'rc-tree-select',
    'rc-tabs',
    'rc-dropdown',
    'rc-tooltip',
    'rc-upload',
    'rc-table',
    'rc-progress',
    'rc-steps',
    'rc-resize-observer',
    'rc-segmented',
    'rc-image',
    'rc-mentions',
    'rc-rate',
    '@rc-component/portal',
    '@rc-component/trigger',
    '@rc-component/tour',
    '@rc-component/mutate-observer',
    '@rc-component/qrcode',
    '@rc-component/color-picker',
    '@rc-component/util',
  ],
};

export default nextConfig;
