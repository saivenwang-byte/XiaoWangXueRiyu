/** ?????? ? ?? HTTPS?GitHub Pages??????????????????*/
const ShareWechat = (() => {
  const CACHE_VER = "93";

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

  /** ??????????????????????????? */
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
      "???????????????\n\n" +
        "????????????\n" +
        OFFICIAL_ORIGIN +
        "/index.html?v=" +
        CACHE_VER +
        "\n\n" +
        "?????????????????bat?? push GitHub?? 1?? ???????\n" +
        "??????????txt"
    );
  }

  function wechatExtraTip() {
    if (!isWeChat()) return "";
    return "\n\n????????????????? ?????????;
  }

  async function shareToWechat() {
    const url = learnUrl();
    if (location.protocol === "file:") {
      alert("????????????????\n" + OFFICIAL_ORIGIN + "/index.html?v=" + CACHE_VER);
      return;
    }
    if (!isPublicHttps() && !configuredOrigin()) {
      showDeployGuide();
      if (confirm("???? share.html ??????)) location.href = "share.html";
      return;
    }

    if (isWrongShareUrl(url)) {
      alert("???? index.html ????????????GitHub ??????);
      return;
    }

    const title = "?????? ? ????";
    const text = "10?????????????????????????????????\n" + url;

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
        "??????\n\n" +
          url +
          "\n\n???????? ?????????????????????? +
          wechatExtraTip()
      );
    } else {
      prompt("??????????", url);
    }
  }

  function mountButton(btn) {
    if (!btn) return;
    btn.addEventListener("click", shareToWechat);
    if (configuredOrigin() || isPublicHttps()) {
      btn.title = "??????????????????";
    } else {
      btn.title = "??????? ??????.bat";
    }
  }

  function mountWechatBanner(container) {
    if (!container || !isWeChat()) return;
    if (document.getElementById("wechat-link-banner")) return;
    const el = document.createElement("div");
    el.id = "wechat-link-banner";
    el.className = "wechat-github-banner";
    el.innerHTML =
      "<p><strong>????</strong>?????????????/p>" +
      "<p>?????????? <strong>???</strong> ??<strong>???????</strong>??/p>";
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
