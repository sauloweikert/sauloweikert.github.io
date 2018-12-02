//------------------------------------------------------saida grafico

function fechaVisualizacoes(){
	if ($('.div-grafico').length){
		sairGrafico();
	}
}


//funcao sair da visualizacao corrente
function sairGrafico(){

		//remove Suporte
		$('.div-grafico').remove();
		//remove botao Sair
		$('#botao-sair').remove();
		//verifica e fecha legendas abertas
		if ($('#legend').length){ $('#legend').remove();}
		if ($('#detalhe').length){ $('#detalhe').remove();}


	//reabilita o botao visualizar
	document.getElementsByClassName("botao-visualizar").disabled = false;

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
	document.getElementsByClassName("painel-grafico-"+opcao)[0].appendChild(element);
}
//---------------------------------------------------construcao grafico estados

//funcao montagem legenda grafico
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

	//definicao do titulo da Detalhe
	//divDetalhe.innerHTML = "Detalhe";

	//adicao da Detalhe no painel
	$(".painel-grafico-"+opcao).append(divDetalhe);
}


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

//--------------------------------------------------------------------------

//funcao construcao inicial grafico
function configuraGrafico(w,h,opcao){

	//criando o elemento svg
	d3.select(".chart-"+opcao)
		.attr("width", w)
		.attr("height", h)
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px");

  return;
}

//desabilitar botao visualizar do mesmo painel durante a visualização corrente
function desabilitaBotaoVisualizar(){

	document.getElementsByClassName("botao-visualizar").disabled = true;
	return;
}


//------------------------------------------------------------------------------
//funcoes montagem grafico
function criaSuporteGrafico(opcao){

	//cria dinamicamente elemento do tipo div para conter o grafico
	var divGrafico = document.createElement('div');
	divGrafico.className = 'div-grafico';
	divGrafico.id = 'original';
 	divGrafico.style.overflowX ='auto';
	document.getElementsByClassName("painel-grafico-"+opcao)[0].appendChild(divGrafico);


	//cria dinamicamente elemento tipo svg que sera o grafico
	var element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	element.setAttribute("class", "chart-"+opcao);
	document.getElementsByClassName("div-grafico")[0].appendChild(element);


	return;
}

function montaGrafico(opcao){

	//verifica e fecha outras visualizações abertas
	//fechaVisualizacoes(opcao);
	fechaVisualizacoes();

	desabilitaBotaoVisualizar();

  //largura,altura,padding
  var h = 400;
  var padding = 90;
	if(opcao==='estados')	var w = 1500;
	else if (opcao==='corpele') var w = 1150;


	criaBotaoSairGrafico(opcao);

	//cria suporte grafico
	criaSuporteGrafico(opcao);
  configuraGrafico(w,h,opcao);

	montaLegenda(opcao);

	montaDetalhe(opcao);

	montaGraficoOriginal(padding,w,h,opcao);


}


//-------------------------------------funcoes grafico original

function montaGraficoOriginal(padding,w,h,opcao){

		d3.json("dados/2014-"+opcao + ".json", function(error,data) {
			if (error) { //If error is not null, something went wrong.
				console.log(error); //Log the error.
			}
			else { //If no error, the file loaded correctly. Yay!
				//console.log(data); //Log the data.

				dataset = data;

				if(opcao === 'estados'){

					var rScale = d3.scaleLinear();
					atualizaEscalaRaio(opcao,data,rScale);

					var xScale = d3.scaleLinear();
					atualizaEscalaX(data,padding,w,xScale);
					var xAxis = defineEixoX(xScale);
					desenhaEixoX(xAxis,padding,h,opcao);
					rotulaEixoX(padding,h,w,opcao);

					var yScale = d3.scaleLinear();
					atualizaEscalaY(data,padding,h,yScale);
					var yAxis = defineEixoY(yScale);
					desenhaEixoY(yAxis,padding,opcao);
					rotulaEixoY(padding,h,opcao);

					constroiCirculosEstadosOriginal(xScale,yScale,rScale);

				}

				else if(opcao === 'corpele'){

					var rScale = d3.scaleLinear();
					atualizaEscalaRaio(opcao,data,rScale);

					var xScale = d3.scaleLog();
					atualizaEscalaX(data,padding,w,xScale);
					var xAxis = defineEixoX(xScale);
					desenhaEixoX(xAxis,padding,h,opcao);
					rotulaEixoX(padding,h,w,opcao);

					var yScale = d3.scaleLinear();
					atualizaEscalaY(data,padding,h,yScale);
					var yAxis = defineEixoY(yScale);
					desenhaEixoY(yAxis,padding,opcao);
					rotulaEixoY(padding,h,opcao);

					constroiCirculosCorPeleOriginal(xScale,yScale,rScale);
				}
				//verifica acoes do usuario para carregar novos graficos
				atualizaGrafico(padding,w,h,opcao,rScale,xScale,yScale,xAxis,yAxis);
			}//fecha else

		});
}

