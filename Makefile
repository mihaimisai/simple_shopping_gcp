PYTHONPATH=${WD}/backend

# Create virtual env

environment:
	python -m venv backend/venv

# Install requirements

requirements: environment
	source backend/venv/bin/activate && pip install -r ./backend/requirements.txt

# Format and check

black:
	source backend/venv/bin/activate && black --line-length=79 backend/src/ backend/test/
black-check:
	source backend/venv/bin/activate && black --check --line-length=79 backend/src/ backend/test/
flake8:
	source backend/venv/bin/activate && flake8 backend/src/ backend/test/

format-check: black black-check flake8

# Run security

bandit:
	source backend/venv/bin/activate && bandit -r backend/src/ backend/test/ --skip B101
pip-audit:
	source backend/venv/bin/activate && pip-audit
	
security: bandit pip-audit

# Run tests

check-coverage:
	source backend/venv/bin/activate && export PYTHONPATH=$(PWD) && pytest --cov=backend/src backend/test/
test:
	source backend/venv/bin/activate && export PYTHONPATH=$(PWD) && pytest

run-tests: check-coverage test
