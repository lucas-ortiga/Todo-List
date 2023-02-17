$(document).ready(function() {
    $('#form-novo-item').on('submit', adicionarItemNaListaToDo);
})

function adicionarItemNaListaToDo(ev) {
    ev.preventDefault();
    var texto =  $('#item-texto').val();

    if(texto == '') {
        $('#item-texto').addClass('is-invalid');
        return
    }

    $('#lista-todo').append(retornaHtmlItem(texto));
    $('#item-texto').val('').focus().removeClass('is-invalid');
    somaItensConcluidos()
}

function retornaHtmlItem(texto) {

    return `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="lista-item-texto">${texto}</span>
                <div>
                    <ion-icon class="text-info pointer" name="checkmark-done-outline" onclick="marcarItemCheck(this)"></ion-icon>
                    <ion-icon class="text-danger pointer" name="trash-outline" onclick="removerItem(this)"></ion-icon>
                </div>
            </li>
        `
}

function removerItem(botaoRemover) {
    $(botaoRemover).closest('.list-group-item').remove();
    somaItensConcluidos()
}

function marcarItemCheck(botaoCheck) {
    $(botaoCheck).closest('.list-group-item').find('.lista-item-texto').toggleClass('text-decoration-line-through');
    somaItensConcluidos();
}

function somaItensConcluidos() {
    var totalItens =  $('#lista-todo li').length;
    var totalItensComCheck = $('#lista-todo li .lista-item-texto.text-decoration-line-through').length;
    var porcentagemCalculada = (totalItensComCheck*100/totalItens).toFixed(2);
    $('#porcentagem-concluida').text(porcentagemCalculada + '%')

    if(totalItens == 0) {
        $('#texto-concluido').addClass('d-none');
    } else {
        $('#texto-concluido').removeClass('d-none');
    }
}