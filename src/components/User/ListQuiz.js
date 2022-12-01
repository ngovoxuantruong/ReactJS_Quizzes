import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { getQuizByUser } from '../../service/apiService';
import { useNavigate } from 'react-router-dom';

import './ListQuiz.scss';

const ListQuiz = (props) => {
    const navigate = useNavigate();
    const [arrQuiz, setArrQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    };

    return (
        <div className="list-quiz-container container">
            {arrQuiz &&
                arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <Card key={`${index}-quiz`} style={{ width: '18rem' }}>
                            <Card.Img
                                variant="top"
                                src={`data:image/jpeg;base64, ${quiz.image}`}
                            />
                            <Card.Body>
                                <Card.Title>Quiz {index + 1}</Card.Title>
                                <Card.Text>{quiz.description}</Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        navigate(`/quiz/${quiz.id}`, {
                                            state: {
                                                quizTitle: quiz.description,
                                            },
                                        })
                                    }
                                >
                                    Start now
                                </Button>
                            </Card.Body>
                        </Card>
                    );
                })}

            {arrQuiz && arrQuiz.length === 0 && (
                <div>Sorry, you don't have any quiz here,...</div>
            )}
        </div>
    );
};

export default ListQuiz;
