'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Sidebar from '@/components/Sidebar'

const MobileSidebar = () => {

  // preventing hydration here 
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant='ghost' size='icon' className="md:hidden">
          <Menu /> 
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar