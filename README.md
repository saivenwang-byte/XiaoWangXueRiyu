# 标日课后巩固（小王日语学习）

第 14 / 16 / 18 课 H5 巩固练习，微信点开即用。

## 在线地址

- GitHub Pages（电脑浏览器可用；**国内微信常打不开**）：  
  - 学习：https://saivenwang-byte.github.io/XiaoWangXueRiyu/index.html  
  - 分享：https://saivenwang-byte.github.io/XiaoWangXueRiyu/share.html  

- **微信分享给好友**：请用 **Netlify**（见 `微信分享说明.txt`）→ 把 `https://xxx.netlify.app` 写入 `js/public-url.config.js` 后再发布。  
  **不要**发 `github.com/仓库` 链接，也**不要**发缺少 `XiaoWangXueRiyu` 的 `saivenwang-byte.github.io` 根地址（会 404）。

## 本地打开

用本地服务器打开根目录（不要直接双击 `index.html`，否则语音缓存可能失败）：

```bash
python -m http.server 8766
```

浏览器访问：http://127.0.0.1:8766/index.html

## 语音包

仓库已包含 `tts-cache/`。说明见 **`docs/TTS-语音包说明.md`**。若需重新生成：双击 `生成语音包.bat` 或运行 `python scripts/build-tts-cache.py`；发布前可运行 `python scripts/verify-tts-cache.py` 检查缺文件与异常 MP3。

## 版本

- **当前开发/发行说明**：[VERSION.md](./VERSION.md)（build 26+）
- **历史微信冻结版**：[VERSION-WECHAT-v1.md](./VERSION-WECHAT-v1.md)（build 11，仅作回滚参考）
- **发布与知识库怎么同步**：[docs/发布与知识库同步.md](./docs/发布与知识库同步.md)
