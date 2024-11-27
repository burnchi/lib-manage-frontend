declare global {
  // 要跟后端接口的名称保持一致
  interface Book {
    title: string;
    author_id: number;
    publishedAt: string;
    category_id: number;
    copied_owned: number;
  }
}

export {};
