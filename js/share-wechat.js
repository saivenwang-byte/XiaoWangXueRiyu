/** 微信分享：复制 https 链接、系统分享、部署提示 */
const ShareWechat = (() => {
  function learnUrl() {
    const base = location.origin + location.pathname.replace(/[^/]*$/, "");
    return base + "index.html?v=14";
  }

  function sharePageUrl() {
    const base = location.origin + location.pathname.replace(/[^/]*$/, "");
    return base + "share.html";
  }

  function isPublicHttps() {
    return (
      location.protocol === "https:" &&
      location.hostname !== "localhost" &&
      location.hostname !== "127.0.0.1" &&
      !/^192\.168\.|^10\.|^172\.(1[6-9]|2\d|3[01])\./.test(location.hostname)
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
      "当前是本地地址，微信好友打不开。\n\n" +
      "请按下面做一次（约 5 分钟）：\n" +
      "1. 电脑双击「打开Netlify拖拽部署.bat」\n" +
      "2. 把整个「日语学习」文件夹拖进网页\n" +
      "3. 得到 https://xxx.netlify.app 后，打开 share.html 复制链接发微信\n\n" +
      "详细步骤见文件夹里「微信分享说明.txt」";
    alert(msg);
  }

  async function shareToWechat() {
    const url = learnUrl();
    if (!isPublicHttps()) {
      showDeployGuide();
      const go = confirm("是否打开 share.html 查看说明？");
      if (go) location.href = "share.html";
      return;
    }

    const title = "标日课后巩固 · 第14/16/18课";
    const text =
      "10分钟课后巩固：语法网络 + 情景对话 + 快速测试。点开链接就能学，无需安装。\n" + url;

    if (navigator.share) {
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
          "\n\n请打开微信 → 粘贴到聊天（文件传输助手或好友）→ 发送。\n" +
          "对方点开蓝色链接即可使用。\n\n" +
          "第二关要录音：微信里点右上角 … →「在浏览器中打开」。"
      );
    } else {
      prompt("请手动复制下面链接，发到微信：", url);
    }
  }

  function mountButton(btn) {
    if (!btn) return;
    btn.addEventListener("click", shareToWechat);
    if (isPublicHttps()) {
      btn.title = "复制链接，发到微信";
    } else {
      btn.title = "需先部署到 https（点我查看说明）";
    }
  }

  return { learnUrl, sharePageUrl, isPublicHttps, shareToWechat, mountButton };
})();
