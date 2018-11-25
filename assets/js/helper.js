//------------------------------------------------------saida grafico
//funcao saida montaGrafico
function sairGrafico(opcao){

//	d3.select("svg").remove();

	//remove Suporte
	$('.div-grafico').remove();

	//remove legenda
	//$('#legend').remove();

	//remove botao Sair
	$('#botao-sair').remove();

	//reabilita o botao visualizar
	document.getElementById("botao-visualizar-"+opcao).disabled = false;

	return;
}

//botao saida grafico
function criaBotaoSairGrafico(opcao){
	var element = document.createElement("input");

	//definindo atributos e estilos dinamicamente
	element.type = "button";
	element.value = "Sair";
	element.id='botao-sair';
	element.style.position = 'absolute';
	element.style.right ='10px';
	element.style.marginTop ='10px';
	element.onclick = function() {
		sairGrafico(opcao);
	};
	document.getElementsByClassName("painel-grafico-"+opcao)[0].appendChild(element);
}

//---------------------------------------------------construcao grafico estados

//funcao montagem legenda grafico
function montaLegenda(opcao){
	var divLegenda = document.createElement('div');
	divLegenda.id = 'legend';

	//definicao dinamica do estilo da legenda
	divLegenda.style.borderStyle = 'double';
	divLegenda.style.display = 'inline-block';
	divLegenda.style.width = '15%';
	divLegenda.style.position = 'absolute';
	divLegenda.style.right ='10px';
	divLegenda.style.top ='10px';
	divLegenda.style.backgroundColor = 'white';
	divLegenda.style.opacity = '50%';
	divLegenda.style.padding = '5px';

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
function desabilitaBotaoVisualizar(opcao){

	document.getElementById("botao-visualizar-"+opcao).disabled = true;
	return;
}

//verifica e fecha outras visualizações abertas
function fechaVisualizacoes(opcao){

	//desabilitar botao visualizar do mesmo painel durante a visualização corrente
	desabilitaBotaoVisualizar(opcao);

	//fecha grficos de outros paineis que estejam abertos
	if(opcao === 'estados') var contraOpcao = "eleitoresestado";
	else if(opcao === 'corpele') var contraOpcao = "estados";
	else if(opcao === 'eleitoresestado') var contraOpcao = "corpele";

	var open =document.getElementById("botao-visualizar-"+contraOpcao).disabled;
	if(open == true) sairGrafico(contraOpcao);
	else return;
}


//------------------------------------------------------------------------------
//funcoes montagem grafico
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


	// Define the div for the tooltip
/*	var div = d3.select("svg").append("div")
	    .attr("class", "tooltip")
	    .style("opacity", 0)
			.style("width","60px")
			.style("height","28px")
			.attr("text-anchor", "middle")
	    .attr("font-family", "sans-serif")
	    .attr("font-size", "11px")
	    .attr("fill", "black");*/

	return;
}

function montaGrafico(opcao){

	//verifica e fecha outras visualizações abertas
	fechaVisualizacoes(opcao);

  //largura,altura,padding
  var w = 1500;
  var h = 400;
  var padding = 90;

	criaBotaoSairGrafico(opcao);

	//cria suporte grafico
	criaSuporteGrafico(opcao);
  configuraGrafico(w,h,opcao);

	montaLegenda(opcao);

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
					atualizaEscalaRaioEstados(data,rScale);

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
					atualizaEscalaRaioCorPele(data,rScale);

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

function refrescaGraficoEstado(data, padding,w,h,rScale,xScale,yScale,xAxis,yAxis){
  dataset = data;

	atualizaEscalaRaioEstados(data,rScale);
  atualizaEscalaX(data,padding,w,xScale);
  atualizaEscalaY(data,padding,h,yScale);

  atualizaEixoX(xAxis);
	atualizaEixoY(yAxis);

  constroiCirculosEstados(xScale,yScale,rScale);
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

				if(opcao === 'estados')refrescaGraficoEstado(data, padding,w,h,rScale,xScale,yScale,xAxis,yAxis);
				else if(opcao === 'corpele')refrescaGraficoCorPele(data, padding,w,h,rScale,xScale,yScale,xAxis,yAxis);

				}//fecha else
			});
		});
}

