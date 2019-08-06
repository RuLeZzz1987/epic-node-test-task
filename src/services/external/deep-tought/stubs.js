import nock from 'nock';

const deepThoughtApi = nock('http://ask.deep-tought.com');

deepThoughtApi.persist()
  .get('/resource/ok')
  .reply(200, {answer: '42'});
deepThoughtApi
  .persist()
  .get(/resource.+/)
  .reply(503, {message: 'Answer is not ready yet'});