import { Flag } from 'lucide-react'

export default function Header() {
  return (
    <div className='bg-blue-950 fixed top-0 w-full text-white h-[60px] flex items-center px-2 justify-between '>
      <div  >
        <a href='/' className='flex items-center gap-2'>
        <Flag />
        CDPI - Starter
        </a>
      </div>
      <div className='flex item-center gap-2 '>
        <a className="bg-white text-black hover:bg-gray-200 px-2 py-2" href='/auth/login' >
          Connexion
        </a>
        <a className="bg-white text-black hover:bg-gray-200 px-2 py-2" href='/auth/register' >
          Inscription
        </a>
      </div>
    </div>
  )
}
