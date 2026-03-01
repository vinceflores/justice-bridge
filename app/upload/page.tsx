"use client"

import { useState } from "react"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import { Button } from "@/components/ui/button"
export default function UploadPage() {
    const [text, setText] = useState("")
    const props = useSupabaseUpload({
        bucketName: 'sample',
        path: 'test',
        allowedMimeTypes: ['image/*'],
        maxFiles: 1,
        maxFileSize: 1000 * 1000 * 10, // 10MB,
    })

    const handleSubmit = async () => {
        const res = await fetch("http://localhost:3000/upload/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("hello")
        const data = await res.json()
        console.log({data})
        // console.log({text})
        // setText(text.data)
    }

    return <div>

        <form onSubmit={handleSubmit}>
            <Dropzone {...props}>
                <DropzoneEmptyState />
                <DropzoneContent />
            </Dropzone>
            <button type="submit"> submit </button>
        </form>
        <Button onClick={handleSubmit}>click</Button>
        <p>
            {text}
        </p>
    </div>
}