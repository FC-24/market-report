export function renderMarket(container, data) {
  container.innerHTML = `
    <h2>マーケットダッシュボード</h2>
    <p><b>レジーム:</b> ${escapeHtml(data.summary.regime)}</p>
    <h3>主要ドライバー</h3>
    <ul>${data.summary.key_drivers.map(li).join("")}</ul>

    <h3>米国指数</h3>
    <ul>${data.us.indices.map(x => li(`${x.name}: ${x.move_pct}%（${x.note}）`)).join("")}</ul>

    <h3>日本指数</h3>
    <ul>${data.jp.indices.map(x => li(`${x.name}: ${x.move_pct}%（${x.note}）`)).join("")}</ul>
  `;
}

export function renderNews(container, data) {
  container.innerHTML = `
    <h2>ニュースブリーフ（${data.items.length}本）</h2>
    ${data.items.map(item => `
      <article class="card">
        <div class="tag">${escapeHtml(item.category)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <div class="meta">公表: ${escapeHtml(item.times.published_utc)} UTC / ${escapeHtml(item.times.published_jst)} JST</div>
        <p>${escapeHtml(item.what_happened)}</p>
        <h4>影響経路</h4>
        <ul>${item.impact_pathway.map(li).join("")}</ul>
        <h4>ソース</h4>
        <ul>${item.sources.map(u => li(`<a href="${u}" target="_blank" rel="noopener">link</a>`)).join("")}</ul>
      </article>
    `).join("")}
  `;
}

export function renderEarnings(container, data) {
  container.innerHTML = `
    <h2>決算ダイジェスト（${data.items.length}社）</h2>
    ${data.items.map(it => `
      <article class="card">
        <h3>${escapeHtml(it.company)} / ${escapeHtml(it.ticker)}</h3>
        <div class="meta">${escapeHtml(it.report_period)} / ${escapeHtml(it.country)}</div>
        <ul>${it.highlights.map(li).join("")}</ul>
        <div class="meta">vsコンセンサス: ${escapeHtml(it.vs_consensus)}</div>
        <div class="meta">ガイダンス: ${escapeHtml(it.guidance)}</div>
        <div class="meta">株価反応: ${escapeHtml(it.price_reaction)}</div>
      </article>
    `).join("")}
  `;
}

function li(x){ return `<li>${x}</li>`; }
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[m]));
}
