/******************************************************************************
 *
 * Copyright 2019 IBM Corporation and others.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 ******************************************************************************/
function myFunction() {
  console.log("testing")
}

class Survey {
    constructor() {
        this.$survey = $('#survey-modal');
        this.$questions = $('#survey-modal .survey-modal-question');

        this.pagination = this.$survey.attr('data-pagination') === 'true';
        this.completed = false;

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.submit = this.submit.bind(this);

        this.parseQuestions();
        this.attachEvents();

        if (this.pagination) {
            this.update();
        }
    }

    parseQuestions() {
        this.index = 0;
        this.count = this.$questions.length;

        this.answers = Array.from({ length: this.count }).fill(null);
        this.questions = this.$questions.map(function() {
            let options = $(this).attr('data-options');
            options = options ? options.split(',') : null;

            return {
                type: $(this).attr('data-type'),
                question: $(this).attr('data-question'),
                required: $(this).attr('data-required') === 'true',
                options
            };
        }).get();
    }

    attachEvents() {
        if (this.pagination) {
            $('#survey-modal-prev').click(this.previous);
            $('#survey-modal-next').click(this.next);
        }

        $('#survey-modal-submit').click(this.submit);

        this.$survey.on('show.bs.modal', function() {
            $('.navbar').css('z-index', 0);
        });
        
        this.$survey.on('hidden.bs.modal', function() {
            $('.navbar').css('z-index', 9999);
        });
    }

    getAnswers() {
        this.answers = this.questions.map((question, index) => {
            const $elem = $(this.$questions[index]);
            const type = question.type;

            switch (type) {
            case 'choice':
                return $elem.find('input[type=radio]:checked').val() || null;
            case 'multi':
                return $elem.find('input[type=checkbox]:checked').map(function() {
                    return $(this).val();
                }).get();
            case 'text':
                return $elem.find('textarea').val();
            default:
                return null;
            }
        });
    }

    validateQuestion(question, answer) {
        return !question.required || (answer !== undefined && answer !== null && (typeof answer !== 'string' || answer.trim() !== ''));
    }

    validateAll() {
        return this.questions.every((question, i) => {
            const answer = this.answers[i];
            return this.validateQuestion(question, answer);
        });
    }

    update() {
        $('#survey-modal .survey-modal-question[data-active="true"]').removeAttr('data-active');
        $('#survey-modal-footer button').removeClass('show');

        $(`#survey-modal .survey-modal-question:nth-child(${this.index + 1})`).attr('data-active', true);

        if (this.index > 0) {
            $('#survey-modal-prev').addClass('show');
        }

        if (this.index === this.count - 1) {
            $('#survey-modal-submit').addClass('show');
        } else {
            $('#survey-modal-next').addClass('show');
        }
    }

    next() {
        this.getAnswers();

        const currentQuestion = this.questions[this.index];
        const currentAnswer = this.answers[this.index];

        let isValid = this.validateQuestion(currentQuestion, currentAnswer);
        if (isValid) {
            this.index += 1;
            this.update();
        }
    }

    previous() {
        this.index -= 1;
        this.update();
    }

    submit() {
        this.getAnswers();
        let isValid = this.validateAll();
        if (isValid) {
            console.log(this.answers);
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}

function getFeedback()
{
    const survey = new Survey();
    survey.$survey.modal('toggle');
}
