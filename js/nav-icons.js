/** L0 底栏 · INTEPOINT 角色图标（课程=书 · 我的=人 · 注音=あ框） */
const NavIcons = (function () {
  const icons = {
    course:
      '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path fill="none" stroke="currentColor" stroke-width="2" d="M15 4v4h4"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M8 11h8M8 14h6"/></svg>',
    kana:
      '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><text x="12" y="16" text-anchor="middle" fill="currentColor" font-size="11" font-weight="700" font-family="sans-serif">あ</text></svg>',
    me:
      '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 19c0-3.5 2.7-5.5 6-5.5s6 2 6 5.5"/></svg>',
    home:
      '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>',
    share:
      '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 4v11M8.5 8.5 12 5l3.5 3.5M6 19h12"/></svg>',
    qrcode:
      '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="4" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M13 13h2v2h-2zm4 0h2v2h-2zm0 4h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2z"/></svg>',
  };

  /** @deprecated 用 course */
  icons.route = icons.course;

  function html(name) {
    return icons[name] || "";
  }

  return { html, icons };
})();
