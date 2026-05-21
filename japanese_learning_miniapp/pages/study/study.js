const { H5_URL } = require("../../config/h5-url.js");

Page({
  data: {
    url: H5_URL,
  },

  onShareAppMessage() {
    return {
      title: "标日课后巩固 · 第14/16/18课",
      path: "/pages/study/study",
    };
  },

  onShareTimeline() {
    return {
      title: "标日课后巩固 · 第14/16/18课",
    };
  },
});
