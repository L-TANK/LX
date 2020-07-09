// pages/show/show.js
//使用require将公共的配置参数代码导入，并用变量config来保存
var config =  require('../../config/config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000, 
    title:'',
    h:'00',
    m:'00',
    s:'00',
    stop:true,
    button_text:'开始',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this
    let id = options.id;//接受标记点的id
    //通过id获取map表中的标记点信息
    let tableID = config.TABLE_ID.MAP
    //通过tableID实例化一个TableObject
    let Map = new wx.BaaS.TableObject(tableID)
    //指定recordID
    Map.get(id).then(res =>{
      //success
      that.setData({
        title:res.data.title,
      })
    },err =>{
      //err
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
     
    };
  },

  queryTime(){
    const that = this
    var hou = that.data.h
    var min = that .data.m
    var sec = that.data.s   
    setInterval(function(){
    let stop = that.data.stop
    if(!stop)
    {
      sec++
      if(sec >= 60)
      {
        sec=0
        min++
        if(min >= 60)
        {
          min=0
          hou++
          that. setData({
          h: (hou<10?'0' +hou: hou)
          })
        }
        else
        {
          that . setData({
          m:(min<10?'0'+min:min)
          })
        }
      }
      else
      {
        that.setData({
        s: (sec < 10? '0'+sec:sec)
        })
      }
    }
    
  },1000)  
  },

  stop_star:function(event){
    const that = this
    var stop = that.data.stop
    if(stop)
    {
      that.setData({
        stop:false,
        button_text:'暂停'
        })
      this.queryTime()
    }
    else
    {
      that.setData({
        stop:true,
        button_text:'开始'
        })
    }
  }
})
