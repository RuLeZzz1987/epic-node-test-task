import nock from 'nock';

const wassermanApi = nock('http://wasserman.com');

wassermanApi
  .persist()
  .get('/resource/ok')
  .reply(200, {answer: 'Fourier series'});
wassermanApi
  .persist()
  .get(/resource.+/)
  .reply(400, {message: 'bad question'});