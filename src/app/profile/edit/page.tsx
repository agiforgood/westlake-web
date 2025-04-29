'use client'
import { useEffect, useState } from 'react';
import { getMyProfile, updateUserProfile } from '@/lib/userProfileApi';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { authClient } from '@/lib/authClient';
const { useSession } = authClient

export default function ProfileEditPage() {
    const [form, setForm] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    const {
        data: session,
    } = useSession()

    useEffect(() => {
        const userId = session?.user?.id;
        if (userId) {
            getMyProfile().then(data => {
                setForm(data);
                setLoading(false);
            });
        }
    }, [session]);

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
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow py-24">
                <form className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-8" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6">编辑个人信息</h2>
                    {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">{error}</div>}
                    {/* 基本信息 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">姓名</label>
                                <input name="name" value={form.profile.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">一句话简介</label>
                                <input name="expertise" value={form.profile.expertiseSummary} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">个人简介</label>
                                <textarea name="bio" value={form.profile.bio} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" rows={3} />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">加入原因</label>
                                <textarea name="joinReason" value={form.profile.motivation} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" rows={3} />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">想要获得的帮助</label>
                                <textarea name="helpWanted" value={form.profile.expectations} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" rows={2} />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">可以提供的资源</label>
                                <textarea name="resources" value={form.profile.canOffer} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" rows={2} />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">邮箱</label>
                                <input name="email" value={form.profile.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">电话</label>
                                <input name="phone" value={form.profile.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">地区</label>
                                <input name="region" value={form.profile.province} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">微信</label>
                                <input name="wechat" value={form.profile.wechat || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">专业技能（逗号分隔）</label>
                                <input name="skills" value={form.profile.skills?.join(',') || ''} onChange={e => handleArrayChange('skills', e.target.value.split(','))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">标签（逗号分隔）</label>
                                <input name="tags" value={form.tags?.join(',') || ''} onChange={e => handleArrayChange('tags', e.target.value.split(','))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
                            </div>
                        </div>
                    </div>
                    {/* 可参与时间 */}
                    <div className="space-y-6">
                        <label className="block font-semibold mb-2 text-gray-700">可参与时间</label>
                        <textarea name="availableTime" value={JSON.stringify(form.availableTime || {}, null, 2)} onChange={e => setForm((prev: any) => ({ ...prev, availableTime: JSON.parse(e.target.value || '{}') }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" rows={3} />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => router.push('/profile')}>取消</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">保存</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

// tailwind input class
// .input { @apply w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500; } 