"use client";
import useToastHook from "@/app/hooks/useToastHook";
import { fetchAuthors } from "@/app/lib/author";
import { addBook, updateBook } from "@/app/lib/books";
import { fetchCategories } from "@/app/lib/categories";
import { cn } from "@/app/lib/util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegCheckCircle } from "react-icons/fa";

interface FormData {
  title: string;
  author: string;
  publishedAt: string;
  category: string;
  copied_owned: number;
}
const UploadForm = ({ id, book }: { id?: number; book?: any }) => {
  const [categoryVal, setcategoryVal] = useState("");
  const [categoryList, setcategoryList] = useState([]);
  const [categorydropdownVisible, setcategoryDropdownVisible] = useState(false);
  const [categoryselectedTags, setcategorySelectedTags] = useState([]);
  const [authorselectedTags, setauthorSelectedTags] = useState([]);
  const [authorVal, setauthorVal] = useState("");
  // 过滤的作者列表
  const [authorList, setauthorList] = useState([]);
  const [authordropdownVisible, setauthorDropdownVisible] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;
  const [authorMessage, setauthorMessage] = useState("");
  const [categoryMessage, setcategoryMessage] = useState("");
  const router = useRouter();
  const categoryName = "category";
  const bookPage = "/dashboard/book";
  const { onOpenToast, setToastObj } = useToastHook();
  // console.log(errors);

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

  // console.log(book);

  // 更新页面，显示初始值
  useEffect(() => {
    // book可能返回错误的对象，所以需要判断一下
    if (book && book?.id) {
      setcategorySelectedTags([book.category.name]);
      setauthorSelectedTags(book.authors.map((author) => author.name));
    }
  }, [book]);

  useEffect(() => {
    // 创建页面
    if (!id) {
      // 如果选择了分类或作者，错误信息应该清空
      if (categoryselectedTags.length > 0) {
        setcategoryMessage("");
      }
      if (authorselectedTags.length > 0) {
        setauthorMessage("");
      }
    }
  }, [categoryselectedTags, authorselectedTags]);

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
  const SelectCategory = (name: string, e: any) => {
    e.preventDefault();
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
    setcategoryDropdownVisible(false);
    setcategoryVal("");
  };

  // 有作者时，选择作者
  const SelectAuthor = (name: string, e: any) => {
    e.preventDefault();
    // console.log(name);
    // 点击某个分类之后，分类状态值改变，过滤的分类组也应该改变
    const authorlist = (authors as any).filter((author) =>
      author.name.toLowerCase().includes(name.toLowerCase()),
    );

    // 作者不能重复
    if (!authorselectedTags.includes(name)) {
      setauthorSelectedTags([...authorselectedTags, name]);
    }

    // 过滤的作者列表
    setauthorList(authorlist);
    setauthorDropdownVisible(false);
    // 清空输入框
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
      router.push(bookPage);
      // open Toast

      setToastObj({
        message: "上架成功",
        Icon: FaRegCheckCircle,
      });
      onOpenToast();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      router.push(bookPage);
      setToastObj({
        message: "更新成功",
        Icon: FaRegCheckCircle,
      });
      onOpenToast();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 请求后端API
  const authenticate = (formData: any) => {
    // console.log("call submit");
    // console.log(formData);
    const { copied_owned } = formData;
    const mergeFormData = {
      ...formData,
      author_list: authorselectedTags,
      category_name: categoryselectedTags[0],
    };

    // 如果没有id，则是创建书籍
    if (!id) {
      // 作者和分类不能为空
      if (
        authorselectedTags.length === 0 ||
        categoryselectedTags.length === 0
      ) {
        if (authorselectedTags.length === 0) {
          setauthorMessage("请选择作者");
        }
        if (categoryselectedTags.length === 0) {
          setcategoryMessage("请选择分类");
        }
        return;
      }

      const copied_num = parseInt(copied_owned, 10);
      createBookMutation.mutate({
        ...mergeFormData,
        copied_owned: copied_num,
      });
    }
    // 如果有id，则是更新书籍
    if (id) {
      // 过滤掉空值
      Object.keys(mergeFormData).forEach((key) => {
        if (mergeFormData[key] === "") {
          delete mergeFormData[key];
        }
      });
      // 如果有库存字段，则变为正整数
      if (copied_owned) {
        const copied_num = parseInt(copied_owned, 10);
        updateBookMutation.mutate({
          id,
          ...mergeFormData,
          copied_owned: copied_num,
        });
        return;
      }
      updateBookMutation.mutate({
        id,
        ...mergeFormData,
      });
    }
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
          validation={
            book && book.id
              ? { required: false }
              : { required: { value: true, message: "请输入书名" } }
          }
          message={errors["title"]?.message}
          placeholder={book && book.id ? book.title : "论语"}
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
          message={authorMessage}
          startList={authors}
          filterList={authorList}
          setDropdownVisible={setauthorDropdownVisible}
          dropdownVisible={authordropdownVisible}
        />

        <Input
          inputid="publishedAt"
          label="出版日期"
          register={register}
          validation={
            book && book.id
              ? {
                  required: false,
                  pattern: {
                    value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
                    message: "请输入正确的日期格式",
                  },
                }
              : {
                  required: { value: true, message: "请输入出版日期" },
                  pattern: {
                    value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
                    message: "请输入正确的日期格式",
                  },
                }
          }
          placeholder={book && book.id ? book.publishedAt : "2023-01-01"}
          message={errors["publishedAt"]?.message}
        />
        <Select
          inputid={categoryName}
          label="分类"
          message={categoryMessage}
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
          validation={
            book && book.id
              ? {
                  required: false,
                  pattern: {
                    value: /^\d+$/,
                    message: "请输入正整数",
                  },
                }
              : {
                  required: { value: true, message: "请输入库存" },
                  pattern: {
                    value: /^\d+$/,
                    message: "请输入正整数",
                  },
                }
          }
          placeholder={book && book.id ? book.copied_owned : "100"}
          message={errors["copied_owned"]?.message}
        />
        <button
          type="submit"
          className=" mx-auto p-1 px-5 bg-blue-500 text-white hover:opacity-90 rounded-sm"
        >
          {id ? "更新" : "上架"}
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
  placeholder,
  message,
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
  // console.log("msg" + message);

  return (
    <div className="flex flex-col gap-1 relative">
      <h2>{label}</h2>
      {/* 点击分类按钮或创建按钮后显示标签 */}
      <div
        className={cn(
          "flex flex-wrap items-center ring-1 ring-blue-200 group focus-within:ring-blue-500 gap-1 rounded-sm",
          selectedTags.length > 0 && "px-2",
        )}
      >
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
      {/* 选择框的错误信息 */}
      {message.length !== 0 && (
        <p className="text-red-500 text-[12px]">{message}</p>
      )}

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
              onClick={(e) => handleSelect(item.name, e)}
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
