<template>
  <div id="main">

    <h2 id="subtitulo">Projetos em destaque</h2>
    <!--card deck-->
    <div class="card-deck">

      <div class="card">
        <a href="projetoa.html"><img src="../img/a.jpg" class="card-img-top"
          alt="..." ></a>
        <div class="card-body">
          <a href="projetoa.html"><h5 class="card-title">Projeto A</h5></a>
          <small  class="form-text text-muted">por João Silva</small>
          <p class="card-text">Descrição do Projeto A</p>
            <small  class="form-text text-muted">Belo Horizonte</small>
            <div class="progress">
              <div class="progress-bar w-75" role="progressbar"
              aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

            <!-- informacoes em 3 colunas-->
            <div class="container">
              <div class="card-info">
              75%
              </div>
              <div class="card-info">
                R$11.432,00 levantados
              </div>
              <div class="card-info">
                Iniciado há 85 dias
              </div>
            </div>
            <!-- fim informacoes em 3 colunas-->
        </div>

        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>

      <div class="card" data-toggle="tooltip" data-placement="top" title="
      Para este MVP apenas o projeto A pode ser acessado. Agradecemos a compreensão.">
        <img src="../img/b.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Projeto B</h5>
          <small  class="form-text text-muted">por José Soares</small>
          <p class="card-text">Descrição do Projeto B</p>
            <small  class="form-text text-muted">Rio de Janeiro</small>
            <div class="progress">
              <div class="progress-bar w-75" role="progressbar"
              aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

            <!-- informacoes em 3 colunas-->
            <div class="container">
              <div class="card-info">
              75%
              </div>
              <div class="card-info">
                R$10.432,00 levantados
              </div>
              <div class="card-info">
                Iniciado há 12 dias
              </div>
            </div>
            <!-- fim informacoes em 3 colunas-->
        </div>

        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>

      <div class="card" data-toggle="tooltip" data-placement="top" title="
      Para este MVP apenas o projeto A pode ser acessado. Agradecemos a compreensão.">
        <img src="../img/c.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Projeto C</h5>
          <small  class="form-text text-muted">por Ana Santos</small>
          <p class="card-text">Descrição do Projeto C</p>
            <small  class="form-text text-muted">São Paulo</small>
            <div class="progress">
              <div class="progress-bar w-75" role="progressbar"
              aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <!-- informacoes em 3 colunas-->
            <div class="container">
              <div class="card-info">
              75%
              </div>
              <div class="card-info">
                R$7.832,00 levantados
              </div>
              <div class="card-info">
                Iniciado há 25 dias
              </div>
            </div>
            <!-- fim informacoes em 3 colunas-->
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>
<!--fim do card deck-->
  </div>

</template>

<script>
  export default{
  }
</script>

<style>

</style>
