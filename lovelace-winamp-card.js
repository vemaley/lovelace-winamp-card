/**
 * lovelace-winamp-card v1.1.0
 * A Winamp-inspired media player card for Music Assistant
 * https://github.com/YOUR_USERNAME/lovelace-winamp-card
 * MIT License
 */

const WINAMP_VERSION = "1.2.0";

// ── Styles ────────────────────────────────────────────────────────────────────

const WINAMP_STYLES = `
  :host {
    display: block;
    --winamp-bg: #1a1a1a;
    --winamp-silver: #c0c0c0;
    --winamp-dark: #232323;
    --winamp-darker: #111111;
    --winamp-green: #00ff41;
    --winamp-green-dim: #007a1f;
    --winamp-title-bg: #000080;
    --winamp-title-text: #ffffff;
    --winamp-btn-face: #c0c0c0;
    --winamp-btn-shadow: #808080;
    --winamp-btn-highlight: #ffffff;
    --winamp-btn-dark: #404040;
    --winamp-lcd-bg: #0a0a0a;
    --winamp-lcd-dim: #003311;
    --winamp-vu-active: #00ff41;
    --winamp-vu-peak: #ff4400;
    --winamp-border-light: #ffffff;
    --winamp-border-mid: #808080;
    --winamp-border-dark: #404040;
    font-family: 'Courier New', Courier, monospace;
    user-select: none;
    -webkit-user-select: none;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ══ WINDOW CHROME ══ */

  .winamp-window {
    background: var(--winamp-bg);
    border: 2px solid;
    border-color: var(--winamp-border-light) var(--winamp-border-dark) var(--winamp-border-dark) var(--winamp-border-light);
    width: 275px;
    box-shadow: 2px 2px 0 #000, inset 1px 1px 0 var(--winamp-border-mid);
    font-size: 11px;
    overflow: hidden;
  }

  /* Shade mode hides all .shade-hide children */
  .winamp-window.shaded .shade-hide { display: none !important; }

  /* ══ TITLE BAR ══ */

  .title-bar {
    background: linear-gradient(90deg, var(--winamp-title-bg) 0%, #0000c8 45%, var(--winamp-title-bg) 100%);
    height: 14px;
    display: flex;
    align-items: center;
    padding: 0 2px;
    gap: 2px;
    cursor: pointer;
  }

  .title-bar-logo { font-size: 7px; color: #88aaff; flex-shrink: 0; }

  .title-bar-text {
    color: #fff; font-size: 8px; font-weight: bold; letter-spacing: 1px;
    text-transform: uppercase; flex: 1; overflow: hidden; white-space: nowrap;
  }

  /* Mini track info shown in shade mode */
  .title-bar-mini {
    display: none; color: var(--winamp-green); font-size: 7px;
    letter-spacing: 0.5px; flex: 1; overflow: hidden; white-space: nowrap;
    text-overflow: ellipsis; text-shadow: 0 0 4px rgba(0,255,65,0.5);
  }
  .winamp-window.shaded .title-bar-text { display: none; }
  .winamp-window.shaded .title-bar-mini { display: block; }

  .title-bar-buttons { display: flex; gap: 1px; flex-shrink: 0; }

  .title-btn {
    width: 9px; height: 9px; background: var(--winamp-btn-face);
    border: 1px solid; border-color: var(--winamp-btn-highlight) var(--winamp-btn-dark) var(--winamp-btn-dark) var(--winamp-btn-highlight);
    cursor: pointer; font-size: 5px; display: flex; align-items: center;
    justify-content: center; color: #000; font-weight: bold; line-height: 1;
  }
  .title-btn:active { border-color: var(--winamp-btn-dark) var(--winamp-btn-highlight) var(--winamp-btn-highlight) var(--winamp-btn-dark); }
  .shade-toggle { transition: transform 0.15s ease; }
  .winamp-window.shaded .shade-toggle { transform: scaleY(-1); }

  /* ══ LCD ══ */

  .lcd-area {
    background: var(--winamp-lcd-bg); margin: 3px 3px 0;
    border: 1px solid; border-color: var(--winamp-border-dark) var(--winamp-border-light) var(--winamp-border-light) var(--winamp-border-dark);
    padding: 4px 5px; position: relative; overflow: hidden; height: 54px;
  }

  .lcd-scanlines {
    position: absolute; inset: 0; pointer-events: none; z-index: 2;
    background: repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.14) 1px, rgba(0,0,0,0.14) 2px);
  }

  .lcd-top { display: flex; justify-content: space-between; align-items: flex-start; position: relative; z-index: 1; }

  .lcd-status-badge { font-size: 7px; font-weight: bold; letter-spacing: 1px; padding: 1px 3px; border: 1px solid; flex-shrink: 0; }
  .lcd-status-badge.playing { color: var(--winamp-green); border-color: var(--winamp-green-dim); background: rgba(0,255,65,0.08); animation: badge-pulse 1.5s ease-in-out infinite; }
  .lcd-status-badge.paused  { color: #ffcc00; border-color: #664400; background: rgba(255,204,0,0.05); }
  .lcd-status-badge.idle, .lcd-status-badge.stopped, .lcd-status-badge.off { color: #444; border-color: #2a2a2a; }

  @keyframes badge-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }

  .lcd-bitrate { font-size: 7px; color: var(--winamp-green-dim); letter-spacing: 0.5px; }
  .lcd-bitrate span { color: var(--winamp-green); }

  .lcd-track-info { position: relative; z-index: 1; overflow: hidden; height: 13px; margin-top: 2px; }

  .lcd-track-scroll {
    white-space: nowrap; color: var(--winamp-green); font-size: 11px; font-weight: bold;
    letter-spacing: 0.5px; text-shadow: 0 0 6px rgba(0,255,65,0.45);
    will-change: transform; display: inline-block;
  }
  .lcd-track-scroll.scrolling { animation: marquee-scroll linear infinite; }
  @keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(var(--scroll-distance,-50%)); } }

  .lcd-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 3px; position: relative; z-index: 1; }

  .lcd-time { color: var(--winamp-green); font-size: 17px; font-weight: bold; letter-spacing: 3px; text-shadow: 0 0 8px rgba(0,255,65,0.55); line-height: 1; }
  .lcd-time .colon { animation: colon-blink 1s step-end infinite; display: inline-block; width: 6px; text-align: center; }
  .lcd-time .colon.frozen { animation: none; opacity: 0.25; }
  @keyframes colon-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  /* VU Bars */
  .vu-meters { display: flex; gap: 3px; align-items: flex-end; height: 18px; }
  .vu-bar-group { display: flex; gap: 1px; align-items: flex-end; }
  .vu-bar { width: 3px; background: var(--winamp-lcd-dim); }
  .vu-bar.active { background: var(--winamp-vu-active); box-shadow: 0 0 2px rgba(0,255,65,0.35); }
  .vu-bar.peak   { background: var(--winamp-vu-peak);   box-shadow: 0 0 3px rgba(255,68,0,0.5); }

  /* ══ PROGRESS ══ */

  .progress-area { margin: 3px 3px 0; display: flex; align-items: center; gap: 3px; }
  .progress-label { font-size: 7px; color: #666; width: 22px; text-align: right; flex-shrink: 0; }
  .progress-track {
    flex: 1; height: 8px; background: var(--winamp-darker); cursor: pointer;
    border: 1px solid; border-color: var(--winamp-border-dark) var(--winamp-border-light) var(--winamp-border-light) var(--winamp-border-dark);
    position: relative;
  }
  .progress-track:hover .progress-thumb { opacity: 1; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, #005500, var(--winamp-green)); position: relative; max-width: 100%; transition: width 0.9s linear; }
  .progress-thumb { position: absolute; right: -3px; top: -2px; width: 6px; height: 10px; background: var(--winamp-silver); border: 1px solid; border-color: var(--winamp-btn-highlight) var(--winamp-btn-dark) var(--winamp-btn-dark) var(--winamp-btn-highlight); z-index: 1; opacity: 0.65; transition: opacity 0.1s; }
  .progress-time { font-size: 7px; color: #555; width: 26px; flex-shrink: 0; text-align: right; }

  /* ══ SLIDERS ══ */

  .sliders-area { margin: 3px 3px 0; display: flex; gap: 4px; }
  .slider-group { flex: 1; display: flex; align-items: center; gap: 2px; }
  .slider-label { font-size: 7px; color: #666; width: 22px; flex-shrink: 0; text-transform: uppercase; letter-spacing: 0.5px; }
  .slider-track { flex: 1; height: 8px; background: var(--winamp-darker); cursor: pointer; border: 1px solid; border-color: var(--winamp-border-dark) var(--winamp-border-light) var(--winamp-border-light) var(--winamp-border-dark); position: relative; overflow: visible; }
  .slider-fill  { height: 100%; background: linear-gradient(90deg, #004400, var(--winamp-green)); pointer-events: none; }
  .slider-thumb { position: absolute; top: -2px; width: 6px; height: 10px; background: var(--winamp-silver); border: 1px solid; border-color: var(--winamp-btn-highlight) var(--winamp-btn-dark) var(--winamp-btn-dark) var(--winamp-btn-highlight); transform: translateX(-50%); z-index: 2; }

  /* ══ ARTWORK ══ */

  .artwork-area { margin: 3px 3px 0; height: 52px; border: 1px solid; border-color: var(--winamp-border-dark) var(--winamp-border-light) var(--winamp-border-light) var(--winamp-border-dark); overflow: hidden; position: relative; background: #000; }
  .artwork-placeholder { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #1c1c1c; font-size: 26px; background: repeating-linear-gradient(-45deg,#0d0d0d 0px,#0d0d0d 4px,#111 4px,#111 8px); }
  .artwork-placeholder.hidden { display: none; }
  .artwork-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.82; filter: saturate(0.75) contrast(1.1); display: none; }
  .artwork-img.loaded { display: block; }
  .artwork-overlay { position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.09) 2px, rgba(0,0,0,0.09) 4px); }

  /* ══ TRANSPORT ══ */

  .controls-area { margin: 4px 3px 2px; display: flex; gap: 2px; align-items: center; }
  .ctrl-btn {
    background: var(--winamp-btn-face); border: 1px solid;
    border-color: var(--winamp-btn-highlight) var(--winamp-btn-shadow) var(--winamp-btn-shadow) var(--winamp-btn-highlight);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    color: #000; padding: 0; outline: none; flex-shrink: 0;
  }
  .ctrl-btn:hover  { filter: brightness(1.08); }
  .ctrl-btn:active { border-color: var(--winamp-btn-shadow) var(--winamp-btn-highlight) var(--winamp-btn-highlight) var(--winamp-btn-shadow); background: #aaa; }
  .ctrl-btn svg { pointer-events: none; }
  .btn-prev, .btn-play, .btn-pause, .btn-stop, .btn-next { width: 23px; height: 18px; }
  .btn-eject { width: 22px; height: 16px; color: #333; font-size: 9px; margin-left: auto; }

  /* ══ TOGGLES ══ */

  .toggles-area { margin: 0 3px 3px; display: flex; gap: 3px; align-items: center; }
  .toggle-btn {
    background: var(--winamp-darker); border: 1px solid;
    border-color: var(--winamp-border-dark) var(--winamp-border-light) var(--winamp-border-light) var(--winamp-border-dark);
    color: #444; font-size: 7px; font-weight: bold; letter-spacing: 0.5px;
    text-transform: uppercase; padding: 1px 4px; cursor: pointer;
    font-family: 'Courier New', monospace; outline: none;
    transition: color 0.1s, background 0.1s, border-color 0.1s;
  }
  .toggle-btn.on { color: var(--winamp-green); background: #001800; border-color: var(--winamp-green-dim) var(--winamp-border-dark) var(--winamp-border-dark) var(--winamp-green-dim); text-shadow: 0 0 4px rgba(0,255,65,0.4); }
  .toggles-spacer { flex: 1; }
  .vol-readout { font-size: 7px; color: var(--winamp-green-dim); letter-spacing: 0.5px; white-space: nowrap; }
  .vol-readout span { color: var(--winamp-green); }

  /* ══ BOTTOM STRIP ══ */

  .bottom-strip { background: var(--winamp-darker); margin: 0 3px 3px; border: 1px solid; border-color: var(--winamp-border-dark) var(--winamp-border-light) var(--winamp-border-light) var(--winamp-border-dark); padding: 2px 4px; display: flex; align-items: center; gap: 4px; min-height: 14px; overflow: hidden; }
  .bottom-artist { font-size: 7px; color: #4a7a4a; letter-spacing: 0.3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
  .bottom-artist em { color: var(--winamp-green); font-style: normal; }
  .divider { width: 1px; background: #2a2a2a; align-self: stretch; margin: 1px 0; flex-shrink: 0; }
  .bottom-source { font-size: 7px; color: #3a5a3a; letter-spacing: 0.5px; text-transform: uppercase; white-space: nowrap; flex-shrink: 0; }
`;

