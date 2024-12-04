declare global {
  // 要跟后端接口的名称保持一致
  interface Book {
    id?: number;
    title?: string;
    category_name?: string;
    publishedAt?: string;
    copied_owned?: number;
    author_list?: string[];
  }

  interface AuthorProps {
    id: number;
    name: string;
  }

  interface BookProps {
    id: number;
    title: string;
    publishedAt: string;
    copied_owned: number;
    category: {
      id: number;
      name: string;
    };
    authors: AuthorProps[];
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
