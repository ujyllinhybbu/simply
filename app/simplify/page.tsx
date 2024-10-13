"use client";

import { FileUploader } from "@/components/FileUploader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  desiredGradeLevel: z.string(),
  file: z.array(z.any()).optional(),
  prompt: z.string().optional(),
});

const gradeLevels = [
  { id: "1st", label: "1st" },
  { id: "2nd", label: "2nd" },
  { id: "3rd", label: "3rd" },
  { id: "4th", label: "4th" },
  { id: "5th", label: "5th" },
  { id: "6th", label: "6th" },
  { id: "7th", label: "7th" },
  { id: "8th", label: "8th" },
  { id: "9th", label: "9th" },
  { id: "10th", label: "10th" },
  { id: "11th", label: "11th" },
  { id: "12th", label: "12th" },
  { id: "Undergraduate", label: "Undergraduate" },
];

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desiredGradeLevel: "",
      file: [],
      prompt: "",
    },
  });

  const [position, setPosition] = useState("bottom");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // convert image to base64 to send to api
  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    let image;
    if (values.file && values.file?.length > 0) {
      image = await convertToBase64(values.file[0]);
    }

    // submit to our api
    try {
      const res = await axios.post("/api/cloudFlareWorkerAI/simplify", {
        desiredGradeLevel: values.desiredGradeLevel,
        prompt: values.prompt,
        base64Image: image,
      });
      console.log(res.data);
    } catch (error: any) {
      console.log("Submission Failed", error.response);
    } finally {
      setIsLoading(false);
    }
    console.log({
      desiredGradeLevel: values.desiredGradeLevel,
      prompt: values.prompt,
      base64Image: image,
    });
  }
  // const [files, setFiles] = useState();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-20 max-w-[500px]">
          <div className="p-4 border border-1 border-gray-200 rounded-xl items-center">
            <h1 className="font-semibold text-3xl">Simplify Your Learning</h1>
            <p className="text-gray-500 pt-2">
              Simplify your question to a desired grade level to make
              understanding it easier!
            </p>
            <div className="flex gap-4 py-2 items-center">
              {/* <div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Simplify
              </label>
            </div>
          </div> */}
              {/* <h1 className="font-bold">or</h1> */}
              {/* <div className="flex flex-col py-4 gap-y-2 font-semibold w-full">
                <h1>Select Your Desired Grade Level: </h1>
                <div className="flex justify-center w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Grade Level</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={position}
                        onValueChange={setPosition}
                      >
                        <DropdownMenuRadioItem value="top">
                          Top
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="bottom">
                          Bottom
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="right">
                          Right
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div> */}
            </div>
            {/*  */}
            <div>
              <FormField
                control={form.control}
                name="desiredGradeLevel"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Choose Your Desired Grade Level</FormLabel>
                    <FormControl className="flex flex-col">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            {!field.value ? "Select Grade Value" : field.value}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Grade Level</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={position}
                            onValueChange={field.onChange}
                            // onChange={}
                            className="max-h-52 overflow-y-auto"
                            // onValueChange={setPosition}
                          >
                            {gradeLevels.map((item, index) => (
                              <DropdownMenuRadioItem
                                value={item.id}
                                key={index}
                              >
                                {item.label}
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            /**
            <div className="pt-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Your Picture</FormLabel>
                    <FormControl>
                      {/* file uploader component */}
                      <FileUploader
                        files={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <h1 className="text-sky-400 font-bold text-xl py-4">or</h1>
            </div>
            <div className="grid w-full gap-1.5 pb-10">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type Your Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Instead of uploading an image you can paste your prompt here!"
                        className="lg:w-[525px]"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isLoading ? "hi" : ""}
            <Button className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 font-semibold">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