// ── SVG Icons ─────────────────────────────────────────────────────────────────

const svgPrev  = () => `<svg width="14" height="10" viewBox="0 0 14 10"><polygon points="6,5 0,0 0,10" fill="#333"/><rect x="0" y="0" width="2" height="10" fill="#333"/><polygon points="14,5 7,0 7,10" fill="#333"/><rect x="6" y="0" width="2" height="10" fill="#333"/></svg>`;
const svgNext  = () => `<svg width="14" height="10" viewBox="0 0 14 10"><polygon points="0,0 7,5 0,10" fill="#333"/><rect x="6" y="0" width="2" height="10" fill="#333"/><polygon points="7,0 14,5 7,10" fill="#333"/><rect x="12" y="0" width="2" height="10" fill="#333"/></svg>`;
const svgPlay  = () => `<svg width="10" height="12" viewBox="0 0 10 12"><polygon points="0,0 10,6 0,12" fill="#333"/></svg>`;
const svgPause = () => `<svg width="10" height="12" viewBox="0 0 10 12"><rect x="0" y="0" width="3" height="12" fill="#333"/><rect x="5" y="0" width="3" height="12" fill="#333"/></svg>`;
const svgStop  = () => `<svg width="10" height="10" viewBox="0 0 10 10"><rect x="0" y="0" width="10" height="10" fill="#333"/></svg>`;

