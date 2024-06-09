FROM coady/pylucene as indexer

WORKDIR /app

COPY requirements.txt  /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY res/ /app/res/
COPY RecipeIndexer.py /app/

RUN python RecipeIndexer.py


FROM coady/pylucene as api

WORKDIR /app

COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

COPY --from=indexer /app/recipes_index /app/recipes_index

# Za potrebe ovog zadatka, nema potrebe da se pokreće neki wsgi server. U produkciji bi to bilo neophodno.
CMD ["python", "api.py"]
