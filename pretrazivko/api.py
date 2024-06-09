import re

from flask import Flask, jsonify
from flask_cors import CORS

from RecipeSearcher import RecipeSearcher

app = Flask(__name__)
CORS(app)

recipeSearcher = RecipeSearcher("./recipes_index")

@app.route('/search/<query>')
def search(query):

    recipes = recipeSearcher.search(query)
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
    r = recipeSearcher.searchID(id)
    return jsonify({
        "id": r.id,
        "title": r.title,
        "ingredients": r.ingredients,
        "directions": r.directions
    })

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
