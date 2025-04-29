'use client'

const API_BASE = 'http://localhost:3000';

export async function getMyProfile() {
    const res = await fetch(`${API_BASE}/api/profile`, {
        credentials: 'include',
        mode: 'cors'
    });
    // console.log(res.json());
    return res.json();
}

export async function updateUserProfile(userId: string, data: any) {
    const res = await axios.put(`${API_BASE}/api/users/${userId}`, data);
    return res.data;
} 