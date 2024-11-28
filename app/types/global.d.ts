declare global {
  // 要跟后端接口的名称保持一致
  interface Book {
    title: string;
    author_id: number;
    publishedAt: string;
    category_id: number;
    copied_owned: number;
  }

  interface Category {
    name: string;
  }

  interface Author {
    name: string;
    book_id: number;
  }

  interface Member {
    name: string;
    class_name: string;
    phone: string;
  }

  interface Loan {
    book_id: number;
    member_id: number;
    loan_date: string;
    returned_date: string;
    returned: boolean;
  }
}

export {};
