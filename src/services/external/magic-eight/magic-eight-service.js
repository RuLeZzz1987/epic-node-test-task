import request from '../../../core/request';

export default {
  askMagicEight(tracingId, question = 'ok') {
    return request.get(`http://magic-eight.com/resource/${question}`, {headers: {
      'Request-Id': tracingId
      }})
  }
}