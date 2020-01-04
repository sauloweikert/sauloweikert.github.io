<template>
<div class="login">
  <div class="container login-bannerWrapper">
    <a class="navbar-brand" href="index.html">People For Science</a>
    <h3>Login</h3>
    <div class="login-banner">
      <form>
        <div class="form-group">

          <button type="button" class="btn facebook">Entrar com Facebook</button>

          <p id="secondary-text"><br>ou acesse pelo e-mail</p>
          <label for="projeto-name">Email</label>
          <input class="form-control" id="exampleInputEmail" type="text"
          placeholder="Digite um e-mail válido">

          <label for="password">Senha</label>
          <input type="password" class="form-control" id="exampleInputPassword1" aria-describedby="senhaHelp" placeholder="Senha">
          <small id="senhaHelp" class="form-text text-muted"><a href="#">Esqueci minha senha</a> </small>

          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-toggle="modal"
          data-target="#janela-contato">Fazer Login</button>
          <small id="cadastroHelp" class="form-text text-muted">Não tem conta? <a href="cadastro.html">Cadastre-se</a> </small>
        </form>


    </div>
  </div>

</template>

<script>
  export default{
  }
</script>

<style>

</style>
