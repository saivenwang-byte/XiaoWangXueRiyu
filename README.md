# 标日课后巩固（小王日语学习）

第 14 / 16 / 18 课 H5 巩固练习。**正式上线**：微信发 **Netlify https 链接**（任何网络可用，不依赖同一 WiFi）。

## 正式链接（发给学员）

- **学习**：https://qingjing-biaori.netlify.app/index.html?v=28  
- **分享页**：https://qingjing-biaori.netlify.app/share.html  

配置见 `js/public-url.config.js`（`HYOUGA_PUBLIC_ORIGIN`）。

## 作者发布

1. 双击 **`正式发布.bat`**（校验 TTS → Netlify 发布 → 复制正式链接）  
2. 或 **`打开Netlify拖拽部署.bat`** 拖入本文件夹 → 站点名 `qingjing-biaori`  
3. 手机用 **4G** 打开正式链接验收  

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
