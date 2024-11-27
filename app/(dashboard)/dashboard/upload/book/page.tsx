"use client";
import { addBook } from "@/app/lib/books";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  author: string;
  publishedAt: string;
  category: string;
  copies_owned: number;
}
const UploadBookPage = () => {
  const queryClient = useQueryClient();

  const createBookMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const authenticate = (formData: any) => {
    const { title, author, publishedAt, category, copies_owned } = formData;
    const copies_num = Number(copies_owned);
    console.log(typeof copies_num);
    // 请求api
    createBookMutation.mutate({
      title,
      publishedAt,
      copied_owned: copies_num,
      category_id: 1,
      author_id: 1,
    });
  };
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;
  return (
    <div className="bg-bg">
      <form
        className="bg-transparent m-auto flex flex-col p-10 gap-y-4 shadow-sm rounded-sm"
        onSubmit={handleSubmit(authenticate)}
      >
        <Input
          inputid="title"
          label="书名"
          register={register}
          validation={{ required: { value: true, message: "请输入书名" } }}
          message={errors["title"]?.message}
          placeholder="论语"
        />
        <Input
          inputid="author"
          label="作者"
          register={register}
          validation={{ required: { value: true, message: "请输入作者" } }}
          placeholder="孟子"
          message={errors["author"]?.message}
        />
        <Input
          inputid="publishedAt"
          label="出版日期"
          register={register}
          validation={{
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: "请输入正确的日期格式",
            },
          }}
          placeholder="2022-1-1"
          message={errors["publishedAt"]?.message}
        />
        <Input
          inputid="category"
          label="分类"
          register={register}
          placeholder="默认分类"
          message={errors["category"]?.message}
        />
        <Input
          inputid="copies_owned"
          label="库存"
          register={register}
          validation={{
            pattern: {
              value: /^\d+$/,
              message: "请输入数字",
            },
          }}
          placeholder="100"
          message={errors["copies_owned"]?.message}
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">
          提交
        </button>
      </form>
    </div>
  );
};

const Input = ({
  inputid,
  label,
  register,
  validation,
  placeholder,
  message,
}: any) => {
  // console.log(message);
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputid}>{label}</label>
      <input
        className="ring-2 ring-blue-200 p-2 focus:outline-blue-500"
        type="text"
        id={inputid}
        {...register(inputid, validation)}
        placeholder={placeholder}
        autoComplete="off"
      />
      <p className="text-red-500 text-[12px]">{message}</p>
    </div>
  );
};

export default UploadBookPage;
