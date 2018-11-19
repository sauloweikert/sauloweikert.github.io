
//------------------------------------------------------saida grafico estados
//funcao saida montaGraficoEstado
function sairGraficoEstado(){

//	d3.select("svg").remove();

	//remove Suporte
	$('.div-grafico').remove();

	//remove legenda
	$('#legend').remove();

	//remove botao Sair
	$('#botao-sair').remove();

	//reabilita o botao visualizar
	document.getElementById("botao-visualizar-primeiro").disabled = false;

	return;
}

//botao saida grafico Estados
function criaBotaoSairGraficoEstados(){
	var element = document.createElement("input");
	//Assign different attributes to the element.
	element.type = "button";
	element.value = "Sair";
	element.id='botao-sair';
	element.style.position = 'absolute';
	element.style.right ='10px';
	element.style.marginTop ='10px';
	element.onclick = function() { // Note this is a function
		sairGraficoEstado();
	};
	document.getElementsByClassName("painel-grafico-primeiro")[0].appendChild(element);
}

//---------------------------------------------------construcao grafico estados

//funcao montagem legenda grafico estados
function montaLegendaEstados(){
	var divLegenda = document.createElement('div');
	divLegenda.id = 'legend';

	divLegenda.style.borderStyle = 'double';
	divLegenda.style.display = 'inline-block';
	divLegenda.style.width = '15%';
	divLegenda.style.position = 'absolute';
	divLegenda.style.right ='10px';
	divLegenda.style.top ='10px';
	divLegenda.style.backgroundColor = 'white';
	divLegenda.style.opacity = '50%';
	divLegenda.style.padding = '5px';
	divLegenda.innerHTML = "Legenda";
	$(".painel-grafico-primeiro").append(divLegenda);

	$(function () {
	    var myObjects = [
			  {
			    "nome": "Sul"
			  },
			  {
			    "nome": "Sudeste"
			  },
			  {
			    "nome": "Centroeste"
			  },
			  {
			    "nome": "Nordeste"
			  },
			  {
			    "nome": "Norte"
			  }
			];
	    $.each(myObjects, function () {
				var textDiv = document.createElement('div');
				$(divLegenda).append(textDiv);

				var innerDiv = document.createElement('div');
				innerDiv.className = 'square';
				innerDiv.id = this.nome.toLowerCase();
				$(textDiv).append(innerDiv);

				var p = "<p>"this.nome"</p>";
				$(textDiv).append(p);
	    });
	});


	//document.getElementsByClassName("painel-grafico-primeiro")[0].appendChild(divLegenda);
/*
	// Now create and append to iDiv
	var textDiv = document.createElement('div');
	$(divLegenda).append(textDiv);

	var innerDiv = document.createElement('div');
	innerDiv.className = 'square';
	innerDiv.id = 'sul';
	$(textDiv).append(innerDiv);

	var p = "<p>Sul</p>";
	$(textDiv).append(p);

	// Now create and append to iDiv
	var textDiv2 = document.createElement('div');
	$(divLegenda).append(textDiv2);

	var innerDiv2 = document.createElement('div');
	innerDiv2.className = 'square';
	innerDiv2.id = 'sudeste';
	$(textDiv2).append(innerDiv2);

	var p2 = "<p>Sudeste</p>";
	$(textDiv2).append(p2);

	// Now create and append to iDiv
	var textDiv3 = document.createElement('div');
	$(divLegenda).append(textDiv3);

	var innerDiv3 = document.createElement('div');
	innerDiv3.className = 'square';
	innerDiv3.id = 'centroeste';
	$(textDiv3).append(innerDiv3);

	var p3 = "<p>Centro-Oeste</p>";
	$(textDiv3).append(p3);

	// Now create and append to iDiv
	var textDiv4 = document.createElement('div');
	$(divLegenda).append(textDiv4);

	var innerDiv4 = document.createElement('div');
	innerDiv4.className = 'square';
	innerDiv4.id = 'nordeste';
	$(textDiv4).append(innerDiv4);

	var p4 = "<p>Nordeste</p>";
	$(textDiv4).append(p4);

	// Now create and append to iDiv
	var textDiv5 = document.createElement('div');
	$(divLegenda).append(textDiv5);

	var innerDiv5 = document.createElement('div');
	innerDiv5.className = 'square';
	innerDiv5.id = 'norte';
	$(textDiv5).append(innerDiv5);

	var p5 = "<p>Norte</p>";
	$(textDiv5).append(p5);
*/
}
//--------------------------------------------------------------------------

