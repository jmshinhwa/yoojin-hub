// lib/pricing.js - SSOT 07번 2-2절: 심리 가격 테이블

export const PSYCHOLOGICAL_PRICING = {
  // Tier 1: 미끼
  1: { USD: 12.99, JPY: 1480, EUR: 11.99, BRL: 49.90 },
  // Tier 2: 주력
  2: { USD: 39.00, JPY: 4980, EUR: 35.00, BRL: 149.00 },
  // Tier 3: 고수익
  3: { USD: 119.00, JPY: 14800, EUR: 99.00, BRL: 449.00 },
  // Tier 4: High-Ticket (04번 SSOT)
  4: { USD: 399.00, JPY: 49800, EUR: 349.00, BRL: 1490.00 },
  // Tier 5: Dream (04번 SSOT)
  5: { USD: 999.00, JPY: 128000, EUR: 899.00, BRL: 3990.00 },
};

export const CURRENCY_SYMBOLS = {
  USD: "$",
  JPY: "¥",
  EUR: "€",
  BRL: "R$",
};

export const LANG_TO_CURRENCY = {
  en: "USD",
  ja: "JPY",
  de: "EUR",
  fr: "EUR",
  es: "EUR",
  pt: "BRL",
};

export function getLocalizedPrice(tier, lang) {
  const currency = LANG_TO_CURRENCY[lang] || "USD";
  const price = PSYCHOLOGICAL_PRICING[tier]?.[currency] || PSYCHOLOGICAL_PRICING[tier]?.USD;
  const symbol = CURRENCY_SYMBOLS[currency];
  
  if (currency === "JPY") {
    return `${symbol}${price.toLocaleString()}`;
  }
  return `${symbol}${price.toFixed(2)}`;
}
