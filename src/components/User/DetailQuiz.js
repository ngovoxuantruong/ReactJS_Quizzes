import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { getDataQuiz } from '../../service/apiService';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        console.log('check question :', res);
    };

    return <div className="detail-quiz-container">Detail Quiz</div>;
};

export default DetailQuiz;