//funcao construcao inicial grafico
function configuraGraficoEstado(w,h){

	//criando o elemento svg
	d3.select(".chartEstado")
		.attr("width", w)
		.attr("height", h)
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px");
  return;
}

//verifica e fecha outras visualizações abertas
function fechaVisualizacoesPrimeiro(){
	var open =document.getElementById("botao-visualizar-segundo").disabled;
	if(open == true) sairGraficoPele();
	else return;
}

//verifica e fecha outras visualizações abertas
function fechaVisualizacoesSegundo(){
	var open =document.getElementById("botao-visualizar-primeiro").disabled;
	if(open == true) sairGraficoEstado();
	else return;
}


//------------------------------------------------------------------------------
//funcoes montagem grafico Estado
function criaSuporteGraficoPrimeiro(){
	var divGrafico = document.createElement('div');

	divGrafico.className = 'div-grafico';
 	divGrafico.style.overflowX ='auto';
	document.getElementsByClassName("painel-grafico-primeiro")[0].appendChild(divGrafico);
	return;
}

function montaGraficoEstados(){

	//verifica e fecha outras visualizações abertas
	fechaVisualizacoesPrimeiro();

	//desabilitar botao visualizar enquanto durante a visualização corrente
	document.getElementById("botao-visualizar-primeiro").disabled = true;

  //largura e altura
  var w = 1500;
  var h = 400;

  //padding
  var padding = 90;

	var element = document.createElementNS("http://www.w3.org/2000/svg", "svg");

	criaBotaoSairGraficoEstados();

	//cria suporte grafico
	criaSuporteGraficoPrimeiro();

	element.setAttribute("class", "chartEstado");
	document.getElementsByClassName("div-grafico")[0].appendChild(element);

  configuraGraficoEstado(w,h);
	montaGraficoEstadoOriginal(padding,w,h);

	montaLegendaEstados();

  //reage ao clique em algum ano
  atualizaGraficoEstado(padding,w,h);

}


//-------------------------------------funcoes grafico estados original

function montaGraficoEstadoOriginal(padding,w,h){

		d3.json("dados/2014"+ ".json", function(error,data) {
			if (error) { //If error is not null, something went wrong.
				console.log(error); //Log the error.
			}
			else { //If no error, the file loaded correctly. Yay!
				//console.log(data); //Log the data.

	       refrescaGraficoEstadoOriginal(data, padding,w,h);

			}//fecha else
		});
}

//funcao refreca grafico estados original
function refrescaGraficoEstadoOriginal(data, padding,w,h){
  dataset = data;

  var rScale =defineEscalaRaioEstados(data);
  var xScale =defineEscalaXEstados(data,padding,w);
  var yScale =defineEscalaY(data,padding,h);

  constroiEixosEstado(xScale,yScale,padding,h,w);

  constroiCirculosEstadosOriginal(xScale,yScale,rScale);
}

//constroi circulos - estados
function constroiCirculosEstadosOriginal(xScale,yScale,rScale){
  desenhaCirculosEstadoOriginal(xScale,yScale,rScale);
  rotulaCirculosEstadoOriginal(xScale,yScale);
	dicaCirculosPorEstadoOriginal();
}

//desenha os circulos - grafico estados
function desenhaCirculosEstadoOriginal(xScale,yScale,rScale){
//  d3.select(".chartEstado").selectAll("#circuloEstado")
	d3.select(".chartEstado").selectAll("#circuloEstado")
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
      return rScale(d.total);
    })
    .attr("fill", function(d) {
      return d.regiao;
    })
		.attr("id", function(d) {
			return "circuloEstado";
		});
}


