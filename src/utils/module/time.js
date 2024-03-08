const convertUTCTime = (stringTime) => {
    const date = new Date(stringTime);

    // 获取本地时间的年、月、日、小时和秒
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份是从0开始的，所以要加1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const detail = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`

    return `${year}年${month}月${day}日 ${detail}`;
};

export default {
    convertUTCTime
}