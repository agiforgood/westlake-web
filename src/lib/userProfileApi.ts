'use client'

const DEV_API_BASE = 'http://localhost:3000';
const PRO_API_BASE = 'https://api.westlakeaiforgood.com';
const API_BASE = process.env.NODE_ENV === 'development' ? DEV_API_BASE : PRO_API_BASE;

export async function getMyProfile(token: string) {
    const res = await fetch(`${API_BASE}/api/profile`, {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function getUserProfile(userId: string, token: string) {
    const res = await fetch(`${API_BASE}/api/profile/${userId}`, {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function updateMyProfile(data: object, token: string) {
    const res = await fetch(`${API_BASE}/api/profile`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function updateMyAvailability(data: object, token: string) {
    const res = await fetch(`${API_BASE}/api/profile/availability`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function deleteMyAvailability(weekday: number, timeSlot: number, token: string) {
    const res = await fetch(
        `${API_BASE}/api/profile/availability/${weekday}/${timeSlot}`,
        {
            credentials: 'include',
            mode: 'cors',
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    return res.json();
}

export async function adminGetWaitingProfiles(token: string) {
    const res = await fetch(`${API_BASE}/api/admin/profiles/waiting`, {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function adminGetTags(token: string) {
    const res = await fetch(`${API_BASE}/api/admin/tags`, {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function adminAddTag(data: object, token: string) {
    const res = await fetch(`${API_BASE}/api/admin/tags`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function getAllProfiles(token: string) {
    const res = await fetch(`${API_BASE}/api/profile/all`, {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function getAllTags(token: string) {
    const res = await fetch(`${API_BASE}/api/profile/tags`, {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function addTag(tagId: string, token: string) {
    const res = await fetch(`${API_BASE}/api/profile/tags`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ tags: [tagId] }),
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function deleteTag(tagId: string, token: string) {
    const res = await fetch(`${API_BASE}/api/profile/tags/${tagId}`, {
        credentials: 'include',
        mode: 'cors',
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function adminAuditProfile(userId: string, isApproved: boolean, token: string) {
    const res = await fetch(`${API_BASE}/api/admin/profiles`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ userId, isApproved }),
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}