//-----------------------------------------funcoes atualizacao grafico estado

function refrescaGraficoEstado(opcao,data, padding,w,h,rScale,xScale,yScale,xAxis,yAxis){
  dataset = data;

	atualizaEscalaRaio(opcao,data,rScale);
  atualizaEscalaX(data,padding,w,xScale);
  atualizaEscalaY(data,padding,h,yScale);

  atualizaEixoX(xAxis);
	atualizaEixoY(yAxis);

  constroiCirculosEstados(opcao,xScale,yScale,rScale);
}

function atualizaGrafico(padding,w,h,opcao,rScale,xScale,yScale,xAxis,yAxis){

	//seleciona o ano e gera os circulos
	d3.selectAll("#year-"+opcao)
	.on("click", function() {
    //d3.select(".chart-"+opcao).selectAll(".axis").remove();
		d3.json("dados/" + $(this).html() + ".json", function(error,data) {
			if (error) {
				console.log(error); //Log the error.
			}
			else {

				if(opcao === 'estados')refrescaGraficoEstado(opcao,data, padding,w,h,rScale,xScale,yScale,xAxis,yAxis);
				else if(opcao === 'corpele')refrescaGraficoCorPele(opcao,data, padding,w,h,rScale,xScale,yScale,xAxis,yAxis);

				}//fecha else
			});
		});
}

//-----------------------------------funcoes circulos - estados

//constroi circulos - estados
function constroiCirculosEstadosOriginal(xScale,yScale,rScale){
  desenhaCirculosEstadoOriginal(xScale,yScale,rScale);
  rotulaCirculosEstadoOriginal(xScale,yScale);
}


