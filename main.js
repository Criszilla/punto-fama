import { setupPlay } from './play.js'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div id="messages">Ingresa tu número secreto</div>
    <form id="form">
      <div class="d-flex justify-content-between">
        <div class="field px-1">
          <input type="number" class="form-control">
          <div class="invalid-feedback d-none"></div>
        </div>
        <div class="field px-1">
          <input type="number" class="form-control">
          <div class="invalid-feedback d-none"></div>
        </div>
        <div class="field px-1">
          <input type="number" class="form-control">
          <div class="invalid-feedback d-none"></div>
        </div>
        <div class="field px-1">
          <input type="number" class="form-control">
          <div class="invalid-feedback d-none"></div>
        </div>
        <div class="field px-1">
          <button id="play" class="btn btn-primary" type="submit">Play</button>
        </div>
      </div>
    </form>

    <hr>

    <div class="row">
    <div class="col">
        <span class="h4">My plays</span>
        <div id="my_plays"></div>
      </div>
      <div class="col">
        <span class="h4">My score</span>
        <div id="my_score"></div>
      </div>
    </div>
  </div>
`

setupPlay(document.querySelector('#play'))
