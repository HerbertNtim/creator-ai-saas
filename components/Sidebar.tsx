import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

// adding a custom font 
const montserrat = Montserrat({
  weight: "800",
  subsets: ['latin']
})

const Sidebar = () => {
  return (
    <div className="space-y-4 h-full bg-[#111827] text-white flex flex-col py-4">
      <div className="px-3 py-2 flex-1">
        <Link href='/dashboard' className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image
              fill
              src="/logo.png"
              alt="logo"
            />
          </div>
          <h1 className={cn ("text-2xl font-bold", montserrat.className)}>Creator</h1>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar