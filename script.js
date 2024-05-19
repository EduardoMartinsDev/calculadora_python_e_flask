document.addEventListener('DOMContentLoaded', function() {
    const tipoSelect = document.getElementById('tipo');
    const inputGroup1 = document.getElementById('inputGroup1');
    const inputGroup2 = document.getElementById('inputGroup2');
    const inputGroup3 = document.getElementById('inputGroup3');
    const inputGroup4 = document.getElementById('inputGroup4');

    tipoSelect.addEventListener('change', function() {
        const tipo = tipoSelect.value;
        inputGroup1.style.display = 'none';
        inputGroup2.style.display = 'none';
        inputGroup3.style.display = 'none';
        inputGroup4.style.display = 'none';

        if (tipo === 'porcentagem' || tipo === 'valor') {
            inputGroup1.style.display = 'block';
            inputGroup2.style.display = 'block';
        } else if (tipo === 'aumento' || tipo === 'reducao') {
            inputGroup3.style.display = 'block';
            inputGroup4.style.display = 'block';
        }
    });

    tipoSelect.dispatchEvent(new Event('change'));
});

function calcular() {
    const tipo = document.getElementById('tipo').value;
    const numero = parseFloat(document.getElementById('numero').value);
    const percentual = parseFloat(document.getElementById('percentual').value);
    const valor_inicial = parseFloat(document.getElementById('valor_inicial').value);
    const valor_final = parseFloat(document.getElementById('valor_final').value);

    let data = { tipo };

    if (tipo === 'porcentagem' || tipo === 'valor') {
        data.numero = numero;
        data.percentual = percentual;
    } else if (tipo === 'aumento' || tipo === 'reducao') {
        data.valor_inicial = valor_inicial;
        data.valor_final = valor_final;
    }

    fetch('/calcular', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const resultadoDiv = document.getElementById('resultado');
        if (data.error) {
            resultadoDiv.textContent = 'Erro: ' + data.error;
        } else {
            resultadoDiv.textContent = 'Resultado: ' + data.resultado;
        }
    });
}
