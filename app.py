import os 
from datetime import timedelta
from flask import Flask, request, jsonify, render_template, session
from Improvement_Model import getClient, sendQuestion

client = getClient()

app = Flask(__name__)
app.secret_key = os.urandom(24)

app.config.update(
    SESSION_COOKIE_SECURE =True, 
    SESSION_COOKIE_HTTPONLY = True,
    SESSION_COOKIE_SAMESITE = 'Lax',
    PERMANENT_SESSION_LIFETIME=timedelta(minutes=30),
    SESSION_TYPE = 'filesystem'
)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response = generate_response(user_input)
    session['last_message'] = user_input
    session['last_response'] = response
    return jsonify({"response": response})

def generate_response(user_input):
    answer = sendQuestion(client=client, question=user_input, index_name="fileupload-avaimprov")
    return answer

@app.route('/last')
def last():
    last_message = session.get('last_message', 'No previous message')
    last_response = session.get('last_response', 'No previous response')
    return jsonify({"last_message":last_message, "last_response":last_response})


if __name__ == '__main__':
    app.run(ssl_context=('ssl.crt', 'ssl.key'))
