import H2 from "@/app/components/H2";
import H6 from "@/app/components/H6";
import { bookItems } from "@/app/lib/data";
import Link from "next/link";

const UploadPage = () => {
  return (
    <div className="flex flex-col rounded-sm shadow-sm bg-white">
      {/* 头部 */}
      <div className="border-b border-[#eaecf0] w-full bg-gray-50 px-4 py-3 relative flex flex-col flex-wrap items-start gap-4 sm:flex-row sm:items-center">
        {/* 复选框 */}
        <div className="hidden items-center sm:flex">
          <input type="checkbox" />
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
              type="text"
            />
          </div>
        </div>
        {/* 分类 */}
        <div className="flex-wrap">
          {/* 点击之后弹出分类选择框 */}
          <div className="v-popper v-popper--theme-dropdown">
            {/* 文字描述 */}
            <div className="flex cursor-pointer select-none items-center text-sm text-gray-700 hover:text-black">
              <span className="mr-0.5">状态：全部</span>
              <span>
                <svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
                  <path fill="currentColor" d="m12 16l-6-6h12l-6 6Z"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 条目layout */}
      <div>
        <ul className="h-full w-full  ">
          {bookItems.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </ul>
      </div>
      {/* 数据统计layout */}
      <div className="flex justify-between items-center p-primary text-gray-500 text-[14px] ">
        <div>共 1 项数据</div>
        <div>pagination</div>
      </div>
    </div>
  );
};

const Card = ({
  title,
  category,
  author,
  publishedAt,
  copies_owned,
}: {
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  copies_owned: number;
}) => {
  return (
    <li className="p-primary hover:bg-gray-50 border-b border-[#eaecf0]">
      {/* indicator */}
      <div></div>
      {/* entity */}
      <div className="relative flex items-center w-full">
        <div className="mr-[1rem]">
          <input type="checkbox" className="rounded-sm " />
        </div>
        {/* entity start */}
        <div className="flex flex-1 gap-[1rem] items-center">
          <div className="inline-flex flex-col w-[27rem] max-w-[27rem] gap-[0.25rem]">
            <H2>{title}</H2>
            <div className="flex items-center gap-[0.5rem]">
              <H6 className="text-gray-500">
                作者:<Link href={"/"}>{author}</Link>
              </H6>
              <H6 className="text-gray-500">
                分类:<Link href={"/"}>{category}</Link>
              </H6>
              <H6 className="text-gray-500">
                出版日期:<Link href={"/"}>{publishedAt}</Link>
              </H6>
              <H6 className="text-gray-500">
                库存:<span>{copies_owned}</span>
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

export default UploadPage;
