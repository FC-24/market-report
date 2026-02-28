import { renderMarket, renderNews, renderEarnings } from "./render.js";

async function fetchJson(path) {
  // GitHub Pagesはキャッシュが効くことがあるので、軽いキャッシュバスター
  const url = `${path}?t=${Date.now()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${path} fetch failed: ${res.status}`);
  return res.json();
}

(async () => {
  try {
    const [market, news, earnings] = await Promise.all([
      fetchJson("./data/latest/market.json"),
      fetchJson("./data/latest/news.json"),
      fetchJson("./data/latest/earnings.json"),
    ]);

    document.querySelector("#reportMeta").textContent =
      `対象日(JST): ${market.date_jst} / UTC: ${market.window_start_utc} → ${market.window_end_utc}`;

    renderMarket(document.querySelector("#market"), market);
    renderNews(document.querySelector("#news"), news);
    renderEarnings(document.querySelector("#earnings"), earnings);
  } catch (e) {
    document.querySelector("#reportMeta").textContent = `読み込み失敗: ${e.message}`;
    ["#market", "#news", "#earnings"].forEach((id) => {
      const el = document.querySelector(id);
      if (el) el.innerHTML += `<p class="error">データを読み込めませんでした。</p>`;
    });
  }
})();