//desenha os circulos - grafico estados
function desenhaCirculosEstadoOriginal(xScale,yScale,rScale){

	var selecao =d3.select(".chart-estados").selectAll("#circulo")
    .data(dataset);

		console.log("dentro original");
		if ($('.original').length){
			console.log("orignal vale");
		}else console.log("original nao vale");

		selecao
		.enter()
		.append("circle")

		//definindo propriedades dos circulos
		.attr("cx", function(d) {
			return xScale((d.fem)/(d.total));
		})
		.attr("cy", function(d) {
			return yScale((d.csup)/(d.total));
		})
		.attr("r", function(d) {
			return rScale(d.total);
		})
		.attr("fill", function(d) {
			return d.regiao;
		})
		.attr("id", function(d) {
			return "circulo";
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

		//define uma transicao para o grafico
		selecao
			.transition()
			.duration(2000);
}

//adicionando rotulo a cada circulo, legivel no interior de cada um, no grafico
function rotulaCirculosEstadoOriginal(xScale,yScale){
  d3.select(".chart-estados").selectAll("#textoEstado")
    .data(dataset)
		.enter()
		.append("text")
    .transition()
    .duration(2000)
    .text(function(d) {
      return d.estado;
    })
    .attr("x", function(d) {
      return xScale((d.fem)/(d.total))
    })
    .attr("y", function(d) {
      return yScale((d.csup)/(d.total));
    })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
		.attr("id", function(d) {
			return "textoEstado";
		});
}

//---------------------------------------------------------------------------
//funcoes escalas


//atualiza escala do raio
function atualizaEscalaRaio(opcao,data,rScale){
	if(opcao === 'estados'){
		rScale.domain([0, d3.max(data, function(d) { return d.total; })])
		.range([10, 40]);
		return;
	}else if(opcao === 'corpele'){
		rScale.domain([d3.min(data, function(d) { return d.totalGrupo; }),
							d3.max(data, function(d) { return d.totalGrupo; })])
		.range([10, 40]);
		return;
	}
}

function atualizaEscalaX(data,padding,w,xScale){
		 xScale.domain([d3.min(data, function(d) { return (d.fem)/(d.total); })-0.001,
              d3.max(data, function(d) { return (d.fem)/(d.total); })])
		 .range([padding, w-padding]);
		return;
}

function atualizaEscalaY(data,padding,h,yScale){

		yScale.domain([d3.min(data, function(d) { return (d.csup)/(d.total); })-0.02,
              d3.max(data, function(d) { return (d.csup)/(d.total); })])
		.range([h-padding, padding]);
		return;
}

//---------------------------------------------------------------------------
//funcoes eixos

//define eixo x
function defineEixoX(xScale){

      //formatando eixos como porcentagem
  var formatAsPercentage = d3.format(".1%");

  var xAxis = d3.axisBottom(xScale)
  .tickFormat(formatAsPercentage);

  return xAxis;
}


function desenhaEixoX(xAxis,padding,h,opcao){

  d3.select(".chart-"+opcao).append("g")
  .attr("class", "x-axis") //Assign "axis" class
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);
}

function atualizaEixoX(xAxis){

  d3.select(".x-axis")
	.transition()
	.duration(2000)
  .call(xAxis);
}


// adiciona o rotulo do eixo
function rotulaEixoX(padding,h,w,opcao){
d3.select(".chart-"+opcao).append("text")
    .attr("transform", "translate(" + (w/ 2) + "," + (h) + ")")
    .style("text-anchor", "middle")
    .text("candidatos do Gênero Feminino/Total candidatos (%)");
}


//-----------------------------------------------------------------------------

//define eixo y
function defineEixoY(yScale){

      //formatando eixos como porcentagem
  var formatAsPercentage = d3.format(".1%");

  var yAxis = d3.axisLeft(yScale)
  .tickFormat(formatAsPercentage);
  return yAxis;
}

function desenhaEixoY(yAxis,padding,opcao){

  //Cria eixo y
  d3.select(".chart-"+opcao).append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
}

function atualizaEixoY(yAxis){

  //atualiza Y axis
  d3.select(".y-axis")
	.transition()
  .duration(2000)
  .call(yAxis);
}

//desenha rotulo eixo y
function rotulaEixoY(padding,h,opcao){
  d3.select(".chart-"+opcao).append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 120 - padding)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("candidatos com curso superior completo/Total de candidatos (%)");
}


//----------------------------------------------------------------------------
//funcoes contrucao circulos - grafico estados -

//constroi circulos - estados
function constroiCirculosEstados(opcao,xScale,yScale,rScale){
  desenhaCirculosEstado(opcao,xScale,yScale,rScale);
  rotulaCirculosEstado(xScale,yScale);
}

//desenha os circulos - grafico estados
function desenhaCirculosEstado(opcao,xScale,yScale,rScale){

	var selecao = d3.select(".chart-"+opcao).selectAll("#circulo")
    .data(dataset);

		console.log("dentro atual");
		if ($('.original').length){
			console.log("orignal vale");
		}else console.log("original nao vale");


    //definindo propriedades dos circulos
    selecao.attr("cx", function(d) {
      return xScale((d.fem)/(d.total));
    })
    .attr("cy", function(d) {
      return yScale((d.csup)/(d.total));
    })
    .attr("r", function(d) {
      return rScale(d.total);
    })
		/*----nos dados atuais a regiao mantem a ordem de aparicao. comenta-se
		esta linha por criterio de eficiencia de rendering
    .attr("fill", function(d) {
      return d.regiao;
    })*/
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
		})
		.exit()
		.remove();

		//define uma transicao para o grafico
		selecao
			.transition()
			.duration(2000);
}

