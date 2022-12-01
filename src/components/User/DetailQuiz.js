import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import { getDataQuiz } from '../../service/apiService';
import './DetailQuiz.scss';
import Question from './Question';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy('id')
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription,
                        image = null;

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });

                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
            setDataQuiz(data);
        }
    };

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }
    };

    const handlePrev = () => {
        if (index - 1 < 0) {
            return;
        } else {
            setIndex(index - 1);
        }
    };

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find((item) => +item.questionId === +questionId);
        if (question && question.answers) {
            let b = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            question.answers = b;
        }
        let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId);
        if (index - 1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    };
    console.log(dataQuiz);

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId} : {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>

                <div className="q-content">
                    <Question
                        handleCheckbox={handleCheckbox}
                        index={index}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    />
                </div>

                <div className="footer">
                    <button onClick={() => handlePrev()} className="btn btn-secondary">
                        Prev
                    </button>

                    <button onClick={() => handleNext()} className="btn btn-primary">
                        Next
                    </button>

                    <button onClick={() => handleNext()} className="btn btn-warning">
                        Finish
                    </button>
                </div>
            </div>

            <div className="right-content">Count down</div>
        </div>
    );
};

export default DetailQuiz;
