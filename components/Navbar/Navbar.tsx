import Link from 'next/link'
import NavNormal from './NavNormal';
import NavMobile from './NavMobile';
import ContactButton from './componentsNav/ContactButton';
import UserOrSignIn from './componentsNav/UserOrSignIn';
import Image from 'next/image';
import image1 from '@/public/images/3.svg'
import CartIcon from './CartIcon';

const Navbar = async () => { 

  return (
      <div>
            <div className='flex items-center justify-between px-4 xl:px-14 py-8 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
                  <div className='w-55'> 
                        <Link className='flex items-center gap-1' href={'/'}>
                              <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw'
                                    className='w-[16%] md:w-[20%]' />
                              <span className='text-red-500 font-bold text-lg xs:text-[22px] md:text-[28px]'>MHM</span><span className='font-bold text-lg xs:text-[22px] md:text-[28px]'>Digital</span>
                        </Link>
                  </div>
                  <NavNormal />
                  <div className='flex items-center gap-2 sm:gap-4'>
                        <UserOrSignIn />
                        <ContactButton />
                        <CartIcon />
                        <NavMobile />
                  </div> 
            </div>
            
      </div>
  )
}

export default Navbar