// ── Utilities ─────────────────────────────────────────────────────────────────

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function formatTime(secs) {
  if (!secs || isNaN(secs) || secs < 0) return "0:00";
  return `${Math.floor(secs / 60)}:${(Math.floor(secs % 60)).toString().padStart(2, "0")}`;
}

function livePos(attrs, isPlaying) {
  const pos = attrs.media_position || 0;
  const dur = attrs.media_duration || 0;
  if (!isPlaying || !attrs.media_position_updated_at) return pos;
  const elapsed = (Date.now() - new Date(attrs.media_position_updated_at).getTime()) / 1000;
  return Math.min(pos + elapsed, dur || Infinity);
}

// ── VU Meter Simulator ────────────────────────────────────────────────────────

class VUMeter {
  constructor(bars = 5) {
    this.bars   = bars;
    this.levels = Array(bars).fill(0);
    this.peaks  = Array(bars).fill(0);
    this._hold  = Array(bars).fill(0);
    this._raf   = null;
    this._on    = false;
    this.onChange = null;
  }

  setPlaying(on) {
    this._on = on;
    if (on && !this._raf) this._tick();
  }

  _tick() {
    if (!this._on) {
      this.levels = this.levels.map(l => Math.max(0, l - 0.07));
      this.peaks  = this.peaks.map((p, i) => {
        if (this.levels[i] < p && --this._hold[i] <= 0) return Math.max(0, p - 0.025);
        return p;
      });
      this.onChange?.();
      this._raf = this.levels.some(l => l > 0.01)
        ? requestAnimationFrame(() => this._tick())
        : null;
      return;
    }
    const t = Date.now();
    for (let i = 0; i < this.bars; i++) {
      const wave  = 0.5 + 0.5 * Math.sin(t / (160 + i * 45));
      const spike = Math.random() < 0.08 ? Math.random() * 0.35 : 0;
      const e     = clamp(Math.random() * wave + spike, 0, 1) * (i < 2 ? 1.08 : 0.92);
      this.levels[i] += (e - this.levels[i]) * 0.3;
      if (this.levels[i] >= this.peaks[i]) { this.peaks[i] = this.levels[i]; this._hold[i] = 22; }
      else if (--this._hold[i] <= 0) this.peaks[i] = Math.max(0, this.peaks[i] - 0.018);
    }
    this.onChange?.();
    this._raf = requestAnimationFrame(() => this._tick());
  }

