"use client";
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';

export default function Home() {
  const words = [
    {
      text: "Your",
    },
    {
      text: "workflow",
    },
    {
      text: "system",
    },
    {
      text: "for managing",
    },
    {
      text: "verifications.",
      className: "text-blue-600 dark:text-blue-600",
    },
  ];
  return (
    <>
      <MaxWidthWrapper>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
          <TypewriterEffectSmooth className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl' words={words} />
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Welcome to Veriflow. Every asset on our
            platform is verified by our team to ensure our
            highest quality standards.
          </p>
        </div>
      </MaxWidthWrapper>

    </>
  )
}
