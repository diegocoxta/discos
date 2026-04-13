import Modal from "@/components/Modal";

import VinylPage from "@/app/vinyl/[id]/page";
import { getCollection } from "@/app/discogs";

interface VinylModalProps {
  params: {
    id: string;
  };
}

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const collection = await getCollection("0");

  return collection?.releases?.map((record) => ({
    id: record.id.toString(),
  }));
}

export default async function VinylModal(props: VinylModalProps) {
  const { id } = await props.params;

  return (
    <Modal>
      <VinylPage params={{ id }} />
    </Modal>
  );
}
