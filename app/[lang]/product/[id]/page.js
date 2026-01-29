// app/[lang]/product/[id]/page.js - 동적 상품 페이지
// URL: /ja/product/{uuid}, /en/product/{uuid} 등

import ProductPage from "../../../../components/ProductPage";
import { SUPPORTED_LANGS, DEFAULT_LANG } from "../../../../lib/i18n";

export const runtime = "edge";

// 메타데이터 동적 생성
export async function generateMetadata({ params }) {
  const { lang, id } = await params;
  const product = await fetchProductData(id);
  
  if (!product) {
    return { title: "Product Not Found" };
  }
  
  const title = product.metadata?.titles?.[lang] || product.title;
  const description = product.metadata?.descriptions?.[lang] || product.description;
  
  return {
    title: `${title} | YooJin Hub`,
    description,
    openGraph: {
      title,
      description,
      images: product.preview_urls?.[0] ? [product.preview_urls[0]] : [],
    },
  };
}

// DB에서 상품 데이터 가져오기 (Edge Runtime용 fetch)
async function fetchProductData(productId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://hub.jmshinhwa.org";
    const res = await fetch(`${baseUrl}/api/product/${productId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch product:", e);
    return null;
  }
}

export default async function Page({ params }) {
  const { lang, id } = await params;
  
  // 지원 언어 검증
  const validLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  
  // 상품 데이터 로드
  const product = await fetchProductData(id);
  
  if (!product) {
    return (
      <div className="not-found">
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }
  
  return <ProductPage product={product} lang={validLang} />;
}
