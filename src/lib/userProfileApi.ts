'use client'

const DEV_API_BASE = 'http://localhost:3000';
const PRO_API_BASE = 'https://api.westlakeaiforgood.com';
const API_BASE = process.env.NODE_ENV === 'development' ? DEV_API_BASE : PRO_API_BASE;

export async function getMyProfile() {
    const res = await fetch(`${API_BASE}/api/profile`, {
        credentials: 'include',
        mode: 'cors'
    });
    return res.json();
}

export async function getUserProfile(userId: string) {
    const res = await fetch(`${API_BASE}/api/profile/${userId}`, {
        credentials: 'include',
        mode: 'cors',
    });
    return res.json();
}

export async function updateMyProfile(data: object) {
    const res = await fetch(`${API_BASE}/api/profile`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateMyAvailability(data: object) {
    const res = await fetch(`${API_BASE}/api/profile/availability`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteMyAvailability(weekday: number, timeSlot: number) {
    const res = await fetch(
        `${API_BASE}/api/profile/availability/${weekday}/${timeSlot}`,
        {
            credentials: 'include',
            mode: 'cors',
            method: 'DELETE',
        });
    return res.json();
}

export async function adminGetWaitingProfiles() {
    const res = await fetch(`${API_BASE}/api/admin/profiles/waiting`, {
        credentials: 'include',
        mode: 'cors',
    });
    return res.json();
}

export async function adminGetTags() {
    const res = await fetch(`${API_BASE}/api/admin/tags`, {
        credentials: 'include',
        mode: 'cors',
    });
    return res.json();
}

export async function adminAddTag(data: object) {
    const res = await fetch(`${API_BASE}/api/admin/tags`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function getAllProfiles() {
    const res = await fetch(`${API_BASE}/api/profile/all`, {
        credentials: 'include',
        mode: 'cors',
    });
    return res.json();
}

export async function getAllTags() {
    const res = await fetch(`${API_BASE}/api/profile/tags`, {
        credentials: 'include',
        mode: 'cors',
    });
    return res.json();
}

export async function addTag(tagId: string) {
    const res = await fetch(`${API_BASE}/api/profile/tags`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ tags: [tagId] }),
    });
    return res.json();
}

export async function deleteTag(tagId: string) {
    const res = await fetch(`${API_BASE}/api/profile/tags/${tagId}`, {
        credentials: 'include',
        mode: 'cors',
        method: 'DELETE',
    });
    return res.json();
}

export async function adminAuditProfile(userId: string, isApproved: boolean) {
    const res = await fetch(`${API_BASE}/api/admin/profiles`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ userId, isApproved }),
    });
    return res.json();
}