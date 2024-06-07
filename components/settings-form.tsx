"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { updateUsername } from "@/app/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-buttons";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";

const initialState = {
  message: "",
  status: "",
};

export default function SettingsForm({
  username,
}: {
  username: string | null | undefined;
}) {
  const [state, formAction] = useFormState(updateUsername, initialState);
  const { toast } = useToast();

   useEffect(() => {
     if (state?.status === "green") {
       toast({
         title: "Successful",
         description: state.message,
       });
     } else if (state?.status === "error") {
       toast({
         title: "Error",
         description: state.message,
         variant: "destructive",
       });
     }
   }, [state, toast]);
  return (
    <form action={formAction}>
      <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      <Separator className="my-4" />
      <Label className="text-lg">Username</Label>
      <p className="text-muted-foreground">You can now change your username</p>

      <Input
        defaultValue={username ?? undefined}
        name="username"
        required
        className="mt-2"
        min={2}
        max={21}
      />

      {state?.status === "error" && (
        <p className="text-destructive mt-1">{state.message}</p>
      )}

      <div className="w-full flex mt-5 gap-x-5 justify-end">
        <Button asChild type="button" variant="secondary">
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitButton text="Continue" />
      </div>
    </form>
  );
}
