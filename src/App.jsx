import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// TanStackQuery 클라이언트 설정
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
