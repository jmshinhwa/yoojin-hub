/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages에서 Edge Runtime 사용
  experimental: {
    runtime: 'edge',
  },
  // 정적 내보내기 비활성화 (Cloudflare Pages가 처리)
  output: undefined,
}

module.exports = nextConfig