  destroy() { if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; } }
}

// ── Card HTML Builder ─────────────────────────────────────────────────────────

function buildTemplate(cfg) {
  const showArt  = cfg.show_artwork !== false;
  const showTog  = cfg.show_shuffle_repeat !== false;
  const vuBars   = ch => [0,1,2,3,4].map(b => `<div class="vu-bar" id="vu-${ch}-${b}" style="height:${(b+1)*3}px"></div>`).join("");

  return `
<style>${WINAMP_STYLES}</style>
<div class="winamp-window" id="win">

  <div class="title-bar" id="titlebar" title="Double-click to shade">
    <span class="title-bar-logo">●</span>
    <span class="title-bar-text" id="title-main">Winamp</span>
    <span class="title-bar-mini" id="title-mini">NO MEDIA</span>
    <div class="title-bar-buttons">
      <div class="title-btn shade-toggle" id="btn-shade" title="Shade">▲</div>
      <div class="title-btn" id="btn-close" title="Close">×</div>
    </div>
  </div>

  <div class="lcd-area shade-hide">
    <div class="lcd-scanlines"></div>
    <div class="lcd-top">
      <div class="lcd-status-badge idle" id="lcd-status">■ STOP</div>
      <div class="lcd-bitrate" id="lcd-bitrate">--- <span>kbps</span></div>
    </div>
    <div class="lcd-track-info">
      <div class="lcd-track-scroll" id="lcd-track">NO MEDIA LOADED</div>
    </div>
    <div class="lcd-bottom">
      <div class="lcd-time">
        <span id="t-m">0</span><span class="colon" id="lcd-colon">:</span><span id="t-s">00</span>
      </div>
      <div class="vu-meters">
        <div class="vu-bar-group">${vuBars(0)}</div>
        <div class="vu-bar-group">${vuBars(1)}</div>
      </div>
    </div>
  </div>

  <div class="progress-area shade-hide">
    <div class="progress-label" id="prog-elapsed">0:00</div>
    <div class="progress-track" id="progress-track">
      <div class="progress-fill" id="progress-fill" style="width:0%">
        <div class="progress-thumb"></div>
      </div>
    </div>
    <div class="progress-time" id="prog-remain">-0:00</div>
  </div>

  <div class="sliders-area shade-hide">
    <div class="slider-group">
      <div class="slider-label">VOL</div>
      <div class="slider-track" id="vol-track">
        <div class="slider-fill" id="vol-fill" style="width:100%"></div>
        <div class="slider-thumb" id="vol-thumb" style="left:100%"></div>
      </div>
    </div>
    <div class="slider-group">
      <div class="slider-label">BAL</div>
      <div class="slider-track">
        <div class="slider-fill" style="width:0%;margin-left:50%"></div>
        <div class="slider-thumb" style="left:50%"></div>
      </div>
    </div>
  </div>

  ${showArt ? `
  <div class="artwork-area shade-hide">
    <div class="artwork-placeholder" id="art-ph">♪</div>
    <img class="artwork-img" id="art-img" alt=""/>
    <div class="artwork-overlay"></div>
  </div>` : ""}

  <div class="controls-area">
    <button class="ctrl-btn btn-prev"  id="btn-prev"  title="Previous">${svgPrev()}</button>
    <button class="ctrl-btn btn-play"  id="btn-play"  title="Play">${svgPlay()}</button>
    <button class="ctrl-btn btn-pause" id="btn-pause" title="Pause">${svgPause()}</button>
    <button class="ctrl-btn btn-stop"  id="btn-stop"  title="Stop">${svgStop()}</button>
    <button class="ctrl-btn btn-next"  id="btn-next"  title="Next">${svgNext()}</button>
    <button class="ctrl-btn btn-eject" id="btn-eject" title="Open Music Assistant">▲</button>
  </div>

  ${showTog ? `
  <div class="toggles-area">
    <button class="toggle-btn" id="btn-shuffle" title="Shuffle">SHF</button>
    <button class="toggle-btn" id="btn-repeat"  title="Repeat">REP</button>
    <div class="toggles-spacer"></div>
    <div class="vol-readout">VOL <span id="vol-pct">100</span>%</div>
  </div>` : ""}

  <div class="bottom-strip">
    <div class="bottom-artist" id="bot-artist"><em>WINAMP</em> — IT REALLY WHIPS THE LLAMA'S ASS</div>
    <div class="divider"></div>
    <div class="bottom-source" id="bot-src">MA</div>
  </div>

</div>`;
}

