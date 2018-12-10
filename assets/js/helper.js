//-----------PARTE 1 - FUNCOES DOS ELEMENTOS DO PAINEL

//funcao para ajustar o painel removendo/adicionando elementos da visualizacao,
//perifericos ao grafico (legenda, tooltips, botoes,etc)
function ajustaPainel(opcao){

		//verifica e fecha outras visualizações abertas
		fechaVisualizacoes();

		criaBotaoSairGrafico(opcao);

		montaLegenda(opcao);

		montaDetalhe(opcao);

}

//funcao para fechar uma visualizacao de grafico em aberto, quando da chamada
//para outra visualizacao de grafico
//a verificacao de visualizacoes abertas eh feita atraves do comprimento do
//suporte de grafico (o elemento div-grafico)
function fechaVisualizacoes(){
	if ($('.div-grafico').length){
		sairGrafico();
	}
}

//funcao sair da visualizacao corrente
function sairGrafico(){

		//remove Suporte do grafico
		$('.div-grafico').remove();
		//remove botao Sair
		$('#botao-sair').remove();
		//verifica se o grafico eh do tipo que possui legenda/tooltip e remove
		if ($('#legend').length){ $('#legend').remove();}
		if ($('#detalhe').length){ $('#detalhe').remove();}

	return;
}

//botao saida grafico
function criaBotaoSairGrafico(opcao){
	var element = document.createElement("input");

	//definindo atributos e estilos dinamicamente
	element.type = "button";
	element.value = "Sair";
	element.id='botao-sair';
	element.className ="btn btn-default";
	element.style.position = 'absolute';
	element.style.right ='10px';
	element.style.bottom ='10px';
	//element.style.marginTop ='10px';
	element.onclick = function() {
		sairGrafico();
	};
	//anexa o botao no painel
	document.getElementsByClassName("painel-grafico-"+opcao)[0].appendChild(element);
}
//---------------------------------------------------funcao tooltip

//funcao montagem tooltip grafico
function montaDetalhe(opcao){
	var divDetalhe = document.createElement('div');
	divDetalhe.id = 'detalhe';

	//definicao dinamica do estilo da legenda
	divDetalhe.style.border = "10px";
	divDetalhe.style.borderRadius ="25px";
	divDetalhe.style.display = 'inline-block';
	divDetalhe.style.width = '195x';
	divDetalhe.style.height = '130px';
	divDetalhe.style.position = 'absolute';
	divDetalhe.style.right ='130px';
	divDetalhe.style.top ='10px';
	divDetalhe.style.backgroundColor = 'white';
	divDetalhe.style.opacity = '50%';
	divDetalhe.style.padding = '5px';

	//definicao do titulo da Detalhe(opcional)
	//divDetalhe.innerHTML = "Detalhe";

	//adicao da Detalhe no painel
	$(".painel-grafico-"+opcao).append(divDetalhe);
}

//-----------------------------------------------------------funcao legenda
//funcao montagem legenda grafico
function montaLegenda(opcao){

	var divLegenda = document.createElement('div');
	divLegenda.id = 'legend';
	divLegenda.className ="rounded";

	//definicao dinamica do estilo da legenda
	divLegenda.style.borderStyle = 'solid';
	divLegenda.style.borderRadius = '25px';

	divLegenda.style.display = 'inline-block';
	divLegenda.style.width = '120px';
	divLegenda.style.position = 'absolute';
	divLegenda.style.right ='10px';
	divLegenda.style.top ='10px';
	divLegenda.style.backgroundColor = 'white';
	divLegenda.style.opacity = '50%';
	divLegenda.style.padding = '10px';

	//definicao do titulo da legenda
	divLegenda.innerHTML = "Legenda";

	//adicao da legenda no painel
	$(".painel-grafico-"+opcao).append(divLegenda);


	//lista de elementos para as legendas respectivas de acordo com o tipo de grafico
	if(opcao === 'estados'){
		var myObjects = [{"nome": "Sul"},{"nome": "Sudeste"},{"nome": "Centroeste"},
			{"nome": "Nordeste"},{"nome": "Norte"}];

	}else if(opcao==='corpele'){
		var myObjects = [{"nome": "Indigena"},{"nome": "Amarela"},{"nome": "Negra"},
			{"nome": "Parda"},{"nome": "Branca"}];}

	$(function () {
	    $.each(myObjects, function () {
				var celula = document.createElement('div');
				$(divLegenda).append(celula);

				var squareDiv = document.createElement('div');
				squareDiv.className = 'square';
				squareDiv.id = this.nome.toLowerCase();
				$(celula).append(squareDiv);

				var p = document.createElement('p');
				$(p).text(this.nome);
				$(celula).append(p);
	    });
	});
}

