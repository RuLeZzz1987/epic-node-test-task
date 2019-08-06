import request from '../../../core/request';

export default {
  askAnatolyWasserman(tracingId, question = 'ok') {
    return request.get(`http://wasserman.com/resource/${question}`, {
      headers: {
        'Request-Id': tracingId
      }
    });
  }
}