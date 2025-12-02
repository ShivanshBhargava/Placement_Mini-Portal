const API_URL = import.meta.env.VITE_API_URL;

// Log the API URL on initialization (helps debug deployment issues)
console.log('API Base URL:', API_URL);

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

const api = {
    get: async (endpoint) => {
        const url = `${API_URL}${endpoint}`;
        console.log('GET:', url);

        const response = await fetch(url, {
            method: "GET",
            headers: getHeaders(),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Request failed' }));
            throw new Error(error.error || "Something went wrong");
        }
        return response.json();
    },

    post: async (endpoint, data) => {
        const url = `${API_URL}${endpoint}`;
        console.log('POST:', url, data);

        const response = await fetch(url, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json().catch(() => ({ error: 'Invalid response' }));
        if (!response.ok) {
            throw new Error(result.error || "Something went wrong");
        }
        return result;
    },

    put: async (endpoint, data) => {
        const url = `${API_URL}${endpoint}`;
        console.log('PUT:', url, data);

        const response = await fetch(url, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json().catch(() => ({ error: 'Invalid response' }));
        if (!response.ok) {
            throw new Error(result.error || "Something went wrong");
        }
        return result;
    },

    delete: async (endpoint) => {
        const url = `${API_URL}${endpoint}`;
        console.log('DELETE:', url);

        const response = await fetch(url, {
            method: "DELETE",
            headers: getHeaders(),
        });

        const result = await response.json().catch(() => ({ error: 'Invalid response' }));
        if (!response.ok) {
            throw new Error(result.error || "Something went wrong");
        }
        return result;
    },
};

export default api;
