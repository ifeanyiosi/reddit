"use client";

import { SubmitButton } from "@/components/submit-buttons";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Video } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { JSONContent } from "@tiptap/react";
import { TipTapEditor } from "@/components/tip-tab-editor";
import Image from "next/image";
import { createPost } from "@/app/actions";
import { Separator } from "@/components/ui/separator";
import { UploadDropzone } from "@/components/uploadthing";

const rules = [
  {
    id: 1,
    text: "Remember the human",
  },
  {
    id: 2,
    text: "Behave like you would in real life",
  },

  {
    id: 3,
    text: "Read the community guidlines",
  },
];

export default function CreatePostRoute({
  params,
}: {
  params: { id: string };
}) {
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [title, setTitle] = useState<null | string>(null);
  const createPostReddit = createPost.bind(null, { jsonContent: json });
  return (
    <div className="max-w-[1000px] mx-auto px-5 flex flex-col gap-y-10 lg:flex-row gap-x-10 mt-4">
      <div className="lg:w-[65%] flex flex-col gap-y-5">
        <h1 className="font-semibold">
          Subreddit:{" "}
          <Link href={`/r/${params.id}`} className="text-primary">
            r/{params.id}
          </Link>
        </h1>

        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="post">
              <Text className="h-4 w-4 mr-2" /> Post
            </TabsTrigger>
            <TabsTrigger value="image">
              <Video className="h-4 w-4 mr-2" />
              Image & Video
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card>
              <form action={createPostReddit}>
                <input
                  type="hidden"
                  name="imageUrl"
                  value={imageUrl ?? undefined}
                />
                <input type="hidden" name="subName" value={params.id} />
                <CardHeader>
                  <Label>Title</Label>
                  <Input
                    required
                    name="title"
                    placeholder="Title"
                    value={title ?? ""}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <TipTapEditor setJson={setJson} json={json} />
                </CardHeader>
                <CardFooter>
                  <SubmitButton text="Create Post" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="image">
            <Card>
              <CardHeader>
                {imageUrl === null ? (
                  <UploadDropzone
                    className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImageUrl(res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      alert("Error");
                    }}
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    alt="uploaded image"
                    width={500}
                    height={400}
                    className="h-80 rounded-lg w-full object-contain"
                  />
                )}
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="lg:w-[35%]">
        <Card className="flex flex-col p-4">
          <div className="flex items-center gap-x-2">
            <Image
              className="h-10 w-10"
              height={40}
              width={40}
              src="/pfp.png"
              alt="pfp"
            />
            <h1 className="font-medium">Posting to Reddit</h1>
          </div>
          <Separator className="mt-2" />

          <div className="flex flex-col gap-y-5 mt-5">
            {rules.map((item) => (
              <div key={item.id}>
                <p className="text-sm font-medium">
                  {item.id}. {item.text}
                </p>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}