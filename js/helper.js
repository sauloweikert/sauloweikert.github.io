//funcao construcao inicial grafico
function configuraGrafico(opcao,w,h){

	//criando o elemento svg
	d3.select(".chart"+opcao)
		.attr("width", w)
		.attr("height", h)
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px");
  return;
}
//------------------------------------------------------------------------------

//funcoes montagem grafico Estado

function montaGraficoEstados(){

  //largura e altura
  var w = 1500;
  var h = 400;

  //padding
  var padding = 90;

  opcao="Estado";

  configuraGrafico(opcao,w,h);

  //reage ao clique em algum ano
  atualizaGraficoEstado(padding,w,h);

}


//-----------------------------------------------------------------------------

function montaGraficoCorPele(){

  //largura e altura
  var w = 1500;
  var h = 400;

  //padding
  var padding = 90;

  opcao="CorPele";

  configuraGrafico(opcao,w,h);

  //reage ao clique em algum ano
  atualizaGraficoCorPele(padding,w,h);

}



//-----------------------------------------funcoes atualizacao grafico estado

function atualizaGraficoEstado(padding,w,h){
  opcao="Estado";
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
	       refrescaGrafico(opcao,data, padding,w,h);

					}//fecha else
			});
		});
}

function refrescaGrafico(opcao,data, padding,w,h){

  if(opcao=="Estado"){
    refrescaGraficoEstado(data, padding,w,h);

  }else if(opcao=="CorPele"){
    refrescaGraficoCorPele(data, padding,w,h);
  }

}


function refrescaGraficoEstado(data, padding,w,h){
  dataset = data;
  opcao = "Estado";

  var rScale =defineEscalaRaioEstados(data);
  var xScale =defineEscalaXEstados(data,padding,w);
  var yScale =defineEscalaY(data,padding,h);

  constroiEixos(opcao,xScale,yScale,padding,h,w);

  constroiCirculosEstados(xScale,yScale,rScale);
}

//----------------------------------------------funcoes atualiza grafico corpele

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
  opcao = "CorPele";

  var rScale =defineEscalaRaioCorPele(data);
  var xScale =defineEscalaXCorPele(data,padding,w);
  var yScale =defineEscalaY(data,padding,h);

  constroiEixos(opcao,xScale,yScale,padding,h,w);

  constroiCirculosCorPele(xScale,yScale,rScale);
}
//---------------------------------------------------------------------------
//funcoes escalas

//define escala do raio
function defineEscalaRaioEstados(data){

	var rScale = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return d.total; })])
		.range([10, 40]);
	return rScale;
}

//define escala do raio
function defineEscalaRaioCorPele(data){

	var rScale = d3.scale.linear()
  .domain([d3.min(data, function(d) { return d.totalGrupo; }),
            d3.max(data, function(d) { return d.totalGrupo; })])
  .range([10, 60]);
	return rScale;
}


function defineEscalaXEstados(data,padding,w){
	var xScale = d3.scale.linear()
		 .domain([d3.min(data, function(d) { return (d.fem)/(d.total); })-0.001,
              d3.max(data, function(d) { return (d.fem)/(d.total); })])
		 .range([padding, w-padding]);
		return xScale;
}

function defineEscalaXCorPele(data,padding,w){
	var xScale = d3.scale.log()
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
function constroiEixos(opcao,xScale,yScale,padding,h,w){
  constroiEixoX(opcao,xScale,padding,h,w);
  constroiEixoY(opcao,yScale,padding,h);
}


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

function desenhaEixoX(opcao,xAxis,padding,h){

  d3.select(".chart" + opcao).append("g")
  .attr("class", "axis") //Assign "axis" class
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);
}

// adiciona o rotulo do eixo
function rotulaEixoX(opcao,padding,h,w){
d3.select(".chart"+ opcao).append("text")
    .attr("transform", "translate(" + (w/ 2) + "," + (h) + ")")
    .style("text-anchor", "middle")
    .text("candidatos do Gênero Feminino/Total candidatos (%)");
}

//constroi o eixo X
function constroiEixoX(opcao,xScale,padding,h,w){

  var xAxis = defineEixoX(xScale);

  desenhaEixoX(opcao,xAxis,padding,h);

  rotulaEixoX(opcao,padding,h,w);
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

function desenhaEixoY(opcao,yAxis,padding){

  //Create Y axis
  d3.select(".chart"+ opcao).append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
}


//desenha rotulo eixo y
function rotulaEixoY(opcao,padding,h){
  d3.select(".chart"+ opcao).append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 120 - padding)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("candidatos com curso superior completo/Total de candidatos (%)");
}

//constroi o eixo y
function constroiEixoY(opcao,yScale,padding,h){

  var yAxis = defineEixoY(yScale);

  desenhaEixoY(opcao,yAxis,padding);

  rotulaEixoY(opcao,padding,h);
}



//----------------------------------------------------------------------------
//funcoes contrucao circulos - grafico estados


//constroi circulos - estados
function constroiCirculosEstados(xScale,yScale,rScale){
  desenhaCirculosEstado(xScale,yScale,rScale);
  rotulaCirculosEstado(xScale,yScale);
  dicaCirculosPorEstado();
}



//desenha os circulos - grafico estados
function desenhaCirculosEstado(xScale,yScale,rScale){
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
    .attr("fill", function(d) {
      return d.regiao;
    });
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
    .append("title")
      .text(function(d) {
        return "Estado:" +"\t"+"\t"+"\t" + d.nome + "\n"
        + "Total:" +"\t"+"\t"+"\t" + d.total + "\n"
        + "Feminino:" +"\t"+"\t"+d.fem + "\n"
        + "Curso sup.completo:" +"\t"+ d.csup;
      });
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
  .attr("fill", function(d){
    return d.corCirculo;
  });
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