//adicionando rotulo a cada circulo, legivel no interior de cada um, no grafico
function rotulaCirculosEstado(xScale,yScale){
  d3.select(".chart-estados").selectAll("#textoEstado")
    .data(dataset)
    .transition()
    .duration(2000)
    .text(function(d) {
      return d.estado;
    })
    .attr("x", function(d) {
      return xScale((d.fem)/(d.total))
    })
    .attr("y", function(d) {
      return yScale((d.csup)/(d.total));
    })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");
}


//------------------------------------------------------------
//---------------------------FUNCOES GRAFICO COR PELE---------
function refrescaGraficoCorPele(opcao,data, padding,w,h,rScale,xScale,yScale,xAxis,yAxis){
  dataset = data;

  atualizaEscalaRaio(opcao,data,rScale);
  atualizaEscalaX(data,padding,w,xScale);
  atualizaEscalaY(data,padding,h,yScale);

  atualizaEixoX(xAxis);
	atualizaEixoY(yAxis);

  constroiCirculosCorPele(xScale,yScale,rScale);
}

//-----------------------------------funcoes circulos - estados

//constroi circulos -
function constroiCirculosCorPeleOriginal(xScale,yScale,rScale){
  desenhaCirculosCorPeleOriginal(xScale,yScale,rScale);
  rotulaCirculosCorPeleOriginal(xScale,yScale);
}


//desenha os circulos -
function desenhaCirculosCorPeleOriginal(xScale,yScale,rScale){

	var selecao = d3.select(".chart-corpele").selectAll("#circuloCorPele")
    .data(dataset)
		.enter()
		.append("circle")

    //definindo propriedades dos circulos
    .attr("cx", function(d) {
      return xScale((d.fem)/(d.total));
    })
    .attr("cy", function(d) {
      return yScale((d.csup)/(d.total));
    })
    .attr("r", function(d) {
      return rScale(d.totalGrupo);
    })
    .attr("fill", function(d) {
      return d.corCirculo;
    })
		.attr("id", function(d) {
			return "circuloCorPele";
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

		//define uma transicao para o grafico
		selecao
			.transition()
			.duration(2000);
}

//adicionando rotulo a cada circulo, legivel no interior de cada um, no grafico
function rotulaCirculosCorPeleOriginal(xScale,yScale){
  d3.select(".chart-corpele").selectAll("#textoCorPele")
    .data(dataset)
		.enter()
		.append("text")
    .transition()
    .duration(2000)
    .text(function(d) {
      return d.nome;
    })
    .attr("x", function(d) {
      return xScale((d.fem)/(d.total))
    })
    .attr("y", function(d) {
      return yScale((d.csup)/(d.total));
    })
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "olive")
		.attr("id", function(d) {
			return "textoCorPele";
		});
}

//----------------------------------------------------------------------------


//----------------------------------------------------------------------------
//funcoes contrucao circulos - grafico cor pele


//constroi circulos - cor de pele
function constroiCirculosCorPele(xScale,yScale,rScale){
  desenhaCirculosCorPele(xScale,yScale,rScale);
  rotulaCirculosCorPele(xScale,yScale);
}

//desenha os circulos - grafico cor pele
function desenhaCirculosCorPele(xScale,yScale,rScale){

	var selecao = d3.select(".chart-corpele").selectAll("#circuloCorPele")
  .data(dataset)

  //definindo propriedades dos circulos
  .attr("cx", function(d) {
    return xScale((d.fem)/(d.total));
  })
  .attr("cy", function(d) {
    return yScale((d.csup)/(d.total));
  })
  .attr("r", function(d) {
    return rScale(d.totalGrupo);
  })
		/*mantem-se inalterado
  .attr("fill", function(d){
    return d.corCirculo;
  })*/
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

	//define uma transicao para o grafico
	selecao
		.transition()
		.duration(2000);
}

//adicionando rotulo a cada circulo, legivel no interior de cada um, no grafico
function rotulaCirculosCorPele(xScale,yScale){
  d3.select(".chart-corpele").selectAll("#textoCorPele")
    .data(dataset)
    .transition()
    .duration(2000)
    .text(function(d) {
      return d.nome;
    })
    .attr("x", function(d) {
      return xScale((d.fem)/(d.total));
    })
    .attr("y", function(d) {
      return yScale((d.csup)/(d.total));
    })
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "olive");
}

//----------------------------------------------------------------------------
