"use client"

import axios from 'axios'
import * as z from 'zod'
import Heading from "@/components/Heading"
import { MessageSquare } from "lucide-react"


import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'

import {ChatCompletionMessageParam} from "openai/resources/chat/completions";

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'

const ConversationPage = () => {
  const router = useRouter()
   const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ''
    }
  });
  
  // loading state from the useForm 
  const isLoading = form.formState.isSubmitting;

  // handling submit 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // handling request
      const userMessage: ChatCompletionMessageParam = {
        role: 'user',
        content: values.prompt
      }

      // rendering all user request 
      const newMessages = [...messages, userMessage]

      // handling response from chatgpt
      const response = await axios.post("/api/conversation", {
        messages: newMessages
      })

      console.log(response.data)

    } catch (error) {
      console.log(error)
    } finally{
      router.refresh()
    }
  }

  return (
    <div>
      <Heading 
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      {/* creating forms components */}
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className='
                rounded-lg
                border
                w-full
                p-4
                px-3
                md:px-6
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              '
            >
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0 outline-none  focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='How do I start learning programming?'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        
        {/* generated results here */}
        <div className='space-y-4 mt-4'>
          <div className='flex flex-col-reverse gap-y-4'>
            {messages.map((message) => (
              <div key={message.role}>
                {message.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationPage