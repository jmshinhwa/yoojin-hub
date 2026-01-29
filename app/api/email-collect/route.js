// app/api/email-collect/route.js
// SSOT 07번 5절: Exit Intent 팝업 이메일 수집

export const runtime = "edge";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, product_id, lang } = body;
    
    if (!email || !product_id) {
      return Response.json({ error: "email and product_id required" }, { status: 400 });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "invalid email format" }, { status: 400 });
    }
    
    console.log("Email collected:", { email, product_id, lang });
    
    return Response.json({ success: true });
    
  } catch (error) {
    console.error("Email collect error:", error);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