//----------PARTE 2 - FUNCOES DOS GRAFICOS--------------------------------------

//funcao construcao inicial grafico
function configuraGrafico(altura,padding,opcao){

	var dimensoes={
		h:altura,
		padding: padding,
		w: devolveLargura(opcao)
	};

	//criando o elemento svg
	d3.select(".chart-"+opcao)
		.attr("width", dimensoes.w)
		.attr("height", dimensoes.h)
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px");

  return dimensoes;
}


//-----------------------------------------------------------------------------

//criacao do suporte que emoldura o grafico
function criaSuporteGrafico(opcao){

	//cria dinamicamente elemento do tipo div para conter o grafico
	var divGrafico = document.createElement('div');
	divGrafico.className = 'div-grafico';
 	divGrafico.style.overflowX ='auto';
	document.getElementsByClassName("painel-grafico-"+opcao)[0].appendChild(divGrafico);

	//cria dinamicamente elemento tipo svg que sera o grafico
	var element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	element.setAttribute("class", "chart-"+opcao);
	document.getElementsByClassName("div-grafico")[0].appendChild(element);

	return;
}

//--------------------------------------------funcoes auxiliares

function devolveLargura(opcao){
if(opcao==='estados')	return 1500;
else if (opcao==='corpele') return 1150;
}


function devolveEscalaX(opcao){

	if(opcao==='estados') return d3.scaleLinear();
	else if(opcao==='corpele') return d3.scaleLog();
}


function setaTextoCirculo(opcao){

	if(opcao==='estados'){
		var textoCirculo={
			cor: 'white',
			ancora: 'middle'
		};
	}else if(opcao==='corpele'){
		var textoCirculo={
			cor: 'olive',
			ancora: 'end'
		};
	}
	return textoCirculo;
}
//-----------------------------------------------------------------------------

//funcao chamada ao clicar no botao visualizar, no index.html
function fazGrafico(opcao){

	//ajusta elementos do painel, perifericos ao grafico
	ajustaPainel(opcao);

	//origina o grafico
	originaGrafico(opcao);

}

//--------------------------funcao para criacao do grafico original
function originaGrafico(opcao){
	//cria suporte grafico
	criaSuporteGrafico(opcao);

	//configura as dimensoes do grafico
  var dimensoes = configuraGrafico(400,90,opcao);

//configura as seleoes do grafico (opcao, se grafico original ou se apenas
//atualizacao do grafico existente )
	var selecoes={
		opcao: opcao,
		original:true
	};

	//funcao para preencher o grafico com os dados
	montaGrafico(selecoes,dimensoes);
}

//----------------------------------------------------------

function montaGrafico(selecoes,dimensoes){

		var opcao=selecoes.opcao;

			d3.json("dados/2014-"+opcao + ".json", function(error,data) {
				if (error) {
					console.log(error);
					return;
				}
				else {

					dataset = data;

					var escalas={
							rScale: d3.scaleLinear(),
							xScale: devolveEscalaX(opcao),
							yScale: d3.scaleLinear()
						};
					var eixos={
						xAxis: defineEixo(dimensoes,opcao,escalas.xScale,'x'),
						yAxis: defineEixo(dimensoes,opcao,escalas.yScale,'y')
					};

					//realiza um primeiro preenchimento do grafico(original)
					refrescaGrafico(selecoes,data,dimensoes,escalas,eixos);

					//realiza um preenchimento do tipo atualizacao de um grafico ja
					//existente. Seta original para false
					selecoes.original=false;
					atualizaGrafico(dimensoes,selecoes,escalas,eixos);
				}
			});//fecha leitura de dados
}


//-----------------------------------------funcoes atualizacao grafico estado

function atualizaGrafico(dimensoes,selecoes,escalas,eixos){

	opcao=selecoes.opcao;
	//seleciona o ano e gera os circulos
	d3.selectAll("#year-"+opcao)
	.on("click", function() {
    //d3.select(".chart-"+opcao).selectAll(".axis").remove();
		d3.json("dados/" + $(this).html() + ".json", function(error,data) {
			if (error) {
				console.log(error); //Log the error.
			}
			else {

				refrescaGrafico(selecoes,data,dimensoes,escalas,eixos);
			}//fecha else
		});
	});
}

