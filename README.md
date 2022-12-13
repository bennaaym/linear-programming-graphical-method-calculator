# Linear Programming Graphical Method Calculator

## Getting Started

### Backend Set Up

#### Prerequisites

- [Python 3.8](https://www.python.org)

1. cd to the backend subdirectory

```sh
linear-programming-graphical-method-calculator> cd backend
```

2. install Python dependencies

```sh
linear-programming-graphical-method-calculator\backend> pip install -r requirements.txt
```

3. install **uvicorn** to work as the server

```sh
linear-programming-graphical-method-calculator\backend> pip install "uvicorn[standard]"

```

4. run the server

```sh
linear-programming-graphical-method-calculator\backend> uvicorn main:app --reload
```

5. check up API documentation

```
http://localhost:8000/docs
```
