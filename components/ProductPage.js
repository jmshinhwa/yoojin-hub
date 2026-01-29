// components/ProductPage.js - SSOT 07번 3절: 8블록 구조 (CVR Maximizer)
"use client";

import { useState, useEffect } from "react";
import { UI_TEXT } from "../lib/i18n";
import { getLocalizedPrice } from "../lib/pricing";

// 블록 1: Social Proof (최상단)
function SocialProof({ totalSales, rating, lang }) {
  const t = UI_TEXT[lang] || UI_TEXT.en;
  const stars = "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "☆" : "");
  return (
    <div className="social-proof">
      <span className="fire">🔥</span>
      <span className="sales-count">{totalSales.toLocaleString()} {t.social_proof}</span>
      <span className="rating">{stars} ({rating.toFixed(1)})</span>
    </div>
  );
}

// 블록 2: Price & CTA
function PriceCTA({ tier, lang, gumroadUrl, onCTAClick }) {
  const t = UI_TEXT[lang] || UI_TEXT.en;
  const price = getLocalizedPrice(tier, lang);
  return (
    <div className="price-cta">
      <div className="price">{price}</div>
      <button className="cta-button" onClick={onCTAClick}>
        {t.cta_button}
      </button>
      <p className="cta-safe">🔒 {t.cta_safe}</p>
    </div>
  );
}

// 블록 3: Result Preview (결과물 갤러리)
function ResultPreview({ previewUrls, lang }) {
  const t = UI_TEXT[lang] || UI_TEXT.en;
  if (!previewUrls || previewUrls.length === 0) return null;
  return (
    <div className="result-preview">
      <h2>{t.result_preview}</h2>
      <div className="gallery">
        {previewUrls.map((url, i) => (
          <img key={i} src={url} alt={`Preview ${i + 1}`} loading="lazy" />
        ))}
      </div>
    </div>
  );
}

// 블록 4: Before / After
function BeforeAfter({ beforeUrl, afterUrl, lang }) {
  const t = UI_TEXT[lang] || UI_TEXT.en;
  if (!beforeUrl || !afterUrl) return null;
  return (
    <div className="before-after">
      <h2>{t.before_after}</h2>
      <div className="comparison">
        <div className="before">
          <span>BEFORE</span>
          <img src={beforeUrl} alt="Before" loading="lazy" />
        </div>
        <div className="after">
          <span>AFTER</span>
          <img src={afterUrl} alt="After" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

// 블록 5: Whats Included
function WhatsIncluded({ includes, lang }) {
  const t = UI_TEXT[lang] || UI_TEXT.en;
  if (!includes || includes.length === 0) return null;
  return (
    <div className="whats-included">
      <h2>{t.whats_included}</h2>
      <ul>
        {includes.map((item, i) => (
          <li key={i}>✓ {item}</li>
        ))}
      </ul>
    </div>
  );
}

// 블록 6: FAQ
function FAQ({ faqItems, lang }) {
  const t = UI_TEXT[lang] || UI_TEXT.en;
  if (!faqItems || faqItems.length === 0) return null;
  return (
    <div className="faq">
      <h2>{t.faq_title}</h2>
      {faqItems.map((item, i) => (
        <details key={i}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

// 블록 7: Risk Reversal
function RiskReversal({ lang }) {
  const t = UI_TEXT[lang] || UI_TEXT.en;
  return (
    <div className="risk-reversal">
      <span className="shield">🛡️</span>
      <span>{t.risk_reversal}</span>
    </div>
  );
}

// 블록 8: Sticky CTA
function StickyCTA({ tier, lang, onCTAClick }) {
  const t = UI_TEXT[lang] || UI_TEXT.en;
  const price = getLocalizedPrice(tier, lang);
  return (
    <div className="sticky-cta">
      <span className="sticky-price">{price}</span>
      <button onClick={onCTAClick}>{t.cta_button}</button>
    </div>
  );
}

// Exit Intent Popup (SSOT 07번 5절)
function ExitIntentPopup({ lang, productId, onClose }) {
  const t = UI_TEXT[lang] || UI_TEXT.en;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    await fetch("/api/email-collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, product_id: productId, lang }),
    });
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  return (
    <div className="exit-popup-overlay" onClick={onClose}>
      <div className="exit-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>{t.exit_popup_title}</h3>
        <p>{t.exit_popup_desc}</p>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.email_placeholder}
              required
            />
            <button type="submit">{t.exit_popup_button}</button>
          </form>
        ) : (
          <p className="success">✓ Sent!</p>
        )}
      </div>
    </div>
  );
}

// 메인 컴포넌트: 8블록 통합
export default function ProductPage({ product, lang }) {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [gumroadUrl, setGumroadUrl] = useState("");

  // Gumroad URL 로드 (로드밸런싱 적용)
  useEffect(() => {
    async function loadGumroadUrl() {
      const isHit = product.is_confirmed_hit || false;
      const res = await fetch(`/api/gumroad-redirect?product_id=${product.id}&is_hit=${isHit}`);
      const data = await res.json();
      if (data.url) setGumroadUrl(data.url);
    }
    loadGumroadUrl();
  }, [product.id, product.is_confirmed_hit]);

  // Exit Intent 감지
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 10 && !showExitPopup) {
        setShowExitPopup(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [showExitPopup]);

  const handleCTAClick = () => {
    if (gumroadUrl) {
      window.location.href = gumroadUrl;
    }
  };

  const metadata = product.metadata || {};

  return (
    <div className="product-page">
      {/* 블록 1: Social Proof */}
      <SocialProof
        totalSales={product.total_sales || 0}
        rating={product.rating || 4.8}
        lang={lang}
      />

      {/* 블록 2: Price & CTA */}
      <PriceCTA
        tier={product.tier || 2}
        lang={lang}
        gumroadUrl={gumroadUrl}
        onCTAClick={handleCTAClick}
      />

      {/* 블록 3: Result Preview */}
      <ResultPreview
        previewUrls={product.preview_urls || metadata.preview_urls}
        lang={lang}
      />

      {/* 블록 4: Before / After */}
      <BeforeAfter
        beforeUrl={metadata.before_url}
        afterUrl={metadata.after_url}
        lang={lang}
      />

      {/* 블록 5: Whats Included */}
      <WhatsIncluded
        includes={metadata.includes}
        lang={lang}
      />

      {/* 블록 6: FAQ */}
      <FAQ
        faqItems={metadata.faq}
        lang={lang}
      />

      {/* 블록 7: Risk Reversal */}
      <RiskReversal lang={lang} />

      {/* 블록 8: Sticky CTA */}
      <StickyCTA
        tier={product.tier || 2}
        lang={lang}
        onCTAClick={handleCTAClick}
      />

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <ExitIntentPopup
          lang={lang}
          productId={product.id}
          onClose={() => setShowExitPopup(false)}
        />
      )}
    </div>
  );
}
