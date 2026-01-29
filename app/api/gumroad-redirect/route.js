// app/api/gumroad-redirect/route.js
// SSOT 07번 4절: Gumroad 5계정 로드밸런싱

export const runtime = "edge";

const ACCOUNT_ROLES = {
  TEST: "test",
  MAIN: "main",
  MIRROR_A: "mirror_a",
  MIRROR_B: "mirror_b",
  HIGH: "high",
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id");
  const isHit = searchParams.get("is_hit") === "true";
  
  if (!productId) {
    return Response.json({ error: "product_id required" }, { status: 400 });
  }
  
  try {
    let targetRole;
    
    if (isHit) {
      targetRole = ACCOUNT_ROLES.MAIN;
    } else {
      targetRole = ACCOUNT_ROLES.TEST;
    }
    
    const mockAccounts = {
      test: { url: "https://jmtest.gumroad.com/l/", account_id: "test_001" },
      main: { url: "https://jmshinhwa.gumroad.com/l/", account_id: "main_001" },
      mirror_a: { url: "https://jmmirror1.gumroad.com/l/", account_id: "mirror_a_001" },
      mirror_b: { url: "https://jmmirror2.gumroad.com/l/", account_id: "mirror_b_001" },
      high: { url: "https://jmhigh.gumroad.com/l/", account_id: "high_001" },
    };
    
    const account = mockAccounts[targetRole] || mockAccounts.main;
    const gumroadUrl = account.url + productId;
    
    return Response.json({
      url: gumroadUrl,
      account_role: targetRole,
      account_id: account.account_id,
    });
    
  } catch (error) {
    console.error("Gumroad redirect error:", error);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
