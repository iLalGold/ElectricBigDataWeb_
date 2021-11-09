/**
 *  格式化文章發布時間
 */
export default {
  customTime(item) {
    let nowTime = new Date().getTime()
    let minuteTime = 60 * 1000
    let hourTime = 60 * minuteTime
    let dayTime = 24 * hourTime
    let monthTime = dayTime * 30
    let yearTime = monthTime * 12

    let publishTime = new Date(item).getTime()
    let historyTime = parseInt(nowTime) - parseInt(publishTime)
    let descTime
    if (historyTime >= yearTime) {
      // 按年算
      descTime = parseInt(historyTime / yearTime) + '年前'
    } else if (historyTime < yearTime && historyTime >= monthTime) {
      // 按月算
      descTime = parseInt(historyTime / monthTime) + '月前'
    } else if (historyTime < monthTime && historyTime >= dayTime) {
      // 按天算
      descTime = parseInt(historyTime / dayTime) + '天前'
    } else if (historyTime < dayTime && historyTime >= hourTime) {
      // 按小时算
      descTime = parseInt(historyTime / hourTime) + '小时前'
    } else if (historyTime < hourTime && historyTime >= minuteTime) {
      // 按分钟算
      descTime = parseInt(historyTime / minuteTime) + '分钟前'
    } else {
      descTime = '刚刚'
    }
    return descTime
  },
  formatDate(time) {
    if (time == null) {
      // alert("time is null");
      return '未知时间'
    }
    let tmpDate = new Date(time)
    let year = tmpDate.getFullYear()
    let mathon = tmpDate.getMonth() + 1
    let day = tmpDate.getDate()
    let hours = tmpDate.getHours()
    let minutes = tmpDate.getMinutes()
    let seconds = tmpDate.getSeconds()
    return year + '-' + mathon + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  },
  formatDateDay(time) {
    if (time == null) {
      return '未知时间'
    }
    let tmpDate = new Date(time)
    let year = tmpDate.getFullYear()
    let mathon = tmpDate.getMonth() + 1
    let day = tmpDate.getDate()
    return year + '-' + mathon + '-' + day
  },
  formatDateTime(time) {
    if (time == null) {
      return '未知时间'
    }
    let tmpDate = new Date(time)
    let hours = tmpDate.getHours()
    let minutes = tmpDate.getMinutes()
    return hours + ':' + minutes
  },

  /**
   * iYear, iMonth 上一个月总计有多少天
   * getMonth() 从Date对象返回月份 (0 ~ 11)。
   */
  getDaysInMonth: function(iYear, iMonth) {
    var dPrevDate = new Date(iYear, iMonth, 0)
    return dPrevDate.getDate()
  },

  /**
   * 当前月总计有多少天
   * 从 Date 对象返回一个月中的某一天 (1 ~ 31)。
   */
  getDaysOfThisMonth: function(iDate) {
    if (iDate) {
      var year = iDate.getFullYear()
      var month = iDate.getMonth()
      month++
      if (month > 11) {
        year++
        month = 0
      }
      return new Date(year, month, 0).getDate()
    }
    return 0
  },

  /**
   * 上一个月共计有多少天
   * 从 Date 对象返回一个月中的某一天 (1 ~ 31)。
   */
  getDaysOfLastMonth: function(iDate) {
    if (iDate) {
      return new Date(iDate.getFullYear(), iDate.getMonth(), 0).getDate()
    }
    return 0
  },

  /**
   * 当前月份的第一天是星期几;
   * 从 Date 对象返回一周中的某一天 (0 ~ 6)。
   */
  getFirstWeekDayInThisMonth: function(iDate) {
    if (iDate) {
      var dCalDate = new Date(iDate.getFullYear(), iDate.getMonth(), 1)
      return dCalDate.getDay()
    }
    return 0
  },

  /**
   * 当前月份的最后一天是星期几;
   * 从 Date 对象返回一周中的某一天 (0 ~ 6)。
   */
  getLastWeekDayInThisMonth: function(iDate) {
    if (iDate) {
      var year = iDate.getFullYear()
      var month = iDate.getMonth()
      month++
      if (month > 11) {
        year++
        month = 0
      }
      return new Date(year, month, 0).getDay()
    }
    return 0
  },

  /**
   * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
   * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
   * Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
   * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
   * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
   * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
   * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
   */

  formatDateByFmt: function(iDate, fmt) {
    var o = {
      'M+': iDate.getMonth() + 1, // 月份
      'd+': iDate.getDate(), // 日
      'h+': iDate.getHours() % 12 === 0 ? 12 : iDate.getHours() % 12, // 小时
      'H+': iDate.getHours(), // 小时
      'm+': iDate.getMinutes(), // 分
      's+': iDate.getSeconds(), // 秒
      'q+': Math.floor((iDate.getMonth() + 3) / 3), // 季度
      S: iDate.getMilliseconds() // 毫秒
    }
    var week = {
      '0': '/u65e5',
      '1': '/u4e00',
      '2': '/u4e8c',
      '3': '/u4e09',
      '4': '/u56db',
      '5': '/u4e94',
      '6': '/u516d'
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (iDate.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (RegExp.$1.length > 1
          ? RegExp.$1.length > 2
            ? '/u661f/u671f'
            : '/u5468'
          : '') + week[iDate.getDay() + '']
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  },

  formatStr: function(format) {
    if (!format) {
      var date = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S+': this.getMilliseconds()
      }
      if (/(y+)/i.test(format)) {
        format = format.replace(
          RegExp.$1,
          (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (var k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? date[k]
              : ('00' + date[k]).substr(('' + date[k]).length)
          )
        }
      }
      return format
    } else {
      return ''
    }
  }
}
