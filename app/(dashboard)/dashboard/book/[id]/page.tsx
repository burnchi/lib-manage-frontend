"use client";
import UploadForm from "@/app/components/UploadForm";
import { findBookById } from "@/app/lib/books";
import { useQuery } from "@tanstack/react-query";

const UpdatePage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const { data: book } = useQuery({
    queryKey: ["books", id],
    queryFn: () => findBookById(Number(id)),
  });

  return (
    <div>
      <UploadForm id={Number(id)} book={book} />
    </div>
  );
};

export default UpdatePage;
