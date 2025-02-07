import { http, HttpResponse } from 'msw';

const { VITE_PUBLIC_API_URL } = import.meta.env;

export const handlers = [
  http.post(VITE_PUBLIC_API_URL + '/election', async ({ request }) => {
    return HttpResponse.json(request);
  }),
];
