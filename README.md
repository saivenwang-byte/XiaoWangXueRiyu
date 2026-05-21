# 标日课后巩固（小王日语学习）

第 14 / 16 / 18 课 H5 巩固练习。**正式上线**：微信发 **公网 https 链接**（任何网络可用，不依赖同一 WiFi）。

## 正式链接（发给学员 · 已自动发布）

- **学习**：https://saivenwang-byte.github.io/XiaoWangXueRiyu/index.html?v=29  
- **分享页**：https://saivenwang-byte.github.io/XiaoWangXueRiyu/share.html  

双击 **`帮你发布好了.bat`** 可自动复制链接并打开网页。

## 作者更新内容后

改完代码并 `git push` 后，等约 1～2 分钟 GitHub 自动更新；再双击 **`帮你发布好了.bat`** 验收。

详细流程：[docs/发布与知识库同步.md](./docs/发布与知识库同步.md)

## 本地调试（不发给学员）

```bash
python -m http.server 8765
```

浏览器：http://localhost:8765/index.html?v=28（不要用 `file://`）

## 语音包

见 [docs/TTS-语音包说明.md](./docs/TTS-语音包说明.md)。发布前：`python scripts/verify-tts-cache.py`

## 版本

- 当前：[VERSION.md](./VERSION.md)（build 28 · Netlify）  
- 历史冻结：[VERSION-WECHAT-v1.md](./VERSION-WECHAT-v1.md)  
- AI/协作规则：`.cursor/rules/production-netlify.mdc`
