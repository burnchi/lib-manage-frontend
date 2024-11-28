"use client";
import { addBook } from "@/app/lib/books";
import { addCategory, fetchCategories } from "@/app/lib/categories";
import { cn } from "@/app/lib/util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  author: string;
  publishedAt: string;
  category: string;
  copies_owned: number;
}
const UploadBookPage = () => {
  const [categoryVal, setcategoryVal] = useState("");
  const [authorVal, setauthorVal] = useState("");
  const [categoryList, setcategoryList] = useState([]);

  const categoryName = "category";
  // 请求所有分类
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const ChangeCategory = (e: any) => {
    // console.log(categories);
    // 查询某个分类
    const input = e.target.value;
    // 筛选出符合条件的分类
    const categoryList = categories?.filter((category) =>
      category.name.toLowerCase().includes(input.toLowerCase()),
    );
    // console.log(categoryList);
    // const { data: category } = useQuery({
    //   queryKey: ["categories", input],
    //   queryFn: () => fetchCategoryByName(input),
    // });

    setcategoryVal(e.target.value);
    setcategoryList(categoryList);
  };

  const ChangeAuthor = (e: any) => {
    setauthorVal(e.target.value);
  };

  const handleSelect = (name: string, inputid: string) => {
    console.log(name);
    if (inputid === categoryName) {
      setcategoryVal(name);
    } else if (inputid === "author") {
      setauthorVal(name);
    }
    // 取消focus
  };

  const CreateItem = (inputid: string) => {
    if (inputid === categoryName) {
      // 根据分类名称创建分类
      // console.log("create category" + categoryVal);
      createCategoryMutation.mutate({ name: categoryVal });
      // 取消focus
    } else if (inputid === "author") {
    }
  };

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

  const createCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const authenticate = (formData: any) => {
    const { title, author, publishedAt, category, copies_owned } = formData;
    const copies_num = Number(copies_owned);
    // console.log(typeof copies_num);
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
        <Select
          value={authorVal}
          handleChange={ChangeAuthor}
          handleSelect={handleSelect}
          startList={[]}
          filterList={[]}
          inputid="author"
          label="作者"
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
        <Select
          value={categoryVal}
          handleChange={ChangeCategory}
          handleSelect={handleSelect}
          CreateItem={CreateItem}
          startList={categories}
          filterList={categoryList}
          inputid={categoryName}
          label="分类"
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
      <h1>{label}</h1>
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

const Select = ({
  value,
  handleSelect,
  handleChange,
  CreateItem,
  startList,
  filterList,
  inputid,
  label,
}: any) => {
  let filterlists = [];
  // console.log(value);
  if (value.length === 0 && startList && startList.length > 0) {
    // console.log("empty");
    filterlists = startList;
  }
  if (value.length > 0) {
    // console.log("noempty");
    filterlists = filterList;
  }
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 如果点击的区域不是 input 或 dropdownMenu，隐藏菜单
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-col gap-1 ">
      <h1>{label}</h1>
      <div className="relative ">
        <input
          className="ring-2 ring-blue-200 p-2 focus:outline-blue-500 w-full "
          type="text"
          id={inputid}
          value={value}
          ref={inputRef}
          onChange={handleChange}
          onFocus={() => setDropdownVisible(true)}
        />
        <div
          className={cn(
            "absolute top-[calc(100%+4px)] bg-bg shadow-sm rounded-sm w-full border p-1",
            dropdownVisible ? "block" : "hidden",
          )}
          ref={dropdownRef}
        >
          {filterlists.length > 0 ? (
            filterlists.map((item) => (
              <button
                className="py-3 px-2 hover:bg-gray-50 w-full text-left"
                key={item.name}
                onClick={() => handleSelect(item.name, inputid)}
              >
                {item.name}
              </button>
            ))
          ) : (
            // 有创建字样的按钮，才会调用创建api
            <button
              className="py-3 px-2 hover:bg-gray-50 w-full text-left"
              onClick={() => CreateItem(inputid)}
            >
              创建<span className="text-blue-500">{value}</span>分类
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadBookPage;