function refrescaGrafico(selecoes,data,dimensoes,escalas,eixos){
  dataset = data;
	opcao=selecoes.opcao;

	//realiza atualizacao de escalas, eixos e constroi os circulos
	atualizaEscala(opcao,data,dimensoes,escalas,'r');
  atualizaEscala(opcao,data,dimensoes,escalas,'x');
  atualizaEscala(opcao,data,dimensoes,escalas,'y');

	atualizaEixo(eixos.xAxis,'x');
	atualizaEixo(eixos.yAxis,'y');

  constroiCirculos(selecoes,escalas);
}


//-----------------------------------funcoes circulos - estados

//constroi circulos - estados
function constroiCirculos(selecoes,escalas){
  desenhaCirculos(selecoes,escalas);
  rotulaCirculos(selecoes,escalas);
}


//desenha os circulos - grafico estados
function desenhaCirculos(selecoes,escalas){

	opcao=selecoes.opcao;

	var selecao =d3.select(".chart-"+opcao).selectAll("#circulo")
    .data(dataset);

	//caso primeira chamada da funcao, cria e insere os circulos
	if(selecoes.original==true){

				selecao
				.enter()
				.append("circle")
				.attr("id", function(d) {
					return "circulo";
				});
	}

	//preenche os circulos conforme a visualizacao de estados
	if(opcao==='estados'){

		//definindo propriedades dos circulos
		selecao =d3.select(".chart-"+opcao).selectAll("#circulo")
		.data(dataset)
		.attr("cx", function(d) {
			return escalas.xScale((d.fem)/(d.total));
		})
		.attr("cy", function(d) {
			return escalas.yScale((d.csup)/(d.total));
		})
		.attr("r", function(d) {
			return escalas.rScale(d.total);
		})
		.attr("fill", function(d) {
			return d.regiao;
		})
		.on("mouseover", function(d){
			var texto = ("<dl><dt>Estado</dt><dd>" + d.nome
									+"</dd><dt>Sigla</dt><dd>" +d.estado
									+"</dd><dt>Total candidatos</dt><dd>" +d.total
									+"</dd><dt>Total gênero Feminino</dt><dd>" +d.fem
									+"</dd><dt>Total curso superior</dt><dd>" +d.csup
									+"</dd></dl>");
			$("#detalhe").append(texto);
		})
		.on("mouseout", function(d){
			$("#detalhe").html("");
		});

	//preenche os circulos conforme visualizacao de cor de pele
	}else if(opcao==='corpele'){

		//definindo propriedades dos circulos
		selecao =d3.select(".chart-"+opcao).selectAll("#circulo")
		.data(dataset)
		.attr("cx", function(d) {
			return escalas.xScale((d.fem)/(d.total));
		})
		.attr("cy", function(d) {
			return escalas.yScale((d.csup)/(d.total));
		})
		.attr("r", function(d) {
			return escalas.rScale(d.totalGrupo);
		})
		.attr("fill", function(d) {
			return d.corCirculo;
		})
		.on("mouseover", function(d){
			var texto = ("<dl><dt>Grupo Cor de Pele</dt><dd>" + d.nome
									+"</dd><dt>Total do grupo</dt><dd>" +d.totalGrupo
									+"</dd><dt>Total grupo gênero Feminino</dt><dd>" +d.fem
									+"</dd><dt>Total grupo curso superior</dt><dd>" +d.csup
									+"</dd></dl>");
			$("#detalhe").append(texto);
		})
		.on("mouseout", function(d){
			$("#detalhe").html("");
		});

	}

		//define uma transicao para o grafico
		selecao
			.transition()
			.duration(2000);
}


