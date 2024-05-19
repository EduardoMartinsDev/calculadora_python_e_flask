pip install Flask

from Flask import Flask, request, jsonify, render_template

app = Flask(__name__)

def calcular_porcentagem(numero, percentual):
    return (numero * percentual) / 100

def calcular_valor(percentual, numero):
    return (percentual / 100) * numero

def calcular_aumento_percentual(valor_inicial, valor_final):
    return ((valor_final - valor_inicial) / valor_inicial) * 100

def calcular_reducao_percentual(valor_inicial, valor_final):
    return ((valor_inicial - valor_final) / valor_inicial) * 100

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calcular', methods=['POST'])
def calcular():
    data = request.json
    tipo = data.get('tipo')
    numero = data.get('numero')
    percentual = data.get('percentual')
    valor_inicial = data.get('valor_inicial')
    valor_final = data.get('valor_final')

    if tipo == 'porcentagem':
        resultado = calcular_porcentagem(numero, percentual)
    elif tipo == 'valor':
        resultado = calcular_valor(percentual, numero)
    elif tipo == 'aumento':
        resultado = calcular_aumento_percentual(valor_inicial, valor_final)
    elif tipo == 'reducao':
        resultado = calcular_reducao_percentual(valor_inicial, valor_final)
    else:
        return jsonify({'error': 'Tipo de cálculo inválido'}), 400

    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(debug=True)
