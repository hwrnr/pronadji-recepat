#! /bin/bash

cd "$(dirname "$0")/.."
if [ ! -d ".venv" ]; then
  bin/init.sh
fi
source .venv/bin/activate

pip install -r requirements.txt

python3 main.py
