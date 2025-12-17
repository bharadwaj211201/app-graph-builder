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
          type: 'service',
          position: { x: 200, y: 120 },
          data: { 
            label: 'Postgres', 
            status: 'Healthy', 
            cpu: 40 
          }
        },
        {
          id: '2',
          type: 'service',
          position: { x: 520, y: 260 },
          data: { label: 'Redis', status: 'Down', cpu: 75 }
        },
        {
          id: '3',
          type: 'service',
          position: { x: 860, y: 120 },
          data: { label: 'MongoDB', status: 'Degraded', cpu: 55 }
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' }
      ]
    });
  })
];