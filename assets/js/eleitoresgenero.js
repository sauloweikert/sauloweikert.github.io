function fazGraficoEleitoresGenero(opcao){

  var largura = 700;
  var altura = 400;

  configuraGraficoEleitores(opcao,largura,altura);

  var svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right - 200,
      height = +svg.attr("height") - margin.top - margin.bottom-20,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  /*Função que irá criar o gráfico de barras múltiplos para o número total de eleitores
  por genero.*/

  var funcaoGerarDados = function(arquivoASerLido){

    var x0 = fazX0(width,0.1);
    var x1 = fazX1();
    var y = fazY(height);
    var z = fazZ();


  d3.csv("dados/"+arquivoASerLido, function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, function(error, data) {
    if (error) throw error;

    var dadosComp = data;

    var keys = data.columns.slice(1,4);
    //console.log(keys);


    x0.domain(data.map(function(d) { return d.genero; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

    var outrasKeys = dadosComp.columns.slice(4,7);

    //console.log(outrasKeys);


    g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.genero) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x1.bandwidth()+0.4)
        .attr("id", "rectan")
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return z(d.key); })
        .data(function(d) {return outrasKeys.map(function(outrasKeys) { return {outrasKeys: outrasKeys, value: d[outrasKeys]};});})
        .on('mouseover', function(d,i){
  	       var texto;

  	       texto = "Frequência: "+d.value+"%";

           d3.select(this)
            .style("opacity",0.7);


          	g.append("text")
          		.attr("id","tool")
          		.attr("x", width/2)
          		.attr("y",height/2 - 100)
          		.style("font-size","14px")
          		.style("font-family", "Arial, Helvetica, sans-serif")
          		.text(texto);
       })
        .on("mouseout", function(d,i){
  	d3.select(this)
  	  .style("opacity",1);
  	d3.select("#tool").remove();
        });


    g.append("g")
        .attr("class", "axis")
        .attr("id", "tentativa")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));

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
        .attr("x", 500)
        .attr("width", 10)
        .attr("height", 10)
        .attr("id", "itemLegendaCor")
        .attr("fill", z);


    legend.append("text")
        .attr("x", 600)
        .attr("y", 6)
        .attr("id", "lengtxt")
        .attr("dy", "0.32em")
        .attr("id", "itemLegendaTexto")
        .text(function(d) { return d; });


  	});

  }


  //width

  d3.select("g")
  	.append("text")
  	.attr("x", 250)
  	.attr("y", 0)
  	.attr("text-anchor", "middle")
  	.style("font-size", 15)
  	.text("Quantidade de eleitores por gênero");

  var ok = funcaoGerarDados("numeroEleitoresAlf2.csv");



  d3.select(".div-grafico")
  	.append("p");
  d3.select(".div-grafico")
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
  		d3.selectAll("#itemLegendaCor").remove();
  		d3.selectAll("#itemLegendaTexto").remove();
  		d3.selectAll("#tentativa").remove();
  		funcaoGerarDados("numeroEleitoresAlf2.csv");
  	});


  d3.select(".div-grafico")
  	.append("p");

  d3.select(".div-grafico")
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
  		d3.selectAll("#itemLegendaCor").remove();
  		d3.selectAll("#itemLegendaTexto").remove();
  		d3.selectAll("#tentativa").remove();
  		funcaoGerarDados("numeroEleitoresCresc2.csv");
  	});

  d3.select(".div-grafico")
  	.append("p");

  d3.select(".div-grafico")
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
  		d3.selectAll("#itemLegendaCor").remove();
  		d3.selectAll("#itemLegendaTexto").remove();
  		d3.selectAll("#tentativa").remove();
  		funcaoGerarDados("numeroEleitoresDecr2.csv");
  	});


  //Fim dos métodos associados ao número de eleitores por gênero.


}
