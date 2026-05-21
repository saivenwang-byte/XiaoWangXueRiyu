/** 微信分享：公网链接（优先 Netlify 配置）· 避免错误 GitHub 仓库链接 */
const ShareWechat = (() => {
  const CACHE_VER = "16";

  function configuredOrigin() {
    const o = (window.HYOUGA_PUBLIC_ORIGIN || "").trim().replace(/\/$/, "");
    return o && /^https:\/\//i.test(o) ? o : "";
  }

  function pathBase() {
    if (configuredOrigin()) return configuredOrigin();
    const path = location.pathname.replace(/[^/]*$/, "");
    return (location.origin + path).replace(/\/$/, "");
  }

  function learnUrl() {
    return `${pathBase()}/index.html?v=${CACHE_VER}`;
  }

  function sharePageUrl() {
    return `${pathBase()}/share.html`;
  }

  function isWeChat() {
    return /MicroMessenger/i.test(navigator.userAgent || "");
  }

  function isGithubPages() {
    return /github\.io$/i.test(location.hostname);
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
    const msg =
      "当前是本地地址，微信里打不开。\n\n" +
      "请做一次免费部署（约 5 分钟）：\n" +
      "1. 双击「打开Netlify拖拽部署.bat」\n" +
      "2. 把整个「日语学习」文件夹拖进网页\n" +
      "3. 得到 https://xxx.netlify.app 后\n" +
      "4. 打开 js/public-url.config.js 填上该地址\n" +
      "5. 再拖一次文件夹发布，然后复制新链接发微信\n\n" +
      "详见：微信分享说明.txt";
    alert(msg);
  }

  function wechatGithubTip() {
    if (!isWeChat() || !isGithubPages()) return "";
    if (configuredOrigin()) {
      return "\n\n已配置 Netlify，请复制上方 Netlify 链接发微信（不要用 github.io）。";
    }
    return (
      "\n\n⚠ 国内微信常无法打开 github.io。\n" +
      "请用 Netlify：双击「打开Netlify拖拽部署.bat」→ 拖文件夹 → 把得到的 https 地址写入 public-url.config.js 后重新发布。"
    );
  }

  async function shareToWechat() {
    const url = learnUrl();
    if (location.protocol === "file:") {
      alert("不能分享本地文件路径。请先部署到 https（见 微信分享说明.txt）。");
      return;
    }
    if (!isPublicHttps()) {
      showDeployGuide();
      const go = confirm("是否打开 share.html 查看说明？");
      if (go) location.href = "share.html";
      return;
    }

    if (isWrongShareUrl(url)) {
      alert("请勿分享 GitHub 仓库页链接，请分享以 index.html 结尾的学习页链接。");
      return;
    }

    const title = "标日课后巩固 · 第14/16/18课";
    const text =
      "10分钟课后巩固：语法→会話→测试。点开链接就能学。\n" + url;

    if (navigator.share && !isWeChat()) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (e) {
        if (e?.name === "AbortError") return;
      }
    }

    const ok = await copyText(url);
    const extra = wechatGithubTip();
    if (ok) {
      alert(
        "链接已复制！\n\n" +
          url +
          "\n\n微信：粘贴到聊天 → 发送 → 对方点蓝色链接。" +
          extra
      );
    } else {
      prompt("请手动复制下面链接（必须以 index.html 结尾）：", url);
    }
  }

  function mountButton(btn) {
    if (!btn) return;
    btn.addEventListener("click", shareToWechat);
    if (configuredOrigin()) {
      btn.title = "复制 Netlify 链接（推荐微信分享）";
    } else if (isPublicHttps()) {
      btn.title = isGithubPages()
        ? "复制链接（微信建议改用 Netlify，见说明）"
        : "复制链接，发到微信";
    } else {
      btn.title = "需先部署到 https";
    }
  }

  function mountWechatBanner(container) {
    if (!container || !isWeChat()) return;
    if (!isGithubPages() || configuredOrigin()) return;
    if (document.getElementById("wechat-github-banner")) return;
    const el = document.createElement("div");
    el.id = "wechat-github-banner";
    el.className = "wechat-github-banner";
    el.innerHTML = `
      <p><strong>微信可能无法打开本页</strong>（GitHub 域名在国内常被拦截）</p>
      <p>请让分享者改用 <strong>Netlify</strong> 链接：双击文件夹里的「打开Netlify拖拽部署.bat」→ 拖入本文件夹 → 把得到的 <code>https://xxx.netlify.app</code> 写入 <code>js/public-url.config.js</code> 后重新发布。</p>
      <p class="hint">若你已收到 Netlify 链接，请直接点那个链接，不要点 github.io。</p>
    `;
    container.prepend(el);
  }

  return {
    learnUrl,
    sharePageUrl,
    pathBase,
    configuredOrigin,
    isPublicHttps,
    isWeChat,
    isGithubPages,
    shareToWechat,
    mountButton,
    mountWechatBanner,
  };
})();
