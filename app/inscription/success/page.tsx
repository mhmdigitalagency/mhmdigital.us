import ReturnButton from "@/components/return-button";

interface PageProps {
  searchParams: Promise<{ callbackURL?: string }>;
}

const page = async ({ searchParams }: PageProps) => {

      const { callbackURL } = await searchParams;
      const cb = callbackURL && callbackURL.startsWith("/") ? callbackURL : "/profile";

  return (
            <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10 md:py-20'>
                  <ReturnButton href={`/`} label='Back to home' />
                  <br />
                  <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                        <div className='mb-8 bg-slate-200 py-3 rounded w-full'>
                              <h5 className='text-center text-2xl font-semibold'>Success</h5>
                        </div>

                        <p className="text-gray-500 text-center text-base">
                              Success! You have successfully registered. Please check your email for the verification link.
                        </p>
                  </div>
            </div>
  )
}

export default page
