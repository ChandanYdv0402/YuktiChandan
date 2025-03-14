import { ModeToggle } from '@/components/global/mode-toggle'
import { UserButton } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  user?: null | User
}

const Navigation = ({ user }: Props) => {
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside className="flex items-center gap-2">
        <Image
          src={'/assets/plura-logo.svg'}
          width={40}
          height={40}
          alt="Yukti logo"
        />
        <span className="text-xl font-bold"> Yukti.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-[#1e2731]/25 backdrop-blur-lg ml-1 mr-1 mt-1 border rounded-2xl px-4 py-4 pt-4 pb-4">
        <ul className="flex items-center justify-center gap-8">
          <Link href={'#'}>Pricing</Link>
          <Link href={'#'}>About</Link>
          <Link href={'#'}>Documentation</Link>
          <Link href={'#'}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        {/* <Link
          href={'/agency/sign-in'}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-[#1e2731]/25 transition-all ease-in-out duration-400 hover:border"
        >
          Login
        </Link> */}
        <Link
  href={'/agency/sign-in'}
  className="bg-primary text-white p-2 px-4 rounded-md hover:bg-[#1e2731]/25 transition-shadow ease-in-out duration-300 hover:shadow-[0_4px_15px_rgba(255,255,255,0.4)]"
>
  Login
</Link>


        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  )
}

export default Navigation