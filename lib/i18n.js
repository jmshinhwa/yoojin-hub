// lib/i18n.js - SSOT 07번 2-1절: 5개국어 지원

export const SUPPORTED_LANGS = ["en", "ja", "es", "fr", "pt"];
export const DEFAULT_LANG = "en";

export function detectLanguage(acceptLanguage) {
  if (!acceptLanguage) return DEFAULT_LANG;
  const langs = acceptLanguage.split(",").map((l) => l.split(";")[0].trim().substring(0, 2).toLowerCase());
  for (const lang of langs) {
    if (SUPPORTED_LANGS.includes(lang)) return lang;
  }
  return DEFAULT_LANG;
}

export const UI_TEXT = {
  en: {
    social_proof: "purchased",
    cta_button: "Buy Now on Gumroad",
    cta_safe: "Secure checkout with Gumroad",
    result_preview: "What You Get",
    before_after: "Before & After",
    whats_included: "Whats Included",
    faq_title: "Frequently Asked Questions",
    risk_reversal: "30-Day Money Back Guarantee",
    exit_popup_title: "Wait! Get a Free Sample",
    exit_popup_desc: "Enter your email to receive a free preview",
    exit_popup_button: "Send Me Free Sample",
    email_placeholder: "your@email.com",
  },
  ja: {
    social_proof: "人が購入",
    cta_button: "Gumroadで購入する",
    cta_safe: "Gumroadで安全にお支払い",
    result_preview: "得られるもの",
    before_after: "ビフォー・アフター",
    whats_included: "含まれるもの",
    faq_title: "よくある質問",
    risk_reversal: "30日間返金保証",
    exit_popup_title: "お待ちください！無料サンプル",
    exit_popup_desc: "メールアドレスを入力して無料プレビューを受け取る",
    exit_popup_button: "無料サンプルを送る",
    email_placeholder: "your@email.com",
  },
  es: {
    social_proof: "compraron",
    cta_button: "Comprar en Gumroad",
    cta_safe: "Pago seguro con Gumroad",
    result_preview: "Lo Que Obtienes",
    before_after: "Antes y Despues",
    whats_included: "Que Incluye",
    faq_title: "Preguntas Frecuentes",
    risk_reversal: "Garantia de devolucion de 30 dias",
    exit_popup_title: "Espera! Muestra Gratis",
    exit_popup_desc: "Ingresa tu email para recibir una vista previa gratis",
    exit_popup_button: "Enviame Muestra Gratis",
    email_placeholder: "tu@email.com",
  },
  fr: {
    social_proof: "ont achete",
    cta_button: "Acheter sur Gumroad",
    cta_safe: "Paiement securise via Gumroad",
    result_preview: "Ce Que Vous Obtenez",
    before_after: "Avant / Apres",
    whats_included: "Ce Qui Est Inclus",
    faq_title: "Questions Frequentes",
    risk_reversal: "Garantie de remboursement de 30 jours",
    exit_popup_title: "Attendez! Echantillon Gratuit",
    exit_popup_desc: "Entrez votre email pour recevoir un apercu gratuit",
    exit_popup_button: "Envoyez-moi un echantillon",
    email_placeholder: "votre@email.com",
  },
  pt: {
    social_proof: "compraram",
    cta_button: "Comprar no Gumroad",
    cta_safe: "Pagamento seguro via Gumroad",
    result_preview: "O Que Voce Recebe",
    before_after: "Antes e Depois",
    whats_included: "O Que Esta Incluido",
    faq_title: "Perguntas Frequentes",
    risk_reversal: "Garantia de reembolso de 30 dias",
    exit_popup_title: "Espere! Amostra Gratis",
    exit_popup_desc: "Digite seu email para receber uma previa gratis",
    exit_popup_button: "Envie-me Amostra Gratis",
    email_placeholder: "seu@email.com",
  },
};
