# 2025.01.15

## React Query

### React Query (useInfiteQuery)

```javascript
const {
    data,
    isLoading,
    isFetching,
    isFetched,
    hasNextPage,
    fetchPreviousPage,
    fetchNextPage,
  } = useInfiniteQuery<Page>({
    queryKey: ['movies', queryText],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${queryText}&page=${pageParam}`
      );
      console.log(res.json());
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const maxPage = Math.ceil(
        Number.parseInt(pages[0].totalResults, 10) / 10
      );
      if (lastPage.Response === 'True' && pages.length < maxPage) {
        return pages.length + 1;
      }

      return undefined;
    },
    enabled: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (queryText) fetchPreviousPage();
  }, [queryText, fetchPreviousPage]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (searchText.trim()) {
        setQueryText(searchText);
      }
      if (!searchText.trim()) {
        setSearchText('');
        setQueryText('');
      }
    },
    [searchText]
  );
```

### React Query (useMutation)

```javascript
const queryClient = useQueryClient();

  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: async (newUser: User) => {
      const res = await fetch('https://api.heropy.dev/v0/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error('변이 중 에러 발생!!!');
      return res.json();
    },
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });

      const previousUsers = queryClient.getQueryData<UserList>(['users']);
      if (previousUsers) {
        queryClient.setQueryData<UserList>(
          ['users'],
          [...previousUsers, newUser]
        );
      }

      return previousUsers;
    },
    onSuccess: (data, newUser, context) => {
      console.log('onSuccess:', data, newUser, context);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error, newUser, context) => {
      console.log('onError:', error, newUser, context);
      if (context) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
    onSettled: (data, error, newUser, context) => {
      console.log('onSettled:', data, error, newUser, context);
    },
    retry: 1,
    retryDelay: 500,
  });
```
