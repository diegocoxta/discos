import Modal from "@/components/Modal";

import VinylPage from "@/app/vinyl/[id]/page";

interface VinylModalProps {
  params: {
    id: string;
  };
}

export default async function VinylModal(props: VinylModalProps) {
  const { id } = await props.params;

  return (
    <Modal>
      <VinylPage params={{ id }} />
    </Modal>
  );
}