// ── WinampCard ────────────────────────────────────────────────────────────────

class WinampCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config    = {};
    this._hass      = null;
    this._shaded    = false;
    this._vu        = new VUMeter(5);
    this._vu.onChange = () => this._updateVU();
    this._scrollTid = null;
    this._timerId   = null;
    this._lastTrack = null;
  }

  static getConfigElement() { return document.createElement("winamp-card-editor"); }
  static getStubConfig()    { return { entity: "media_player.music_assistant" }; }

  setConfig(config) {
    if (!config.entity) throw new Error("winamp-card: 'entity' is required");
    this._config = { show_artwork: true, show_shuffle_repeat: true, ma_url: "/_x_music/#/home", ...config };
    this._render();
  }

  set hass(hass) { this._hass = hass; this._update(); }

  connectedCallback()    { if (this._config.entity) this._render(); }
  disconnectedCallback() { this._cleanup(); }

  _cleanup() {
    this._vu.destroy();
    clearTimeout(this._scrollTid);
    clearInterval(this._timerId);
  }

  // ── Full DOM render ──
  _render() {
    this._cleanup();
    this._vu = new VUMeter(5);
    this._vu.onChange = () => this._updateVU();
    this.shadowRoot.innerHTML = buildTemplate(this._config);
    this._bind();
    if (this._hass) this._update();
  }

  // ── Event binding ──
  _bind() {
    const $ = id => this.shadowRoot.getElementById(id);

    // Shade: double-click title bar OR single-click shade button
    $("titlebar")?.addEventListener("dblclick", () => this._toggleShade());
    $("btn-shade")?.addEventListener("click", e => { e.stopPropagation(); this._toggleShade(); });

    // Transport
    const svcMap = { "btn-prev": "media_previous_track", "btn-play": "media_play", "btn-pause": "media_pause", "btn-stop": "media_stop", "btn-next": "media_next_track" };
    Object.entries(svcMap).forEach(([id, svc]) => $( id)?.addEventListener("click", () => this._svc(svc)));

    $("btn-eject")?.addEventListener("click",   () => window.open(this._config.ma_url, "_blank"));
    $("btn-shuffle")?.addEventListener("click", () => this._toggleShuffle());
    $("btn-repeat")?.addEventListener("click",  () => this._cycleRepeat());

    // Progress seek
    $("progress-track")?.addEventListener("click", e => {
      const st = this._state(); if (!st) return;
      const dur = st.attributes.media_duration; if (!dur) return;
      const r   = e.currentTarget.getBoundingClientRect();
      this._hass.callService("media_player", "media_seek", {
        entity_id:     this._config.entity,
        seek_position: clamp((e.clientX - r.left) / r.width, 0, 1) * dur,
      });
    });

    // Volume
    $("vol-track")?.addEventListener("click", e => {
      const r = e.currentTarget.getBoundingClientRect();
      this._hass?.callService("media_player", "volume_set", {
        entity_id:    this._config.entity,
        volume_level: clamp((e.clientX - r.left) / r.width, 0, 1),
      });
    });
  }

  // ── Shade toggle ──
  _toggleShade() {
    this._shaded = !this._shaded;
    this.shadowRoot.getElementById("win")?.classList.toggle("shaded", this._shaded);
  }

  // ── Main update ──
  _update() {
    if (!this._hass || !this._config.entity) return;
    const st = this._state();
    if (!st) { this._renderUnavailable(); return; }

    const s         = st.state;
    const a         = st.attributes;
    const isPlaying = s === "playing";
    const isPaused  = s === "paused";
    const isActive  = isPlaying || isPaused;
    const pos       = livePos(a, isPlaying);
    const dur       = a.media_duration  || 0;
    const vol       = a.volume_level    !== undefined ? a.volume_level : 1;
    const title     = a.media_title      || "";
    const artist    = a.media_artist     || "";
    const album     = a.media_album_name || "";
    const source    = a.app_name || a.source || "";
    const friendly  = a.friendly_name   || "Winamp";

    this._vu.setPlaying(isPlaying);

    // Title bar — show friendly_name
    this._set("title-main", el => { el.textContent = friendly; });

    // Status badge
    this._set("lcd-status", el => {
      el.className  = `lcd-status-badge ${s}`;
      el.textContent = isPlaying ? "▶ PLAY" : isPaused ? "❙❙ PAUS" : "■ STOP";
    });

    // Colon
    this._set("lcd-colon", el => el.classList.toggle("frozen", !isPlaying));

    // Bitrate
    this._set("lcd-bitrate", el => { el.innerHTML = `${isActive ? "320" : "---"} <span>kbps</span>`; });

    // Track scroll — always update when active, not just on change
    const trackText = isActive && title
      ? `${artist ? artist + " — " : ""}${title}${album ? "  [" + album + "]" : ""}`
      : "NO MEDIA LOADED";
    if (trackText !== this._lastTrack) {
      this._lastTrack = trackText;
      this._setScrollText(trackText);
    } else if (isActive && title && this._lastTrack === trackText) {
      // Re-trigger scroll if element lost its animation (e.g. after first render)
      const el = this.shadowRoot.getElementById("lcd-track");
      if (el && !el.classList.contains("scrolling") && el.textContent.includes(title)) {
        this._setScrollText(trackText);
      }
    }

    // Mini title (shade mode)
    this._set("title-mini", el => {
      el.textContent = isActive && title ? `${artist ? artist + " · " : ""}${title}` : friendly;
    });

    // Time + progress
    this._renderTimeAndProgress(pos, dur);

    // Volume sliders
    const vp = Math.round(vol * 100);
    this._set("vol-fill",  el => el.style.width = vp + "%");
    this._set("vol-thumb", el => el.style.left  = vp + "%");
    this._set("vol-pct",   el => el.textContent  = vp);

    // Artwork — prefer local proxy, fall back to remote URL
    const artUrl = a.entity_picture_local || a.entity_picture;
    const artImg = this.shadowRoot.getElementById("art-img");
    const artPh  = this.shadowRoot.getElementById("art-ph");
    if (artImg && artPh) {
      if (artUrl && isActive) {
        if (artImg.getAttribute("src") !== artUrl) {
          artImg.onload = () => artImg.classList.add("loaded");
          artImg.setAttribute("src", artUrl);
        }
        artPh.classList.add("hidden");
      } else {
        artImg.classList.remove("loaded");
        artPh.classList.remove("hidden");
      }
    }

    // Bottom strip
    this._set("bot-artist", el => {
      el.innerHTML = isActive && artist
        ? `<em>${artist.toUpperCase()}</em>${album ? " — " + album.toUpperCase() : ""}`
        : `<em>WINAMP</em> — IT REALLY WHIPS THE LLAMA'S ASS`;
    });
    this._set("bot-src", el => { el.textContent = (source || "MA").toUpperCase().slice(0, 10); });

    // Shuffle / Repeat
    this._set("btn-shuffle", el => el.classList.toggle("on", !!a.shuffle));
    this._set("btn-repeat",  el => el.classList.toggle("on", a.repeat === "all" || a.repeat === "one"));

    // Ticker
    if (isPlaying && !this._timerId) {
      this._timerId = setInterval(() => this._tick(), 1000);
    } else if (!isPlaying) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  }

  _tick() {
    const st = this._state();
    if (!st || st.state !== "playing") return;
    const pos = livePos(st.attributes, true);
    const dur = st.attributes.media_duration || 0;
    this._renderTimeAndProgress(pos, dur);
  }

  _renderTimeAndProgress(pos, dur) {
    this._set("t-m", el => el.textContent = Math.floor(pos / 60));
    this._set("t-s", el => el.textContent = (Math.floor(pos % 60)).toString().padStart(2, "0"));
    const pct = dur > 0 ? clamp((pos / dur) * 100, 0, 100) : 0;
    this._set("progress-fill",  el => el.style.width = pct + "%");
    this._set("prog-elapsed",   el => el.textContent = formatTime(pos));
    this._set("prog-remain",    el => el.textContent = dur > 0 ? "-" + formatTime(dur - pos) : "-0:00");
  }

  _setScrollText(text) {
    const el = this.shadowRoot.getElementById("lcd-track");
    if (!el) return;
    const padded = text + "   ✦   ";
    el.textContent = padded + padded;
    el.classList.remove("scrolling");
    el.style.animationDuration = "";
    clearTimeout(this._scrollTid);
    this._scrollTid = setTimeout(() => {
      const half = el.scrollWidth / 2;
      if (half > 250) {
        el.style.setProperty("--scroll-distance", `-${half}px`);
        el.style.animationDuration = (half / 30).toFixed(1) + "s";
        el.classList.add("scrolling");
      }
    }, 900);
  }

  _updateVU() {
    const { levels, peaks } = this._vu;
    const HEIGHTS = [3, 6, 9, 12, 16];
    for (let ch = 0; ch < 2; ch++) {
      for (let b = 0; b < 5; b++) {
        const el = this.shadowRoot.getElementById(`vu-${ch}-${b}`);
        if (!el) continue;
        const idx    = Math.floor(b * this._vu.bars / 5);
        const level  = clamp(levels[idx] + (ch === 1 ? (Math.random() - 0.5) * 0.07 : 0), 0, 1);
        el.style.height = HEIGHTS[b] + "px";
        el.classList.toggle("active", level > b / 5);
        el.classList.toggle("peak",   peaks[idx] > 0.88 && b === 4);
      }
    }
  }

  _renderUnavailable() {
    this._set("lcd-track",  el => el.textContent = "ENTITY NOT FOUND");
    this._set("lcd-status", el => { el.className = "lcd-status-badge off"; el.textContent = "N/A"; });
  }

  _state()  { return this._hass?.states?.[this._config.entity]; }
  _set(id, fn) { const el = this.shadowRoot.getElementById(id); if (el) fn(el); }
  _svc(service) { this._hass?.callService("media_player", service, { entity_id: this._config.entity }); }

  _toggleShuffle() {
    const st = this._state(); if (!st) return;
    this._hass.callService("media_player", "shuffle_set", { entity_id: this._config.entity, shuffle: !st.attributes.shuffle });
  }

  _cycleRepeat() {
    const st = this._state(); if (!st) return;
    const cur  = st.attributes.repeat || "off";
    const next = cur === "off" ? "all" : cur === "all" ? "one" : "off";
    this._hass.callService("media_player", "repeat_set", { entity_id: this._config.entity, repeat: next });
  }

  getCardSize() { return this._shaded ? 2 : 5; }
}

