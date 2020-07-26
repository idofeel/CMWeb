let domain = ''; // 线上环境 动态域名

if (process.env.NODE_ENV === 'development') {
    // 开发环境 线上主域名
    domain = 'https://www.featuremaker.xyz'
}


export default domain
