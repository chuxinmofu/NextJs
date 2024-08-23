import apidev from '@/config/apiUrl';
export function urlPoint(url) {
    let requestUrl = url;
    const urls = apidev.apiUrl;
    if (urls) {
        requestUrl = url
            .replace(/\/eduTouch/, apidev.apiUrl)
            .replace(/\/robotApi/, apidev.scrmUrl);
    }

    return requestUrl;
}