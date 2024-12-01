"use client";
import { fetchAuthors } from "@/app/lib/author";
import { addBook } from "@/app/lib/books";
import { fetchCategories } from "@/app/lib/categories";
import { cn } from "@/app/lib/util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  author: string;
  publishedAt: string;
  category: string;
  copied_owned: number;
}
const UploadForm = () => {
  const [categoryVal, setcategoryVal] = useState("");
  const [categoryList, setcategoryList] = useState([]);
  const [categorydropdownVisible, setcategoryDropdownVisible] = useState(false);
  const [categoryselectedTags, setcategorySelectedTags] = useState([]);
  const [authorselectedTags, setauthorSelectedTags] = useState([]);
  const [authorVal, setauthorVal] = useState("");
  const [authorList, setauthorList] = useState([]);
  const [authordropdownVisible, setauthorDropdownVisible] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;
  const router = useRouter();
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

    // 分类只能选一个
    if (categoryselectedTags.length < 1) {
      setcategorySelectedTags([...categoryselectedTags, name]);
    }

    // 清空输入框
    setcategoryList(categoryList);
    // setcategoryDropdownVisible(false);
    setcategoryVal("");
  };

  // 有作者时，选择作者
  const SelectAuthor = (name: string) => {
    // console.log(name);
    // 点击某个分类之后，分类状态值改变，过滤的分类组也应该改变
    const authorlist = (authors as any).filter((author) =>
      author.name.toLowerCase().includes(name.toLowerCase()),
    );

    setauthorSelectedTags([...authorselectedTags, name]);
    // 清空输入框
    setauthorList(authorlist);
    // setauthorDropdownVisible(false);
    setauthorVal("");
  };

  const DelCategorySelectedTag = (tag: string) => {
    // 删除某个分类标签
    const newTags = categoryselectedTags.filter((item) => item !== tag);
    setcategorySelectedTags(newTags);
  };

  const DelAuthorSelectedTag = (tag: string) => {
    // 删除某个分类标签
    const newTags = authorselectedTags.filter((item) => item !== tag);
    setauthorSelectedTags(newTags);
  };

  // 这是没有找到分类，需要创建分类的情况
  const CreateCategory = (name: string) => {
    // 根据分类名称创建分类
    // console.log("create category" + categoryVal);
    setcategorySelectedTags([...categoryselectedTags, name]);
    setcategoryVal("");
    // 取消focus
    setcategoryDropdownVisible(false);
  };

  // 这是没有找到作者，需要创建作者的情况
  const CreateAuthor = (name: string) => {
    // 根据分类名称创建分类
    // console.log("create author" + authorVal);
    setauthorSelectedTags([...authorselectedTags, name]);
    setauthorVal("");
    // 取消focus
    setauthorDropdownVisible(false);
  };

  const createBookMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      router.push("/dashboard/upload");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 请求后端API
  const authenticate = (formData: any) => {
    console.log("call submit");
    // console.log(formData);
    const { copied_owned } = formData;
    const mergeFormData = {
      ...formData,
      author_list: authorselectedTags,
      category_name: categoryselectedTags[0],
    }; // const { title, author, publishedAt, category, copied_owned } = formData;
    // console.log(mergeFormData);
    const copied_num = parseInt(copied_owned, 10);
    // console.log(copied_owned);
    // 需要请求其他表的指定数据，找到他们的id,请求完还需要更新一下作者id
    // 请求api
    createBookMutation.mutate({
      ...mergeFormData,
      copied_owned: copied_num,
    });
  };
  return (
    <div className="bg-bg ">
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
          label="作者"
          inputid="author"
          inputValue={authorVal}
          handleChange={ChangeAuthor}
          handleSelect={SelectAuthor}
          selectedTags={authorselectedTags}
          DelSelectedTag={DelAuthorSelectedTag}
          CreateItem={CreateAuthor}
          startList={authors}
          filterList={authorList}
          setDropdownVisible={setauthorDropdownVisible}
          dropdownVisible={authordropdownVisible}
        />

        <Input
          inputid="publishedAt"
          label="出版日期"
          register={register}
          validation={{
            pattern: {
              value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
              message: "请输入正确的日期格式",
            },
          }}
          placeholder="2023-01-01"
          message={errors["publishedAt"]?.message}
        />
        <Select
          inputid={categoryName}
          label="分类"
          inputValue={categoryVal}
          handleChange={ChangeCategory}
          handleSelect={SelectCategory}
          selectedTags={categoryselectedTags}
          DelSelectedTag={DelCategorySelectedTag}
          CreateItem={CreateCategory}
          startList={categories}
          filterList={categoryList}
          setDropdownVisible={setcategoryDropdownVisible}
          dropdownVisible={categorydropdownVisible}
        />
        <Input
          inputid="copied_owned"
          label="库存"
          register={register}
          validation={{
            pattern: {
              value: /^\d+$/,
              message: "请输入正整数",
            },
          }}
          placeholder="100"
          message={errors["copied_owned"]?.message}
        />
        <button
          type="submit"
          className=" mx-auto p-1 px-5 bg-blue-500 text-white hover:opacity-90 rounded-sm"
        >
          上架
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
        className="ring-1 ring-blue-200 p-2 focus:ring-blue-500 outline-none rounded-sm"
        type="text"
        id={inputid}
        {...register(inputid, validation)}
        placeholder={placeholder}
      />
      {/* 错误信息 */}
      <p className="text-red-500 text-[12px]">{message}</p>
    </div>
  );
};

const Select = ({
  inputValue,
  handleSelect,
  handleChange,
  selectedTags,
  DelSelectedTag,
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
      {/* 点击分类按钮或创建按钮后显示标签 */}
      <div className="flex flex-wrap items-center ring-1 ring-blue-200 group focus-within:ring-blue-500 gap-1 px-2 rounded-sm">
        {/* 渲染已选择的标签 */}
        {selectedTags.length > 0 &&
          selectedTags.map((tag) => (
            <div
              key={tag}
              className="bg-blue-500 text-white px-2 py-1 rounded-md flex gap-1 items-center "
            >
              {tag}
              <button
                className="text-[12px] "
                onClick={() => DelSelectedTag(tag)}
              >
                ✕
              </button>
            </div>
          ))}
        <input
          className="p-2  flex-1 outline-none"
          type="text"
          id={inputid}
          value={inputValue}
          ref={inputRef}
          onChange={handleChange}
          onFocus={() => setDropdownVisible(true)}
        />
      </div>

      {/* 浮空菜单 */}
      <div
        className={cn(
          "absolute top-[calc(100%+4px)] bg-bg shadow-sm rounded-sm w-full border p-1 max-h-[400px] overflow-y-auto z-10",
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
            onClick={() => CreateItem(inputValue)}
          >
            添加<span className="text-blue-500">{inputValue}</span>
            {label}
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
