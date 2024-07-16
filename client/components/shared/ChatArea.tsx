"use client";
import React, { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useChat from "@/hooks/useChat";
import useUserChat from "@/hooks/useUserChat";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion } from "framer-motion";

const formSchema = z.object({
  message: z.string().max(500),
});

const ChatArea = () => {
  const { chat, setMessage, setChat } = useChat();
  const { userId, setUserId, setUserName, userName, showUserDetails, setShowUserDetails } = useUserChat();

  // Here we fetch the messages through the api while loading first, using the userId taken by chatProvider.
  useEffect(()=>{
    // Function for close chatArea using escape.
    const handleKeyDown = (event:any) => {
      if (event.key === 'Escape') {
        closeChat();
      }
    };
    if (userId) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[userId]);

  let checkChat = false;
  if (chat.length != 0) {
    checkChat = true;
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const msg = values.message.trim();
    if (msg != ''){
      setMessage(values.message);
      const chats = [...chat, { message: values.message, isUser: true, userId: userId }];
      setChat(chats);
      form.reset();
    }
  }

  const closeChat = () => {
    setUserName("");
    setUserId("");
  };

  if (userId === "") {
    return <div className="flex justify-center items-center h-full">Chats will appear here.</div>;
  }

  const userDetails = () => {
    // here I have to show the user Card
    // console.log(userId);
    setShowUserDetails(!showUserDetails);
  };

  return (
    <>
      <motion.div className="flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{duration: 1.5}}>
        <div className="flex justify-between border-b border-muted pb-4">
          <div className="flex items-center justify-between">
            <Avatar className="mx-6" onClick={userDetails}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="bg-slate-400">CN</AvatarFallback>
            </Avatar>
            <div>
              <h1>{userName}</h1>
              <p className="text-green-400">{userId}</p>
            </div>
          </div>
          <Button className="rounded-3xl m-1" onClick={closeChat} variant="ghost">
            X
          </Button>
        </div>
        <div>
          <div className="overflow-y-auto h-[78vh] p-4 space-y-4 no-scrollbar">
            {checkChat ? (
              <>
                {chat.map((payload, index) => {
                  return (
                    <div key={index} className={`flex ${payload.isUser ? "justify-end" : "justify-start"}`}>
                      {payload.userId === userId ? (
                        <div
                          className={`${payload.isUser ? "bg-muted rounded-lg p-3 max-w-[70%] text-black" : "bg-green-700 rounded-lg p-3 max-w-[70%] text-primary-foreground"}`}
                        >
                          {!payload.isUser ? (
                            <>
                              <div className="font-bold">{userName}</div>
                            </>
                          ) : (
                            ""
                          )}
                          <p className="">{payload.message}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex justify-center items-center h-[70vh]">Your chats will appear here</div>
            )}
          </div>
          <div className="border-t border-muted p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter Message" {...field} type="text" className="w-[55vw] ms-5" autoComplete="off"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  <NearMeRoundedIcon />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatArea;
