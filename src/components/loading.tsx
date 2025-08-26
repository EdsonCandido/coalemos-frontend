import { Spinner } from '@/components/ui/spinner';

const Loading = ({ text }: { text?: string }) => {
  return (
    <div className="flex items-center gap-3 w-full justify-center p-3">
      <Spinner>{text}</Spinner>
    </div>
  );
};

export default Loading;
