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

function toggleSurveyPopup(open) {
    $('#survey-popup').attr('aria-hidden', !open);
}

function handlePopupButtonClick() {
    localStorage.setItem('doNotShowSurvey', $('#survey-popup-noshow').is(':checked'));
    toggleSurveyPopup(false);
}

function loadSurveyPopup(delay, visits) {
    let doNotShow = localStorage.getItem('doNotShowSurvey') === 'true';

    if (!doNotShow) {
        let visitCount = +localStorage.getItem('visitCount') || 0;
        localStorage.setItem('visitCount', visitCount + 1);

        if (visitCount >= visits) {
            setTimeout(toggleSurveyPopup.bind(null, true), delay);
        }
    }
}

$(document).ready(function() {
    let surveyData = {
        user: null,
        answers: []
    };
    
    let questionIndex = 0;
    let questionCount = 0;

    let getUserGroupSelector = function() {
        return `.survey-modal-user-group[data-user="${surveyData.user}"]`;
    };

    let getActiveQuestionSelector = function() {
        return `${getUserGroupSelector()} .survey-modal-question[data-active="true"]`;
    };

    let getCurrentQuestionSelector = function() {
        return `${getUserGroupSelector()} .survey-modal-question:nth-child(${questionIndex})`;
    };

    let setQuestionsData = function() {
        let $questions = $(`${getUserGroupSelector()} .survey-modal-question`);

        surveyData.answers = $questions.map(function() {
            let options = $(this).attr('data-options');
            options = options ? options.split(',') : null;

            return {
                type: $(this).attr('data-type'),
                question: $(this).attr('data-question'),
                required: $(this).attr('data-required') === 'true',
                options: options
            };
        }).get();

        questionIndex = 1;
        questionCount = $questions.length;
    };

    let setActiveQuestion = function() {
        $(getActiveQuestionSelector()).removeAttr('data-active');
        $('#survey-modal-footer button').removeClass('show');

        if (questionIndex === 0) {
            questionCount = 0;
            $('#survey-modal-body').removeAttr('data-selection');
        } else {
            $(getCurrentQuestionSelector()).attr('data-active', true);

            $('#survey-modal-prev').addClass('show');
            if (questionIndex === questionCount) {
                $('#survey-modal-submit').addClass('show');
            } else {
                $('#survey-modal-next').addClass('show');
            }
        }
    };

    let getQuestionAnswer = function(type) {
        const $question = $(getCurrentQuestionSelector());

        switch (type) {
        case 'choice':
            return $(`${getCurrentQuestionSelector()} input[type=radio]:checked`).val();
        case 'multi':
            return $(`${getCurrentQuestionSelector()} input[type=checkbox]:checked`).map(function() {
                return $(this).val();
            }).get();
        case 'text':
            return $(`${getCurrentQuestionSelector()} textarea`).val();
        default:
            return null;
        }
    };

    let selectUser = function() {
        surveyData.user = $(this).attr('data-user');
        $('#survey-modal-body').attr('data-selection', surveyData.user);

        setQuestionsData();
        setActiveQuestion();
    };

    let updateAnswer = function() {
        let canProceed = true;
        if (questionIndex > 0) {
            let questionData = surveyData.answers[questionIndex - 1];

            questionData.answer = getQuestionAnswer(questionData.type);
            if (questionData.required && !questionData.answer) {
                canProceed = false;
            }
        }
        return canProceed;
    };

    let updateQuestionIndex = function(step) {
        let valid = updateAnswer();
        if (step < 0 || valid) {
            questionIndex += step;
            setActiveQuestion();
        }
    };

    let submitSurvey = function(event) {
        let valid = updateAnswer();
        if (!valid) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            console.log(surveyData);
        }
    };

    $('#survey-modal').on('show.bs.modal', function() {
        $('.navbar').css('z-index', 0);
    });
    
    $('#survey-modal').on('hidden.bs.modal', function() {
        $('.navbar').css('z-index', 9999);
    });

    $('#survey-popup-open').click(handlePopupButtonClick.bind(null, true));
    $('#survey-popup-close').click(handlePopupButtonClick.bind(null, false));

    $('.survey-modal-user-option').click(selectUser);

    $('#survey-modal-prev').click(updateQuestionIndex.bind(null, -1));
    $('#survey-modal-next').click(updateQuestionIndex.bind(null, 1));
    $('#survey-modal-submit').click(submitSurvey);

    loadSurveyPopup(5000, 0);
});