//-----------------------------------funcoes circulos - estados

//constroi circulos - estados
function constroiCirculosEstadosOriginal(xScale,yScale,rScale){
  desenhaCirculosEstadoOriginal(xScale,yScale,rScale);
  rotulaCirculosEstadoOriginal(xScale,yScale);
	dicaCirculosPorEstadoOriginal();
}

//desenha os circulos - grafico estados
function desenhaCirculosEstadoOriginal(xScale,yScale,rScale){

	d3.select(".chart-estados").selectAll("#circuloEstado")
    .data(dataset)
		.enter()
		.append("circle")
		.transition()
		.duration(2000)
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
			return "circuloEstado";
		});

/*
		circulos.on("mouseover", function(d) {
            d3.select('.tooltip').transition()
                .duration(200)
                .style("opacity", .9);
            d3.select('.tooltip').html("estado:" + d.nome + "fem:" + d.fem + "<br/>"  +"csup:" + d.csup)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            d3.select('.tooltip').transition()
                .duration(500)
                .style("opacity", 0);
        });*/
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

//adiciona uma dica "tooltip" para cada circulo, visivel ao sobrepor o mouse
//a ser usado para grafico Estados

function dicaCirculosPorEstadoOriginal(){

  d3.select(".chart-estados").selectAll("#circuloEstado")
    .data(dataset)
		.enter()
    .append("svg:title")
      .text(function(d) {
        return "Estado:" +"\t"+"\t"+"\t" + d.nome + "\n"
        + "Total:" +"\t"+"\t"+"\t" + d.total + "\n"
        + "Feminino:" +"\t"+"\t"+d.fem + "\n"
        + "Curso sup.completo:" +"\t"+ d.csup;
      });
}

//---------------------------------------------------------------------------
//funcoes escalas


//atualiza escala do raio
function atualizaEscalaRaioEstados(data,rScale){
	rScale.domain([0, d3.max(data, function(d) { return d.total; })])
	.range([10, 40]);
	return;
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
  .tickFormat(formatAsPercentage)
  return xAxis;
}


function desenhaEixoX(xAxis,padding,h,opcao){

  d3.select(".chart-"+opcao).append("g")
  .attr("class", "x-axis") //Assign "axis" class
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);
}

function atualizaEixoX(xAxis){

  d3.select("svg").select(".x-axis")
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
function constroiCirculosEstados(xScale,yScale,rScale){
  desenhaCirculosEstado(xScale,yScale,rScale);
  rotulaCirculosEstado(xScale,yScale);
  dicaCirculosPorEstado();
}

//desenha os circulos - grafico estados
function desenhaCirculosEstado(xScale,yScale,rScale){
//  d3.select(".chart-estados").selectAll("#circuloEstado")
	d3.select(".chart-estados").selectAll("#circuloEstado")
    .data(dataset)
    .transition()
    .duration(2000)
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
		/*----nos dados atuais a regiao mantem a ordem de aparicao. comenta-se
		esta linha por criterio de eficiencia de rendering
    .attr("fill", function(d) {
      return d.regiao;
    })*/;

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

//adiciona uma dica "tooltip" para cada circulo, visivel ao sobrepor o mouse
//a ser usado para grafico Estados
function dicaCirculosPorEstado(){
  d3.select(".chart-estados").selectAll("#circuloEstado")
    .data(dataset)
      .text(function(d) {
        return "Estado:" +"\t"+"\t"+"\t" + d.nome + "\n"
        + "Total:" +"\t"+"\t"+"\t" + d.total + "\n"
        + "Feminino:" +"\t"+"\t"+d.fem + "\n"
        + "Curso sup.completo:" +"\t"+ d.csup;
      });
    return;
}

//------------------------------------------------------------
//---------------------------FUNCOES GRAFICO COR PELE---------
function refrescaGraficoCorPele(data, padding,w,h,rScale,xScale,yScale,xAxis,yAxis){
  dataset = data;

  atualizaEscalaRaioCorPele(data,rScale);
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
	dicaCirculosPorCorPeleOriginal();
}


//desenha os circulos -
function desenhaCirculosCorPeleOriginal(xScale,yScale,rScale){

	d3.select(".chart-corpele").selectAll("#circuloCorPele")
    .data(dataset)
		.enter()
		.append("circle")

		//define propiedades dos circulos
    .transition()
    .duration(2000)
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
		});
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
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
		.attr("id", function(d) {
			return "textoCorPele";
		});
}

