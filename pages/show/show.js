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
    text:'文明行车',
    isChange:false,
    change:[],
    star:[],
    end:[],
    star_flag:0,
    end_flag:0,
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
      console.log(res.data)
      that.setData({
        title:res.data.title,
        change:res.data.change,
        star:res.data.star,
        end:res.data.end,
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
    var change = that.data.change  
    var star = that.data.star
    var end = that.data.end
    setInterval(function(){
    let stop = that.data.stop
    let star_flag = that.data.star_flag
    let end_flag = that.data.end_flag
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

      //上为计时器，下为处理逻辑
      let time = 10000 * hou + 100 * min + sec //时间转换
      let ready_time = 10000 * hou + 100 * (sec > 50? min + 1:min) + (sec > 50? sec - 50:sec + 10) //时间-10s
      
      //转换预先提示
      if(ready_time == star[star_flag] && change[star_flag] != 0)//转换为0情况下不用变换也不需要提示
      {           
          let h1 = hou
          let m1 = (sec > 50? min + 1:min)
          let s1 = (sec > 50? sec - 50:sec + 10)
          let str1 = (change[star_flag] == 1?'将2号道转为右转道':'将3号道转为直行道')
          that.setData({
            isChange:true,
            text:'该路口将于'+h1+':'+m1+':'+s1+str1,
            })    
      }
      //恢复预先提示
      let isChange = that.data.isChange
      if(ready_time == end[end_flag] && isChange) //当准备到结束时间时，若当前变换了，则提示恢复
      {       
          let h2 = hou
          let m2 = (sec > 50? min + 1:min)
          let s2 = (sec > 50? sec - 50:sec + 10)
          let str2 = '恢复正常通行'
          that.setData({
            isChange:true,
            text:'该路口将于'+h2+':'+m2+':'+s2+str2,
            })        
      }
      //转换提示
      if(time == star[star_flag]) //当到转换时间时
      {       
        if(change[star_flag] != 0)//转换为0情况下不用变换也不需要提示
        {
          that.setData({
            text:change[star_flag] == 1?'该路口目前将2号道转为右转道':'该路口目前将3号转为直行道',
            })    
        } 
        if(star_flag+1<star.length)
        {
          star_flag++
          that.setData({
            star_flag:star_flag,
            }) 
        }                           
      }
      //恢复提示
      if(time == end[end_flag]) //当到恢复时间时
      {       
        if(isChange)
        {
          that.setData({
            text:'文明行车',
            isChange:false,
            }) 
        }
        if(end_flag+1<end.length)
        {
          end_flag++
          that.setData({
            end_flag:end_flag,
            })            
        }                           
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
