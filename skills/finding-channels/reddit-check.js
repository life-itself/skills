// Paste into the DevTools console on a https://www.reddit.com tab (logged in). Read-only.
// Fetches about, rules and the 100 newest posts per subreddit, then downloads reddit-check.json.
(async () => {
  const subs = ["datasets","opendata","DataHoarder","datajournalism","LanguageTechnology","MachineLearning","LocalLLaMA","DigitalHumanities","Archivists","librarians","libraryscience","LawLibrarians","foia","OSINT","journalism","law","scotus","ukpolitics","unitedkingdom","uknews","LawUK","history","AskHistorians","historyteachers","socialstudies","Teachers","IRstudies","geopolitics","IntelligenceNews","ColdWar","CIA","engineering","AerospaceEngineering","CatastrophicFailure","aircrashinvestigation","AdmiralCloudberg","space","nasa","sre","ExperiencedDevs","Economics","AskEconomics","economicshistory","AcademicEconomics","finance","Accounting","publichealth","tobacco","TrueReddit","Foodforthought","InternetIsBeautiful","HistoryPorn","PropagandaPosters","Documentaries"];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const get = async u => { try { const r = await fetch(u, {credentials: "include"}); return r.ok ? r.json() : {error: r.status}; } catch (e) { return {error: String(e)}; } };
  const out = {checked: new Date().toISOString(), subs: {}};
  for (const s of subs) {
    const about = await get(`/r/${s}/about.json`); await sleep(700);
    const rules = await get(`/r/${s}/about/rules.json`); await sleep(700);
    const posts = await get(`/r/${s}/new.json?limit=100`); await sleep(700);
    const a = about.data || {};
    const kids = (posts.data && posts.data.children) || [];
    const now = Date.now() / 1000;
    out.subs[s] = {
      error: about.error || null, rules_error: rules.error || null, posts_error: posts.error || null,
      subscribers: a.subscribers, over18: a.over18, type: a.subreddit_type,
      submission_type: a.submission_type, allow_images: a.allow_images,
      description: (a.public_description || "").slice(0, 300),
      rules: (rules.rules || []).map(r => `${r.short_name}: ${(r.description || "").slice(0, 400)}`),
      posts_last_7d: kids.filter(k => now - k.data.created_utc < 7 * 86400).length,
      newest_post: kids[0] ? new Date(kids[0].data.created_utc * 1000).toISOString() : null,
      external_link_share: kids.length ? +(kids.filter(k => !k.data.is_self && !/reddit\.com|redd\.it/.test(k.data.domain)).length / kids.length).toFixed(2) : null,
      sample_top_recent: kids.slice().sort((x, y) => y.data.score - x.data.score).slice(0, 5).map(k => `${k.data.score} | ${k.data.domain} | ${k.data.title.slice(0, 100)}`)
    };
    console.log("checked", s);
  }
  const blob = new Blob([JSON.stringify(out, null, 1)], {type: "application/json"});
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "reddit-check.json"; a.click();
  console.log("done: reddit-check.json downloaded");
})();