// ── Visual Config Editor ──────────────────────────────────────────────────────

const EDITOR_STYLES = `
  :host { display: block; }
  .ed-wrap { padding: 0; display: grid; gap: 0; }

  .ed-section {
    padding: 8px 0 4px;
    border-top: 1px solid var(--divider-color, #e0e0e0);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }
  .ed-section:first-child { border-top: none; padding-top: 0; }

  .ed-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid var(--divider-color, #eee);
    gap: 12px;
  }
  .ed-row:last-child { border-bottom: none; }

  .ed-label { flex: 1; min-width: 0; }
  .ed-label-main { font-size: 13px; color: var(--primary-text-color); }
  .ed-label-sub  { font-size: 11px; color: var(--secondary-text-color); margin-top: 1px; }

  ha-entity-picker, ha-textfield { width: 100%; margin: 4px 0; display: block; }
  ha-switch { flex-shrink: 0; }
`;

class WinampCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config  = {};
    this._hass    = null;
    this._ready   = false;
  }

  setConfig(config) {
    this._config = { show_artwork: true, show_shuffle_repeat: true, ma_url: "/_x_music/#/home", ...config };
    if (this._ready) this._sync();
  }

  set hass(hass) {
    this._hass = hass;
    const ep = this.shadowRoot.querySelector("#ed-entity");
    if (ep) ep.hass = hass;
  }

  connectedCallback() {
    this._ready = true;
    this.shadowRoot.innerHTML = `
      <style>${EDITOR_STYLES}</style>
      <div class="ed-wrap">

        <div class="ed-section">Player</div>
        <ha-entity-picker
          id="ed-entity"
          label="Media Player Entity"
          include-domains='["media_player"]'
          allow-custom-entity
        ></ha-entity-picker>

        <div class="ed-section">Music Assistant</div>
        <ha-textfield
          id="ed-ma-url"
          label="MA URL (eject button)"
          helper="URL opened when ⏏ is clicked"
        ></ha-textfield>

        <div class="ed-section">Display</div>

        <div class="ed-row">
          <div class="ed-label">
            <div class="ed-label-main">Album Artwork</div>
            <div class="ed-label-sub">52px artwork strip with CRT overlay</div>
          </div>
          <ha-switch id="ed-artwork"></ha-switch>
        </div>

        <div class="ed-row">
          <div class="ed-label">
            <div class="ed-label-main">Shuffle &amp; Repeat</div>
            <div class="ed-label-sub">SHF / REP toggles and volume readout</div>
          </div>
          <ha-switch id="ed-toggles"></ha-switch>
        </div>

      </div>`;

    if (this._hass) {
      const ep = this.shadowRoot.querySelector("#ed-entity");
      if (ep) ep.hass = this._hass;
    }

    this._sync();
    this._bindEditorEvents();
  }

  _sync() {
    const cfg = this._config;
    const $ = s => this.shadowRoot.querySelector(s);
    const ep = $("#ed-entity");    if (ep && cfg.entity) ep.value = cfg.entity;
    const mu = $("#ed-ma-url");    if (mu) mu.value   = cfg.ma_url || "/_x_music/#/home";
    const aw = $("#ed-artwork");   if (aw) aw.checked = cfg.show_artwork !== false;
    const tg = $("#ed-toggles");   if (tg) tg.checked = cfg.show_shuffle_repeat !== false;
  }

  _bindEditorEvents() {
    const emit = () => {
      const $ = s => this.shadowRoot.querySelector(s);
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: { config: {
          entity:               $("#ed-entity")?.value   || this._config.entity || "",
          ma_url:               $("#ed-ma-url")?.value   || "/_x_music/#/home",
          show_artwork:         $("#ed-artwork")?.checked  ?? true,
          show_shuffle_repeat:  $("#ed-toggles")?.checked ?? true,
        }},
        bubbles: true, composed: true,
      }));
    };

    ["#ed-entity", "#ed-ma-url", "#ed-artwork", "#ed-toggles"].forEach(sel => {
      const el = this.shadowRoot.querySelector(sel);
      el?.addEventListener("value-changed", emit);
      el?.addEventListener("change", emit);
    });
  }
}

// ── Register ──────────────────────────────────────────────────────────────────

customElements.define("winamp-card",        WinampCard);
customElements.define("winamp-card-editor", WinampCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type:             "winamp-card",
  name:             "Winamp Card",
  description:      "A Winamp-inspired media player for Music Assistant. It really whips the llama's ass.",
  preview:          true,
  documentationURL: "https://github.com/YOUR_USERNAME/lovelace-winamp-card",
});

console.info(
  `%c WINAMP-CARD %c v${WINAMP_VERSION} `,
  "background:#000080;color:#fff;font-weight:700;padding:2px 6px;font-family:'Courier New',monospace",
  "background:#00ff41;color:#000;font-weight:700;padding:2px 6px;font-family:'Courier New',monospace"
);
