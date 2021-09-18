---
date: "2021-09-18"
title: "[Baekjoon] 11559번: Puyo Puyo"
category: "Algorithm"
categoryColor: "#6196cc"
tags: ["Baekjoon", "Python", "BFS", "Simulation"]
thumbnail: "./images/Baekjoon.jpeg"
---

# 문제

뿌요뿌요의 룰은 다음과 같다.

- 필드에 여러 가지 색깔의 뿌요를 놓는다. 뿌요는 중력의 영향을 받아 아래에 바닥이나 다른 뿌요가 나올 때까지 아래로 떨어진다.

- 뿌요를 놓고 난 후, 같은 색 뿌요가 4개 이상 상하좌우로 연결되어 있으면 연결된 같은 색 뿌요들이 한꺼번에 없어진다. 이때 1연쇄가 시작된다.

- 뿌요들이 없어지고 나서 위에 다른 뿌요들이 있다면, 역시 중력의 영향을 받아 차례대로 아래로 떨어지게 된다.

- 아래로 떨어지고 나서 다시 같은 색의 뿌요들이 4개 이상 모이게 되면 또 터지게 되는데, 터진 후 뿌요들이 내려오고 다시 터짐을 반복할 때마다 1연쇄씩 늘어난다.

- 터질 수 있는 뿌요가 여러 그룹이 있다면 동시에 터져야 하고 여러 그룹이 터지더라도 한번의 연쇄가 추가된다.

남규는 최근 뿌요뿌요 게임에 푹 빠졌다. 이 게임은 1:1로 붙는 대전게임이라 잘 쌓는 것도 중요하지만, 상대방이 터뜨린다면 연쇄가 몇 번이 될지 바로 파악할 수 있는 능력도 필요하다. 하지만 아직 실력이 부족하여 남규는 자기 필드에만 신경 쓰기 바쁘다. 상대방의 필드가 주어졌을 때, 연쇄가 몇 번 연속으로 일어날지 계산하여 남규를 도와주자!

# 입력

총 12개의 줄에 필드의 정보가 주어지며, 각 줄에는 6개의 문자가 있다.

이때 .은 빈공간이고 .이 아닌것은 각각의 색깔의 뿌요를 나타낸다.

R은 빨강, G는 초록, B는 파랑, P는 보라, Y는 노랑이다.

입력으로 주어지는 필드는 뿌요들이 전부 아래로 떨어진 뒤의 상태이다. 즉, 뿌요 아래에 빈 칸이 있는 경우는 없다.

# 출력

현재 주어진 상황에서 몇연쇄가 되는지 출력한다. 하나도 터지지 않는다면 0을 출력한다.

### 예제 입력

```

......
......
......
......
......
......
......
......
.Y....
.YG...
RRYG..
RRYGG.

```

### 예제 출력

```
3
```

<hr />

# 🔍 Algorithm

BFS

Simulation

# 💻 Language

Python

# 📍 Logic

- **입력 및 주요 변수 설정**

  ```python
  field = list(list(input()) for _ in range(12))
  visited = [[False] * 6 for _ in range(12)]  # BFS 시 방문 여부를 확인
  direction = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # BFS 시 상하좌우 탐색
  chain = 0  # 최종 출력값 (연쇄의 수)
  ```

<br />

- **Main**

  ```python
  while True:
      pop_count = 0
      for i in reversed(range(12)):
          for j in range(6):
              if field[i][j] != '.':
                  pop_count += puyo_pop(i, j)  # 뿌요 터뜨리기

      # 한 턴에 연쇄가 하나라도 발생할 경우
      if pop_count > 0:
          chain += 1
          puyo_drop()  # 뿌요 떨어뜨리기
          visited = [[False] * 6 for _ in range(12)]
      else: break
  ```

<br />

- **BFS => 뿌요 터뜨리기**

  ```python
  def puyo_pop(start_x, start_y):
    queue = deque([(start_x, start_y)])
    visited[start_x][start_y] = True
    puyo = [(start_x, start_y)]

    # BFS 를 통해 상하좌우 같은 색의 뿌요 찾기
    while queue:
        i, j = queue.popleft()
        for d in direction:
            x, y = i + d[0], j + d[1]
            if 0 <= x < 12 and 0 <= y < 6 and not visited[x][y]:
                if field[start_x][start_y] == field[x][y]:
                    queue.append((x, y))
                    puyo.append((x, y))
                    visited[x][y] = True

    # 뿌요가 4개 이상일 경우 뿌요가 있던 자리를 '.' 으로 초기화
    if len(puyo) >= 4:
        for i, j in puyo: field[i][j] = '.'
        return 1
    return 0
  ```

<br />

- **뿌요 떨어뜨리기**

  ```python
  def puyo_drop():
    # 한 열씩 조사
    for j in range(6):
        puyo = []
        for i in reversed(range(12)):
            # 떨어뜨릴 뿌요 찾은 후 '.' 으로 초기화
            if field[i][j] != '.':
                puyo.append(field[i][j])
                field[i][j] = '.'
        # 조사한 열 업데이트
        for i, v in enumerate(puyo):
            field[11 - i][j] = v
  ```

# 🛠 Code

```python
from collections import deque


def puyo_drop():
    for j in range(6):
        puyo = []
        for i in reversed(range(12)):
            if field[i][j] != '.':
                puyo.append(field[i][j])
                field[i][j] = '.'
        for i, v in enumerate(puyo):
            field[11 - i][j] = v


def puyo_pop(start_x, start_y):
    queue = deque([(start_x, start_y)])
    visited[start_x][start_y] = True
    puyo = [(start_x, start_y)]

    while queue:
        i, j = queue.popleft()
        for d in direction:
            x, y = i + d[0], j + d[1]
            if 0 <= x < 12 and 0 <= y < 6 and not visited[x][y]:
                if field[start_x][start_y] == field[x][y]:
                    queue.append((x, y))
                    puyo.append((x, y))
                    visited[x][y] = True

    if len(puyo) >= 4:
        for i, j in puyo: field[i][j] = '.'
        return 1
    return 0


field = list(list(input()) for _ in range(12))
visited = [[False] * 6 for _ in range(12)]
direction = [(-1, 0), (1, 0), (0, -1), (0, 1)]
chain = 0

while True:
    pop_count = 0
    for i in reversed(range(12)):
        for j in range(6):
            if field[i][j] != '.':
                pop_count += puyo_pop(i, j)

    if pop_count > 0:
        chain += 1
        puyo_drop()
        visited = [[False] * 6 for _ in range(12)]
    else: break

print(chain)

```

# 📝 Review

**뿌요 터뜨리기**, **뿌요 떨어뜨리기**, 이 두가지 경우를 나누어 생각했고, 빠르게 해결법을 찾을 수 있었다.

맨 처음에는 가장 아래에 있는 뿌요만 조사하면 된다는 어리석은 생각으로 접근하기도 했다..

그리고 반복문을 많이 사용하여 시간초과가 나지 않을까 염려했지만, 어차피 12 \* 6 반복이라 크게 시간을 잡아먹지는 않을 것이라 예상했다.

생각대로 시간초과가 나지 않아서 다행이었고 재밌었다.

<br />
<br />

**Source:**

https://www.acmicpc.net/problem/11559
