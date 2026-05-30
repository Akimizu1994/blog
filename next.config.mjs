import nextra from 'nextra'

const withNextra = nextra({
  search: false,
  defaultShowCopyCode: true,
})

// DEPLOY_ENV=test   → NUC, /blog 子路径, 静态导出
// DEPLOY_ENV=prod   → 生产域名, 根路径, 静态导出
// (未设置)          → 本地 dev, 根路径, Next.js dev server
const env = process.env.DEPLOY_ENV ?? 'dev'
const basePath = env === 'test' ? '/blog' : ''
const isExport = env === 'test' || env === 'prod'

export default withNextra({
  reactStrictMode: true,
  ...(isExport && { output: 'export' }),
  basePath,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
})
