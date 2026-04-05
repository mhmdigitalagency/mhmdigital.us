import { Eye } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface User {
      id: string;
      baned: boolean;
      name: string;
      phoneNumber: string | null;
      userRole: string;
      email: string;
      image: string | null;
      company: string | null;
      billingAddress: string | null;
      shippingAddress: string | null;
      orders: {
            id: string;
            userId: string;
            price: number;
            status: string | null;
            createdAt: Date
        }[];
}

interface Props {
      user: User
}

const Order = ({user}: Props) => {

  return (
    <>
    <div className='py-25 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
      <div className='w-full px-8 py-5 bg-slate-50'>
        <h1 className='text-3xl md:text-[40px] font-bold leading-tight mb-3 xl:max-w-xl'>
            {user.name} Orders
        </h1>
        <div className='mt-10'>
          <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-white uppercase bg-red-500 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Order ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Total
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                              View Details
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      user?.orders.map((order, index) => (
                        <tr key={order.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 
                        even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {order.id}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                $ {order.price}.00
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {order.status ?? 'In Progress'}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <Link href={`/order-details/${order.id}`}>
                                <Eye className='text-red-500 hover:text-blue-500 transition-all duration-300' 
                                 size={32} />
                              </Link>
                            </td>
                        </tr>
                      ))
                    }
                  </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Order
