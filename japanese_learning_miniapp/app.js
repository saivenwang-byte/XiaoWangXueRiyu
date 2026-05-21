App({
  onLaunch: function() {
    // 初始化用户数据
    this.initUserData();
    
    // 显示欢迎弹窗
    wx.showModal({
      title: '欢迎使用',
      content: '《标准日本语》第14、16、18课口语强化版',
      showCancel: false
    });
  },
  
  initUserData: function() {
    // 检查是否有用户数据，如果没有则初始化
    const userData = wx.getStorageSync('userData');
    if (!userData) {
      const initialData = {
        lessons: {
          lesson14: {
            completed: false,
            progress: 0,
            practiceCount: 0,
            lastPracticeTime: null
          },
          lesson16: {
            completed: false,
            progress: 0,
            practiceCount: 0,
            lastPracticeTime: null
          },
          lesson18: {
            completed: false,
            progress: 0,
            practiceCount: 0,
            lastPracticeTime: null
          }
        },
        learningStats: {
          totalLearningTime: 0,
          consecutiveDays: 0,
          lastCheckInDate: null
        },
        wrongQuestions: []
      };
      wx.setStorageSync('userData', initialData);
    }
  },
  
  globalData: {
    currentLesson: null,
    isAudioPlaying: false
  }
});