//adicionando rotulo a cada circulo, legivel no interior de cada um, no grafico
function rotulaCirculosEstadoOriginal(xScale,yScale){
  d3.select(".chartEstado").selectAll("#textoEstado")
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
  d3.select(".chartEstado").selectAll("#circuloEstado")
    .data(dataset)
		.enter()
    .append("title")
      .text(function(d) {
        return "Estado:" +"\t"+"\t"+"\t" + d.nome + "\n"
        + "Total:" +"\t"+"\t"+"\t" + d.total + "\n"
        + "Feminino:" +"\t"+"\t"+d.fem + "\n"
        + "Curso sup.completo:" +"\t"+ d.csup;
      });
    return;
}

//-----------------------------------------funcoes atualizacao grafico estado

function atualizaGraficoEstado(padding,w,h){

	//seleciona o ano e gera os circulos
	d3.selectAll("#yearEstado")
	.on("click", function() {
    d3.select(".chartEstado").selectAll(".axis").remove();
		d3.json("dados/" + $(this).html() + ".json", function(error,data) {
			if (error) { //If error is not null, something went wrong.
				console.log(error); //Log the error.
			}
			else { //If no error, the file loaded correctly. Yay!
				//console.log(data); //Log the data.

	       refrescaGraficoEstado(data, padding,w,h);

					}//fecha else
			});
		});
}


function refrescaGraficoEstado(data, padding,w,h){
  dataset = data;

  var rScale =defineEscalaRaioEstados(data);
  var xScale =defineEscalaXEstados(data,padding,w);
  var yScale =defineEscalaY(data,padding,h);

  constroiEixosEstado(xScale,yScale,padding,h,w);

  constroiCirculosEstados(xScale,yScale,rScale);
}

//----------------------------------------------funcoes atualiza grafico corpele


//---------------------------------------------------------------------------
//funcoes escalas

//define escala do raio
function defineEscalaRaioEstados(data){

	var rScale = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return d.total; })])
		.range([10, 40]);
	return rScale;
}



function defineEscalaXEstados(data,padding,w){
	var xScale = d3.scale.linear()
		 .domain([d3.min(data, function(d) { return (d.fem)/(d.total); })-0.001,
              d3.max(data, function(d) { return (d.fem)/(d.total); })])
		 .range([padding, w-padding]);
		return xScale;
}



function defineEscalaY(data,padding,h){

	var yScale = d3.scale.linear()
		.domain([d3.min(data, function(d) { return (d.csup)/(d.total); })-0.02,
              d3.max(data, function(d) { return (d.csup)/(d.total); })])
		.range([h-padding, padding]);
		return yScale;
}

//---------------------------------------------------------------------------
//funcoes eixos

//constroi ambos os eixos
function constroiEixosEstado(xScale,yScale,padding,h,w){

  constroiEixoXEstado(xScale,padding,h,w);
  constroiEixoYEstado(yScale,padding,h);
}


//----------------------------------------------------------------------------

//define eixo x
function defineEixoX(xScale){

      //formatando eixos como porcentagem
  var formatAsPercentage = d3.format(".1%");

  var xAxis = d3.svg.axis()
  .scale(xScale)
  .tickFormat(formatAsPercentage)
  .orient("bottom");
  return xAxis;
}


function desenhaEixoXEstado(xAxis,padding,h){

  d3.select(".chartEstado").append("g")
  .attr("class", "axis") //Assign "axis" class
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);
}



// adiciona o rotulo do eixo
function rotulaEixoXEstado(padding,h,w){
d3.select(".chartEstado").append("text")
    .attr("transform", "translate(" + (w/ 2) + "," + (h) + ")")
    .style("text-anchor", "middle")
    .text("candidatos do Gênero Feminino/Total candidatos (%)");
}



