function montaGraficoEstados(){

  //largura e altura
  var w = 1500;
  var h = 400;

  //padding
  var padding = 90;

  configuraGrafico(w,h);

  //reage ao clique em algum ano
  atualizaGraficoEstado(padding,w,h);

}

function montaGraficoCorPele(){

  //largura e altura
  var w = 1500;
  var h = 400;

  //padding
  var padding = 90;

  configuraGrafico(w,h);

  //reage ao clique em algum ano
  atualizaGraficoCorPele(padding,w,h);

}


//funcao construcao inicial grafico
function configuraGrafico(w,h){

	//criando o elemento svg
	d3.select(".chart")
		.attr("width", w)
		.attr("height", h)
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px");
  return;
}

//-----------------------------------------funcoes atualizacao grafico estado

function atualizaGraficoEstado(padding,w,h){
	//seleciona o ano e gera os circulos
	d3.selectAll("#year")
	.on("click", function() {
		d3.select(".chart").selectAll(".axis").remove();
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

  constroiEixos(xScale,yScale,padding,h,w);

  constroiCirculosEstados(xScale,yScale,rScale);
}

//----------------------------------------------funcoes atualiza grafico corpele

function atualizaGraficoCorPele(padding,w,h){
	//seleciona o ano e gera os circulos
	d3.selectAll("#yearCorPele")
	.on("click", function() {
		d3.select(".chart").selectAll(".axis").remove();
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

  constroiEixos(xScale,yScale,padding,h,w);

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
function constroiEixos(xScale,yScale,padding,h,w){
  constroiEixoX(xScale,padding,h,w);
  constroiEixoY(yScale,padding,h);
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

function desenhaEixoX(xAxis,padding,h){

  d3.select(".chart").append("g")
  .attr("class", "axis") //Assign "axis" class
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);
}

// adiciona o rotulo do eixo
function rotulaEixoX(padding,h,w){
d3.select(".chart").append("text")
    .attr("transform", "translate(" + (w/ 2) + "," + (h) + ")")
    .style("text-anchor", "middle")
    .text("candidatos do Gênero Feminino/Total candidatos (%)");
}

//constroi o eixo X
function constroiEixoX(xScale,padding,h,w){

  var xAxis = defineEixoX(xScale);

  desenhaEixoX(xAxis,padding,h);

  rotulaEixoX(padding,h,w);
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

function desenhaEixoY(yAxis,padding){

  //Create Y axis
  d3.select(".chart").append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
}


//desenha rotulo eixo y
function rotulaEixoY(padding,h){
  d3.select(".chart").append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 120 - padding)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("candidatos com curso superior completo/Total de candidatos (%)");
}

//constroi o eixo y
function constroiEixoY(yScale,padding,h){

  var yAxis = defineEixoY(yScale);

  desenhaEixoY(yAxis,padding);

  rotulaEixoY(padding,h);
}
//----------------------------------------------------------------------------
//funcoes contrucao circulos - comum aos dois tipos de grafico


//adicionando rotulo a cada circulo, legivel no interior de cada um, no grafico
function rotulaCirculos(xScale,yScale){
  d3.select(".chart").selectAll("text")
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



//----------------------------------------------------------------------------
//funcoes contrucao circulos - grafico estados


//constroi circulos - estados
function constroiCirculosEstados(xScale,yScale,rScale){
  desenhaCirculosEstado(xScale,yScale,rScale);
  rotulaCirculos(xScale,yScale);
  dicaCirculosPorEstado();
}


//desenha os circulos - grafico estados
function desenhaCirculosEstado(xScale,yScale,rScale){
  d3.select(".chart").selectAll("circle")
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
    .attr("fill", function(d){
      return d.regiao;
    });
}

//adiciona uma dica "tooltip" para cada circulo, visivel ao sobrepor o mouse
//a ser usado para grafico Estados
function dicaCirculosPorEstado(){
  d3.select(".chart").selectAll("circle")
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
  rotulaCirculos(xScale,yScale);
  dicaCirculosPorCorPele();
}

//desenha os circulos - grafico cor pele
function desenhaCirculosCorPele(xScale,yScale,rScale){
d3.select(".chart").selectAll("circle")
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


//adiciona uma dica "tooltip" para cada circulo, visivel ao sobrepor o mouse
//a ser usado para grafico CorPele
function dicaCirculosPorCorPele(){
  d3.select(".chart").selectAll("circle")
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
