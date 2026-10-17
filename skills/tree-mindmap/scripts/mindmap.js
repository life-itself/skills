// mindmap.js: lays out a hypothesis/question tree as a left-to-right mindmap in SVG.
// Style after the Seeds of Renaissance diagram look: Apfel Grotezk, no bold, thin ink curves, red only for what matters.
// Input: window.TREE (see SKILL.md for the schema). Output: <pre id="svgout"> with the SVG, <pre id="warnings">.
(async function(){
  const T = window.TREE, FONTS = window.FONTS || {};
  const C = Object.assign({
    width: 0, margin: 72,                  // width 0 = fit the content (at least 1600)
    ink: '#1b1916', grey: '#8a847a', muted: 'rgba(27,25,22,.6)', red: '#e5201c', ground: '#ffffff',
    wrap: [380, 470, 440, 420],           // max text width per depth (root, level 1, level 2, level 3)
    gapX: [300, 110, 80],                 // horizontal room for the curves after each depth; the root fan needs the most
    gapY: [0, 24, 20, 14],                // vertical gap between siblings at each depth
    dot: 4, seed: 7, pad: 10,             // level-1 dot radius; red root seed radius; gap between a curve end and its text
    stroke: [2.4, 1.6, 1.3, 1.3],         // branch width leaving each depth; each branch also tapers to 55% along its length
    subtitleWrap: 1100, headGap: 56,
    minFont: 26
  }, T.config || {});
  // text styles: [weight, size, colour, line-height]
  const ST = {
    title:   ['Regular', 46, C.ink, 1.15], subtitle: ['Regular', 28, C.muted, 1.3],
    rootLabel:['Regular', 40, C.ink, 1.12], rootNote:['Regular', 26, C.muted, 1.3],
    label:   ['Mittel', 32, C.ink, 1.18], text: ['Regular', 27, C.ink, 1.25], note: ['Regular', 24, C.muted, 1.3],
    leaf:    ['Regular', 26, C.ink, 1.3], leafNote: ['Regular', 26, C.muted, 1.3],
    tag:     ['Mittel', 21, C.muted, 1.2], footer: ['Regular', 22, C.muted, 1.3]
  };
  const fam = w => w === 'Mittel' ? 'ApfelMittel' : 'ApfelRegular';
  const ctx = document.createElement('canvas').getContext('2d');
  await document.fonts.ready;
  const font = s => `${s[1]}px ${fam(s[0])}`;
  // greedy wrap at width W
  const greedy = (words, W) => { const lines = []; let cur = '';
    for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > W && cur) { lines.push(cur); cur = w; } else cur = t; }
    if (cur) lines.push(cur); return lines; };
  // balanced wrap: the narrowest width that keeps the greedy line count (like CSS text-wrap: balance)
  const wrap = (str, s, maxW) => {
    ctx.font = font(s); const words = String(str).split(/\s+/);
    let lines = greedy(words, maxW);
    if (lines.length > 1) { let lo = maxW * 0.4, hi = maxW;
      for (let i = 0; i < 14; i++) { const mid = (lo + hi) / 2; if (greedy(words, mid).length > lines.length) lo = mid; else hi = mid; }
      lines = greedy(words, hi); }
    return lines.map(t => ({ t, s, w: ctx.measureText(t).width }));
  };
  const warn = [];
  // build text blocks
  function block(node, depth) {
    const W = C.wrap[Math.min(depth, C.wrap.length-1)]; let lines = [];
    const add = (str, s) => { if (str) lines = lines.concat(wrap(str, s, W)); };
    if (depth === 0) { add(node.label, ST.rootLabel); add(node.note, ST.rootNote); }
    else if (node.children && node.children.length || node.label) { add(node.note, ST.note); add(node.label, ST.label); add(node.text, ST.text); }  // question (grey) above its answer
    else { add(node.text, ST.leaf); add(node.note, ST.leafNote); }
    let y = 0; for (const L of lines) { const lh = L.s[1]*L.s[3]; L.y = y + L.s[1]*0.92 + (lh - L.s[1])/2; y += lh; }
    node.lines = lines; node.h = y; node.w = Math.max(...lines.map(l => l.w));
    // anchor = vertical middle of the lowercase letters of the label line (or first line); root: middle of its block
    const al = lines.find(l => l.s === ST.label) || lines[0]; node.al = al;
    const rl = lines.filter(l => l.s === ST.rootLabel), rh = rl.length ? rl[rl.length-1].y + rl[0].s[1]*0.25 : y;
    node.a = depth === 0 ? rh/2 : al.y - al.s[1]*0.33;   // root: middle of its question lines
    (node.children||[]).forEach(c => block(c, depth+1));
  }
  block(T.root, 0);
  // x columns
  const colW = []; (function cw(n, d){ colW[d] = Math.max(colW[d]||0, n.w); (n.children||[]).forEach(c => cw(c, d+1)); })(T.root, 0);
  const colX = [0]; for (let d = 1; d < colW.length; d++) colX[d] = colX[d-1] + colW[d-1] + C.gapX[Math.min(d-1, C.gapX.length-1)] + 2*C.pad;
  // y layout: children first, parent anchor centred on its children's anchors
  function lay(n, d, top) {
    n.d = d; n.x = colX[d];
    const kids = n.children || [];
    if (!kids.length) { n.y = top; return n.y + n.h; }
    let y = top, bottom = top; const gap = C.gapY[Math.min(d+1, C.gapY.length-1)];
    kids.forEach((k, i) => { bottom = lay(k, d+1, y); y = bottom + gap; });
    const mid = (kids[0].y + kids[0].a + kids[kids.length-1].y + kids[kids.length-1].a) / 2;
    n.y = mid - n.a;
    if (n.y < top) { const dy = top - n.y; const shift = m => { m.y += dy; (m.children||[]).forEach(shift); }; kids.forEach(shift); n.y = top; bottom += dy; }
    return Math.max(bottom, n.y + n.h);
  }
  // header
  const M = C.margin; const out = []; let hy = M;
  const mapW = colX[colX.length-1] + colW[colW.length-1];
  if (!C.width) C.width = Math.max(1600, Math.ceil(mapW + 2*M));
  if (mapW > C.width - 2*M) warn.push(`map too wide: ${Math.round(mapW)}px > ${C.width - 2*M}px; reduce wrap widths or gaps, or shorten text`);
  if (C.width > 2000) warn.push(`canvas ${C.width}px wide: text will be small when shared; shorten text or narrow wraps`);
  const head = []; for (const [str, s, W] of [[T.title, ST.title, C.width - 2*M], [T.subtitle, ST.subtitle, C.subtitleWrap]]) if (str) for (const L of wrap(str, s, W)) { const lh = s[1]*s[3]; head.push({...L, y: hy + s[1]*0.92}); hy += lh; }
  const mapTop = hy + (T.title || T.subtitle ? C.headGap : 0);
  const mapBottom = lay(T.root, 0, 0);
  const mx = M + (C.centre ? Math.max(0, ((C.width - 2*M) - mapW) / 2) : 0);   // left-aligned with the title by default
  // footer
  const fy = mapTop + mapBottom + 64; const foot = T.footer ? wrap(T.footer, ST.footer, C.width - 2*M) : [];
  const H = Math.round(fy + (foot.length ? ST.footer[1]*1.3*foot.length : 0) + M);
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const txt = (L, x, y) => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="${fam(L.s[0])}" font-size="${L.s[1]}" fill="${L.s[2]}">${esc(L.t)}</text>`;
  head.forEach(L => out.push(txt(L, M, L.y)));
  // a branch: a filled ribbon along a cubic curve, tapering from w0 to w1, leaving flat and landing flat
  const ribbon = (x0, y0, x1, y1, w0, w1, col) => {
    const dx = x1 - x0, c1 = x0 + 0.5*dx, c2 = x0 + 0.4*dx, N = 40, top = [], bot = [];
    for (let i = 0; i <= N; i++) { const t = i/N, u = 1-t;
      const x = u*u*u*x0 + 3*u*u*t*c1 + 3*u*t*t*c2 + t*t*t*x1, y = u*u*u*y0 + 3*u*u*t*y0 + 3*u*t*t*y1 + t*t*t*y1;
      const tx = 3*u*u*(c1-x0) + 6*u*t*(c2-c1) + 3*t*t*(x1-c2), ty = 6*u*t*(y1-y0);
      const len = Math.hypot(tx, ty) || 1, nx = -ty/len, ny = tx/len, h = (w0 + (w1-w0)*t)/2;
      top.push(`${(x+nx*h).toFixed(1)},${(y+ny*h).toFixed(1)}`); bot.unshift(`${(x-nx*h).toFixed(1)},${(y-ny*h).toFixed(1)}`); }
    return `<path d="M${top.join(' L')} L${bot.join(' L')} Z" fill="${col}"/>`;
  };
  (function draw(n) {
    const ox = mx + n.x, oy = mapTop + n.y, kids = n.children || [];
    const sw = C.stroke[Math.min(n.d, C.stroke.length-1)], y0 = oy + n.a;
    // one shared fan origin per column; a hairline leads out of the label to it
    const x0 = n.d === 0 ? ox + Math.max(...n.lines.filter(l => l.s === ST.rootLabel).map(l => l.w)) + 2*C.pad + C.seed : mx + colX[n.d] + colW[n.d] + C.pad;
    if (kids.length && n.d > 0) { const xs = ox + n.al.w + C.pad; if (x0 - xs > 4) out.push(`<line x1="${xs.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x0.toFixed(1)}" y2="${y0.toFixed(1)}" stroke="${n.accent ? C.red : C.ink}" stroke-width="${sw}" stroke-linecap="round"/>`); }
    for (const k of kids) {
      const x1 = mx + k.x - C.pad - (k.d === 1 ? C.dot : 0), y1 = mapTop + k.y + k.a;
      out.push(ribbon(x0, y0, x1, y1, sw, sw*0.55, k.accent ? C.red : C.ink));
      if (k.d === 1) out.push(`<circle cx="${(x1).toFixed(1)}" cy="${y1.toFixed(1)}" r="${C.dot}" fill="${k.accent ? C.red : C.ink}"/>`);
      draw(k);
    }
    if (n.d === 0) out.push(`<circle cx="${x0.toFixed(1)}" cy="${y0.toFixed(1)}" r="${C.seed}" fill="${C.red}"/>`);
    n.lines.forEach(L => { const s = (n.accent && L.s === ST.label) ? [L.s[0], L.s[1], C.red, L.s[3]] : L.s; out.push(txt({...L, s}, ox, oy + L.y)); if (L.s[1] < C.minFont && L.s !== ST.note) warn.push(`small text: ${L.t.slice(0,30)}`); });
  })(T.root);
  foot.forEach((L, i) => out.push(`<text x="${(C.width - M).toFixed(1)}" y="${(fy + ST.footer[1]*0.92 + i*ST.footer[1]*1.3).toFixed(1)}" text-anchor="end" font-family="${fam(L.s[0])}" font-size="${L.s[1]}" fill="${L.s[2]}">${esc(L.t)}</text>`));
  const ff = Object.entries(FONTS).map(([n, b64]) => `@font-face{font-family:${n};src:url(data:font/otf;base64,${b64}) format("opentype")}`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${C.width}" height="${H}" viewBox="0 0 ${C.width} ${H}" role="img" aria-labelledby="t d">
<title id="t">${esc(T.title || T.root.label)}</title><desc id="d">${esc(T.alt || '')}</desc>
<style>${ff}</style><rect width="${C.width}" height="${H}" fill="${C.ground}"/>
${out.join('\n')}
</svg>`;
  const pre = document.createElement('pre'); pre.id = 'svgout'; pre.textContent = svg;
  const w = document.createElement('pre'); w.id = 'warnings'; w.textContent = warn.join('\n') || 'OK';
  const sz = document.createElement('pre'); sz.id = 'size'; sz.textContent = `${C.width}x${H}`;
  document.body.replaceChildren(pre, w, sz);
})();
