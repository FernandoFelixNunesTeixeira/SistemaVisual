from flask import Flask

import flask

app = Flask(__name__)

@app.route("/")
def index():
    return f"""
    <h1>Flask está funcionando!</h1>
    <p>Versão do Flask: {flask.__version__}</p>
    """

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
