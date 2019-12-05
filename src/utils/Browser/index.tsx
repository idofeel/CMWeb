function Browser(): string {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器

    if (userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1) {
        return "IE11";
    };

    if (userAgent.indexOf("Edge") > -1) {
        return 'Edge'
    };
}


function IEVersion(): number | boolean {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    const IEBrowser = Browser();
    if (IEBrowser === 'IE11') return 11;
    if ('IE' === IEBrowser) {
        let IE = new RegExp("MSIE (\\d+\\.\\d+);");
        IE.test(userAgent);
        let IEV = parseFloat(RegExp["$1"]);
        if (IEV == 7) {
            return 7;
        } else if (IEV == 8) {
            return 8;
        } else if (IEV == 9) {
            return 9;
        } else if (IEV == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else {
        return false
    }


}


// // 判断IE浏览器版本
// function IEVersion() {
//     let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
//     let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
//     let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
//     let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
//     if (isIE) {
//         let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
//         reIE.test(userAgent);
//         let fIEVersion = parseFloat(RegExp["$1"]);
//         if (fIEVersion == 7) {
//             return 7;
//         } else if (fIEVersion == 8) {
//             return 8;
//         } else if (fIEVersion == 9) {
//             return 9;
//         } else if (fIEVersion == 10) {
//             return 10;
//         } else {
//             return 6;//IE版本<=7
//         }
//     } else if (isEdge) {
//         return 'Edge';//edge
//     } else if (isIE11) {
//         return 11; //IE11  
//     } else {
//         return -1;//不是ie浏览器
//     }
// }

export { IEVersion }

export default Browser