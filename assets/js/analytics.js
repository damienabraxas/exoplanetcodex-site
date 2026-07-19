/* The Exoplanet Codex — shared Google Analytics 4 loader (RYA-590). */
(function loadGoogleAnalytics() {
  "use strict";

  const measurementId = "G-J582P46BP9";

  if (window.__exoplanetCodexGa4Loaded) return;
  window.__exoplanetCodexGa4Loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const googleTag = document.createElement("script");
  googleTag.async = true;
  googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  googleTag.dataset.codexAnalytics = measurementId;
  document.head.append(googleTag);
})();
