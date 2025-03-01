'use server'
import { prisma } from "./prisma";

export default async function createNewUser(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    
    const newUser = await prisma.user.create({
        data: {
            name: username,
            password: password,
            phoneNumber: phoneNumber,
        },
    });

    return newUser;
}
export  async function addBlog(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const seoTitle = formData.get('seoTitle') as string;
    const content = formData.get('content') as string;
    const userId = formData.get('userId') as string;
    const image = formData.get('image') as string;
    const tags = JSON.parse(formData.get('tags') as string) as string[];
    const readTime = Number(formData.get('readTime'));

    const blog = await prisma.blog.create({
        data: {
            image:image,
            tags:tags,
            readTime:readTime,
            userId:userId,
            title: title,
            description: description,
            seoTitle: seoTitle,
            content: content,
        },
    });
    return blog;

}