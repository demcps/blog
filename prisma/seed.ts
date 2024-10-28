import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('adminpassword', 10),
      picture: 'https://example.com/admin.jpg',
      phone: '1234567890',
      role: 'ADMIN',
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      username: 'user1',
      email: 'user1@example.com',
      password: await bcrypt.hash('userpassword', 10),
      picture: 'https://example.com/user1.jpg',
      phone: '0987654321',
      role: 'USER',
    },
  });

  
  const category1 = await prisma.category.create({
    data: {
      name: 'Tech',
      slug: 'tech',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Lifestyle',
      slug: 'lifestyle',
    },
  });

  
  const post1 = await prisma.post.create({
    data: {
      title: 'First Post',
      content: 'This is the content of the first post.',
      authorId: adminUser.id,
      published: true,
      cover: 'https://example.com/cover1.jpg',
      tags: '["Tech"]',
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Second Post',
      content: 'This is the content of the second post.',
      authorId: regularUser.id,
      published: true,
      cover: 'https://example.com/cover2.jpg',
      tags: '["Lifestyle"]',
    },
  });

  
  await prisma.categoriesOnPosts.createMany({
    data: [
      {
        postId: post1.id,
        categoryId: category1.id,
      },
      {
        postId: post2.id,
        categoryId: category2.id,
      },
    ],
  });

  
  await prisma.comment.createMany({
    data: [
      {
        text: 'Great post!',
        authorId: regularUser.id,
        postId: post1.id,
      },
      {
        text: 'Very informative, thanks!',
        authorId: adminUser.id,
        postId: post2.id,
      },
    ],
  });

 
  await prisma.project.create({
    data: {
      name: 'Project Alpha',
      domain: 'example.com',
      id_user: adminUser.id,
    },
  });

 
  await prisma.integration.create({
    data: {
      name: 'Integration 1',
      content: { key: 'value' },
      id_user: adminUser.id,
      id_project: 1, 
    },
  });

  console.log('Datos de prueba creados.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