//adicionando rotulo a cada circulo, legivel no interior de cada um, no grafico
function rotulaCirculos(selecoes,escalas){

		opcao =selecoes.opcao;
		textoCirculo = setaTextoCirculo(opcao);

  	var selecao =d3.select(".chart-"+opcao).selectAll("#texto")
    .data(dataset);

		//se primeira ocorrencia da funcao, constroi os elementos de texto
		if(selecoes.original===true){

					selecao
					.enter()
					.append("text")
					.attr("id", function(d) {
						return "texto";
					})
					.attr("text-anchor", textoCirculo.ancora)
					.attr("font-family", "sans-serif")
					.attr("font-size", "11px")
					.attr("fill", textoCirculo.cor);
		}

		//chamada para o grafico de estados
		if(opcao==='estados'){

					selecao =d3.select(".chart-"+opcao).selectAll("#texto")
			    .data(dataset)
			    .transition()
			    .duration(2000)
			    .text(function(d) {
			      return d.estado;
			    })
			    .attr("x", function(d) {
			      return escalas.xScale((d.fem)/(d.total))
			    })
			    .attr("y", function(d) {
			      return escalas.yScale((d.csup)/(d.total));
			    });

		//chamada para o grafico de cor de pele
		}else if(opcao==='corpele'){

			selecao =d3.select(".chart-"+opcao).selectAll("#texto")
			.data(dataset)
			.transition()
			.duration(2000)
			.text(function(d) {
				return d.nome;
			})
			.attr("x", function(d) {
				return escalas.xScale((d.fem)/(d.total))
			})
			.attr("y", function(d) {
				return escalas.yScale((d.csup)/(d.total));
			});

		}
}

//---------------------------------------------------------------------------
//funcoes escalas


function atualizaEscala(opcao,data,dimensoes,escalas,tipo){

	if(tipo==='x'){
		escalas.xScale
			.domain([d3.min(data, function(d) { return (d.fem)/(d.total); })-0.001,
				d3.max(data, function(d) { return (d.fem)/(d.total); })])
			.range([dimensoes.padding, dimensoes.w-dimensoes.padding]);

	}else if(tipo==='y'){
		escalas.yScale
		.domain([d3.min(data, function(d) { return (d.csup)/(d.total); })-0.02,
      d3.max(data, function(d) { return (d.csup)/(d.total); })])
		.range([dimensoes.h-dimensoes.padding, dimensoes.padding]);

	}else if (tipo==='r'){

		if(opcao === 'estados'){
			escalas.rScale
			.domain([0, d3.max(data, function(d) { return d.total; })])
			.range([10, 40]);

		}else if(opcao === 'corpele'){
			escalas.rScale
			.domain([d3.min(data, function(d) { return d.totalGrupo; }),
				d3.max(data, function(d) { return d.totalGrupo; })])
			.range([10, 40]);
		}
	}
}

//---------------------------------------------------------------------------
//funcao para definicao dos eixos
function defineEixo(dimensoes,opcao,escala,tipo){

	if(tipo==='x')		var eixo = d3.axisBottom(escala);
	else if(tipo==='y')	var eixo = d3.axisLeft(escala);

	//formatando eixos como porcentagem
	var formatAsPercentage = d3.format(".1%");
 	eixo.tickFormat(formatAsPercentage);

	desenhaEixo(dimensoes,opcao,tipo);
	rotulaEixo(dimensoes,opcao,tipo);

  return eixo;
}


function desenhaEixo(dimensoes,opcao,tipo){

  var selecao =d3.select(".chart-"+opcao).append("g")
  .attr("class", tipo+"-axis"); //Assign "axis" class

	if(tipo==='x'){

	selecao.attr("transform", "translate(0," + (dimensoes.h - dimensoes.padding) + ")");

	}else if(tipo==='y'){

	selecao.attr("transform", "translate(" + dimensoes.padding + ",0)");
	}
}

function atualizaEixo(eixo,tipo){

	d3.select("."+tipo+"-axis")
	.transition()
	.duration(2000)
  .call(eixo);
}

// adiciona o rotulo do eixo
function rotulaEixo(dimensoes,opcao,tipo){

	var selecao =d3.select(".chart-"+opcao).append("text")
	.style("text-anchor", "middle");

	if(tipo==='x'){
		selecao
		.attr("transform", "translate(" + (dimensoes.w/ 2) + "," + (dimensoes.h) + ")")
		.text("candidatos do Gênero Feminino/Total candidatos (%)");

	}else if(tipo==='y'){
		selecao
		.attr("transform", "rotate(-90)")
	  .attr("y", 120 - dimensoes.padding)
	  .attr("x",0 - (dimensoes.h / 2))
	  .attr("dy", "1em")
	  .text("candidatos com curso superior completo/Total de candidatos (%)");
	}
}

//-----------------------------------------------------------------------------
