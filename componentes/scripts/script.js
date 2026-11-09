
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("questionario");
    const perguntas = document.getElementById("perguntas");
    const resultado = document.getElementById("resultado");

    if (!formulario || !perguntas || !resultado) {
        console.error("Confira os IDs do formulário, das perguntas e do resultado.");
        return;
    }

    const frequencias = [
        "Frequentemente",
        "Às vezes",
        "Raramente",
        "Nunca"
    ];

    const modulos = [
        {
            titulo: "Primeiro Passo: Rastreio Geral",
            descricao: "Responda a todas as perguntas.",
            perguntas: [
                ["tosse", "Com que frequência você apresenta tosse?"],
                ["faltaAr", "Com que frequência você sente falta de ar ou cansaço para respirar?"],
                ["chiado", "Com que frequência sente chiado, pito ou chiadeira no peito?"],
                ["alergia", "Com que frequência apresenta sintomas de alergia nasal, como espirros, nariz entupido ou coceira?"],
                ["infeccoes", "Com que frequência apresenta infecções respiratórias ou pneumonia?"]
            ]
        }
    ];

    const blocos = [
        {
            id: "blocoA",
            titulo: "Bloco A: Chiado no peito ou falta de ar",
            depende: ["chiado", "faltaAr"],
            perguntas: [
                ["pioraNoite", "Com que frequência os sintomas pioram à noite ou ao fazer exercícios físicos?"],
                ["apertoPeito", "Com que frequência você sente um aperto forte no peito?"],
                ["fumaca", "Com que frequência houve ou há exposição diária à fumaça de cigarro ou fumaça de lenha por muitos anos?"]
            ]
        },
        {
            id: "blocoB",
            titulo: "Bloco B: Tosse",
            depende: ["tosse"],
            perguntas: [
                ["catarro", "Com que frequência a tosse vem acompanhada de bastante catarro ou secreção?"],
                ["tosseSeca", "Com que frequência a tosse é totalmente seca e persistente, sem secreção?"],
                ["tosseLonga", "Com que frequência a tosse dura há mais de 3 semanas seguidas?"]
            ]
        },
        {
            id: "blocoC",
            titulo: "Bloco C: Alergia nasal",
            depende: ["alergia"],
            perguntas: [
                ["pressaoRosto", "Com que frequência sente dor, pressão ou peso na região do rosto, como testa e bochechas?"],
                ["perdaOlfato", "Com que frequência nota perda ou diminuição do olfato?"],
                ["espirrosPo", "Com que frequência tem crises de espirros ao entrar em contato com poeira ou mofo?"]
            ]
        },
        {
            id: "blocoD",
            titulo: "Bloco D: Infecções de repetição",
            depende: ["infeccoes"],
            perguntas: [
                ["suorSalgado", "Com que frequência percebe suor muito salgado ou teve dificuldade de ganhar peso desde pequeno(a)?"],
                ["sangueTosse", "Com que frequência elimina pequenas quantidades de sangue ao tossir?"],
                ["antibioticos", "Com que frequência apresenta crises respiratórias que exigem uso de antibióticos?"]
            ]
        }
    ];

    function criarPergunta(id, texto) {
        const grupo = document.createElement("fieldset");
        grupo.className = "pergunta";
        grupo.dataset.pergunta = id;

        const legenda = document.createElement("legend");
        legenda.textContent = texto;
        grupo.appendChild(legenda);

        frequencias.forEach((frequencia, indice) => {
            const rotulo = document.createElement("label");
            rotulo.className = "opcao-resposta";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = id;
            radio.value = frequencia;
            radio.required = indice === 0;

            rotulo.appendChild(radio);
            rotulo.appendChild(document.createTextNode(" " + frequencia));
            grupo.appendChild(rotulo);
        });

        return grupo;
    }

    function criarModulo(titulo, descricao = "") {
        const secao = document.createElement("section");
        secao.className = "modulo";

        const cabecalho = document.createElement("h2");
        cabecalho.textContent = titulo;
        secao.appendChild(cabecalho);

        if (descricao) {
            const texto = document.createElement("p");
            texto.textContent = descricao;
            secao.appendChild(texto);
        }

        return secao;
    }

    // Módulo geral
    modulos.forEach(modulo => {
        const secao = criarModulo(modulo.titulo, modulo.descricao);

        modulo.perguntas.forEach(([id, texto]) => {
            secao.appendChild(criarPergunta(id, texto));
        });

        perguntas.appendChild(secao);
    });

    // Módulos específicos
    blocos.forEach(bloco => {
        const secao = criarModulo(bloco.titulo);
        secao.id = bloco.id;
        secao.hidden = true;

        bloco.perguntas.forEach(([id, texto]) => {
            secao.appendChild(criarPergunta(id, texto));
        });

        perguntas.appendChild(secao);
    });

    function valor(id) {
        return new FormData(formulario).get(id);
    }

    function relevante(id) {
        return ["Frequentemente", "Às vezes"].includes(valor(id));
    }

    function atualizarBlocos() {
        blocos.forEach(bloco => {
            const mostrar = bloco.depende.some(relevante);
            const secao = document.getElementById(bloco.id);

            secao.hidden = !mostrar;

            // Campos escondidos deixam de ser obrigatórios.
            bloco.perguntas.forEach(([id]) => {
                const campos = formulario.querySelectorAll(
                    `input[name="${id}"]`
                );

                campos.forEach(campo => {
                    campo.required = mostrar && campo.value === "Frequentemente";
                    // O campo selecionado não controla a obrigatoriedade;
                    // ela é ajustada corretamente logo abaixo.
                    campo.required = mostrar && campo.value === "__nao_usado__";
                });

                const grupo = secao.querySelector(
                    `[data-pergunta="${id}"]`
                );

                if (grupo) {
                    grupo.querySelectorAll("input").forEach(campo => {
                        campo.required = mostrar;
                    });
                }

                if (!mostrar) {
                    campos.forEach(campo => {
                        campo.checked = false;
                    });
                }
            });
        });
    }

    formulario.addEventListener("change", atualizarBlocos);
    atualizarBlocos();

    function frequente(id) {
        return valor(id) === "Frequentemente";
    }

    function peloMenosAsVezes(id) {
        return relevante(id);
    }

    function montarResultado() {
        const condicoes = [];

        function adicionar(nome, descricao, motivos) {
            condicoes.push({ nome, descricao, motivos });
        }

        // Asma
        if (
            (peloMenosAsVezes("chiado") ||
             peloMenosAsVezes("faltaAr")) &&
            (peloMenosAsVezes("pioraNoite") ||
             peloMenosAsVezes("apertoPeito"))
        ) {
            adicionar(
                "Asma",
                "Condição que pode causar chiado, falta de ar, tosse e aperto no peito, com sintomas que podem variar ao longo do tempo.",
                "Foram relatados chiado ou falta de ar junto de piora noturna, durante exercícios ou aperto no peito."
            );
        }

        // Rinite alérgica crônica
        if (
            peloMenosAsVezes("alergia") &&
            (peloMenosAsVezes("espirrosPo") ||
             frequente("alergia"))
        ) {
            adicionar(
                "Rinite Alérgica Crônica",
                "Inflamação da mucosa nasal associada a alérgenos, que pode provocar espirros, coceira e nariz entupido.",
                "As respostas indicaram sintomas nasais ou espirros relacionados à poeira ou ao mofo."
            );
        }

        // Sinusite crônica
        if (
            peloMenosAsVezes("alergia") &&
            (peloMenosAsVezes("pressaoRosto") ||
             peloMenosAsVezes("perdaOlfato"))
        ) {
            adicionar(
                "Sinusite Crônica",
                "Inflamação persistente dos seios paranasais, que pode envolver congestão, pressão facial e redução do olfato.",
                "Foram relatados sintomas nasais acompanhados de pressão facial ou redução do olfato."
            );
        }

        // DPOC e condições associadas
        if (
            peloMenosAsVezes("faltaAr") &&
            peloMenosAsVezes("fumaca")
        ) {
            adicionar(
                "DPOC (Doença Pulmonar Obstrutiva Crônica)",
                "Condição pulmonar crônica associada à limitação do fluxo de ar. A exposição prolongada à fumaça é um fator de risco importante.",
                "Foram relatadas falta de ar e exposição prolongada à fumaça."
            );

            adicionar(
                "Enfisema Pulmonar",
                "Condição em que ocorre dano aos alvéolos pulmonares, podendo dificultar a respiração. Pode fazer parte da DPOC.",
                "A combinação de falta de ar e exposição prolongada à fumaça merece avaliação profissional; o questionário não distingue enfisema de outras causas."
            );
        }

        // Bronquite crônica
        if (
            peloMenosAsVezes("tosse") &&
            peloMenosAsVezes("catarro") &&
            (peloMenosAsVezes("fumaca") ||
             peloMenosAsVezes("tosseLonga"))
        ) {
            adicionar(
                "Bronquite Crônica",
                "Condição caracterizada por tosse com produção de muco de forma prolongada. A definição clínica depende da duração e do histórico dos sintomas.",
                "Foram relatados tosse, catarro e exposição à fumaça ou tosse prolongada."
            );
        }

        // Bronquiectasia
        if (
            peloMenosAsVezes("infeccoes") &&
            (peloMenosAsVezes("catarro") ||
             peloMenosAsVezes("antibioticos"))
        ) {
            adicionar(
                "Bronquiectasia",
                "Alteração dos brônquios que pode provocar acúmulo de secreções, tosse com catarro e infecções respiratórias recorrentes.",
                "Foram relatadas infecções de repetição associadas a catarro ou crises que exigem antibióticos."
            );
        }

        // Fibrose cística
        if (
            peloMenosAsVezes("infeccoes") &&
            (peloMenosAsVezes("suorSalgado") ||
             (peloMenosAsVezes("catarro") &&
              peloMenosAsVezes("antibioticos")))
        ) {
            adicionar(
                "Fibrose Cística",
                "Doença genética que pode causar secreções espessas e infecções respiratórias recorrentes. A confirmação exige exames específicos.",
                "Foram relatados sinais como suor muito salgado, dificuldade de ganho de peso ou infecções recorrentes."
            );
        }

        // Fibrose pulmonar
        if (
            peloMenosAsVezes("faltaAr") &&
            peloMenosAsVezes("tosseSeca")
        ) {
            adicionar(
                "Fibrose Pulmonar",
                "Grupo de condições que podem causar cicatrização do tecido pulmonar, tosse seca e falta de ar progressiva.",
                "Foram relatadas falta de ar e tosse seca persistente; esses sintomas também podem ter muitas outras causas."
            );
        }

        // Hipertensão arterial pulmonar: os sintomas são inespecíficos.
        if (frequente("faltaAr")) {
            adicionar(
                "Hipertensão Arterial Pulmonar",
                "Condição que afeta os vasos sanguíneos dos pulmões e pode causar falta de ar e cansaço. Não pode ser identificada por este questionário.",
                "A frequência de falta de ar foi elevada. Isso, isoladamente, não indica hipertensão arterial pulmonar."
            );
        }

        resultado.replaceChildren();

        const titulo = document.createElement("h2");
        titulo.textContent = "Informações relacionadas às suas respostas";
        resultado.appendChild(titulo);

        const aviso = document.createElement("p");
        aviso.textContent =
            "Este resultado é educativo, não representa diagnóstico, probabilidade ou avaliação clínica. Várias condições podem apresentar sintomas semelhantes.";
        resultado.appendChild(aviso);

        if (condicoes.length === 0) {
            const texto = document.createElement("p");
            texto.textContent =
                "Suas respostas não destacaram um padrão específico entre as condições associadas neste questionário. Isso não exclui a presença de uma doença.";
            resultado.appendChild(texto);
        }

        condicoes.forEach(condicao => {
            const artigo = document.createElement("article");
            artigo.className = "condicao-resultado";

            const nome = document.createElement("h3");
            nome.textContent = condicao.nome;

            const descricao = document.createElement("p");
            descricao.textContent = condicao.descricao;

            const motivo = document.createElement("p");
            motivo.textContent = "Por que apareceu: " + condicao.motivos;

            artigo.append(nome, descricao, motivo);
            resultado.appendChild(artigo);
        });

        const naoAvaliaveis = document.createElement("p");
        naoAvaliaveis.textContent =
            "Displasia Broncopulmonar: esta condição está ligada principalmente a antecedentes de prematuridade e problemas respiratórios no início da vida. O questionário não coleta esse histórico e, portanto, não consegue avaliá-la.";
        resultado.appendChild(naoAvaliaveis);

        const orientacao = document.createElement("p");
        orientacao.textContent =
            "Se os sintomas persistirem ou piorarem, procure um profissional de saúde. Tossir sangue precisa de avaliação médica. Em caso de falta de ar intensa, dificuldade para falar por falta de ar, lábios arroxeados ou dor forte no peito, procure emergência; no Brasil, ligue 192 para o SAMU.";
        resultado.appendChild(orientacao);

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    formulario.addEventListener("submit", event => {
        event.preventDefault();

        if (!formulario.reportValidity()) {
            return;
        }

        montarResultado();
    });
});
