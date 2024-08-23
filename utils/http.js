import fetch from 'isomorphic-fetch';
import {urlPoint}  from '@/api/env'
async function get(url, options = {}) {
    console.log(urlPoint(url))
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

module.exports = {
    get,
};