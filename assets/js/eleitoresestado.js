function configuraGraficoEleitores(opcao,largura,altura){

  //verifica e fecha outras visualizações abertas
  fechaVisualizacoes();

  criaBotaoSairGrafico(opcao);


  //--cria suporte grafico
  //cria dinamicamente elemento do tipo div para conter o grafico
  var divGrafico = document.createElement('div');
  divGrafico.className = 'div-grafico';
  divGrafico.style.overflowX ='auto';
  divGrafico.style.overflowY ='auto';
  //divGrafico.style.left ='10px';
  document.getElementsByClassName("painel-grafico-"+opcao)[0].appendChild(divGrafico);


  //cria dinamicamente elemento tipo svg que sera o grafico
  var element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//  element.setAttribute("class", "chart-"+opcao);
  document.getElementsByClassName("div-grafico")[0].appendChild(element);


  /*Cria objeto svg e o objeto de grupo g para manipulação do DOM.*/

  d3.select("svg")
    .attr("width",largura)
    .attr("height",altura);

}

function fazX0(width,paddingInner){
  var valor = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(paddingInner);

  return valor;
}

function fazX1(){
  var valor = d3.scaleBand()
    .padding(0.05);

  return valor;
}

function fazY(height){
  var valor = d3.scaleLinear()
      .rangeRound([height, 0]);

  return valor;
}

function fazZ(){
  var valor = d3.scaleOrdinal()
      .range(["#d7191c", "#fdae61","#2c7bb6","#d7191c", "#fdae61","#2c7bb6"]);

  return valor;
}

function fazGraficoEleitoresEstado(opcao){


  var largura = 1100;
  var altura = 600;

  configuraGraficoEleitores(opcao,largura,altura);

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

    var x0 = fazX0(width,0.1);
    var x1 = fazX1();
    var y = fazY(height);
    var z = fazZ();

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
        .attr("id", "itemLegendaCor")
        .attr("fill", z);


    legend.append("text")
        .attr("x", 680)
        .attr("y", 6)
        .attr("id", "lengtxt")
        .attr("dy", "0.32em")
        .attr("id", "itemLegendaTexto")
        .text(function(d) { return d; });


  	});

  }

  var funcaoGerarDadosP = function(arquivoASerLido){


    var x0 = fazX0(width,0.1);
    var x1 = fazX1();
    var y = fazY(height);
    var z = fazZ();

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


    /*Adiciona ao gráfico o eixo X com os estados.*/

    var formatAsPercentage = d3.format(".1%");

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).tickFormat(formatAsPercentage))
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
        .attr("id", "itemLegendaCor")
        .attr("fill", z);


    legend.append("text")
        .attr("x", 680)
        .attr("y", 6)
        .attr("id", "lengtxt")
        .attr("dy", "0.32em")
        .attr("id", "itemLegendaTexto")
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


  d3.select(".div-grafico")
  	.append("p");


  d3.select(".div-grafico")
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
  		//d3.selectAll("#outraL").remove();
  		d3.selectAll("#lengtxt").remove();
  		d3.selectAll("#itemLegendaCor").remove();
  		d3.selectAll("#itemLegendaTexto").remove();
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

  d3.select(".div-grafico")
  	.append("p");
  d3.select(".div-grafico")
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
  		d3.selectAll("#itemLegendaCor").remove();
  		d3.selectAll("#itemLegendaTexto").remove();
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
  		d3.selectAll("#axis").remove();
  		if(tipoGrafico==1){	funcaoGerarDados("numeroEleitoresAlf.csv");}
  		else{ funcaoGerarDadosP("numeroEleitoresAlf.csv");}
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
  		d3.selectAll("#axis").remove();
  		if(tipoGrafico==1){	funcaoGerarDados("numeroEleitoresCresc.csv");}
  		else{ funcaoGerarDadosP("numeroEleitoresCresc.csv");}
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
  		d3.selectAll("#axis").remove();
  		if(tipoGrafico==1){	funcaoGerarDados("numeroEleitoresDecr.csv");}
  		else{ funcaoGerarDadosP("numeroEleitoresDecr.csv");}
  	});


  //Fim dos métodos associados ao número de eleitores por estado.


}
