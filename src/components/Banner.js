import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import headerImg from '../assets/img/header-img.svg'
import {ArrowDownCircle} from "react-bootstrap-icons";

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {
            clearInterval(ticker)
        };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }
    return (
        <section className='banner' id='home'>
            <Container>
                <Row className={'align-items-center'}>
                    <Col xs={12} md={6} xl={7}>
                        <span className={'tagline'}>Hi,my name is Tataev Shoqan!</span>
                        <h1>{`Hi i'm `}<span className={'wrap'}>{text}</span></h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab autem, cupiditate doloribus
                            excepturi incidunt molestias obcaecati optio quidem sint voluptatibus. Et impedit quos
                            ullam. Delectus magnam maxime nobis quo veritatis?</p>
                        <button onClick={() => console.log('connect')}>Let's connect<ArrowDownCircle size={25}/>
                        </button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header img"/>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

