"use client";
import { addAuthor, fetchAuthors } from "@/app/lib/author";
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
const UploadForm = () => {
  const [categoryVal, setcategoryVal] = useState("");
  const [categoryList, setcategoryList] = useState([]);
  const [categorydropdownVisible, setcategoryDropdownVisible] = useState(false);
  const [authorVal, setauthorVal] = useState("");
  const [authorList, setauthorList] = useState([]);
  const [authordropdownVisible, setauthorDropdownVisible] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;
  const categoryName = "category";

  // 请求所有分类数据
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // 请求所有作者数据
  const { data: authors } = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
  });

  const ChangeAuthor = (e: any) => {
    // TODO: 点击某个分类后，再次点击输入框，应该清空已输入的内容
    // console.log(categories);
    // 查询某个分类
    const input = e.target.value;
    // console.log(input);
    // console.log(input);
    // 筛选出符合条件的分类
    const authorlist = (authors as any).filter((author) =>
      author.name.toLowerCase().includes(input.toLowerCase()),
    );
    // console.log(authorlist);

    setauthorVal(e.target.value);
    setauthorList(authorlist);
  };

  const ChangeCategory = (e: any) => {
    // TODO: 点击某个分类后，再次点击输入框，应该过滤已输入的内容
    // 更新分类组即可

    const input = e.target.value;
    // console.log(input);
    // 筛选出符合条件的分类
    const categoryList = (categories as any).filter((category) =>
      category.name.toLowerCase().includes(input.toLowerCase()),
    );
    // console.log(categoryList);

    setcategoryVal(e.target.value);
    setcategoryList(categoryList);
  };

  // 有分类时，选择分类
  const SelectCategory = (name: string) => {
    // 点击某个分类之后，分类状态值改变，过滤的分类组也应该改变
    const categoryList = (categories as any).filter((category) =>
      category.name.toLowerCase().includes(name.toLowerCase()),
    );
    setcategoryVal(name);
    setcategoryList(categoryList);
    setcategoryDropdownVisible(false);
  };

  // 有作者时，选择作者
  const SelectAuthor = (name: string) => {
    // 点击某个分类之后，分类状态值改变，过滤的分类组也应该改变
    const authorlist = (authors as any).filter((author) =>
      author.name.toLowerCase().includes(name.toLowerCase()),
    );
    setauthorVal(name);
    setauthorList(authorlist);
    setauthorDropdownVisible(false);
  };

  // 这是没有找到分类，需要创建分类的情况
  const CreateCategory = () => {
    // 根据分类名称创建分类
    console.log("create category" + categoryVal);
    createCategoryMutation.mutate({
      name: categoryVal,
    });
    // 取消focus
    setcategoryDropdownVisible(false);
  };

  // 这是没有找到作者，需要创建作者的情况
  const CreateAuthor = () => {
    // 根据分类名称创建分类
    console.log("create author" + authorVal);
    createAuthorMutation.mutate({
      name: authorVal,
      book_id: 1,
    });
    // 取消focus
    setauthorDropdownVisible(false);
  };

  const createBookMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const createAuthorMutation = useMutation({
    mutationFn: addAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });
  const createCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // 请求后端API
  const authenticate = (formData: any) => {
    const { title, author, publishedAt, category, copies_owned } = formData;
    const copies_num = Number(copies_owned);
    // console.log(typeof copies_num);
    // 需要请求其他表的指定数据，找到他们的id,请求完还需要更新一下作者id
    // 请求api
    createBookMutation.mutate({
      title,
      publishedAt,
      copied_owned: copies_num,
      category_id: 2,
      author_id: 2,
    });
  };
  return (
    <div className="bg-bg">
      <form
        className="bg-transparent m-auto flex flex-col p-9 gap-y-4 shadow-sm rounded-sm"
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
          inputValue={authorVal}
          handleChange={ChangeAuthor}
          handleSelect={SelectAuthor}
          CreateItem={CreateAuthor}
          startList={authors}
          filterList={authorList}
          setDropdownVisible={setauthorDropdownVisible}
          dropdownVisible={authordropdownVisible}
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
          placeholder="2023-01-01"
          message={errors["publishedAt"]?.message}
        />
        <Select
          inputValue={categoryVal}
          handleChange={ChangeCategory}
          handleSelect={SelectCategory}
          CreateItem={CreateCategory}
          startList={categories}
          filterList={categoryList}
          setDropdownVisible={setcategoryDropdownVisible}
          dropdownVisible={categorydropdownVisible}
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
          placeholder="101"
          message={errors["copies_owned"]?.message}
        />
        <button type="submit" className="p-1 bg-blue-500 text-white">
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
      <h2>{label}</h2>
      <input
        className="ring-1 ring-blue-200 p-2 focus:outline-blue-500"
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
  inputValue,
  handleSelect,
  handleChange,
  CreateItem,
  startList,
  filterList,
  setDropdownVisible,
  dropdownVisible,
  inputid,
  label,
}: any) => {
  let filterlists = [];
  // console.log(inputValue);
  if (inputValue.length === 0 && startList && startList.length > 0) {
    // console.log("empty");
    filterlists = startList;
  }
  if (inputValue.length > 0) {
    // console.log("noempty");
    filterlists = filterList;
  }
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  // console.log(filterlists);

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
    <div className="flex flex-col gap-1 relative">
      <h2>{label}</h2>
      <input
        className="ring-1 ring-blue-200 p-2 focus:outline-blue-500 w-full "
        type="text"
        id={inputid}
        value={inputValue}
        ref={inputRef}
        onChange={handleChange}
        onFocus={() => setDropdownVisible(true)}
      />
      <div
        className={cn(
          "absolute top-[calc(101%+4px)] bg-bg shadow-sm rounded-sm w-full border p-1 max-h-[400px] overflow-y-auto z-10",
          dropdownVisible ? "block" : "hidden",
        )}
        ref={dropdownRef}
      >
        {filterlists.length > 0 ? (
          filterlists.map((item) => (
            <button
              className="py-2 px-2 hover:bg-gray-50 w-full text-left"
              key={item.name}
              onClick={() => handleSelect(item.name)}
            >
              {item.name}
            </button>
          ))
        ) : (
          // 有创建字样的按钮，才会调用创建api
          <button
            className="py-2 px-2 hover:bg-gray-50 w-full text-left"
            onClick={CreateItem}
          >
            创建<span className="text-blue-499">{inputValue}</span>分类
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
