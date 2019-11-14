from flask import Flask
from flask import render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)



@app.route('/')
def hello_world():
    return render_template("index.html")

@socketio.on('jogada')
def messagerecived(tabela):
    print(tabela)
    emit('jogou' ,tabela , broadcast=True)

@socketio.on('message')
def messagerecived(data):
    print (data)
    emit('message', data, broadcast=True)

@socketio.on('jogador')
def messagerecived(data):
    emit('jogador', player, broadcast=True)



if __name__ == '__main__':
    socketio.run(app, '192.168.7.55', 3000)
