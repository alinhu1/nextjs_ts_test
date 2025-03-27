'use client'
import { PropsWithChildren, useState } from "react";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface IRootLayoutProps extends PropsWithChildren{
  className:string
}

export  default function  RootLayout(props:IRootLayoutProps){
  const {children} =props

  const [queryClient] = useState(() => new QueryClient())
  

   return (
    <html lang="en">
      <body>
       <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools
        initialIsOpen={false}/>
       </QueryClientProvider>
      </body>
    </html>
  )
}
