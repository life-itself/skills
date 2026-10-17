// mindmap.js: lays out a hypothesis/question tree as a left-to-right mindmap in SVG.
// Style after the Seeds of Renaissance diagram look: Apfel Grotezk, no bold, thin ink curves, red only for what matters.
// Input: window.TREE (see SKILL.md for the schema). Output: <pre id="svgout"> with the SVG, <pre id="warnings">.
(async function(){
  const T = window.TREE, FONTS = window.FONTS || {};
  const C = Object.assign({
    width: 1600, margin: 72, ink: '#1b1916', grey: '#8a847a', muted: 'rgba(27,25,22,.6)', red: '#e5201c', ground: '#ffffff',
    wrap: [300, 420, 480, 440],           // max text width per depth (root, level 1, level 2, level 3)
    gapX: [150, 96, 72],                   // horizontal room for the curves after each depth
    gapY: [0, 34, 12, 10],                // vertical gap between siblings at each depth
    dot: 4, pad: 14,                      // node dot radius; gap between a curve end and its text
    stroke: [3, 2, 1.5, 1.2],             // branch width leaving each depth (tapers like a mindmap)
    minFont: 26
  }, T.config || {});
  // text styles: [weight, size, colour, line-height]
  const ST = {
    title:   ['Regular', 46, C.ink, 1.15], subtitle: ['Regular', 28, C.muted, 1.3],
    rootLabel:['Regular', 40, C.ink, 1.12], rootNote:['Regular', 26, C.muted, 1.3],
    label:   ['Mittel', 32, C.ink, 1.18], text: ['Regular', 26, C.ink, 1.3], note: ['Regular', 26, C.muted, 1.3],
    leaf:    ['Regular', 26, C.ink, 1.3], leafNote: ['Regular', 26, C.muted, 1.3],
    tag:     ['Mittel', 21, C.muted, 1.2], footer: ['Regular', 22, C.muted, 1.3]
  };
  const fam = w => w === 'Mittel' ? 'ApfelMittel' : 'ApfelRegular';
  const ctx = document.createElement('canvas').getContext('2d');
  await document.fonts.ready;
  const font = s => `${s[1]}px ${fam(s[0])}`;
  const wrap = (str, s, maxW, tracking=0) => {
    ctx.font = font(s); const words = String(str).split(/\s+/); const lines = []; let cur = '';
    for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width + tracking*t.length > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
    if (cur) lines.push(cur);
    // balance a ragged last line: pull words down if the last line is very short
    if (lines.length > 1) { const last = lines[lines.length-1].split(' '); const prev = lines[lines.length-2].split(' ');
      while (prev.length > 2 && last.join(' ').length < prev.join(' ').length * 0.45) { last.unshift(prev.pop()); }
      lines[lines.length-2] = prev.join(' '); lines[lines.length-1] = last.join(' '); }
    return lines.map(t => ({ t, s, w: ctx.measureText(t).width }));
  };
  const warn = [];
  // build text blocks
  function block(node, depth) {
    const W = C.wrap[Math.min(depth, C.wrap.length-1)]; let lines = [];
    const add = (str, s) => { if (str) lines = lines.concat(wrap(str, s, W)); };
    if (depth === 0) { add(node.label, ST.rootLabel); add(node.note, ST.rootNote); }
    else if (node.children && node.children.length || node.label) { add(node.label, ST.label); add(node.text, ST.text); add(node.note, ST.note); }
    else { add(node.text, ST.leaf); add(node.note, ST.leafNote); }
    let y = 0; for (const L of lines) { const lh = L.s[1]*L.s[3]; L.y = y + L.s[1]*0.92 + (lh - L.s[1])/2; y += lh; }
    node.lines = lines; node.h = y; node.w = Math.max(...lines.map(l => l.w));
    // anchor = vertical middle of the first line's lowercase letters
    node.a = depth === 0 ? y/2 : lines[0].y - lines[0].s[1]*0.33;   // root: middle of its block
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
  const head = []; for (const [str, s] of [[T.title, ST.title], [T.subtitle, ST.subtitle]]) if (str) for (const L of wrap(str, s, C.width - 2*M)) { const lh = s[1]*s[3]; head.push({...L, y: hy + s[1]*0.92}); hy += lh; }
  const mapTop = hy + (T.title || T.subtitle ? 72 : 0);
  const mapBottom = lay(T.root, 0, 0);
  const mapW = colX[colX.length-1] + colW[colW.length-1];
  const mx = M + Math.max(0, ((C.width - 2*M) - mapW) / 2) * (C.centre === false ? 0 : 1);
  if (mapW > C.width - 2*M) warn.push(`map too wide: ${Math.round(mapW)}px > ${C.width - 2*M}px; reduce wrap widths or gaps, or shorten text`);
  // footer
  const fy = mapTop + mapBottom + 64; const foot = T.footer ? wrap(T.footer, ST.footer, C.width - 2*M) : [];
  const H = Math.round(fy + (foot.length ? ST.footer[1]*1.3*foot.length : 0) + M);
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const txt = (L, x, y) => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="${fam(L.s[0])}" font-size="${L.s[1]}" fill="${L.s[2]}">${esc(L.t)}</text>`;
  head.forEach(L => out.push(txt(L, M, L.y)));
  // branches then nodes
  (function draw(n) {
    const ox = mx + n.x, oy = mapTop + n.y;
    for (const k of (n.children || [])) {
      const x0 = ox + n.w + C.pad, y0 = oy + n.a, x1 = mx + k.x - C.pad, y1 = mapTop + k.y + k.a, cx = (x0 + x1) / 2;
      const col = k.accent ? C.red : C.ink; const sw = C.stroke[Math.min(n.d, C.stroke.length-1)];
      out.push(`<path d="M${x0.toFixed(1)},${y0.toFixed(1)} C${cx.toFixed(1)},${y0.toFixed(1)} ${cx.toFixed(1)},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`);
      draw(k);
    }
    if (n.d === 0) out.push(`<circle cx="${(ox - C.pad - 10).toFixed(1)}" cy="${(oy + n.a).toFixed(1)}" r="10" fill="${C.red}"/>`);
    else out.push(`<circle cx="${(ox - C.pad).toFixed(1)}" cy="${(oy + n.a).toFixed(1)}" r="${n.children && n.children.length ? C.dot+1 : C.dot}" fill="${n.accent ? C.red : C.ink}"/>`);
    n.lines.forEach(L => { const s = (n.accent && L.s === ST.label) ? [L.s[0], L.s[1], C.red, L.s[3]] : L.s; out.push(txt({...L, s}, ox, oy + L.y)); if (L.s[1] < C.minFont) warn.push(`small text: ${L.t.slice(0,30)}`); });
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
