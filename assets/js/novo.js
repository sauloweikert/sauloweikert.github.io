//desenha os circulos -
function desenhaCirculosCorPeleOriginal(escalas){

	var selecao = d3.select(".chart-corpele").selectAll("#circuloCorPele")
    .data(dataset)
		.enter()
		.append("circle")

    //definindo propriedades dos circulos
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
