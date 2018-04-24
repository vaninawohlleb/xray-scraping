const Xray = require('x-ray');
const q = require('q');
const x = Xray();

var baseUrl = "https://www.kaercher.com/int/support/service/faqs.html";

module.exports = {
  getFaqs: function() {
    const defer = q.defer();

    x(baseUrl, '.panel', [
      {
        question: '.panel-heading',
        answer: '.panel-collapse',
      }
    ])(function(err, faqs) {
      if(err) {
        defer.reject(err);
      } else {
        faqs.map((faq, i) => {
          faqs[i].question = faq.question.replace(/[^A-Z0-9]+/gi, ' ')
          faqs[i].answer = faq.answer.replace(/[^A-Z0-9]+/gi, ' ')
        })

        defer.resolve({
          total: faqs.length,
          faqs: faqs
        });
      }
    });

    return defer.promise;
  }
}