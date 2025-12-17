import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/apps', () => {
    return HttpResponse.json([
      { id: '1', name: 'supertokens-go' },
      { id: '2', name: 'supertokens-java' }
    ]);
  }),

  http.get('/api/apps/:appId/graph', ({ params }) => {
    return HttpResponse.json({
      nodes: [
        {
          id: '1',
          position: { x: 100, y: 100 },
          data: { label: 'Postgres', status: 'Healthy', cpu: 40 },
          type: 'default'
        },
        {
          id: '2',
          position: { x: 300, y: 200 },
          data: { label: 'Redis', status: 'Down', cpu: 70 },
          type: 'default'
        },
        {
          id: '3',
          position: { x: 500, y: 100 },
          data: { label: 'MongoDB', status: 'Degraded', cpu: 55 },
          type: 'default'
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' }
      ]
    });
  })
];