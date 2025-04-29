'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    Button, Table, TableBody, TableHeader, TableRow, TableCell, TableColumn, getKeyValue, Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
    Form,
    addToast
} from "@heroui/react";
import { useState, useEffect } from "react";
import { adminGetTags, adminAddTag } from "@/lib/userProfileApi";

interface Tag {
    id: string;
    content: string;
    category: string;
}

const columns = [
    {
        key: "id",
        label: "id"
    },
    {
        key: "content",
        label: "content"
    },
    {
        key: "category",
        label: "category"
    }
]

export default function AdminTagsPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        adminGetTags().then((data) => {
            setTags(data.tags);
        });
    }, []);

    if (!tags) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow text-center mt-10">未找到标签信息</div>
            <Footer />
        </div>
    );

    const handleAddTag = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        const response = await adminAddTag(data);
        if (response) {
            const refreshedTags = await adminGetTags();
            setTags(refreshedTags.tags);
            addToast({
                title: "添加标签成功",
                description: "标签已添加",
                color: "success",
            });
        } else {
            addToast({
                title: "添加标签失败",
                description: "标签已存在",
                color: "danger",
            });
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
                    <Button onPress={onOpen}>添加标签</Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">添加标签</ModalHeader>
                                    <ModalBody>
                                        <Form onSubmit={handleAddTag}>
                                            <Input
                                                label="标签内容"
                                                placeholder="Enter your tag content"
                                                variant="bordered"
                                                name="content"
                                            />
                                            <Input
                                                label="标签分类"
                                                placeholder="Enter your tag category"
                                                variant="bordered"
                                                name="category"
                                            />
                                            <Button color="primary" type="submit" onPress={onClose}>
                                                添加
                                            </Button>
                                        </Form>
                                    </ModalBody>
                                    <ModalFooter>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                    <Table>
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody>
                            {tags.map((tag) =>
                                <TableRow key={tag.id}>
                                    {(columnKey) => <TableCell>{getKeyValue(tag, columnKey)}</TableCell>}
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </div>
                <Footer />
            </div >
        </>
    );
}
