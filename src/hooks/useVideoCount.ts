// 定义hooks方法
interface VideoCountProps {
  getVideoDuration?: (time: number) => void
  getVideoCount?: (data: number) => void
  strLength?: (str: string) => void
  // setItem?: (key: string, data: {}) => void
  // getItem?: (key: string) => void
}

export default ():VideoCountProps => {
// 函数
  // 视频时长处理
  const getVideoDuration = (time: number) => {
    if (time < 60) return `00'${time}"`
    if (time >= 60) {
      const min = Math.floor(time / 60)
      const sec = Math.floor(time % 60)
      // 补零
      const Min = min >= 10 ? min : `0${min}`
      const Sec = sec >= 10 ? sec : `0${sec}`
      return `${Min}'${Sec}"`
    }
  }
  // 播放量,收藏,点赞等数据处理
  const getVideoCount = (data: number) => {
    // 没有考虑 亿 单位
    const dataLength = String(data).length
     if (dataLength <= 3) return data
     if (dataLength === 4) return ((Number(String(data).substring(0,2))) / 10).toFixed(1) + 'k'
     // 以.千位显示,取到千位数即可
     if (dataLength >= 5) return ((Number(String(data).substring(0,dataLength - 3))) / 10).toFixed(1) + 'w'
   }

   // 判断字符占用字节
   const strLength = (str: string) => {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c>255) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
    }


  
// 返回数据
return {
  getVideoDuration,
  getVideoCount,
  strLength,
}
}