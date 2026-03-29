# 🎵 lovelace-winamp-card

> *It really whips the llama's ass.*

A **Winamp-inspired media player card** for Home Assistant, designed for use with [Music Assistant](https://music-assistant.io/).

![winamp-card screenshot](screenshot.png)

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![version](https://img.shields.io/badge/version-1.1.0-blue?style=for-the-badge)](https://github.com/vemaley/lovelace-winamp-card/releases)
[![license](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

---

## Installation

### Via HACS (recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=vemaley&repository=lovelace-winamp-card&category=lovelace)

Click the button above, or follow these steps manually:

1. In HACS → **Frontend** → three-dot menu → **Custom repositories**
2. Add: `https://github.com/vemaley/lovelace-winamp-card`  
   Category: **Lovelace**
3. Install **Winamp Card**
4. Reload your browser

### Manual

1. Download `lovelace-winamp-card.js` from the [latest release](https://github.com/vemaley/lovelace-winamp-card/releases)
2. Copy to `config/www/lovelace-winamp-card.js`
3. Add resource in **Settings → Dashboards → Resources**:
   ```
   URL:  /local/lovelace-winamp-card.js
   Type: JavaScript Module
   ```

---

## Features

- 🟩 **LCD display** with scrolling track title, status badge and live clock
- 📊 **Animated VU meters** (dual channel, peak hold, responds to play/pause)
- ⏯️ **Transport controls** — Prev / Play / Pause / Stop / Next
- 🔊 **Volume & balance sliders** (click to set)
- 🖼️ **Album artwork** strip with CRT scanline effect
- 🔀 **Shuffle & Repeat** toggles
- ⏱️ **Live progress bar** with seek support
- 🪟 **Shade mode** — double-click the title bar to collapse to a mini player
- ⚙️ **Visual config editor** — no YAML needed
- ⏏️ **Eject button** opens Music Assistant UI in a new tab
- Zero dependencies — single JS file, no npm required

---

## Configuration

```yaml
type: custom:winamp-card
entity: media_player.music_assistant_player
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | string | **required** | `media_player` entity (Music Assistant player) |
| `show_artwork` | boolean | `true` | Show album artwork strip |
| `show_shuffle_repeat` | boolean | `true` | Show shuffle/repeat toggles |
| `ma_url` | string | `/_x_music/#/home` | URL opened by the ⏏ eject button |

### Full example

```yaml
type: custom:winamp-card
entity: media_player.music_assistant_living_room
show_artwork: true
show_shuffle_repeat: true
ma_url: "/_x_music/#/home"
```

---

## Requirements

- Home Assistant 2023.x or later
- [Music Assistant](https://music-assistant.io/) with at least one player configured as a `media_player` entity

---

## Acknowledgements

Inspired by the legendary [Winamp](https://winamp.com/) media player (Nullsoft, 1997–).  
Built for the [Music Assistant](https://music-assistant.io/) community.

---

## License

MIT © 2024 [vemaley](https://github.com/vemaley)
