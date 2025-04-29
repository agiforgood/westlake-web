'use client'
import { useEffect, useState } from 'react';
import { getMyProfile, updateUserProfile } from '@/lib/userProfileApi';
import { useRouter } from 'next/navigation';

export default function ProfileEditPage() {
    const [form, setForm] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('userId') || 'zhangwei';
        getUserProfile(userId).then(data => {
            setForm(data);
            setLoading(false);
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (name: string, value: string[]) => {
        setForm((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const userId = form.userId;
            await updateUserProfile(userId, form);
            router.push('/profile');
        } catch {
            setError('保存失败，请稍后重试');
        }
    };

    if (loading) return <div className="text-center mt-10">加载中...</div>;
    if (!form) return <div className="text-center mt-10">未找到用户信息</div>;

    return (
        <form className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 mt-8 space-y-8" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">编辑个人信息</h2>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">{error}</div>}
            {/* 基本信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block font-semibold mb-1">姓名</label>
                    <input name="name" value={form.name} onChange={handleChange} className="input" />
                    <label className="block font-semibold mb-1 mt-4">一句话简介</label>
                    <input name="expertise" value={form.expertise} onChange={handleChange} className="input" />
                    <label className="block font-semibold mb-1 mt-4">个人简介</label>
                    <textarea name="bio" value={form.bio} onChange={handleChange} className="input" rows={3} />
                    <label className="block font-semibold mb-1 mt-4">加入原因</label>
                    <textarea name="joinReason" value={form.joinReason} onChange={handleChange} className="input" rows={3} />
                    <label className="block font-semibold mb-1 mt-4">想要获得的帮助</label>
                    <textarea name="helpWanted" value={form.helpWanted} onChange={handleChange} className="input" rows={2} />
                    <label className="block font-semibold mb-1 mt-4">可以提供的资源</label>
                    <textarea name="resources" value={form.resources} onChange={handleChange} className="input" rows={2} />
                </div>
                <div>
                    <label className="block font-semibold mb-1">邮箱</label>
                    <input name="email" value={form.email} onChange={handleChange} className="input" />
                    <label className="block font-semibold mb-1 mt-4">电话</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="input" />
                    <label className="block font-semibold mb-1 mt-4">地区</label>
                    <input name="region" value={form.region} onChange={handleChange} className="input" />
                    <label className="block font-semibold mb-1 mt-4">微信</label>
                    <input name="wechat" value={form.wechat || ''} onChange={handleChange} className="input" />
                    <label className="block font-semibold mb-1 mt-4">专业技能（逗号分隔）</label>
                    <input name="skills" value={form.skills?.join(',') || ''} onChange={e => handleArrayChange('skills', e.target.value.split(','))} className="input" />
                    <label className="block font-semibold mb-1 mt-4">标签（逗号分隔）</label>
                    <input name="tags" value={form.tags?.join(',') || ''} onChange={e => handleArrayChange('tags', e.target.value.split(','))} className="input" />
                </div>
            </div>
            {/* 可参与时间（简单文本编辑，实际可用更复杂的 UI） */}
            <div>
                <label className="block font-semibold mb-1">可参与时间</label>
                <textarea name="availableTime" value={JSON.stringify(form.availableTime || {}, null, 2)} onChange={e => setForm((prev: any) => ({ ...prev, availableTime: JSON.parse(e.target.value || '{}') }))} className="input" rows={3} />
            </div>
            <div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">保存</button>
                <button type="button" className="ml-4 px-6 py-2 rounded border" onClick={() => router.push('/profile')}>取消</button>
            </div>
        </form>
    );
}

// tailwind input class
// .input { @apply w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500; } 