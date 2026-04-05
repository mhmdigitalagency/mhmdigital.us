import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

interface PageProps {
  params: { id: string };
}

const getOrder = cache(async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      packages: {
            include: {
                  package: {
                        include: {
                              service: true,
                              subService: true
                        },
                  }
            }
      }
    }
  });
});

export async function generateStaticParams() {
  const allOrders = await prisma.order.findMany();

  return allOrders.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const order = await getOrder(id);

  return {
    title: `Order ${order?.id || 'Details'}`,
  };
}

const OrderDetails = async ({ params: { id } }: PageProps) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const order = await getOrder(id);

  if (!order) notFound();

  return (
    <div className='py-25 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
      <div className='w-full px-8 py-5 bg-slate-50'>
        <h1 className='text-3xl md:text-[40px] font-bold leading-tight mb-3 xl:max-w-xl'>
          Order Details
        </h1>
        <div className='mt-10'>
          <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-white uppercase bg-red-500 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Field
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    Order ID
                  </td>
                  <td className='px-6 py-4'>{order.id}</td>
                </tr>
                <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    User
                  </td>
                  <td className='px-6 py-4'>{order.user.name}</td>
                </tr>
                <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    Service
                  </td>
                  <td className='px-6 py-4'>{order.packages.map((item) => item.package.service?.name)}</td>
                </tr>
                {order.packages.some(item => item.package.subService) && (
                  <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b 
                  dark:border-gray-700'>
                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>Sub service</td>
                    <td className='px-6 py-4'>
                      {order.packages.map(item => item.package.subService?.name).join(', ')}
                    </td>
                  </tr>
                )}
                <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    Package
                  </td>
                  <td className='px-6 py-4'>{order.packages.map((item) => item.package.name)}</td>
                </tr>
                <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    Total
                  </td>
                  <td className='px-6 py-4'>$ {order.price}.00</td>
                </tr>
                <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    Status
                  </td>
                  <td className='px-6 py-4'>{order.status ?? 'In Progress'}</td>
                </tr>
                <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    Date
                  </td>
                  <td className='px-6 py-4'>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
