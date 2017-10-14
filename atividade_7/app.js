"use strict";
var cachedText = null;
var endOfCachedText = true;

const loadCachedText = (callback) => {
  $('#aviso').html('');

  $.get("texto.html", (data, status, jqXHR) => {
    cachedText = $($.parseHTML(data)).filter('p').toArray();
    endOfCachedText = false;
    callback();
  }).fail(() => {
    $('#aviso').html('<p>Houve um erro na comunicação. Por favor, tente novamente</p>');
  })
};

const includeParagraph = () => {
  if (cachedText.length) {
    var item = cachedText.shift();
    $('body').append(item);
  } else if (!endOfCachedText) {
    endOfCachedText = true;
    $('#aviso').html('<p>AVISO: Não é possível incluir novos parágrafos</p>');
  }
};

$( document ).ready(() => {
  $('#botao').click(() => {
    if (cachedText === null) loadCachedText(includeParagraph);
    else includeParagraph();
  });
});
