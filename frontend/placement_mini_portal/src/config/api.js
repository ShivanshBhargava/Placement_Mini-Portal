// Centralized API helper with fallbacks for deployed environments
const VITE_API_URL = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_API_URL : undefined;

function detectRuntimeBase() {
    if (typeof window === 'undefined') return '';
    if (window.__API_URL) return window.__API_URL;
    const origin = window.location.origin || '';
    // If running on Vercel and backend is deployed as serverless functions, assume '/api' prefix
    if (origin.includes('vercel.app')) return origin + '/api';
    return origin;
}

export const API_BASE = VITE_API_URL || (typeof window !== 'undefined' ? detectRuntimeBase() : '');

export function buildUrl(path) {
    if (!path) return API_BASE || '';
    if (/^https?:\/\//i.test(path)) return path;
    const sep = path.startsWith('/') ? '' : '/';
    return `${API_BASE}${sep}${path}`;
}

function getAuthHeaders(additional = {}) {
    const headers = { 'Content-Type': 'application/json', ...additional };
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) headers.Authorization = `Bearer ${token}`;
    }
    return headers;
}

export async function apiFetch(path, options = {}) {
    const url = buildUrl(path);
    const fetchOptions = { ...options };
    if (!fetchOptions.headers) fetchOptions.headers = {};
    return fetch(url, fetchOptions);
}

async function handleResponse(res) {
    const text = await res.text();
    let json;
    try { json = text ? JSON.parse(text) : {}; } catch (e) { json = { message: text }; }
    if (!res.ok) {
        const err = (json && (json.error || json.message)) || `Request failed with status ${res.status}`;
        throw new Error(err);
    }
    return json;
}

export async function get(endpoint) {
    const res = await apiFetch(endpoint, { method: 'GET', headers: getAuthHeaders() });
    return handleResponse(res);
}

export async function post(endpoint, data) {
    const res = await apiFetch(endpoint, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) });
    return handleResponse(res);
}

export async function put(endpoint, data) {
    const res = await apiFetch(endpoint, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(data) });
    return handleResponse(res);
}

export async function del(endpoint) {
    const res = await apiFetch(endpoint, { method: 'DELETE', headers: getAuthHeaders() });
    return handleResponse(res);
}

export default apiFetch;
