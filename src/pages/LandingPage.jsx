import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const planHighlights = [
  {
    icon: "bi-stars",
    title: "Questoes geradas por IA",
    description:
      "Receba perguntas objetivas de anatomia com foco em estudo rapido e treino recorrente.",
  },
  {
    icon: "bi-bar-chart-line",
    title: "Controle do ciclo mensal",
    description:
      "Acompanhe o consumo do plano dentro da plataforma e saiba quando o limite sera renovado.",
  },
  {
    icon: "bi-lightning-charge",
    title: "Fluxo direto ao ponto",
    description:
      "Crie a conta, assine pelo Stripe e comece a usar a aplicacao sem onboarding demorado.",
  },
];

const planFeatures = [
  "Plano Basic UBA com checkout integrado ao Stripe",
  "Ate 150 geracoes de questoes por ciclo",
  "Acesso a geracao por topicos de anatomia",
  "Fluxo de assinatura e liberacao do acesso dentro da plataforma",
];

const journeySteps = [
  {
    step: "01",
    title: "Crie sua conta",
    description:
      "Cadastre nome, email, nickname e senha em poucos segundos.",
  },
  {
    step: "02",
    title: "Ative o plano",
    description:
      "A assinatura e aberta no Stripe para finalizar o pagamento com seguranca.",
  },
  {
    step: "03",
    title: "Comece a praticar",
    description:
      "Entre no app, escolha a materia e gere novas questoes sempre que precisar.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-page">
      <Container className="landing-hero">
        <Row className="align-items-center g-4 g-xl-5">
          <Col lg={7} className="text-start">
            <Badge className="landing-badge mb-3">Plano Basic UBA</Badge>
            <h1 className="landing-title">
              Gere questoes de anatomia com uma experiencia simples, assinavel e
              pronta para uso.
            </h1>
            <p className="landing-subtitle">
              A plataforma foi desenhada para receber o aluno rapidamente,
              explicar o que esta incluso no plano e levar direto para a criacao
              de conta com assinatura integrada.
            </p>

            <div className="landing-actions">
              <Button
                size="lg"
                className="landing-primary-button"
                onClick={() => navigate("/register")}
              >
                Criar conta e assinar
              </Button>
              <Button
                size="lg"
                variant="outline-light"
                className="landing-secondary-button"
                onClick={() => navigate("/login")}
              >
                Ja tenho conta
              </Button>
            </div>

            <Row className="g-3 mt-4">
              {planHighlights.map((item) => (
                <Col md={4} key={item.title}>
                  <Card className="landing-mini-card h-100">
                    <Card.Body>
                      <div className="landing-icon-wrap">
                        <i className={`bi ${item.icon}`} />
                      </div>
                      <Card.Title className="landing-mini-title">
                        {item.title}
                      </Card.Title>
                      <Card.Text className="landing-mini-text">
                        {item.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          <Col lg={5}>
            <Card className="landing-plan-card border-0">
              <Card.Body className="p-4 p-lg-5 text-start">
                <div className="landing-plan-tag">Assinatura ativa via Stripe</div>
                <h2 className="landing-plan-title">Tudo o que o usuario precisa ver para decidir</h2>
                <p className="landing-plan-copy">
                  Um unico plano, uma proposta objetiva e um caminho claro para
                  comecar a usar a aplicacao sem friccao.
                </p>

                <div className="landing-plan-metric">
                  <span className="landing-plan-metric-value">150</span>
                  <span className="landing-plan-metric-label">
                    questoes por ciclo mensal
                  </span>
                </div>

                <div className="landing-feature-list">
                  {planFeatures.map((feature) => (
                    <div className="landing-feature-item" key={feature}>
                      <i className="bi bi-check-circle-fill" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="landing-primary-button w-100 mt-4"
                  onClick={() => navigate("/register")}
                >
                  Assinar plano e criar acesso
                </Button>

                <p className="landing-footnote mb-0 mt-3">
                  Depois do cadastro, o usuario e redirecionado para o checkout e
                  volta pronto para liberar o acesso na plataforma.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="landing-section">
        <Row className="g-4 align-items-stretch">
          <Col xl={5}>
            <div className="landing-section-copy text-start">
              <p className="landing-section-eyebrow">Como funciona</p>
              <h2 className="landing-section-title">
                Uma landing feita para converter sem confundir.
              </h2>
              <p className="landing-section-text">
                O usuario entende rapidamente o plano, percebe o valor da
                plataforma e encontra o CTA principal sem precisar navegar por
                varias telas antes de criar a conta.
              </p>
            </div>
          </Col>
          <Col xl={7}>
            <Row className="g-3">
              {journeySteps.map((item) => (
                <Col md={4} key={item.step}>
                  <Card className="landing-step-card h-100 border-0">
                    <Card.Body className="text-start">
                      <div className="landing-step-number">{item.step}</div>
                      <Card.Title className="landing-step-title">
                        {item.title}
                      </Card.Title>
                      <Card.Text className="landing-step-text">
                        {item.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <Container className="landing-section landing-section-final">
        <Card className="landing-cta-card border-0">
          <Card.Body className="p-4 p-lg-5">
            <p className="landing-section-eyebrow mb-2">Pronto para entrar</p>
            <h2 className="landing-cta-title">
              Crie a conta, assine o plano Basic UBA e comece a gerar questoes.
            </h2>
            <p className="landing-cta-text">
              Se depois voce quiser reforcar o hero com imagem, uma boa opcao e
              usar uma cena limpa de estudo medico: notebook com interface de
              questoes, caderno aberto e elementos sutis de anatomia ao fundo.
            </p>
            <div className="landing-actions justify-content-center">
              <Button
                size="lg"
                className="landing-primary-button"
                onClick={() => navigate("/register")}
              >
                Comecar agora
              </Button>
              <Button
                size="lg"
                variant="outline-light"
                className="landing-secondary-button"
                onClick={() => navigate("/login")}
              >
                Fazer login
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default LandingPage;
