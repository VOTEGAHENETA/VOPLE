import CandidateInfoUpdateTemplate from '@/components/templates/CandidateInfoUpdateTemplate';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Candidate() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CandidateInfoUpdateTemplate />
      </QueryClientProvider>
    </div>
  );
}

export default Candidate;
