// app/api/product/[id]/route.js
// 상품 데이터 조회 API (yj_products 테이블)

export const runtime = "edge";

export async function GET(request, { params }) {
  const { id } = await params;
  
  if (!id) {
    return Response.json({ error: "product id required" }, { status: 400 });
  }
  
  try {
    // TODO: 실제 구현 시 PostgreSQL 연결
    // Edge Runtime에서는 pg 직접 사용 불가 → 
    // 1) Cloudflare D1/Hyperdrive 사용 또는
    // 2) VPS API 프록시 호출
    
    // Mock 데이터 (테스트용)
    const mockProduct = {
      id: id,
      title: "Premium Design Template Pack",
      description: "50+ professional design templates for your projects",
      tier: 2,
      total_sales: 1204,
      rating: 4.9,
      is_confirmed_hit: false,
      preview_urls: [
        "https://via.placeholder.com/400x300?text=Preview+1",
        "https://via.placeholder.com/400x300?text=Preview+2",
        "https://via.placeholder.com/400x300?text=Preview+3",
      ],
      metadata: {
        titles: {
          en: "Premium Design Template Pack",
          ja: "プレミアムデザインテンプレートパック",
          es: "Pack de Plantillas de Diseno Premium",
          fr: "Pack de Modeles de Design Premium",
          pt: "Pacote de Modelos de Design Premium",
        },
        descriptions: {
          en: "50+ professional design templates for your projects",
          ja: "プロジェクト用の50以上のプロフェッショナルデザインテンプレート",
          es: "Mas de 50 plantillas de diseno profesional para tus proyectos",
          fr: "Plus de 50 modeles de design professionnels pour vos projets",
          pt: "Mais de 50 modelos de design profissional para seus projetos",
        },
        before_url: "https://via.placeholder.com/400x300?text=Before",
        after_url: "https://via.placeholder.com/400x300?text=After",
        includes: [
          "50+ Figma Templates",
          "Source Files (AI, PSD)",
          "Commercial License",
          "Free Updates",
          "Email Support",
        ],
        faq: [
          { q: "Can I get a refund?", a: "Yes, 30-day money back guarantee." },
          { q: "Is this for beginners?", a: "Yes, all templates are easy to customize." },
          { q: "Do I need Figma Pro?", a: "No, free Figma account works fine." },
        ],
      },
      created_at: new Date().toISOString(),
    };
    
    return Response.json(mockProduct);
    
  } catch (error) {
    console.error("Product fetch error:", error);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
