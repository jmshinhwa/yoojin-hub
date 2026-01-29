// lib/db.js - PostgreSQL 연결 (Edge Runtime 호환)
// VPS PostgreSQL: 100.104.131.122

const DB_CONFIG = {
  host: process.env.DB_HOST || "100.104.131.122",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "yoojin",
  user: process.env.DB_USER || "yoojin_user",
  password: process.env.DB_PASSWORD || "",
};

// Edge Runtime에서는 pg 직접 사용 불가 → API Route 통해 호출
export async function fetchProduct(productId) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://hub.jmshinhwa.org";
  const res = await fetch(`${baseUrl}/api/product/${productId}`, {
    next: { revalidate: 60 }, // 60초 캐시
  });
  if (\!res.ok) return null;
  return res.json();
}

export async function fetchGumroadAccount(productId, isHit) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://hub.jmshinhwa.org";
  const res = await fetch(`${baseUrl}/api/gumroad-redirect?product_id=${productId}&is_hit=${isHit}`);
  if (\!res.ok) return null;
  return res.json();
}

export async function recordHubClick(productId, lang, referrer) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://hub.jmshinhwa.org";
  await fetch(`${baseUrl}/api/track-click`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId, lang, referrer }),
  });
}

export { DB_CONFIG };
