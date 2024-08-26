import fetch from 'isomorphic-fetch';
import { urlPoint } from '@/api/env'
async function get(url, options = {}) {
    const response = await fetch(urlPoint(url), {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        ...options,
    });

    if (!response.ok) {
        error.status = response.status;
        throw error;
    }

    return await response.json();
}
async function post(url, data, options = {}) {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...options,
    };
    const response = await fetch(url, config);
    if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        throw error;
    }
    return await response.json();
}
module.exports = {
    get,
    post
};