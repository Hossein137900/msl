import { prisma } from '@/lib/prisma';
import React from 'react'

export const Page = async() => {
      const user = await prisma.blog.findMany({

        });
        
  return (
    <div>Page</div>
  )
}