//constroi o eixo X
function constroiEixoXEstado(xScale,padding,h,w){

  var xAxis = defineEixoX(xScale);

  desenhaEixoXEstado(xAxis,padding,h);

  rotulaEixoXEstado(padding,h,w);
}


//-----------------------------------------------------------------------------

//define eixo y
function defineEixoY(yScale){

      //formatando eixos como porcentagem
  var formatAsPercentage = d3.format(".1%");

  var yAxis = d3.svg.axis()
  .scale(yScale)
  .tickFormat(formatAsPercentage)
  .orient("left");
  return yAxis;
}

function desenhaEixoYEstado(yAxis,padding){

  //Create Y axis
  d3.select(".chartEstado").append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
}


//desenha rotulo eixo y
function rotulaEixoYEstado(padding,h){
  d3.select(".chartEstado").append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 120 - padding)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("candidatos com curso superior completo/Total de candidatos (%)");
}



//constroi o eixo y
function constroiEixoYEstado(yScale,padding,h){

  var yAxis = defineEixoY(yScale);

  desenhaEixoYEstado(yAxis,padding);

  rotulaEixoYEstado(padding,h);
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
//  d3.select(".chartEstado").selectAll("#circuloEstado")
	d3.select(".chartEstado").selectAll("#circuloEstado")
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
  d3.select(".chartEstado").selectAll("#textoEstado")
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
  d3.select(".chartEstado").selectAll("#circuloEstado")
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


//------------------------------------------------------saida grafico estados
//funcao saida montaGraficoEstado
function sairGraficoPele(){

	//d3.select("svg").remove();

	//remove Suporte
	$('.div-grafico').remove();

	//remove legenda
	$('#legend').remove();

	//remove botao Sair
	$('#botao-sair').remove();

	//reabilita o botao visualizar
	document.getElementById("botao-visualizar-segundo").disabled = false;

	return;
}

//botao saida grafico Estados
function criaBotaoSairGraficoPele(){
	var element = document.createElement("input");
	//Assign different attributes to the element.
	element.type = "button";
	element.value = "Sair";
	element.id='botao-sair';
	element.onclick = function() { // Note this is a function
		sairGraficoPele();
	};
	document.getElementsByClassName("painel-grafico-segundo")[0].appendChild(element);
}

//---------------------------------------------------construcao grafico estados
//funcao montagem legenda grafico pele
function montaLegendaPele(){
	var divLegenda = document.createElement('div');
	divLegenda.id = 'legend';

	divLegenda.style.borderStyle = 'double';
	divLegenda.style.display = 'inline-block';
	divLegenda.style.width = '15%';
	divLegenda.style.position = 'absolute';
	divLegenda.style.right ='10px';
	divLegenda.style.top ='10px';
	divLegenda.style.backgroundColor = 'white';
	divLegenda.style.opacity = '50%';
	divLegenda.style.padding = '5px';
	divLegenda.innerHTML = "Legenda";
	$(".painel-grafico-segundo").append(divLegenda);
	//document.getElementsByClassName("painel-grafico-primeiro")[0].appendChild(divLegenda);

	// Now create and append to iDiv
	var textDiv = document.createElement('div');
	$(divLegenda).append(textDiv);

	var innerDiv = document.createElement('div');
	innerDiv.className = 'square';
	innerDiv.id = 'indigena';
	$(textDiv).append(innerDiv);

	var p = "<p>Indígena</p>";
	$(textDiv).append(p);

	// Now create and append to iDiv
	var textDiv2 = document.createElement('div');
	$(divLegenda).append(textDiv2);

	var innerDiv2 = document.createElement('div');
	innerDiv2.className = 'square';
	innerDiv2.id = 'amarela';
	$(textDiv2).append(innerDiv2);

	var p2 = "<p>Amarela</p>";
	$(textDiv2).append(p2);

	// Now create and append to iDiv
	var textDiv3 = document.createElement('div');
	$(divLegenda).append(textDiv3);

	var innerDiv3 = document.createElement('div');
	innerDiv3.className = 'square';
	innerDiv3.id = 'negra';
	$(textDiv3).append(innerDiv3);

	var p3 = "<p>Negra</p>";
	$(textDiv3).append(p3);

	// Now create and append to iDiv
	var textDiv4 = document.createElement('div');
	$(divLegenda).append(textDiv4);

	var innerDiv4 = document.createElement('div');
	innerDiv4.className = 'square';
	innerDiv4.id = 'parda';
	$(textDiv4).append(innerDiv4);

	var p4 = "<p>Parda</p>";
	$(textDiv4).append(p4);

	// Now create and append to iDiv
	var textDiv5 = document.createElement('div');
	$(divLegenda).append(textDiv5);

	var innerDiv5 = document.createElement('div');
	innerDiv5.className = 'square';
	innerDiv5.id = 'branca';
	$(textDiv5).append(innerDiv5);

	var p5 = "<p>Branca</p>";
	$(textDiv5).append(p5);

}

//--------------------------------------------------------------------------


//funcao construcao inicial grafico
function configuraGraficoCorPele(w,h){

	//criando o elemento svg
	d3.select(".chartCorPele")
		.attr("width", w)
		.attr("height", h)
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px");
  return;
}
//------------------------------------------------------------------------------

function criaSuporteGraficoSegundo(){
	var divGrafico = document.createElement('div');

	divGrafico.className = 'div-grafico';
 	divGrafico.style.overflowX ='auto';
	document.getElementsByClassName("painel-grafico-segundo")[0].appendChild(divGrafico);
	return;
}

function montaGraficoCorPele(){

	//fecha outras visualizaceos abertas
	fechaVisualizacoesSegundo();

	//desabilitar botao visualizar enquanto durante a visualização corrente
	document.getElementById("botao-visualizar-segundo").disabled = true;

  //largura e altura
  var w = 1500;
  var h = 400;

  //padding
  var padding = 90;

	//cria botao sair
	criaBotaoSairGraficoPele();

	//cria suporte grafico
	criaSuporteGraficoSegundo();

  var element = document.createElementNS("http://www.w3.org/2000/svg", "svg");

	element.setAttribute("class", "chartCorPele");
	document.getElementsByClassName("div-grafico")[0].appendChild(element);

  configuraGraficoCorPele(w,h);
  montaGraficoCorPeleOriginal(padding,w,h);

	montaLegendaPele();

  //reage ao clique em algum ano
  atualizaGraficoCorPele(padding,w,h);
	//atualizaGraficoCorPeleGrupo(padding,w,h);

}


//-------------------------------------funcoes grafico estados original

function montaGraficoCorPeleOriginal(padding,w,h){

		d3.json("dados/2014_"+ ".json", function(error,data) {
			if (error) { //If error is not null, something went wrong.
				console.log(error); //Log the error.
			}
			else { //If no error, the file loaded correctly. Yay!
				//console.log(data); //Log the data.

	       refrescaGraficoCorPeleOriginal(data, padding,w,h);

			}//fecha else
		});
}

//funcao refreca grafico estados original
function refrescaGraficoCorPeleOriginal(data, padding,w,h){
  dataset = data;

  var rScale =defineEscalaRaioCorPele(data);
  var xScale =defineEscalaXCorPele(data,padding,w);
  var yScale =defineEscalaY(data,padding,h);

  constroiEixosCorPele(xScale,yScale,padding,h,w);

  constroiCirculosCorPeleOriginal(xScale,yScale,rScale);
}

//constroi circulos - estados
function constroiCirculosCorPeleOriginal(xScale,yScale,rScale){
  desenhaCirculosCorPeleOriginal(xScale,yScale,rScale);
  rotulaCirculosCorPeleOriginal(xScale,yScale);
	dicaCirculosPorCorPeleOriginal();
}


//desenha os circulos - grafico estados
function desenhaCirculosCorPeleOriginal(xScale,yScale,rScale){
//  d3.select(".chartEstado").selectAll("#circuloEstado")
	d3.select(".chartCorPele").selectAll("#circuloCorPele")
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
  d3.select(".chartCorPele").selectAll("#textoCorPele")
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
  d3.select(".chartCorPele").selectAll("#circuloCorPele")
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

//-----------------------------------------funcoes atualizacao grafico estado


function atualizaGraficoCorPele(padding,w,h){

	//seleciona o ano e gera os circulos
	d3.selectAll("#yearCorPele")
	.on("click", function() {
    d3.select(".chartCorPele").selectAll(".axis").remove();
		d3.json("dados/" + $(this).html() + ".json", function(error,data) {
			if (error) { //If error is not null, something went wrong.
				console.log(error); //Log the error.
			}
			else { //If no error, the file loaded correctly. Yay!
				//console.log(data); //Log the data.

	       refrescaGraficoCorPele(data, padding,w,h);

					}//fecha else
			});
		});
}


function refrescaGraficoCorPele(data, padding,w,h){
  dataset = data;

  var rScale =defineEscalaRaioCorPele(data);
  var xScale =defineEscalaXCorPele(data,padding,w);
  var yScale =defineEscalaY(data,padding,h);

  constroiEixosCorPele(xScale,yScale,padding,h,w);

  constroiCirculosCorPele(xScale,yScale,rScale);
}

//----------------------------------------------funcoes atualiza grafico corpele

//---------------------------------------------------------------------------
//funcoes escalas


//define escala do raio
function defineEscalaRaioCorPele(data){

	var rScale = d3.scale.linear()
  .domain([d3.min(data, function(d) { return d.totalGrupo; }),
            d3.max(data, function(d) { return d.totalGrupo; })])
  .range([10, 60]);
	return rScale;
}


function defineEscalaXCorPele(data,padding,w){
	var xScale = d3.scale.log()
		 .domain([d3.min(data, function(d) { return (d.fem)/(d.total); })-0.001,
              d3.max(data, function(d) { return (d.fem)/(d.total); })])
		 .range([padding, w-padding]);
		return xScale;
}



//---------------------------------------------------------------------------
//funcoes eixos



//constroi ambos os eixos
function constroiEixosCorPele(xScale,yScale,padding,h,w){
  constroiEixoXCorPele(xScale,padding,h,w);
  constroiEixoYCorPele(yScale,padding,h);
}
//----------------------------------------------------------------------------


function desenhaEixoXCorPele(xAxis,padding,h){

  d3.select(".chartCorPele").append("g")
  .attr("class", "axis") //Assign "axis" class
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);
}



// adiciona o rotulo do eixo
function rotulaEixoXCorPele(padding,h,w){
d3.select(".chartCorPele").append("text")
    .attr("transform", "translate(" + (w/ 2) + "," + (h) + ")")
    .style("text-anchor", "middle")
    .text("candidatos do Gênero Feminino/Total candidatos (%)");
}


//constroi o eixo X
function constroiEixoXCorPele(xScale,padding,h,w){

  var xAxis = defineEixoX(xScale);

  desenhaEixoXCorPele(xAxis,padding,h);

  rotulaEixoXCorPele(padding,h,w);
}
//-----------------------------------------------------------------------------

//define eixo y
function desenhaEixoYCorPele(yAxis,padding){

  //Create Y axis
  d3.select(".chartCorPele").append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
}


//desenha rotulo eixo y
function rotulaEixoYCorPele(padding,h){
  d3.select(".chartCorPele").append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 120 - padding)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("candidatos com curso superior completo/Total de candidatos (%)");
}


//constroi o eixo y
function constroiEixoYCorPele(yScale,padding,h){

  var yAxis = defineEixoY(yScale);

  desenhaEixoYCorPele(yAxis,padding);

  rotulaEixoYCorPele(padding,h);
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
d3.select(".chartCorPele").selectAll("#circuloCorPele")
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
  d3.select(".chartCorPele").selectAll("#textoCorPele")
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
  d3.select(".chartCorPele").selectAll("#circuloCorPele")
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
