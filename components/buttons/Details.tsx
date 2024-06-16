import Link from 'next/link';

type Props = {
  id: number;
  children: React.ReactNode;
};

export default function DetailBtn({ id, children }: Props) {
  return (
    <Link href={`admin/${id}/detail`} className="row-table__btn px-1 md:px-2 block lg:inline ">
      {children}
    </Link>
  );
}