//adiciona uma dica "tooltip" para cada circulo, visivel ao sobrepor o mouse
//a ser usado para grafico Pele

function dicaCirculosPorCorPeleOriginal(){
  d3.select(".chart-corpele").selectAll("#circuloCorPele")
    .data(dataset)
		.enter()
    .append("title")
      .text(function(d) {
        return "Cor:" +"\t"+"\t"+"\t" + d.cor + "\n"
        + "Total do grupo:" +"\t"+"\t"+"\t" + d.totalGrupo + "\n"
        + "Feminino:" +"\t"+"\t"+d.fem + "\n"
        + "Curso sup.completo:" +"\t"+ d.csup;
      });
    return;
}


//----------------------------------------------------------------------------
//funcoes escalas

//atualiza escala do raio
function atualizaEscalaRaioCorPele(data,rScale){
  rScale.domain([d3.min(data, function(d) { return d.totalGrupo; }),
            d3.max(data, function(d) { return d.totalGrupo; })])
  .range([10, 60]);
	return;
}



//----------------------------------------------------------------------------
//funcoes contrucao circulos - grafico cor pele


//constroi circulos - cor de pele
function constroiCirculosCorPele(xScale,yScale,rScale){
  desenhaCirculosCorPele(xScale,yScale,rScale);
  rotulaCirculosCorPele(xScale,yScale);
  dicaCirculosPorCorPele();
}

//desenha os circulos - grafico cor pele
function desenhaCirculosCorPele(xScale,yScale,rScale){
d3.select(".chart-corpele").selectAll("#circuloCorPele")
  .data(dataset)
  .transition()
  .duration(2000)
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
  })*/;
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

//adiciona uma dica "tooltip" para cada circulo, visivel ao sobrepor o mouse
//a ser usado para grafico CorPele
function dicaCirculosPorCorPele(){
  d3.select(".chart-corpele").selectAll("#circuloCorPele")
    .data(dataset)
    .append("title")
      .text(function(d) {
        return "Cor:" +"\t"+"\t"+"\t" + d.cor + "\n"
        + "Total do grupo:" +"\t"+"\t" + d.totalGrupo + "\n"
        + "Feminino:" +"\t"+"\t"+d.fem + "\n"
        + "Curso sup.completo:" +"\t"+ d.csup;
      });
      return;
}
//----------------------------------------------------------------------------
//------------------FUNCOES GRAFICO ELEITORES ESTADOS

