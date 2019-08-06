import nock from 'nock';

const magicEightApi = nock('http://magic-eight.com');

magicEightApi.persist()
  .get('/resource/ok')
  .reply(200, {answer: 'You\'re on the right way'});
magicEightApi.persist()
  .get(/resource.+/)
  .reply(500, {message: 'Try later'});