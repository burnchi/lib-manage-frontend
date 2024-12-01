"use client";
import { websiteData } from "@/app/lib/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Pagination = ({ maxPage }: { maxPage: number }) => {
  const pathname = usePathname();
  const paramsName = "page";
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const { defaultPage, defaultPageSize, pagePerBookButtons } = websiteData;
  const defaultSearh = "";
  let page = params.get("page") || String(defaultPage);
  let pageSize = params.get("pageSize") || String(defaultPageSize);
  let search = params.get("search") || defaultSearh;

  // default page to 1 if it's not a number or out of range
  const regex = /^[1-9][0-9]*?$/;

  // 地址栏参数不合法，则置为默认值
  if (!regex.test(page)) {
    // console.log("wrong text");
    page = "1";
  }
  if (Number(page) >= maxPage) {
    page = String(maxPage);
  }
  // console.log(pageButtons);
  // console.log(postsCount);
  const [pageNum, setPageNum] = useState("");

  const changePageSize = (pageSize: string) => {
    params.set("pageSize", pageSize);
    // 回到第一页
    params.delete("page");
    replace(`${pathname}?${params}`);
  };

  useEffect(() => {
    // 监听 blur 事件
    const onBlur = () => {
      // 如果有输入内容，则将其设置为当前页码
      if (pageNum !== "") {
        params.set(paramsName, pageNum);
        replace(`${pathname}?${params}`);
        // 清除状态，防止在同一页也会触发
        setPageNum("");
      }
    };
    // 防止没换页组件dom报错
    if (maxPage > 1) {
      const inputTag = document.getElementById("inputTag") as HTMLInputElement;
      // 页面改变，清除输入框内容
      inputTag.value = "";
      inputTag.addEventListener("blur", onBlur);
      return () => inputTag.removeEventListener("blur", onBlur);
    }
    // console.log(pageNum);
  });

  // 限制输入框内容
  const handleChange = (e) => {
    let inputValue = e.target.value;
    // console.log(inputValue);

    // 正则：第一位不能是0，后续可以是0-9
    if (!regex.test(inputValue) && inputValue !== "") {
      // console.log("wrong text");
      return;
    }
    if (Number(inputValue) >= maxPage) {
      inputValue = maxPage;
    }

    setPageNum(inputValue);
  };

  // 打开搜索框后才会生效,输入enter键后才会触发blur事件
  const handleInputKeyDown = (e) => {
    const inputTag = document.getElementById("inputTag") as HTMLInputElement;
    if (e.key === "Enter") {
      inputTag.blur();
    }
  };

  const handlePrev = () => {
    params.set(paramsName, String(Number(page) - 1));
    replace(`${pathname}?${params}`);
  };
  const handleNext = (item) => {
    params.set(paramsName, String(Number(page) + 1));
    replace(`${pathname}?${params}`);
  };

  return (
    <div className=" flex justify-center gap-2 items-center">
      {/* 有两页以上才显示分页 */}
      {maxPage > 1 && (
        <div className="flex items-center gap-4 ">
          <ChangePageButton
            handleClick={handlePrev}
            disabled={Number(page) <= 1}
          >
            &lt;
          </ChangePageButton>
          <div className="flex gap-3 items-center text-[15px]">
            <div className="w-[60px] py-0.5 hover:border-[#1677ff] focus-within:border-[#1677ff] border border-neutral-300 rounded-md overflow-hidden bg-bglight1 dark:bg-bgdark1">
              <input
                type="text"
                className="w-full h-full text-center bg-transparent flex justify-center items-center 
                focus:outline-none text-[13px] leading-none 
                "
                id="inputTag"
                placeholder={page}
                value={pageNum}
                onChange={handleChange}
                onKeyDown={handleInputKeyDown}
              />
            </div>
            <span>/</span>
            <span>{maxPage}</span>
          </div>
          <ChangePageButton
            handleClick={handleNext}
            disabled={Number(page) >= maxPage}
          >
            &gt;
          </ChangePageButton>
        </div>
      )}
      {/* 每页几条 */}
      <div className="relative group cursor-default">
        {`每页${pageSize}条`}
        <div className="w-auto h-auto group-hover:flex hidden absolute left-1/2 -translate-x-1/2 bottom-[calc(100%)] rounded-sm shadow-sm border  flex-col bg-bg">
          {pagePerBookButtons.map((item, index) => (
            <button
              className=" px-3 py-1 hover:bg-blue-500 hover:text-white whitespace-nowrap"
              key={item}
              onClick={() => changePageSize(item)}
            >{`每页${item}条`}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChangePageButton = ({ handleClick, disabled, children }) => {
  return (
    <button
      className="px-3 py-0.5 rounded-sm hover:bg-neutral-200 dark:hover:text-neutral-900 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-neutral-300"
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Pagination;
