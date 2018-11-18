function atualizaGraficoCorPeleGrupo(padding,w,h){

	console.log("entrei aqui");
	//seleciona o ano e gera os circulos
	d3.selectAll("#yearCorPeleGrupo")
	.on("click", function() {
    d3.select(".chartCorPele").selectAll(".axis").remove();
		d3.json("dados/" + $(this).html() + ".json", function(error,data) {
			if (error) { //If error is not null, something went wrong.
				console.log(error); //Log the error.
			}
			else { //If no error, the file loaded correctly. Yay!
				//console.log(data); //Log the data.

	       refrescaGraficoCorPeleGrupo(data, padding,w,h);

					}//fecha else
			});
		});
}

function refrescaGraficoCorPeleGrupo(data, padding,w,h){
  dataset = data;

	//valor de raio se mantem inalterado para a alteracao de visualizacao
  var rScale =defineEscalaRaioCorPele(data);
  var xScale =defineEscalaXCorPeleGrupo(data,padding,w);
  var yScale =defineEscalaYCorPeleGrupo(data,padding,h);

  constroiEixosCorPeleGrupo(xScale,yScale,padding,h,w);

  constroiCirculosCorPeleGrupo(xScale,yScale,rScale);
}

function defineEscalaXCorPeleGrupo(data,padding,w){
	var xScale = d3.scale.linear()
		 .domain([d3.min(data, function(d) { return (d.fem)/(d.totalGrupo); })-0.001,
              d3.max(data, function(d) { return (d.fem)/(d.totalGrupo); })])
		 .range([padding, w-padding]);
		return xScale;
}

function defineEscalaYCorPeleGrupo(data,padding,h){

	var yScale = d3.scale.linear()
		.domain([d3.min(data, function(d) { return (d.csup)/(d.totalGrupo); })-0.02,
              d3.max(data, function(d) { return (d.csup)/(d.totalGrupo); })])
		.range([h-padding, padding]);
		return yScale;
}

//constroi ambos os eixos
function constroiEixosCorPeleGrupo(xScale,yScale,padding,h,w){
  constroiEixoXCorPeleGrupo(xScale,padding,h,w);
  constroiEixoYCorPeleGrupo(yScale,padding,h);
}

// adiciona o rotulo do eixo
function rotulaEixoXCorPeleGrupo(padding,h,w){
d3.select(".chartCorPele").append("text")
    .attr("transform", "translate(" + (w/ 2) + "," + (h) + ")")
    .style("text-anchor", "middle")
    .text("candidatos do Gênero Feminino/Total do Grupo (%)");
}

//constroi o eixo X
function constroiEixoXCorPeleGrupo(xScale,padding,h,w){

  var xAxis = defineEixoX(xScale);

  desenhaEixoXCorPele(xAxis,padding,h);

  rotulaEixoXCorPeleGrupo(padding,h,w);
}

//desenha rotulo eixo y
function rotulaEixoYCorPeleGrupo(padding,h){
  d3.select(".chartCorPele").append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 120 - padding)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("candidatos com curso superior completo/Total do Grupo (%)");
}

//constroi o eixo y
function constroiEixoYCorPeleGrupo(yScale,padding,h){

  var yAxis = defineEixoY(yScale);

  desenhaEixoYCorPele(yAxis,padding);

  rotulaEixoYCorPeleGrupo(padding,h);
}

//constroi circulos - cor de pele
function constroiCirculosCorPeleGrupo(xScale,yScale,rScale){
  desenhaCirculosCorPele(xScale,yScale,rScale);
  rotulaCirculosCorPele(xScale,yScale);
	//mantem-se inalterdo
  //dicaCirculosPorCorPele();
}

//desenha os circulos - grafico cor pele
function desenhaCirculosCorPeleGrupo(xScale,yScale,rScale){
	var circles = d3.select(".chartCorPele").selectAll("#circuloCorPele")
  .data(dataset);

	circles.transition()
  .duration(2000)
  //definindo propriedades dos circulos
  .attr("cx", function(d) {
    return xScale((d.fem)/(d.totalGrupo));
  })
  .attr("cy", function(d) {
    return yScale((d.csup)/(d.totalGrupo));
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
function rotulaCirculosCorPeleGrupo(xScale,yScale){
  d3.select(".chartCorPele").selectAll("#textoCorPele")
    .data(dataset)
    .transition()
    .duration(2000)
    .text(function(d) {
      return d.nome;
    })
    .attr("x", function(d) {
      return xScale((d.fem)/(d.totalGrupo))
    })
    .attr("y", function(d) {
      return yScale((d.csup)/(d.totalGrupo));
    })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");
}