function fazGraficoEleitores(opcao){

  //verifica e fecha outras visualizações abertas
  fechaVisualizacoes(opcao);

  criaBotaoSairGrafico(opcao);

//--cria suporte grafico

  //cria dinamicamente elemento do tipo div para conter o grafico
  var divGrafico = document.createElement('div');
  divGrafico.className = 'div-grafico';
  divGrafico.style.overflowX ='auto';
//  divGrafico.style.right ='0px';
  divGrafico.style.left ='10px';
  divGrafico.style.backgroundColor = 'white';
  document.getElementsByClassName("painel-grafico-"+opcao)[0].appendChild(divGrafico);



  //cria dinamicamente elemento tipo svg que sera o grafico
  var element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//  element.setAttribute("class", "chart-"+opcao);
  document.getElementsByClassName("div-grafico")[0].appendChild(element);


  //cria div para operacoessvg
  var divOp = document.createElement('div');
  divGrafico.className = 'div-op';
//  divGrafico.style.overflowX ='auto';
//  divGrafico.style.right ='0px';
  divGrafico.style.left ='10px';
  divGrafico.style.backgroundColor = 'white';

  document.getElementsByClassName("painel-grafico-"+opcao)[0].appendChild(divOp);



  /*Cria objeto svg e o objeto de grupo g para manipulação do DOM.*/

 var largura = 1100;
 var altura = 600;

  d3.select("svg")
    .attr("width",largura)
    .attr("height",altura);


  var svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      //margin = {top: 0, right: 0, bottom: 0, left: 0},
      width = +largura - margin.left - margin.right - 150,
      height = +altura - margin.top - margin.bottom-20,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var estados = [["AC","Acre"],["AL","Alagoas"],["AM","Amazonas"],["AP","Amapá"],
    ["BA","Bahia"],["CE","Ceará"],["DF","Distrito Federal"],["ES","Espírito Santo"],
    ["GO","Goiânia"],["MA","Maranhão"],["MG","Minas Gerais"],
    ["MS","Mato Grosso do Sul"],["MT","Mato Grosso"],["PA","Pará"],["PB","Paraíba"],
    ["PE","Pernambuco"],["PI","Piaui"],["PR","Paraná"],["RJ","Rio de Janeiro"],
    ["RN","Rio Grande do Norte"],["RO","Rondonia"],["RR","Roraima"],
    ["RS","Rio Grande do Sul"],["SC","Santa Catarina"],["SE","Sergipe"],
    ["SP","São Paulo"],["TO","Tocantins"],["ZZ","Estrangeiro"]];


  var retornaPosicao = function(vetor,key){

  	for(var i=0; i<vetor.length; i++){
  		if(vetor[i][0]==key){
  			return i;
  		}
  	}

  	return -1;
  }

  /*Função que irá criar o gráfico de barras múltiplos para o número total de eleitores
  por estado.*/

  var funcaoGerarDados = function(arquivoASerLido){

    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#d7191c", "#fdae61","#2c7bb6","#d7191c", "#fdae61","#2c7bb6"]);


  /*Função que lê o arquivo csv.*/
  d3.csv("dados/"+ arquivoASerLido, function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, function(error, data) {
    if (error) throw error;

    var dadosComp = data;


    /*Dados que serão utilizados para o valor absoluto.*/
    var keys = data.columns.slice(1,4);
    //console.log(keys);


    x0.domain(data.map(function(d) { return d.estado; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

    /*Dados que serão utilizados para o valor em porcentagem.*/
    var outrasKeys = dadosComp.columns.slice(4,7);

    /*Cria o conjunto de barras múltiplas baseando-se no valor absoluto e agrupando as barras
    por estado.*/
    g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.estado) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x1.bandwidth()+0.4)
        .attr("id", "rectan")
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return z(d.key); })
        .data(function(d) {
  	return outrasKeys.map(function(outrasKeys) { return {outrasKeys: outrasKeys, value: d		[outrasKeys], estado: d.estado};
  				})
  	;})
        .on('mouseover', function(d,i){
  	/*Ao se passar o mouse em cima de cada barra, mostre a porcentagem correspondente.*/
  	var texto;
  	texto = "Frequência: "+d.value+"% do estado ";
  	texto2= "de "+estados[retornaPosicao(estados,d.estado)][1];

          d3.select(this)
            .style("opacity",0.7);


  	g.append("text")
  		.attr("id","tool")
  		.attr("x", width/2-40)
  		.attr("y",height/2 - 90)
  		.style("font-size","12px")
        		.attr("font-weight", "bold")
  		.style("font-family", "Arial, Helvetica, sans-serif")
  		.text(texto);

  	g.append("text")
  		.attr("id","tool1")
  		.attr("x", width/2-40)
  		.attr("y",height/2 - 80)
  		.style("font-size","12px")
        		.attr("font-weight", "bold")
  		.style("font-family", "Arial, Helvetica, sans-serif")
  		.text(texto2);


         })
        .on("mouseout", function(d,i){
  	/*Remove o texto ao se retirar o mouse em cima da barra*/
  	d3.select(this)
  	  .style("opacity",1);
  	d3.select("#tool").remove();
  	d3.select("#tool1").remove();
        });

        /*Adiciona um eixo Y ao gráfico.*/
    g.append("g")
      .attr("class", "axis")
      .attr("id", "tentativa")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .on("click", function(d){
         var minhaJanela = window.open("");
      	 minhaJanela.document.write(estados[retornaPosicao(estados,d)][1]+"<p>");
         d3.csv("dadosPorEstado/"+d+".csv",function(aux){
      	    minhaJanela.document.write("Genero, " + "Ano 2012, "
      		  + "Ano 2014, "+ "Ano 2016"+"<br>");
      		  minhaJanela.document.write(aux[0].genero +", "+aux[0].N2012+", "+aux[0].N2014+", "+aux[0].N2016+"<br>");
      	    minhaJanela.document.write(aux[1].genero +", "+aux[1].N2012+", "+aux[1].N2014+", "+aux[1].N2016+"<br>");
      		  minhaJanela.document.write(aux[2].genero +", "+aux[2].N2012+", "+aux[2].N2014+", "+aux[2].N2016+"<br>");
      	 });
      });

/*versao velha
    Adiciona um eixo Y ao gráfico.
    g.append("g")
        .attr("class", "axis")
        .attr("id", "tentativa")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));
*/
    /*Adiciona ao gráfico o eixo X com os estados.*/
    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 5)
        .attr("id", "ax")
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.3em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .attr("text-size", 20)
        .attr("font-family", "Arial")
        .text("Eleitores por Estado");

    /*Adiciona a legenda ao gráfico.*/
    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "end")
        .attr("id", "outraL")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", 700)
        .attr("width", 10)
        .attr("height", 10)
        .attr("id", "oi")
        .attr("fill", z);


    legend.append("text")
        .attr("x", 680)
        .attr("y", 6)
        .attr("id", "lengtxt")
        .attr("dy", "0.32em")
        .attr("id", "xuxu")
        .text(function(d) { return d; });


  	});

  }

  var funcaoGerarDadosP = function(arquivoASerLido){


  var x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);

  var x1 = d3.scaleBand()
      .padding(0.05);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  var z = d3.scaleOrdinal()
      .range(["#d7191c", "#fdae61","#2c7bb6","#d7191c", "#fdae61","#2c7bb6"]);


  /*Função que lê o arquivo csv.*/
  d3.csv("dados/"+arquivoASerLido, function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, function(error, data) {
    if (error) throw error;

    var dadosComp = data;

    /*Dados que serão utilizados para o valor absoluto.*/
    var keys = data.columns.slice(4,7);
    //console.log(keys);


    x0.domain(data.map(function(d) { return d.estado; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

    /*Dados que serão utilizados para o valor em porcentagem.*/
    var outrasKeys = dadosComp.columns.slice(1,4);

    /*Cria o conjunto de barras múltiplas baseando-se no valor absoluto e agrupando as barras
    por estado.*/
    g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.estado) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x1.bandwidth()+0.4)
        .attr("id", "rectan")
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return z(d.key); })
        .data(function(d) {
  	return outrasKeys.map(function(outrasKeys) { return {outrasKeys: outrasKeys, value: d		[outrasKeys], estado: d.estado};
  				})
  	;})
        .on('mouseover', function(d,i){
  	/*Ao se passar o mouse em cima de cada barra, mostre a porcentagem correspondente.*/
  	var texto;
  	texto = "Número absoluto de eleitores "+d.value+" do estado ";
  	texto2= "de "+estados[retornaPosicao(estados,d.estado)][1];

          d3.select(this)
            .style("opacity",0.7);


  	g.append("text")
  		.attr("id","tool")
  		.attr("x", width/2-40)
  		.attr("y",height/2 - 90)
  		.style("font-size","12px")
        		.attr("font-weight", "bold")
  		.style("font-family", "Arial, Helvetica, sans-serif")
  		.text(texto);

  	g.append("text")
  		.attr("id","tool1")
  		.attr("x", width/2-40)
  		.attr("y",height/2 - 80)
  		.style("font-size","12px")
        		.attr("font-weight", "bold")
  		.style("font-family", "Arial, Helvetica, sans-serif")
  		.text(texto2);


         })
        .on("mouseout", function(d,i){
  	/*Remove o texto ao se retirar o mouse em cima da barra*/
  	d3.select(this)
  	  .style("opacity",1);
  	d3.select("#tool").remove();
  	d3.select("#tool1").remove();
        });

        /*Adiciona um eixo Y ao gráfico.*/
    g.append("g")
      .attr("class", "axis")
      .attr("id", "tentativa")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .on("click", function(d){
        var minhaJanela = window.open("");
        minhaJanela.document.write(estados[retornaPosicao(estados,d)][1]+"<p>");
        d3.csv("dadosPorEstado/"+d+".csv",function(aux){
          minhaJanela.document.write("Genero, " + "Ano 2012, "
          + "Ano 2014, "+ "Ano 2016"+"<br>");
          minhaJanela.document.write(aux[0].genero +", "+aux[0].N2012+", "+aux[0].N2014+", "+aux[0].N2016+"<br>");
          minhaJanela.document.write(aux[1].genero +", "+aux[1].N2012+", "+aux[1].N2014+", "+aux[1].N2016+"<br>");
          minhaJanela.document.write(aux[2].genero +", "+aux[2].N2012+", "+aux[2].N2014+", "+aux[2].N2016+"<br>");
        });
      });

    /* velha Adiciona um eixo Y ao gráfico.
    g.append("g")
        .attr("class", "axis")
        .attr("id", "tentativa")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));*/

    /*Adiciona ao gráfico o eixo X com os estados.*/
    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 5)
        .attr("id", "ax")
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.3em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .attr("text-size", 20)
        .attr("font-family", "Arial")
        .text("% de Eleitores por Estado");

    /*Adiciona a legenda ao gráfico.*/
    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "end")
        .attr("id", "outraL")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", 700)
        .attr("width", 10)
        .attr("height", 10)
        .attr("id", "oi")
        .attr("fill", z);


    legend.append("text")
        .attr("x", 680)
        .attr("y", 6)
        .attr("id", "lengtxt")
        .attr("dy", "0.32em")
        .attr("id", "xuxu")
        .text(function(d) { return d; });


  	});

  }

  var tipoGrafico = 1;

  /*Adiciona título ao gráfico.*/
  d3.select("g")
  	.append("text")
  	.attr("x", 250)
  	.attr("y", 0)
  	.attr("text-anchor", "middle")
  	.style("font-size", 15)
  	.text("Quantidade de eleitores por estado");


  var ok = funcaoGerarDados("numeroEleitoresAlf.csv");


  d3.select("div-op")
  	.append("p");


  d3.select("div-op")
  	.append("text")
  	.text("Eixo em valor absoluto")
  	.style("background", "#F0F8FF")
  	.style("color", "#800000")
  	.attr("font-size", "20px")
  	.on("click", function(){
  		tipoGrafico=1;

  		d3.select("g").remove();

  		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  		d3.selectAll("#rectan").remove();
  		d3.selectAll("#ax").remove();
  		d3.selectAll("#outraL").remove();
  		d3.selectAll("#lengtxt").remove();
  		d3.selectAll("#oi").remove();
  		d3.selectAll("#xuxu").remove();
  		d3.selectAll("#tentativa").remove();
  		d3.selectAll("#axis").remove();
  		/*Adiciona título ao gráfico.*/
  		d3.select("g")
  			.append("text")
  			.attr("x", 250)
  			.attr("y", 0)
  			.attr("text-anchor", "middle")
  			.style("font-size", 15)
  			.text("Quantidade de eleitores por estado");
  		funcaoGerarDados("numeroEleitoresAlf.csv");

  	});

  d3.select("div-op")
  	.append("p");
  d3.select("div-op")
  	.append("text")
  	.text("Eixo em valor porcentagem")
  	.style("background", "#F0F8FF")
  	.style("color", "#800000")
  	.attr("font-size", "20px")
  	.on("click", function(){
  		tipoGrafico=2;

  		d3.select("g").remove();
  		g = svg.append("g")
  			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  		d3.selectAll("#rectan").remove();
  		d3.selectAll("#ax").remove();
  		d3.selectAll("#outraL").remove();
  		d3.selectAll("#lengtxt").remove();
  		d3.selectAll("#oi").remove();
  		d3.selectAll("#xuxu").remove();
  		d3.selectAll("#tentativa").remove();
  		d3.selectAll("#axis").remove();
  		/*Adiciona título ao gráfico.*/
  		d3.select("g")
  			.append("text")
  			.attr("x", 250)
  			.attr("y", 0)
  			.attr("text-anchor", "middle")
  			.style("font-size", 15)
  			.text("Quantidade de eleitores por estado");
  		funcaoGerarDadosP("numeroEleitoresAlf.csv");

  	});



  /*Início das chamadas de métodos de ordenação.
  Primeiramente é limpo do gráfico todos os elementos
  que não são estáticos, logo após o gráfico é construído
  com as informações na ordem desejada.*/

  d3.select("div-op")
  	.append("p");
  d3.select("div-op")
  	.append("text")
  	.text("Ordene em ordem alfabética")
  	.style("background", "#F0F8FF")
  	.style("color", "#800000")
  	.attr("font-size", "20px")
  	.on("click", function(){

  		d3.selectAll("#rectan").remove();
  		d3.selectAll("#ax").remove();
  		d3.selectAll("#outraL").remove();
  		d3.selectAll("#lengtxt").remove();
  		d3.selectAll("#oi").remove();
  		d3.selectAll("#xuxu").remove();
  		d3.selectAll("#tentativa").remove();
  		d3.selectAll("#axis").remove();
  		if(tipoGrafico==1){	funcaoGerarDados("numeroEleitoresAlf.csv");}
  		else{ funcaoGerarDadosP("numeroEleitoresAlf.csv");}
  	});


  d3.select("div-op")
  	.append("p");

  d3.select("div-op")
  	.append("text")
  	.text("Ordene em ordem crescente")
  	.style("background", "#F0F8FF")
  	.style("color", "#800000")
  	.attr("font-size", "20px")
  	.on("click", function(){
  		d3.selectAll("#rectan").remove();
  		d3.selectAll("#ax").remove();
  		d3.selectAll("#lengtxt").remove();
  		d3.selectAll("#outraL").remove();
  		d3.selectAll("#oi").remove();
  		d3.selectAll("#xuxu").remove();
  		d3.selectAll("#tentativa").remove();
  		d3.selectAll("#axis").remove();
  		if(tipoGrafico==1){	funcaoGerarDados("numeroEleitoresCresc.csv");}
  		else{ funcaoGerarDadosP("numeroEleitoresCresc.csv");}
  	});

  d3.select("div-op")
  	.append("p");

  d3.select("div-op")
  	.append("text")
  	.text("Ordene em ordem decrescente")
  	.style("background", "#F0F8FF")
  	.style("color", "#800000")
  	.attr("font-size", "20px")
  	.on("click", function(){
  		d3.selectAll("#rectan").remove();
  		d3.selectAll("#ax").remove();
  		d3.selectAll("#lengtxt").remove();
  		d3.selectAll("#outraL").remove();
  		d3.selectAll("#oi").remove();
  		d3.selectAll("#xuxu").remove();
  		d3.selectAll("#tentativa").remove();
  		d3.selectAll("#axis").remove();
  		if(tipoGrafico==1){	funcaoGerarDados("numeroEleitoresDecr.csv");}
  		else{ funcaoGerarDadosP("numeroEleitoresDecr.csv");}
  	});


  //Fim dos métodos associados ao número de eleitores por estado.


}
