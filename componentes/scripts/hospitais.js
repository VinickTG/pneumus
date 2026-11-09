document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("form-hospitais");
    const estado = document.getElementById("estado");
    const resultado = document.getElementById("resultado-hospitais");

    // Hospitais cadastrados por estado
    const hospitais = {

        AC: [
            {
                nome: "Hospital das Clínicas do Acre (Fundhacre)",
                cidade: "Rio Branco (Capital)",
                descricao: "Maior centro de especialidades médicas e atendimento pneumológico do estado." 
            },

            {
                nome: "Hospital Regional do Juruá",
                cidade: "Cruzeiro do Sul",
                descricao: "Referência essencial de saúde para a região do Vale do Juruá." 
            }
        ],

        AL: [
            {
                nome: "Hospital Universitário Professor Alberto Antunes (HUPAA/UFAL)",
                cidade: "Maceió (Capital)",
                descricao: "Centro de excelência no estado para acompanhamento ambulatorial de asmáticos e DPOC." 
            },

            {
                nome: "Hospital Regional do Agreste",
                cidade: "Arapiraca",
                descricao: "Referência em assistência médica e suporte de urgência para o interior alagoano." 
            }
        ],

        AP: [
            {
                nome: "Hospital Alberto Lima (HCAL)",
                cidade: "Macapá (Capital)",
                descricao: "Principal centro de referência do estado para especialidades médicas e suporte em pneumologia na rede pública." 
            },

            {
                nome: "Hospital de Emergência de Santana",
                cidade: "Santana",
                descricao: "Polo essencial de atendimento médico e suporte à saúde para a segunda maior cidade do estado." 
            }
        ],

        AM: [
            {
                nome: "HUGV (UFAM)",
                cidade: "Manaus (Capital)",
                descricao: "Maior hospital universitário do Amazonas, estruturado para exames de pneumologia e acompanhamento de crônicos." 
            },

            {
                nome: "Hospital Regional Dr. Jofre Cohen",
                cidade: "Parintins",
                descricao: "Principal polo de atendimento médico para a região do Baixo Amazonas." 
            }
        ],
        
        BA: [
            {
                nome: "Hospital Otávio Mangabeira (HEOM)",
                cidade: "Salvador (Capital)",
                descricao: "Centro Estadual de Referência dedicado exclusivamente ao aparelho respiratório, referência em DPOC e asma grave." 
            },

            {
                nome: "HUPES (UFBA)",
                cidade: "Salvador (Capital)",
                descricao: "Hospital universitário de grande porte com ambulatórios especializados e suporte laboratorial completo." 
            },

            {
                nome: "Hospital Geral Clériston Andrade (HGCA)",
                cidade: "Feira de Santana",
                descricao: "Principal unidade pública do interior baiano para urgências e encaminhamentos médicos." 
            },

            {
                nome: "Hospital Geral de Vitória da Conquista (HGVC)",
                cidade: "Vitória da Conquista",
                descricao: "Polo hospitalar de alta complexidade para toda a região Sudoeste do estado." 
            }
        ],

        CE: [
            {
                nome: "Hospital de Messejana",
                cidade: "Fortaleza (Capital)",
                descricao: "Uma das maiores referências do Brasil em pneumologia e cardiologia, pioneira em transplantes pulmonares no Nordeste." 
            },

            {
                nome: "Santa Casa de Misericórdia de Sobral",
                cidade: "Sobral",
                descricao: "Maior centro de atendimento de saúde e suporte médico para a Região Norte do estado." 
            },

            {
                nome: "Hospital Regional do Cariri (HRC)",
                cidade: "Juazeiro do Norte",
                descricao: "Unidade de grande porte com suporte intensivo e exames avançados para a região do Cariri." 
            }
        ],

        DF: [
            {
                nome: "HRAN (Hospital Regional da Asa Norte)",
                cidade: "Brasília",
                descricao: "Principal referência da rede pública do DF para urgências e acompanhamento respiratório." 
            },

            {
                nome: "HUB (UnB)",
                cidade: "Brasília",
                descricao: "Hospital universitário voltado a casos de alta complexidade, com equipe médica de ponta em doenças pulmonares difusas." 
            }
        ],
        
        ES: [
            {
                nome: "HUCAM (UFES)",
                cidade: "Vitória (Capital)",
                descricao: "Hospital universitário federal que concentra os principais especialistas em pneumologia e exames de função pulmonar do estado." 
            },

            {
                nome: "Hospital Estadual Antônio Bezerra de Faria",
                cidade: "Vila Velha",
                descricao: "Importante polo de atendimento de média e alta complexidade na Região Metropolitana." 
            },

            {
                nome: "Hospital Estadual Dório Silva",
                cidade: "Serra",
                descricao: "Unidade de grande porte voltada para suporte clínico e atendimento de urgências respiratórias." 
            }
        ],

        GO: [
            {
                nome: "HC da UFG",
                cidade: "Goiânia (Capital)",
                descricao: "O maior complexo hospitalar público de Goiás, com atendimento pneumológico multidisciplinar e exames de imagem." 
            },

            {
                nome: "Hospital Estadual de Anápolis (HEANA)",
                cidade: "Anápolis",
                descricao: "Unidade de suporte clínico e urgência regionalizada para o centro do estado." 
            }
        ],

        MA: [
            {
                nome: "HUUFMA",
                cidade: "São Luís (Capital)",
                descricao: "Principal centro estadual para exames de função pulmonar e atendimento especializado por pneumologistas." 
            },

            {
                nome: "Hospital Macrorregional de Imperatriz (HRI)",
                cidade: "Imperatriz",
                descricao: "Unidade de alta complexidade que atende a população do Sul do Maranhão." 
            }
        ],

        MT: [
            {
                nome: "Hospital Universitário Júlio Müller (HUJM/UFMT)",
                cidade: "Cuiabá (Capital)",
                descricao: "Referência estadual em pneumologia, exames de espirometria e investigação de doenças pulmonares." 
            },

            {
                nome: "Hospital Regional de Rondonópolis",
                cidade: "Rondonópolis",
                descricao: "Atende a demanda de média e alta complexidade da região Sul mato-grossense." 
            },

            {
                nome: "Hospital Regional de Sinop",
                cidade: "Sinop",
                descricao: "Principal ponto de suporte à saúde pública para os municípios do Norte do estado." 
            }
        ],

        MS: [
            {
                nome: "Humap-UFMS/Ebserh (Hospital Universitário Maria Aparecida Pedrossian)",
                cidade: "Campo Grande (Capital)",
                descricao: "Estrutura completa para diagnóstico por imagem, testes respiratórios e assistência pneumológica no SUS." 
            },

            {
                nome: "Hospital Universitário da Grande Dourados (HU-UFGD)",
                cidade: "Dourados",
                descricao: "Polo público de saúde de alta complexidade para a região Sul de MS." 
            }
        ],

        MG: [
            {
                nome: "Hospital Júlia Kubitschek (FHEMIG)",
                cidade: "Belo Horizonte (Capital)",
                descricao: "Maior hospital público mineiro dedicado exclusivamente à saúde do tórax e pneumologia, com grande tradição clínica." 
            },

            {
                nome: "HC da UFMG",
                cidade: "Belo Horizonte (Capital)",
                descricao: "Centro de referência em atendimento ambulatorial de alta complexidade, contando com especialistas renomados no manejo de doenças pulmonares crônicas." 
            },

            {
                nome: "Hospital das Clínicas da UFU",
                cidade: "Uberlândia",
                descricao: "Principal polo de saúde do Triângulo Mineiro, equipado para exames de espirometria completa e suporte multidisciplinar." 
            },

            {
                nome: "Hospital Universitário da UFJF",
                cidade: "Juiz de Fora",
                descricao: "Referência para a Zona da Mata mineira, com forte atuação no acompanhamento ambulatorial contínuo." 
            },

            {
                nome: "Hospital Universitário Clemente de Faria (UNIMONTES)",
                cidade: "Montes Claros",
                descricao: "O único hospital 100% SUS da região, servindo de polo essencial para o Norte de Minas." 
            }
        ],

        PA: [
            {
                nome: "HUJBB (UFPA)",
                cidade: "Belém (Capital)",
                descricao: "Maior referência pneumológica da Região Norte, com tradição no tratamento de doenças crônicas e exames avançados." 
            },

            {
                nome: "Hospital Regional do Baixo Amazonas (HRBA)",
                cidade: "Santarém",
                descricao: "Referência de alta complexidade e excelência médica no interior paraense." 
            }
        ],

        PB: [
            {
                nome: "Hospital Universitário Lauro Wanderley (HULW/UFPB)",
                cidade: "João Pessoa (Capital)",
                descricao: "Centro de excelência estadual para diagnóstico e investigação de doenças respiratórias." 
            },

            {
                nome: "Hospital Universitário Alcides Carneiro (HUAC/UFCG)",
                cidade: "Campina Grande",
                descricao: "Polo de atendimento de alta complexidade para o Agreste e Sertão paraibano." 
            }
        ],

        PR: [
            {
                nome: "Hospital das Clínicas da UFPR",
                cidade: "Curitiba (Capital)",
                descricao: "Centro de excelência estadual para diagnóstico e investigação de doenças respiratórias." 
            },

            {
                nome: "Hospital Universitário de Londrina (HU/UEL)",
                cidade: "Londrina",
                descricao: "Maior centro de saúde pública do Norte paranaense, com atendimento multiprofissional completo." 
            },

            {
                nome: "Hospital Universitário Regional de Maringá (HUM)",
                cidade: "Maringá",
                descricao: "Polo de referência para o Noroeste do estado com ambulatórios dedicados a crônicos." 
            },

            {
                nome: "Hospital Universitário do Oeste do Paraná (HUOP)",
                cidade: "Cascavel",
                descricao: "Centro de alta complexidade que atende dezenas de municípios na região Oeste." 
            }
        ],

        PE: [
            {
                nome: "Hospital Otávio de Freitas (HOF)",
                cidade: "Recife (Capital)",
                descricao: "Maior centro especializado em pneumologia da rede estadual, com vasta experiência em DPOC e asma." 
            },

            {
                nome: "Hospital das Clínicas da UFPE",
                cidade: "Recife (Capital)",
                descricao: "Referência em procedimentos complexos, avaliação multidisciplinar e suporte a pacientes crônicos." 
            },

            {
                nome: "Hospital Mestre Vitalino (HMV)",
                cidade: "Caruaru",
                descricao: "Unidade de alta complexidade que descentralizou o atendimento especializado no Agreste pernambucano." 
            },

            {
                nome: "Hospital Universitário da UNIVASF",
                cidade: "Petrolina",
                descricao: "Polo público essencial de saúde para o atendimento no Sertão do São Francisco." 
            }
        ],

        PI: [
            {
                nome: "Hospital Universitário da UFPI (HU-UFPI)",
                cidade: "Teresina (Capital)",
                descricao: "Estrutura moderna capacitada para exames e acompanhamento contínuo de doenças crônicas." 
            },

            {
                nome: "Hospital Regional Justino Luz",
                cidade: "Picos",
                descricao: "Polo de suporte e encaminhamento médico para a região Centro-Sul piauiense. Hospital focado para tratamento infantil até 14 anos 11 meses e 29 dias. O atendimento de adultos foi transferido para o Novo Hospital Regional de Picos." 
            }
        ],

        RJ: [
            {
                nome: "Instituto de Doenças do Tórax (IDT/UFRJ)",
                cidade: "Rio de Janeiro (Capital)",
                descricao: "Unidade histórica e principal polo do estado para o estudo, ensino e tratamento de afecções pulmonares graves e crônicas." 
            },

            {
                nome: "Hospital Universitário Pedro Ernesto (UERJ)",
                cidade: "Rio de Janeiro (Capital)",
                descricao: "Destaca-se pelo atendimento ambulatorial em alergias severas, asma de difícil controle e pneumologia geral." 
            },

            {
                nome: "Hospital Universitário Antonio Pedro (HUAP/UFF)",
                cidade: "Niterói",
                descricao: "Referência de alta complexidade em pneumologia para Niterói e toda a região dos Lagos." 
            },

            {
                nome: "Hospital Geral de Nova Iguaçu (Hospital da Posse)",
                cidade: "Nova Iguaçu",
                descricao: "Principal polo de suporte clínico, urgências e encaminhamento respiratório na Baixada Fluminense." 
            }
        ],

        RN: [
            {
                nome: "Hospital Universitário Onofre Lopes (HUOL/UFRN)",
                cidade: "Natal (Capital)",
                descricao: "Maior complexo público do estado em pneumologia especializada e exames diagnósticos."
            },

            {
                nome: "Hospital Rafael Fernandes",
                cidade: "Mossoró",
                descricao: "Referência em doenças pulmonares crônicas e infectocontagiosas para a Região Oeste Potiguar."
            }
        ],

        RS: [
            {
                nome: "Pavilhão Pereira Filho (Santa Casa)",
                cidade: "Porto Alegre (Capital)",
                descricao: "Um dos centros pneumológicos e de cirurgia torácica mais tradicionais e respeitados de toda a América Latina." 
            },

            {
                nome: "Hospital das Clínicas de Porto Alegre (HCPA)",
                cidade: "Porto Alegre (Capital)",
                descricao: "Hospital universitário reconhecido nacionalmente pela excelência em gestão, pesquisa científica e assistência." 
            },

            {
                nome: "Hospital Geral de Caxias do Sul (HG)",
                cidade: "Caxias do Sul",
                descricao: "Referência pública essencial para toda a região da Serra Gaúcha, com equipe multiprofissional." 
            },

            {
                nome: "Hospital Escola da UFPel",
                cidade: "Pelotas",
                descricao: "Polo de atendimento em pneumologia e exames funcionais para a região Sul do estado." 
            }
        ],

        RO: [
            {
                nome: "Hospital de Base Dr. Ary Pinheiro",
                cidade: "Porto Velho (Capital)",
                descricao: "O maior complexo hospitalar público do estado, equipado para alta complexidade respiratória e cirurgias torácicas." 
            },

            {
                nome: "Hospital Regional de Cacoal",
                cidade: "Cacoal",
                descricao: "Referência médica hospitalar para a Região da Zona da Mata rondoniense." 
            }
        ],

        RR: [
            {
                nome: "Hospital Geral de Roraima (HGR)",
                cidade: "Boa Vista (Capital)",
                descricao: "É o maior hospital público do estado de Roraima, atuando como referência em atendimentos de urgência, emergência, média e alta complexidade." 
            },

            {
                nome: "Policlínica Coronel Mota",
                cidade: "Boa Vista (Capital)",
                descricao: "É uma tradicional unidade pública de saúde especializada de caráter ambulatorial." 
            },

            {
                nome: "Hospital da Criança Santo Antônio (HCSA)",
                cidade: "Boa Vista (Capital)",
                descricao: "É uma importante unidade de saúde pediátrica, , sendo a única referência pública de média e alta complexidade em pediatria no estado para crianças e adolescentes (de 29 dias a 13 anos)." 
            }
        ],

        SC: [
            {
                nome: "HU-UFSC",
                cidade: "Florianópolis (Capital)",
                descricao: "Referência estadual no SUS com foco em ensino, pesquisa e diagnóstico preciso de doenças obstrutivas e intersticiais." 
            },

            {
                nome: "Hospital Regional Hans Dieter Schmidt",
                cidade: "Joinville",
                descricao: "Principal centro de referência pneumológica e cardiológica do Norte catarinense." 
            },

            {
                nome: "Hospital Santo Antônio",
                cidade: "Blumenau",
                descricao: "Polo de atendimento para o Vale do Itajaí em especialidades médicas e suporte clínico." 
            },

            {
                nome: " Hospital Regional do Oeste (HRO)",
                cidade: "Chapecó",
                descricao: "Maior complexo hospitalar público do Grande Oeste catarinense." 
            }
        ],

        SP: [
            {
                nome: "InCor (HC-FMUSP)",
                cidade: "São Paulo (Capital)",
                descricao: "Um dos maiores centros de cardiologia e pneumologia do mundo, referência internacional em casos complexos, como fibrose pulmonar grave, hipertensão pulmonar e transplantes." 
            },

            {
                nome: "Hospital São Paulo (UNIFESP)",
                cidade: "São Paulo (Capital)",
                descricao: "Hospital universitário de excelência com ambulatórios especializados em asma grave, DPOC e laboratório completo de função pulmonar." 
            },

            {
                nome: "HC da UNICAMP",
                cidade: "Campinas",
                descricao: "Principal polo de alta complexidade do interior paulista, contando com equipe multidisciplinar voltada ao acompanhamento contínuo de crônicos." 
            },

            {
                nome: "HC da USP",
                cidade: "Ribeirão Preto",
                descricao: "Centro hospitalar universitário de ponta, referência no interior em diagnósticos avançados por imagem e pesquisas clínicas." 
            },

            {
                nome: "Hospital de Base (FUNFARME)",
                cidade: "São José do Rio Preto",
                descricao: "Um dos maiores complexos hospitalares do país, atende dezenas de municípios com UTI respiratória e estrutura completa." 
            },

            {
                nome: "Hospital Guilherme Álvaro",
                cidade: "Santos",
                descricao: "Principal referência pública em pneumologia e suporte clínico para toda a região da Baixada Santista." 
            }
        ],

        SE: [
            {
                nome: "Hospital Universitário de Sergipe (HU-UFS)",
                cidade: "Aracaju (Capital)",
                descricao: "Principal centro público do estado para exames de função pulmonar e consultas especializadas." 
            },

            {
                nome: "Hospital Universitário de Lagarto (HUL-UFS)",
                cidade: "Lagarto",
                descricao: "Polo de suporte assistencial para a região Centro-Sul de Sergipe." 
            }
        ],

        TO: [
            {
                nome: "Hospital Geral de Palmas (HGP)",
                cidade: "Palmas (Capital)",
                descricao: "Principal unidade hospitalar de alta complexidade de todo o estado, com UTIs e exames modernos." 
            },

            {
                nome: "Hospital Regional de Araguaína (HRA)",
                cidade: "Araguaína",
                descricao: "Polo de referência médica para o atendimento público na região Norte do Tocantins." 
            }
        ]

    };

    

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();

        const estadoSelecionado = estado.value;

        // Limpa os resultados anteriores
        resultado.innerHTML = "";

        // Verifica se existem hospitais cadastrados
        if (!hospitais[estadoSelecionado]) {

            resultado.innerHTML = `
                <p>Nenhum hospital cadastrado para este estado.</p>
            `;

        } else {

            const titulo = document.createElement("h3");
            titulo.textContent = "Hospitais encontrados:";
            resultado.appendChild(titulo);

            hospitais[estadoSelecionado].forEach(hospital => {

                const card = document.createElement("div");
                card.className = "hospital-card";

                const nome = document.createElement("h3");
                nome.textContent = hospital.nome;

                const cidade = document.createElement("p");
                cidade.textContent = "Cidade: " + hospital.cidade;

                const descricao = document.createElement("p");
                descricao.textContent = hospital.descricao;

                card.append(nome, cidade, descricao);

                resultado.appendChild(card);

            });

        }

        resultado.hidden = false;

    });

});