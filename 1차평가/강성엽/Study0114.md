# 25.01.14

## Zustand & React Query 실습

### Zustand

```javascript
import { create } from 'zustand';

interface State {
  cnt: number;
  double: number;
  min: number;
  max: number;
}

interface Actions {
  actions: {
    increase: (key: keyof State) => void;
    decrease: (key: keyof State) => void;
    resetState: (key?: Array<keyof State>) => void;
  };
}

const initialState: State = {
  cnt: 1,
  double: 2,
  min: 0,
  max: 99,
};

export const useCountStore = create<State & Actions>((set) => ({
  ...initialState,
  actions: {
    increase: (key) => {
      set((state) => ({ [key]: state[key] + 1 }));
    },
    decrease: (key) => {
      set((state) => ({ [key]: state[key] - 1 }));
    },
    resetState: (keys) => {
      if (!keys) {
        set(initialState);
        return;
      }
      keys.forEach((key) => {
        set({ [key]: initialState[key] });
      });
    },
  },
}));
```

### React Query (useQuery)
```javascript
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

type ResponseValue = {
  msg: string;
  time: string;
};

const options = queryOptions<ResponseValue>({
  queryKey: ['delay'],
  queryFn: async () => {
    const res = await fetch('http://api.heropy.dev/v0/delay?t=1000');
    const data = res.json();
    if (!data) {
      throw new Error('문제발생!!!');
    }
    return data;
  },
  staleTime: 1000 * 5,
});

export default function DelayedData() {
  const queryClient = useQueryClient();
  const { data, isLoading, isPending, isFetching, isStale, refetch } =
    useQuery(options);

  function getCachedData() {
    const data = queryClient.getQueryData(['delay']);
    console.log(data);
  }

  return (
    <>
      <div>{data?.time}</div>
      <div>isStale??? {JSON.stringify(isStale)}</div>
      <div>isFetching: {JSON.stringify(isFetching)}</div>
      <div>isPending: {JSON.stringify(isPending)}</div>
      <div>isLoading: {JSON.stringify(isLoading)}</div>
      <button onClick={() => refetch()}>리프레시!!</button>
      <button onClick={getCachedData}>데이터 가져오기</button>
    </>
  );
}

```
