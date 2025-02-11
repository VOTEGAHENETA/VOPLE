import ChatBoard from '@/components/organisms/ChatBoard';

const Result = () => {
  return (
    <div>
      <ChatBoard type='session' theme='light' userId={1} sessionId={1} />
    </div>
  );
};

export default Result;
