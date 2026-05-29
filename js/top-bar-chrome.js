/**
 * 四栏顶栏 · 标题 + L0 模块图标（与底栏图例一致）
 */
const HyoTopBar = (function () {
  const VIEW_META = {
    home: { title: "標日 あと学習", icon: "course" },
    lesson: { title: "学習中", icon: "course" },
    review: { title: "復習", icon: "course" },
    write: { title: "书写", icon: "write" },
    me: { title: "笔记", icon: "me" },
  };

  function update(view) {
    const meta = VIEW_META[view] || VIEW_META.home;
    const titleEl = document.getElementById("page-title");
    if (titleEl) titleEl.textContent = meta.title;

    const mod = document.getElementById("top-bar-module-icon");
    if (mod && typeof NavIcons !== "undefined") {
      mod.innerHTML = NavIcons.html(meta.icon);
    }

    const bar = document.querySelector("body.mvp-app .top-bar.hyo-top-bar");
    if (bar) bar.dataset.hyoView = view || "home";
  }

  function mount() {
    update("home");
  }

  return { update, mount, VIEW_META };
})();
