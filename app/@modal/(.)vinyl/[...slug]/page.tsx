import Modal from "@/components/Modal";

import VinylPage from "@/app/vinyl/[...slug]/page";

interface VinylModalProps {
  params: {
    slug: string[];
  };
}

export default async function VinylModal(props: VinylModalProps) {
  const { slug } = await props.params;

  return (
    <Modal>
      <VinylPage params={{ slug }} />
    </Modal>
  );
}
