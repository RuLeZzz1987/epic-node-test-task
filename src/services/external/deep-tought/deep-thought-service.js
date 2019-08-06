import request from '../../../core/request';

export default {
  askMainQuestion(tracingId, question = 'ok') {
    return request.get(`http://ask.deep-tought.com/resource/${question}`, {headers: {
      'Request-Id': tracingId
      }})
  }
}