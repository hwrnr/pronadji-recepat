FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

# Za potrebe ovog zadatka, nema potrebe da se pokreće neki wsgi server. U produkciji bi to bilo neophodno.
CMD ["python", "api.py"]
