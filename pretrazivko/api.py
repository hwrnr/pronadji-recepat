from flask import Flask, jsonify
from flask import Flask, jsonify, g
from flask_cors import CORS

from RecipeSearcher import RecipeSearcher

app = Flask(__name__)
CORS(app)

@app.before_request
def before_first_request():
    g.recipeSearcher = RecipeSearcher("./recipes_index")

@app.after_request
def after_request(response):
    if 'recipeSearcher' in g:
        g.recipeSearcher.finishSearching()
    return response

@app.route('/search/<query>')
def search(query):
    recipes = g.recipeSearcher.search(query)
    res = []

    for r in recipes:
        res.append({
            "id": r.id,
            "title": r.title,
            "ingredients": r.ingredients,
            "directions": r.directions
        })

    return jsonify(res)

@app.route('/recipe/<id>')
def recipe(id):
    r = g.recipeSearcher.searchID(id)
    return jsonify({
        "id": r.id,
        "title": r.title,
        "ingredients": r.ingredients,
        "directions": r.directions
    })

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
