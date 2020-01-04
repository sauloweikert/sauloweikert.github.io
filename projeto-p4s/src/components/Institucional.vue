<template>
<!-- container para secoes video e contato-->
      <div class="container">
        <div class="row">

<!-- secao video Institucional-->
          <section id="videos" class="col-sm-6">
            <h2 id="subtitulo">Vídeo Institucional</h2>
            <div class="embed-responsive embed-responsive-16by9">
              <iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fpeopleforsciencebr%2Fvideos%2F224346284814660%2F&show_text=0&width=560" width="560" height="315"
              style="border:none;overflow:hidden" scrolling="no" frameborder="0"
               allowTransparency="true" allowFullScreen="true" SameSite=None></iframe>
            </div>
          </section>

<!-- secao contato-->
          <section id="contato" class="col-sm-6">
            <h2 id="subtitulo">Contato</h2>
            <p>Entre em contato conosco</p>

            <form>
              <div class="form-group">
                <label for="contato-name"> Nome:</label>
                <input class="form-control" id="contato-name" type="text"
                placeholder="Seu nome">
              </div>

              <div class="form-group">
                <label for="contato-email">Email</label>
                <div class="input-group">
                  <div class="input-group-addon">@ </div>
                    <input type="email" class="form-control" id="contato-email"
                    placeholder="Seu e-mail">
                  </div>
                </div>

                <div class="grupo-radio">
                  <div class="radio">
                    <label>
                      <input type="radio" name="tipo-pessoa"
                      checked> Pessoa Física
                    </label>
                  </div>
                  <div class="radio">
                    <label>
                      <input type="radio" name="tipo-pessoa"
                      checked> Pessoa Jurídica
                    </label>
                  </div>
                </div>

                <select class="contato-select form-control">
                  <option disabled selected>Tipo de Situação</option>
                  <option>Consultoria</option>
                  <option>Estudo dirigido</option>
                  <option>Palestra</option>
                </select>

                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#janela-contato">
                  Enviar
                </button>

                <!-- Modal -->
                <div class="modal fade" id="janela-contato" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Mensagem
                        da nossa Equipe</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <p>No momento a funcionalidade de "Contato" ainda está
                        em fase de implementação. Neste MVP você ainda pode
                      começar um projeto (clicando em "Comece") ou explorar
                    aqueles já existentes (clicando em "Explore"). <br><br>
                    Agradecemos a sua compreensão. Em breve teremos novidades
                  em nosso site!</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-success"
                        data-dismiss="modal" >
                        Ok, entendi</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!--Fim Modal -->

              </form>
            </section>
            <!-- fim secao contato-->

          </div>
        </div>

<!-- fim container para secoes video e contato-->
</template>

<script>
  export default{
  }
</script>

<style>

</style>
