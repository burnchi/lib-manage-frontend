"use client";
import H2 from "@/app/components/H2";
import H6 from "@/app/components/H6";
import Pagination from "@/app/components/Pagination";
import openModalhook from "@/app/hooks/openModalhook";
import { searchAuthorHook } from "@/app/hooks/searchAuthorHook";
import { searchCategoryHook } from "@/app/hooks/searchCategoryHook";
import { selectCardHook } from "@/app/hooks/selectCardHook";
import { fetchAuthors } from "@/app/lib/author";
import { deleteBook, findBooks } from "@/app/lib/books";
import { fetchCategories } from "@/app/lib/categories";
import { websiteData } from "@/app/lib/data";
import { cn } from "@/app/lib/util";
import ModalProvider from "@/app/providers/ModalProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline, IoIosWarning } from "react-icons/io";

const UploadTable = () => {
  // const { page, pageSize } = usePagination();
  const [currentPageBooks, setCurrentPageBooks] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const { defaultPage, defaultPageSize } = websiteData;
  const { categoryVal, setcategoryVal } = searchCategoryHook();
  const { authorVal, setauthorVal } = searchAuthorHook();
  const { selectedCardList, setselectedCardList } = selectCardHook();
  const { onOpen, onClose } = openModalhook();

  // 获取当前页码
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  let page = parseInt(params.get("page"), 10) || defaultPage;
  let pageSize = parseInt(params.get("pageSize"), 10) || defaultPageSize;
  let search = params.get("search") || "";
  const searchRef = useRef(null);
  const pathname = usePathname();
  const dropdownItems = ["分类", "作者"];
  let category = params.get("category") || "";
  let author = params.get("author") || "";
  const queryClient = useQueryClient();

  // console.log(page, pageSize);

  const { replace } = useRouter();
  // 请求所有书籍数据
  const { data: bookObj } = useQuery({
    queryKey: ["books", page, pageSize, search, author, category],
    queryFn: () => findBooks({ page, pageSize, search, author, category }),
  });

  // 分类下拉菜单
  const { data: categoryObj } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });
  // 作者下拉菜单
  const { data: authorObj } = useQuery({
    queryKey: ["authors"],
    queryFn: () => fetchAuthors(),
  });

  // const { books } = data;
  let books = [];
  let totalCount = 0;
  // console.log(bookObj?.books);
  let totalPages = 0;

  // 刚开始请求数据时，data 为 undefined，需要判断一下
  if (bookObj?.books) {
    books = bookObj.books;
    totalCount = bookObj.totalCount;
    totalPages = bookObj.totalPages;
  }

  const selectAllCard = (e) => {
    let newList = [];
    if (bookObj && bookObj?.books) {
      if (e.target.checked) {
        newList = bookObj.books.map((book) => ({
          id: book.id,
          title: book.title,
        }));
        setselectedCardList(newList);
      } else {
        setselectedCardList([]);
      }
    }
    // console.log(selectedCardList);
  };

  // 渲染下拉菜单
  const dropdownMenu = dropdownItems.map((item) => {
    if (item === "分类") {
      return (
        <DropdownMenu
          key={item}
          title={item}
          menuItems={categoryObj}
          searchVal={categoryVal}
          setsearchVal={setcategoryVal}
        />
      );
    }
    if (item === "作者") {
      return (
        <DropdownMenu
          key={item}
          title={item}
          menuItems={authorObj}
          searchVal={authorVal}
          setsearchVal={setauthorVal}
        />
      );
    }
  });

  const searchCategory = (name: string) => {
    params.set("category", name);
    params.delete("search");
    // 跳转到第一页
    params.delete("page");
    replace(`${pathname}?${params}`);
  };

  const searchAuthor = (name: string) => {
    params.set("author", name);
    params.delete("search");
    // 跳转到第一页
    params.delete("page");
    replace(`${pathname}?${params}`);
  };

  const ChangeSearch = (e: any) => {
    setsearchVal(e.target.value);
  };

  const clearSearch = () => {
    setsearchVal("");
    setcategoryVal("");
    setauthorVal("");
    replace(`${pathname}`);
  };

  // 监听回车搜索
  const handleInputKeyDown = (e: any) => {
    if (e.key === "Enter" && searchRef?.current) {
      searchRef.current.blur();
      // 防止输入框没内容时，搜索参数也被添加到 url 中
      if (searchVal.length !== 0) {
        params.set("search", searchVal);
        // 跳转到第一页
        params.delete("page");
        replace(`${pathname}?${params}`);
      }
    }
  };

  const openComfirmDialog = () => {
    // console.log("openComfirmDialog");
    onOpen();
  };

  const delBookMutation = useMutation({
    mutationFn: deleteBook,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      // 清除状态，关闭弹窗
      setselectedCardList([]);
      onClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteComfirm = () => {
    const newIdList = selectedCardList.map((item) => item.id);

    // 批量删除
    newIdList.forEach((id) => {
      delBookMutation.mutate(id);
    });

    // console.log(newIdList);
    // del books
  };

  const cancelComfirm = () => {
    // console.log("cancel");
    onClose();
  };

  // 清除搜索框
  useEffect(() => {
    // 监听 blur 事件
    const onBlur = () => {
      if (searchVal.length !== 0) {
        params.set("search", searchVal);
        params.delete("category");
        params.delete("author");
        params.delete("page");
        replace(`${pathname}?${params}`);
      }
    };
    searchRef?.current?.addEventListener("blur", onBlur);
    return () => {
      searchRef?.current?.removeEventListener("blur", onBlur);
    };
  }, [searchVal]);

  return (
    <div className="flex flex-col mb-[10vh] rounded-sm shadow-sm bg-white">
      {/* 头部 */}
      <div className="border-b border-[#eaecf0] w-full bg-gray-50 px-4 py-3 relative flex flex-col flex-wrap items-start gap-4 sm:flex-row sm:items-center">
        {/* 复选框 */}
        <div className="hidden items-center sm:flex">
          <input type="checkbox" onChange={selectAllCard} />
        </div>
        {/* 搜索框 */}
        <div className="flex w-full flex-1 items-center sm:w-auto">
          <div
            className=" bg-white inline-flex items-center sm:w-auto w-full py-4 border border-gray-300 h-9  overflow-hidden 
                focus-within:border-primary focus-within:shadow-sm sm:max-w-lg transition-all"
          >
            <input
              placeholder="输入关键词搜索"
              className="resize-none w-full text-black block  px-3 text-sm focus:outline-none"
              value={searchVal}
              ref={searchRef}
              onChange={ChangeSearch}
              onKeyDown={handleInputKeyDown}
              type="text"
            />
          </div>
          {/* 清除搜索框按钮 */}
          {searchVal.length > 0 && <ResetButton clearSearch={clearSearch} />}
          {/* 批量操作按钮 */}
          {selectedCardList.length > 0 && (
            <button
              className="text-red-500 px-2 py-1 hover:text-red-600 text-[14px]"
              onClick={openComfirmDialog}
            >
              批量删除
            </button>
          )}
        </div>
        {/* 批量操作弹窗 */}
        <ModalProvider>
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[300px]  z-[70] rounded-md shadow-md p-3 space-y-3">
            <H2 className="text-[15px] flex gap-2 items-center">
              <IoIosWarning className="text-yellow-400" size={18} />
              是否删除
            </H2>
            <div className="space-x-1">
              {selectedCardList.map((item) => (
                <div className="text-gray-500">{item.title}</div>
              ))}
            </div>
            <div className="flex  items-center gap-2 ">
              <button
                className="px-3 py-1 rounded-sm bg-green-400  hover:opacity-90"
                onClick={deleteComfirm}
              >
                确定
              </button>
              <button
                className="px-3 py-1 rounded-sm bg-red-500 text-white hover:opacity-80"
                onClick={cancelComfirm}
              >
                取消
              </button>
            </div>
          </div>
        </ModalProvider>

        {/* 分类/作者下拉菜单 */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* 展示选择文本 */}

          {(category || author) && <ResetButton clearSearch={clearSearch} />}
          {/* 点击之后弹出分类选择框 */}
          {dropdownMenu}
        </div>
      </div>
      {/* 条目layout */}
      <div>
        <ul className="h-full w-full  ">
          {books &&
            books.length > 0 &&
            books.map((book: BookProps) => (
              <Card
                key={book.id}
                id={book.id}
                title={book.title}
                publishedAt={book.publishedAt}
                copied_owned={book.copied_owned}
                category={book.category.name}
                authors={book.authors.map((author) => author.name)}
              />
            ))}
        </ul>
      </div>
      {/* 数据统计layout */}
      <div className="flex justify-between items-center p-primary text-gray-500 text-[14px] ">
        <div>共 {totalCount} 项数据</div>
        {/* 分页按钮 */}
        <Pagination maxPage={totalPages} />
      </div>
    </div>
  );
};

// 卡片组件
const Card = ({
  id,
  title,
  category,
  authors,
  publishedAt,
  copied_owned,
}: {
  id: number;
  title: string;
  category: string;
  authors: string[];
  publishedAt: string;
  copied_owned: number;
}) => {
  const updateHref = `/dashboard/book/${id}`;
  const { selectedCardList, setselectedCardList } = selectCardHook();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const paramsCategory = params.get("category");
  const paramsAuthor = params.get("author");
  // console.log(selectedCardList);
  const checked = selectedCardList.some((item) => item.id === id);

  // 选择框选中时
  const hasSelected = (e, id) => {
    let newList = selectedCardList;
    if (e.target.checked) {
      const hasChecked = newList.some((item) => {
        item.id === id;
      });
      if (!hasChecked) {
        newList.push({ id, title }); // 添加新值
      }
    } else {
      newList = newList.filter((item) => item.id !== id); // 移除旧值
      // console.log(newList);
    }
    setselectedCardList(newList);
  };
  // console.log(selectedCardList);
  return (
    <li className="p-primary hover:bg-gray-50 border-b border-[#eaecf0] relative">
      {/* indicator */}
      {checked && (
        <div
          className="h-[90%] w-[0.25rem] bg-primary absolute top-1/2 -translate-y-1/2 left-0
        "
        />
      )}
      {/* entity */}
      <div className="relative flex items-center w-full">
        {/* 选择框 */}
        <div className="mr-[1rem]">
          <input
            type="checkbox"
            className="rounded-sm"
            checked={checked}
            onChange={(e) => hasSelected(e, id)}
            id={String(id)}
          />
        </div>
        {/* entity start */}
        <div className="flex flex-1 gap-[1rem] items-center">
          <div className="inline-flex flex-col items-start  gap-[0.25rem]">
            {/* 标题 */}
            <Link
              href={updateHref}
              className="text-base w-auto hover:text-black text-gray-800"
            >
              {title}
            </Link>
            {/* 标题底下部分 */}
            <div className="flex items-center  gap-[0.5rem]">
              <H6 className="text-gray-500 ">
                作者:
                <div className="inline-flex items-center gap-[0.25rem]">
                  {authors.map((author) => (
                    <span
                      className={cn(
                        author === paramsAuthor ? "text-blue-500" : "",
                      )}
                      key={author}
                    >
                      {author}
                    </span>
                  ))}
                </div>
              </H6>
              <H6 className="text-gray-500">
                分类:
                <span
                  className={cn(
                    category === paramsCategory ? "text-blue-500" : "",
                  )}
                >
                  {category}
                </span>
              </H6>
              <H6 className="text-gray-500">
                出版日期:<span>{publishedAt}</span>
              </H6>
              <H6 className="text-gray-500">
                库存:<span>{copied_owned}</span>
              </H6>
            </div>
          </div>
        </div>

        {/* entity end */}
        <div className="flex items-center gap-[1.5rem]">
          <div className="bg-gray-100 inline-flex justify-center items-center h-[2rem] w-[2rem] rounded-full">
            <span>1</span>
          </div>
          {/* <span>11</span> */}
        </div>
      </div>
    </li>
  );
};

const DropdownMenu = ({ title, menuItems, searchVal, setsearchVal }) => {
  const [open, setopen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  // 获取当前页码
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  let category = params.get("category") || "";
  let author = params.get("author") || "";
  const pathname = usePathname();
  const { replace } = useRouter();

  let filteredItems = [];

  if (searchVal.length === 0) {
    filteredItems = menuItems;
  }

  if (searchVal.length > 0) {
    filteredItems = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchVal.toLowerCase()),
    );
  }

  const toggleDropdown = () => {
    setopen((status) => !status);
  };

  // 查找分类或作者
  const ChangeSearch = (e) => {
    setsearchVal(e.target.value);
  };

  // 点击分类或作者中的按钮
  const searchItems = (name: string) => {
    const labelName = title === "分类" ? "category" : "author";
    toggleDropdown();
    params.delete("category");
    params.delete("author");
    params.delete("search");
    params.set(labelName, name);
    // 跳转到第一页
    params.delete("page");
    replace(`${pathname}?${params}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 如果点击的区域不是 input 或 dropdownMenu，隐藏菜单
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        toggleDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="flex cursor-pointer select-none items-center text-sm text-gray-700 hover:text-black"
        onClick={toggleDropdown}
        ref={menuRef}
      >
        <span className="mr-0.5">{title}</span>
        {/* 下尖号 */}
        <span>
          <svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
            <path fill="currentColor" d="m12 16l-6-6h12l-6 6Z"></path>
          </svg>
        </span>
      </button>
      {/* 下拉框 */}
      {open && (
        <div
          className={cn(
            "absolute top-[calc(100%+4px)] bg-bg shadow-sm rounded-sm w-[13rem] border  max-h-[300px] overflow-y-auto z-10 left-1/2 -translate-x-1/2",
            open ? "block" : "hidden",
          )}
          ref={dropdownRef}
        >
          <div className="p-2">
            {/* 搜索框 */}
            <div
              className=" bg-white inline-flex p-1 items-center sm:w-auto w-full  border border-gray-300 h-9  overflow-hidden 
                focus-within:border-primary focus-within:shadow-sm sm:max-w-lg transition-all"
            >
              <input
                placeholder="输入关键词搜索"
                className="resize-none w-full text-black block  px-3 text-sm focus:outline-none"
                onChange={ChangeSearch}
                value={searchVal}
                type="text"
              />
            </div>
          </div>
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((item, inx) => (
              <button
                key={inx}
                className="py-2 px-2 hover:bg-gray-50 w-full flex items-center justify-between border-t"
                onClick={() => searchItems(item.name)}
              >
                <H6 className="text-black">{item.name}</H6>
                <H6 className="text-black">{`${item.book_count}篇文章`}</H6>
              </button>
            ))
          ) : (
            <div className="p-2 text-[14px] text-gray-500">未找到相关结果</div>
          )}
        </div>
      )}
    </div>
  );
};

const ResetButton = ({ clearSearch }) => {
  return (
    <button className="p-2 group">
      <IoIosCloseCircleOutline
        className="text-red-500 group-hover:opacity-90"
        onClick={clearSearch}
      />
    </button>
  );
};
export default UploadTable;
