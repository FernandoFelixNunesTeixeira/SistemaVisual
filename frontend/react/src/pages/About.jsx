import "./About.css";

function About() {
    return (
        <div className="d-flex flex-column m-5">
            <h1 className="text-center mb-3">Sobre</h1>

            <p className="justify-text">
                Studant CellVision © é uma plataforma online voltada a promoção do foco e uso consciente da tecnologia dentro das escolas.
                Por meio de câmeras instaladas em salas de aula, o sistema identifica situações de uso indevido de celulares durante o período escolar, notificando a equipe pedagógica de forma automatizada.
                O objetivo do website é fornecer um ambiente seguro e organizado no qual os fiscais da escola possam: 
            </p>

            <ul>
                <li>Verificar notificações sobre o uso indevido de celulares;</li>
                <li>Acompanhar o comportamento por sala e período;</li>
                <li>Consultar informações de alunos quando necessário.</li>
            </ul>
        </div>
    );
}

export default About;