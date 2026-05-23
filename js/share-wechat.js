/** 微信链接分享 · 公网 HTTPS（GitHub Pages）；人传人转发 */
const ShareWechat = (() => {
  const CACHE_VER = "94";

  const OFFICIAL_ORIGIN = "https://saivenwang-byte.github.io/XiaoWangXueRiyu";

  function configuredOrigin() {
    const o = (window.HYOUGA_PUBLIC_ORIGIN || "").trim().replace(/\/$/, "");
    return o && /^https:\/\//i.test(o) ? o : "";
  }

  function pathBase() {
    if (configuredOrigin()) return configuredOrigin();
    const path = location.pathname.replace(/[^/]*$/, "");
    return (location.origin + path).replace(/\/$/, "");
  }

  function publicLearnUrl() {
    const base = configuredOrigin() || (isPublicHttps() ? pathBase() : "");
    if (!base) return "";
    return `${base.replace(/\/$/, "")}/index.html?v=${CACHE_VER}`;
  }

  function learnUrl() {
    const pub = publicLearnUrl();
    if (pub) return pub;
    return `${pathBase()}/index.html?v=${CACHE_VER}`;
  }

  function sharePageUrl() {
    const base = configuredOrigin() || pathBase();
    return `${base.replace(/\/$/, "")}/share.html`;
  }

  function isWeChat() {
    return /MicroMessenger/i.test(navigator.userAgent || "");
  }

  function isPublicHttps() {
    return (
      location.protocol === "https:" &&
      location.hostname !== "localhost" &&
      location.hostname !== "127.0.0.1" &&
      !/^192\.168\.|^10\.|^172\.(1[6-9]|2\d|3[01])\./.test(location.hostname)
    );
  }

  function isWrongShareUrl(url) {
    return (
      /github\.com\/[^/]+\/[^/]+\/?$/i.test(url) ||
      /github\.com\/[^/]+\/[^/]+#/.test(url)
    );
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  function showDeployGuide() {
    alert(
      "当前是本地地址，微信里打不开。\n\n" +
        "正式链接（复制发微信）：\n" +
        OFFICIAL_ORIGIN +
        "/index.html?v=" +
        CACHE_VER +
        "\n\n" +
        "改完内容后：双击「帮你发布好了.bat」或 push GitHub，等 1～2 分钟再发链接。\n" +
        "详见：微信分享说明.txt"
    );
  }

  function wechatExtraTip() {
    if (!isWeChat()) return "";
    return "\n\n跟读要录音：微信右上角「···」→ 在浏览器中打开。";
  }

  async function shareToWechat() {
    const url = learnUrl();
    if (location.protocol === "file:") {
      alert("不能分享本地文件。请用公网链接：\n" + OFFICIAL_ORIGIN + "/index.html?v=" + CACHE_VER);
      return;
    }
    if (!isPublicHttps() && !configuredOrigin()) {
      showDeployGuide();
      if (confirm("是否打开 share.html 复制链接？")) location.href = "share.html";
      return;
    }

    if (isWrongShareUrl(url)) {
      alert("请分享以 index.html 结尾的学习页，不要分享 GitHub 仓库首页。");
      return;
    }

    const title = "标日 あと学習 · 学习の道";
    const text =
      "标日初级上·24课四关（单词·会話·文法·测试）。点开链接就能学，可转发给同学。\n" + url;

    if (navigator.share && !isWeChat()) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (e) {
        if (e?.name === "AbortError") return;
      }
    }

    const ok = await copyText(url);
    if (ok) {
      alert(
        "链接已复制！\n\n" +
          url +
          "\n\n微信：粘贴到聊天 → 发送 → 对方点开即可学，也可再转发。" +
          wechatExtraTip()
      );
    } else {
      prompt("请手动复制下面链接：", url);
    }
  }

  function mountButton(btn) {
    if (!btn) return;
    btn.addEventListener("click", shareToWechat);
    if (configuredOrigin() || isPublicHttps()) {
      btn.title = "复制公网链接，发到微信（人传人转发）";
    } else {
      btn.title = "需公网链接；见 帮你发布好了.bat";
    }
  }

  function mountWechatBanner(container) {
    if (!container || !isWeChat()) return;
    if (document.getElementById("wechat-link-banner")) return;
    const el = document.createElement("div");
    el.id = "wechat-link-banner";
    el.className = "wechat-github-banner";
    el.innerHTML =
      "<p><strong>链接学习</strong>：可转发给好友继续点开。</p>" +
      "<p>跟读录不上音：右上角 <strong>···</strong> → <strong>在浏览器中打开</strong>。</p>";
    container.prepend(el);
  }

  return {
    learnUrl,
    publicLearnUrl,
    sharePageUrl,
    pathBase,
    configuredOrigin,
    isPublicHttps,
    isWeChat,
    shareToWechat,
    mountButton,
    mountWechatBanner,
    CACHE_VER,
    OFFICIAL_ORIGIN,
  };
})();
