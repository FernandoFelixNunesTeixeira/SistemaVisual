// TO-DO: Criei pagina por enquanto, mas talvez possa ser um componente sendo mostrado como pop-up, dependendo daonde for usado e pq
// Nota: Talvez ficaria legal uma versão reduzida com popup e check do usuário ao acessar o site pela primeira vez
function TermOfUse() {
    return (
        <div className="d-flex flex-column m-5">
            <h1 className="text-center">Termos de Uso</h1>
            <h3 className="text-center mb-3"><span>Política de Privacidade</span></h3>

            <div className="p-5">
                <p><span>A sua privacidade é importante para nós. É política do Studant CellVision respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a href="./">Studant CellVision</a>, e outros sites que possuímos e operamos.</span></p>
                <p><span>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</span></p>
                <p><span>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</span></p>
                <p><span>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</span></p>
                <p><span>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</span></p><p><span>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto conosco.</span></p>
        
                <br></br><h3><span>Compromisso do Usuário</span></h3>
                <p><span>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Studant CellVision oferece no site e com caráter enunciativo, mas não limitativo:</span></p>
                <ul><li><span>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</span></li>
                <li><span>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</span></li>
                <li><span>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Studant CellVision, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</span></li>
                <br></br></ul><h3><span>Mais informações</span></h3><p><span>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</span></p>
            </div>
            
        </div>
    );
}

export default TermOfUse;