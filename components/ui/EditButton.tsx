// components/blog/EditButton.tsx
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => (
  <Button
    onClick={onClick}
    variant='outline'
    className='fixed top-8 right-8 shadow-lg hover:shadow-xl transition-all'
  >
    <Edit className='mr-2 h-4 w-4' />
    Edit Post
  </Button>
);

export default EditButton;
